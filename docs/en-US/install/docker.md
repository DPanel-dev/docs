# Install with Docker

:::danger
 In order to isolate permissions, the DPanel automatically creates a dpanel-plugin-explorer container when managing container files. \
The dpanel-plugin-explorer container does not expose any ports, and the DPanel will automatically remove this container after you close all pages.\
The dpanel-plugin-explorer container uses the alpine image. You can also [create by hand](/docs/en-US/install/docker#create-explorer-plugin) and keep the name dpanel-plugin-explorer.\
If there is no dpanel-plugin-explorer container DPanel will be automatically created. If you cannot accept this, please do not use the [File Explorer] function.！！！！ 
:::

:::tip
Macos you need to link the docker.sock file to the /var/run/docker.sock directory first

sudo ln -s -f /Users/Your Name/.docker/run/docker.sock /var/run/docker.sock

Windows Please run the command in WSL
:::

<br />

###### [:rocket::rocket::rocket: Use install script to quickly install or upgrade the DPanel container](/docs/en-US/install/shell)

## Standard Edition

:::danger
DPanel container cannot bind to the host network <span style="color: red">（do not use the --network host !!!）</span>
:::

The Standard Edition provides nginx proxy-pass and HTTPS certificate features, which require binding ports 80 and 443. If you do not need these features, please use the Lite Edition.

The Lite Edition differs from the Standard Edition only in the image. Mapping ports 80 and 443 is no longer required. All other configurations are identical.

The following commands all use the Standard Edition as an example. Please replace the parameters and image by hand.

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

Podman is compatible with Docker commands. Simply replace docker in the creation command with podman and run it. For example:

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

## Mount docker.sock File

When create DPanel container, you must mount the docker.sock file to access the Docker API.

If you're binding to a non-default /var/run/docker.sock file or running within Podman, you must specify the sock file in the arguments.

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /Users/test/.docker/run/docker.sock:/var/run/docker.sock \  // [!code focus]
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

### Find docker.sock File

In a Docker you can find the sock file using the following command

```shell
docker context inspect $(docker context show)  --format '{{.Endpoints.docker.Host}}'
```

:::details Output
unix:///Users/test/.docker/run/docker.sock
:::


## Use Docker Api

When using the Docker API to manage Docker, you do not need to mount the /var/run/docker.sock file when creating a DPanel container.

## Custom Management Port

By default, after the DPanel is installed, the management url is http://127.0.0.1:8807. \
You can also use the -p parameter to specify the management port.

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 2456:8080 -e APP_NAME=dpanel \  // [!code focus]
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Http(s) Proxy

Configure the proxy address in the container through environment variables \
If the proxy address is the host, do not use 127.0.0.1 or localhost, these addresses point to the container itself rather than the host, please use the host LAN address.

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -e HTTP_PROXY="http://192.168.1.5:7890" \  // [!code focus] 
 -e HTTPS_PROXY="http://192.168.1.5:7890" \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```
## Mount DPanel Key File <Badge type="tip" text="DPanel Version >= 1.8.1" />

The panel uses the RSA algorithm for login authentication and SSH-related functions. DPanel automatically generates RSA public and private key files upon startup (only if they don't already exist). The files are located in the /dpanel/cert/rsa directory.

You can also mount your local ~/.ssh/id_rsa and ~/.ssh/id_rsa.pub files into the panel container.

When adding SSH permissions, select [Use DPanel Key] to allow the container to directly use the host machine's permissions.

This approach also allows for unified permission management and quick replacement and updating.

```js
docker run -d --name dpanel --restart=always \ 
-p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
-v /home/test/.ssh/id_rsa:/dpanel/cert/rsa/id_rsa \ // [!code focus] 
-v /home/test/.ssh/id_rsa.pub:/dpanel/cert/rsa/id_rsa.pub \ // [!code focus] 
-v /var/run/docker.sock:/var/run/docker.sock \ 
-v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Volume

:::tip
If you need to mount a compose yaml file or use a relative path in compose yaml, be sure to mount the /dpanel directory to the host and create a new compose task in the directory. See [Create Compose task](/manual/compose-create#mount)
:::

The DPanel will generate some data when running and store it in the /dpanel directory in the DPanel container. If the directory is not mounted when creating, Docker will automatically generate a storage volume for the directory

If you want to customize the directory mounted to the host, you can modify the -v parameter.

The volume mount directory must be an absolute directory. If the directory does not exist, it will be created automatically.

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/test/dpanel:/dpanel dpanel/dpanel:latest // [!code focus] 
```

## Admin Account

After creating the DPanel container, you need to configure the admin account for the first time. If you forget your password, you can use [Reset Username and Password](/install/ctrl#user-reset)


## DPanel Container Name

If you want to change the DPanel container name or install multiple panels at the same time, you can specify the APP_NAME environment variable to the specified container name in the installation command.

```js
docker run -d --restart=always \ 
 --name dpanel-test -e APP_NAME=dpanel-test \ // [!code focus] 
 -p 80:80 -p 443:443 -p 8807:8080  \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Host Ip Address

Accessing 127.0.0.1 or localhost from within a container refers to the container itself.

To access the host from within a container, you need to use the host's local network address or the host address injected into the container  host.dpael.local .

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 --add-host=host.dpanel.local:host-gateway \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Upgrade & Recreate

The difference between updating and re-creating is whether to keep the directory data (/dpanel) previously mounted on the panel container. If you delete the host mount directory or re-specify the directory, the panel is re-created.

If you keep the original mount directory data and mount configuration, rebuilding the panel container means upgrading. [See the panel upgrade command](/manual/system-dpanel-upgrade)

## Create dpanel-plugin-explorer container {#create-explorer-plugin}

:::tip

If you set the dpanel-plugin-explorer container tag com.dpanel.container.auto_remove=true, DPanel will automatically clean up the container after each browser is closed. If you set it to false, it will not clean up.
:::

```js
docker run -it -d --name dpanel-plugin-explorer --restart always --pid host --label com.dpanel.container.title="dpanel 文件管理助手" --label com.dpanel.container.auto_remove=false alpine
```