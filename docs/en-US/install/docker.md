# Install with Docker

:::danger
When managing container files, DPanel automatically creates a dpanel-plugin-explorer container to isolate permissions.
This container uses the alpine image, exposes no ports, and is automatically removed after you close all file-management pages.
You can also [create it manually](/docs/en-US/install/docker#create-explorer-plugin); the container name must remain dpanel-plugin-explorer.
If you cannot accept automatic creation, please do not use the [File Explorer] function.
:::

<br />

###### [:rocket::rocket::rocket: Use install script to quickly install or upgrade the DPanel container](/docs/en-US/install/shell)

<!--@include: ../include/image.md-->

## Standard Edition

:::warning
#### <span style="color: #cd1f00">The following examples use the **Standard Edition**. Please adjust parameters and image tags according to your actual version.</span>
:::


The Standard Edition provides domain binding and certificate features, which require binding ports 80 and 443. If you do not need these features, please use the Lite Edition.

The Lite Edition differs from the Standard Edition only in the image. Binding ports 80 and 443 is no longer required. Other configurations are same.

```shell
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Lite Edition

```shell
docker run -d --name dpanel --restart=always \
 -p 8807:8080 -e APP_NAME=dpanel \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:lite
 ```

## Podman

Podman provides a CLI that is highly compatible with Docker commands. Simply replace docker in the creation command with podman and run it.

```shell
podman run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /run/podman/podman.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

### Rootless

Podman supports running in rootless mode. When creating DPanel container, you need to activate the podman.sock session of the non-root user.


```shell
systemctl --user enable --now podman.socket
```

Mount the user's podman.sock to the DPanel container /var/run/docker.sock file.

```js
podman run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /run/user/1000/podman/podman.sock:/var/run/docker.sock  \ // [!code focus]
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Docker Desktop (Windows / macOS)

Mount the docker.sock file via the path `//var/run/docker.sock`:

:::code-group

```js [Windows]
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v //var/run/docker.sock:/var/run/docker.sock // [!code focus] \
 -v D:\data\dpanel:/dpanel dpanel/dpanel:latest // [!code focus]
```

```js [macOS]
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v //var/run/docker.sock:/var/run/docker.sock // [!code focus] \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```
:::

## Use Docker TCP

When using [Docker TCP](/manual/system-env-tcp), there is no need to mount the `/var/run/docker.sock` file when creating the panel container.
The API address is specified via the `DOCKER_HOST` environment variable during creation.

:::tip
Use `--add-host` to bind the host machine's IP address to the container; otherwise, you need to use the host machine's IP address within the local network.
:::

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 --add-host=host.dpanel.local:host-gateway  \ // [!code focus]
 -e DOCKER_HOST=tcp://host.dpanel.local:2375 \  // [!code focus]
 -v /home/dpanel dpanel/dpanel:latest
```

## Custom DPanel Management Port

After installation with the default command, access the panel at `http://127.0.0.1:8807`. You can customize the host port mapped to the container's 8080 port:

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 2456:8080 -e APP_NAME=dpanel \  // [!code focus]
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Use Host Network (--network host)

In host network mode, access the panel at `http://hostip:8080` by default. To change the port, add `APP_SERVER_PORT=2456`.
Make sure the host ports are not already in use (the Standard Edition also requires ports 80 and 443).

:::warning
When configuring container domain forwarding in host network mode, use the `IP:PORT` format only.
:::

```js
docker run -d --name dpanel --restart=always \
 -e APP_NAME=dpanel -e APP_SERVER_PORT=2456 --network host \  // [!code focus]
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```


## Configure DPanel Proxy

Configure the proxy address inside the container through environment variables.
If the proxy is running on the host, do not use `127.0.0.1` or `localhost` (these addresses point to the container itself); use the host's LAN address instead:

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -e HTTP_PROXY="http://192.168.1.5:7890" \  // [!code focus] 
 -e HTTPS_PROXY="http://192.168.1.5:7890" \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Customize DPanel Key File <Badge type="tip" text="DPanel Version >= 1.8.1" />

DPanel uses RSA for login authentication and SSH login. It automatically generates RSA public and private key files upon startup (only if they don't already exist). The files are located in the **_/dpanel/cert/rsa_** directory.

You can also mount your local **_~/.ssh/id_rsa_** and **_~/.ssh/id_rsa.pub_** files into the DPanel container.

When adding SSH permissions, select **_Use DPanel Key_** to allow the container to directly use the host machine's permissions.
This approach also allows for unified permission management and quick replacement and updating.

```js
docker run -d --name dpanel --restart=always \ 
-p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
-v /home/test/.ssh/id_rsa:/dpanel/cert/rsa/id_rsa \ // [!code focus] 
-v /home/test/.ssh/id_rsa.pub:/dpanel/cert/rsa/id_rsa.pub \ // [!code focus] 
-v /var/run/docker.sock:/var/run/docker.sock \ 
-v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Customize Host Directory Storage

:::tip
If `/dpanel` is bind-mounted from a host directory, Compose can use relative directories directly. If `/dpanel` uses a Docker volume, mount its subdirectories with volume `subpath` instead. See [Compose Relative Directories](/docs/en-US/manual/compose-relative-bind).
:::

DPanel stores runtime data in the `/dpanel` directory inside the container. If this directory is not mounted when the container is created, Docker automatically mounts a storage volume.
You can customize the host path mounted to the container's `/dpanel` directory (an absolute path is required):

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/test/dpanel:/dpanel dpanel/dpanel:latest // [!code focus] 
```

## Configure DPanel Administrator Username and Password

After creating the DPanel container, configure the administrator username and password on first access. If you forget the password, you can [reset the username and password](/docs/en-US/install/ctrl#reset-admin-user).


## Customize DPanel Container Name

To change the DPanel container name or install multiple panels, configure the name with the `APP_NAME` environment variable:

```js
docker run -d --restart=always \ 
 --name dpanel-test -e APP_NAME=dpanel-test \ // [!code focus] 
 -p 80:80 -p 443:443 -p 8807:8080  \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```


## Customize DPanel Second-Level Access Directory

By default, the panel access address is **http://127.0.0.1:8807/dpanel/ui**. You can set the second-level access directory to **http://127.0.0.1:8807/apps/dpanel/ui** with the **DP_SYSTEM_BASEURL** environment variable.

:::warning
When customizing the directory, avoid including `/dpanel`, `/ws/common`, or `/api` where possible to prevent path errors caused by duplicate replacement.
:::

```js
docker run -d --restart=always \ 
 --name dpanel
 -e DP_SYSTEM_BASEURL=/apps \ // [!code focus] 
 -p 80:80 -p 443:443 -p 8807:8080  \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```


## Bind Host {#bind-host}

Within a container, `127.0.0.1` and `localhost` refer to the container itself.

To access the host, use its local network address or the host address injected into the container, `host.dpanel.local`:

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 --add-host=host.dpanel.local:host-gateway \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Rotate Log Files

DPanel writes warning-level and higher logs to `/dpanel/logs/`; runtime logs are managed by Docker.
To prevent log files from becoming too large, configure container log rotation:

```js
docker run -d --name dpanel --restart=always \
-p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
--log-driver json-file  --log-opt max-size=5m --log-opt max-file=10 \  // [!code focus]
-v /var/run/docker.sock:/var/run/docker.sock \
-v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Enabling IPv6

If your Docker environment does not have default IPv6 support configured, the Standard Edition will not be able to forward IPv6 addresses. You can create any IPv6 network in the panel and add the panel container to that network.

## Disable Security Policy

Run `docker info` to view the active security policy:

```
 runc version: v1.1.12-0-g51d5e94
 init version: de40ad0
 Security Options:
  seccomp
   Profile: builtin
 Kernel Version: 4.19.91-27.7.an7.x86_64
```

When the `Seccomp` security policy is enabled, updating or recreating the DPanel container may fail with a directory permission error:

```text
disk I/O error: operation not permitted
panic: disk I/O error: operation not permitted
```

Temporarily disable the security policy with the `--security-opt` parameter:

```js
docker run -d --restart=always \
 --name dpanel
 --security-opt seccomp=unconfined \ // [!code focus]
 -p 80:80 -p 443:443 -p 8807:8080  \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Upgrade & Recreate

The difference between updating and recreating is whether the configuration in the panel's mounted `/dpanel` directory is retained.
Deleting the host mount directory or specifying a different directory recreates the panel; otherwise, it is an upgrade. [See the upgrade command](/manual/system-dpanel-upgrade).

## Manually Create the File Explorer Plugin {#create-explorer-plugin}

:::tip

When the `com.dpanel.container.auto_remove` label on the file management container is set to `true`, DPanel automatically removes the container each time the browser is closed; when set to `false`, it is retained.
:::

```js
docker run -it -d --name dpanel-plugin-explorer --restart always --pid host --label com.dpanel.container.title="DPanel File Explorer" --label com.dpanel.container.auto_remove=false alpine
```
