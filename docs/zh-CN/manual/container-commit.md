# 容器虚拟机 <Badge type="tip" text="DPanel Version >= 1.10.9" />

容器虚拟机并不是真正的硬件虚拟机，而是基于 Linux 容器技术构建的系统容器。它提供接近完整 Linux 系统的使用体验，并通过 RootFS Commit 保存文件系统变更，适合像维护传统虚拟机一样长期安装软件和调整系统配置。

容器虚拟机可以使用 Docker 默认的 `runc` 运行时，但普通容器的权限默认受限。为了运行 systemd 等系统级服务，往往需要放宽容器权限，甚至启用 `privileged` 模式，从而增加安全风险。

将运行时切换为 `sysbox-runc` 后，容器无需启用 `privileged` 模式，也能获得更完整的系统级能力。Sysbox 通过命名空间等机制隔离容器与宿主机，使 systemd、Docker 等程序能够以更接近真实 Linux 系统的方式运行。

与 KVM 等硬件虚拟机相比，容器虚拟机不具备独立内核、虚拟硬件或同等级别的隔离边界，但资源开销更低、部署密度更高，适合轻量服务器、开发测试和临时系统环境。

## 数据存储与持久化

将容器作为虚拟机长期使用时，需要分别规划**系统环境**和**业务数据**的持久化方式：系统环境可以通过 RootFS Commit 保存；数据库、网站文件等持续变化的数据，仍建议通过 Docker 存储卷或目录挂载进行持久化。

### 容器 RootFS

RootFS（Root Filesystem）是容器内看到的根文件系统，其基础内容来自容器镜像。

Docker 镜像并非单一的完整文件，而是由多个只读层（Layer）叠加而成。构建镜像时，Dockerfile 中改变文件系统的指令可能会生成新的镜像层。

创建容器后，Docker 会在只读镜像层之上添加一个独立的可写层。在容器内安装软件、修改 `/etc` 配置或启用 systemd 服务等产生的文件变更，都会记录在该可写层中。

以常见的 `overlay2` 存储驱动为例，可以简化理解为：

```text
容器 A 的 RootFS

├── 镜像 Layer 1       只读，可复用
├── 镜像 Layer 2       只读，可复用
├── 镜像 Layer 3       只读，可复用
└── 容器可写层          记录当前容器产生的文件变更
```

#### 容器可写层

删除并重新创建容器后，新容器会从指定镜像重新生成 RootFS，原容器可写层中的系统变更也会随之丢失。这是容器与传统虚拟机最明显的区别之一：容器不会在重建后自动保留对 RootFS 的修改。

要长期保留这些系统变更，可以使用 Docker 的 `commit` 机制，将当前容器可写层中的变化固化为新的镜像层，并生成一个新镜像。之后基于该镜像重新创建容器，即可保留此前安装的软件和系统配置。

```text
提交后新建的容器 A 的 RootFS

├── 镜像 Layer 1       只读，可复用
├── 镜像 Layer 2       只读，可复用
├── 镜像 Layer 3       只读，可复用
├── 镜像 Layer 4       上一次提交的系统变更
└── 容器可写层          记录当前容器产生的文件变更
```

### 挂载目录

RootFS Commit 适合保存系统配置。数据库、网站文件等业务数据通常体积更大、变化更频繁，不适合通过反复 `commit` 固化到镜像中。

业务数据应继续使用 Docker 的存储机制，通过存储卷（Volume）或目录挂载保存。即使容器被删除或重新创建，只要挂载相同的存储卷或目录，业务数据便可继续使用。

::: warning 注意
RootFS Commit 不会保存存储卷或挂载目录中的数据，请单独备份这些业务数据。
:::

## RootFS Commit

RootFS Commit 会将容器当前可写层中的文件变更固化到新镜像中，从而保留已安装的软件、系统配置和 systemd 服务配置等内容。

首次提交后，DPanel 会为容器生成专用的镜像名称。后续自动提交会继续使用该镜像名称，并在上一次提交结果的基础上添加新的镜像层。

