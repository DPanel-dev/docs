# Container VM <Badge type="tip" text="DPanel Version >= 1.10.9" />

A container VM is not a hardware virtual machine. It is a system container built on Linux container technology. It provides an experience similar to a complete Linux system and uses RootFS commits to preserve filesystem changes, making it suitable for long-lived environments where you install software and modify system configuration as you would on a traditional VM.

You can build a container VM with Docker's default `runc` runtime, but standard containers have restricted privileges. Running system-level services such as systemd often requires additional permissions or even `privileged` mode, which increases security risks.

By switching the runtime to `sysbox-runc`, a container can gain more complete system-level capabilities without enabling `privileged` mode. Sysbox uses namespaces and other mechanisms to isolate the container from the host, allowing software such as systemd and Docker to run in an environment closer to a complete Linux system.

Compared with hardware virtualization such as KVM, a container VM does not have an independent kernel, virtual hardware, or the same level of isolation. In return, it uses fewer resources and supports higher deployment density, making it well suited to lightweight servers, development and testing, and temporary system environments.

## Data Storage and Persistence

When using a container as a long-lived VM, plan persistence separately for the **system environment** and **application data**. RootFS commits can preserve the system environment. Frequently changing data, such as databases and website files, should still be persisted with Docker volumes or bind mounts.

### Container RootFS

The RootFS (root filesystem) is the filesystem that a process sees inside the container. Its base content comes from the container image.

A Docker image is not a single complete file. It consists of multiple read-only layers stacked on top of one another. During an image build, Dockerfile instructions that change the filesystem can create new image layers.

When Docker creates a container, it adds a separate writable layer above the read-only image layers. File changes made by installing software, modifying configuration under `/etc`, or enabling systemd services are recorded in this writable layer.

With the commonly used `overlay2` storage driver, the structure can be simplified as follows:

```text
Container A RootFS

├── Image Layer 1       Read-only and reusable
├── Image Layer 2       Read-only and reusable
├── Image Layer 3       Read-only and reusable
└── Container layer     Records file changes made in this container
```

#### Container Writable Layer

If you delete and recreate a container, Docker generates a new RootFS from the selected image. System changes in the old container's writable layer are lost. This is one of the main differences between a container and a traditional VM: rebuilding a container does not automatically preserve RootFS modifications.

To preserve these system changes, use Docker's `commit` mechanism. It saves the changes in the current writable layer as a new image layer and creates a new image. Recreating the container from that image retains the software and system configuration installed previously.

```text
Container A RootFS after commit and recreation

├── Image Layer 1       Read-only and reusable
├── Image Layer 2       Read-only and reusable
├── Image Layer 3       Read-only and reusable
├── Image Layer 4       System changes saved by the previous commit
└── Container layer     Records file changes made in this container
```

### Mounted Data

RootFS commits are suitable for preserving system configuration. Application data such as databases and website files is usually larger and changes more frequently, so repeatedly committing it to an image is not recommended.

Persist application data with Docker's standard storage mechanisms: volumes or bind mounts. Even if the container is deleted or recreated, the data remains available when the same volume or directory is mounted again.

::: warning Important
RootFS commits do not save data stored in volumes or bind mounts. Back up this application data separately.
:::

## RootFS Commit

A RootFS commit saves file changes from the container's current writable layer to a new image. This preserves installed software, system configuration, systemd service configuration, and similar content.

After the first commit, DPanel generates a dedicated image name for the container. Subsequent automatic commits continue to use that image name and add a new layer on top of the previous commit.

If you explicitly change the base image while editing the container, DPanel stops using the existing commit chain and uses the new image as the starting point for subsequent RootFS commits.

### Manual Commit

Open the container details from the [Containers] list, then select [Container Management] → [Save as Image] to commit the current RootFS manually.

To apply the committed system state to the current container immediately, select [Recreate the container now to apply this image]. DPanel generates a new image name and recreates the container from that image.

![Manually commit a container RootFS](https://cdn.w7.cc/dpanel/container-commit-1.png)

### Automatic Commit

When using a container as a long-lived VM, enable [Automatically commit container image] under [Basic Configuration] → [Runtime and Security].

After this option is enabled, whenever you edit and recreate the container through DPanel, DPanel first commits the current container to a new image. It then recreates the container with that image and the updated container settings.

### Merge Image Layers

Each regular commit adds a new layer on top of the current image. These layers accumulate as the number of commits grows.

When the image reaches 100 layers or contains a large number of accumulated system changes, manually run [Merge Image Layers].

DPanel rebuilds the image from the final state of the current RootFS and flattens the previous multi-layer structure. For files modified in multiple layers, only the final version is retained. This reduces dependencies on historical layers and simplifies the image structure.

## Sysbox

[Sysbox](https://github.com/nestybox/sysbox) is an open-source OCI container runtime that can coexist with Docker's default `runc` runtime. Standard containers can continue to use `runc`; select `sysbox-runc` only for containers that need to run system-level software such as systemd or Docker-in-Docker.

Sysbox uses user namespaces, cgroups, and isolation or virtualization of system interfaces such as `/proc` and `/sys` to provide additional system-level capabilities without enabling `privileged` mode.

`sysbox-runc` maps the container's `root` user to an unprivileged user on the host. It also isolates or virtualizes system interfaces that might otherwise expose host state directly, extending container capabilities while maintaining an isolation boundary between the container and the host.

::: warning Important
Sysbox improves isolation compared with a standard privileged container, but it does not provide the same security boundary as a hardware VM. Assess the risks for your workload and follow the official Sysbox security guidance.
:::

`sysbox-runc` provides the runtime environment only; it does not install systemd in an image. A standard Docker image usually runs a single application process as PID 1. Systemd must itself run as PID 1 so that it can start and manage system services such as SSH, Docker, and scheduled jobs.

When creating a container VM, select a system image that already includes a correctly configured systemd installation, such as `oowy/systemd:debian-trixie` or `oowy/systemd:ubuntu-24.04`. See [oowy/systemd](https://hub.docker.com/r/oowy/systemd) for more images.

### Installation

::: tip
The DPanel installer can install **Sysbox-CE** directly. Select [Install Sysbox CE] while installing DPanel to install Sysbox and configure the Docker runtime at the same time.
:::

Install Sysbox on the **Linux host running Docker**. Before installation, confirm that the host's Linux distribution, kernel version, and CPU architecture meet the requirements. See the [Sysbox installation guide](https://github.com/nestybox/sysbox/blob/master/docs/user-guide/install-package.md) and the official compatibility list for details.

After installation, run the following command to confirm that Docker recognizes Sysbox:

```bash
root@donknap-1:~# docker info | grep -i runtime
 Runtimes: io.containerd.runc.v2 runc sysbox-runc
 Default Runtime: runc
```

### Compatibility Configuration

Sysbox does not support some features in newer Docker versions, which may cause errors. After installing `sysbox-runc`, add the following settings to `daemon.json` to disable the unsupported features:

```js
{
    "runtimes": {
        "sysbox-runc": {
            "path": "/usr/bin/sysbox-runc"
        }
    },
    "bip": "172.20.0.1/16",
    "default-address-pools": [
        {
            "base": "172.25.0.0/16",
            "size": 24
        }
    ],
    "features": {                                    // [!code focus]
        "time-namespaces": false                     // [!code focus]
    }                                                // [!code focus]
}
```