如果编辑容器时主动更换基础镜像，DPanel 将不再沿用原有的 Commit 链，而是以新镜像为起点执行后续的 RootFS Commit。

### 手动提交

在【容器】列表中打开容器详情，然后通过【容器管理】→【另存为镜像】手动提交当前 RootFS。

如果需要让当前容器立即使用提交后的系统状态，请勾选【立即重建容器应用此镜像】。DPanel 会自动生成新的镜像名称，并使用该镜像重新创建容器。

![手动提交容器 RootFS](https://cdn.w7.cc/dpanel/container-commit-1.png)

### 自动提交

将容器作为虚拟机长期使用时，可以在【基本配置】→【运行时与安全】中开启【自动提交容器镜像】。

开启后，每次通过 DPanel 编辑并重建容器时，DPanel 都会先将当前容器提交为新镜像，再使用该镜像和修改后的容器参数重新创建容器。

### 合并镜像层

每次普通 Commit 都会在当前镜像的基础上增加一个新层。随着提交次数增加，镜像层会不断累积。

当镜像达到 100 层或累计的系统变更较多时，可以手动执行【合并镜像层】。

DPanel 会根据当前 RootFS 的最终状态重新生成镜像，将原有的多层结构扁平化。多层中被重复修改的文件只保留最终版本，从而减少对历史镜像层的依赖，并简化镜像结构。

## Sysbox

[Sysbox](https://github.com/nestybox/sysbox) 是一个开源 OCI 容器运行时，可以与 Docker 默认的 `runc` 并存。普通容器可以继续使用 `runc`；只有需要运行 systemd、Docker-in-Docker 等系统级软件的容器，才需要选择 `sysbox-runc`。

Sysbox 通过用户命名空间（User Namespace）、cgroup，以及对 `/proc`、`/sys` 等系统接口的隔离和虚拟化，在不启用 `privileged` 模式的情况下为容器提供更多系统级能力。

`sysbox-runc` 会将容器内的 `root` 映射为宿主机上的非特权用户，并隔离或虚拟化部分可能直接暴露宿主机状态的系统接口，在扩展容器能力的同时维持其与宿主机之间的隔离边界。

::: warning 注意
Sysbox 可以增强普通容器的隔离，但不能提供与硬件虚拟机相同的安全边界。请根据实际工作负载评估风险，并遵循 Sysbox 官方的安全建议。
:::

`sysbox-runc` 只提供运行环境，不会为镜像安装 systemd。普通 Docker 镜像通常仅运行一个应用进程作为 PID 1；systemd 则需要自身作为 PID 1，再由它启动和管理 SSH、Docker、定时任务等系统服务。

因此，创建容器虚拟机时需要选择已经包含并正确配置 systemd 的系统镜像，例如 `oowy/systemd:debian-trixie`、`oowy/systemd:ubuntu-24.04` 等。更多镜像请参阅 [oowy/systemd](https://hub.docker.com/r/oowy/systemd)。

### 安装

::: tip
DPanel 安装程序支持直接安装 **Sysbox-CE**。安装 DPanel 时选择【安装 Sysbox CE】，即可同时完成 Sysbox 安装和 Docker 运行时配置。
:::

Sysbox 需要安装在 **Docker 所在的 Linux 宿主机**上。安装前，请确认宿主机的 Linux 发行版、内核版本和 CPU 架构满足要求。具体信息请参阅 [Sysbox 安装说明](https://github.com/nestybox/sysbox/blob/master/docs/user-guide/install-package.md)及官方兼容性列表。

安装完成后，可以通过以下命令确认 Docker 是否已经识别 Sysbox：

```bash
root@donknap-1:~# docker info | grep -i runtime
 Runtimes: io.containerd.runc.v2 runc sysbox-runc
 Default Runtime: runc
```


### 兼容配置

因为 sysbox 并没有支持新版 docker 的一些新特征，所以可能会报错一些错误，在安装 sysbox-runc 后可以在 `daemon.json` 中增加以下配置，禁用一些新特性即可。

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