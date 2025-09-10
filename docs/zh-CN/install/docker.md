# 使用 Docker 安装

:::danger 
DPanel 面板为了隔离权限，在管理容器文件时，会自动创建 dpanel-plugin-explorer 容器。
此插件容器并不暴露任何端口，面板会在你关闭所有访问页面后自动销毁该容器。\
此插件容器使用 alpine 镜像，你也可以 [手动创建](/install/docker#create-explorer-plugin)，名称保持为 dpanel-plugin-explorer 即可。\
如果你没有手动创建，面板会自动创建。如果你无法接受，请勿使用【文件管理】功能！！！！ 
:::

:::tip
MacOS 下需要先将 docker.sock 文件 link 到 /var/run/docker.sock 目录中 \
sudo ln -s -f /Users/用户/.docker/run/docker.sock /var/run/docker.sock 

Windows 请在 wsl 中运行命令
:::

<br />

###### [:rocket::rocket::rocket: 使用安装脚本可快速安装、升级 DPanel 面板](/install/shell)

<!--@include: ../include/image.md-->

## 标准版

:::danger
面板容器不能绑定主机 host 网络 <span style="color: red">（请勿使用 --network host 参数 !!!）</span>
:::

标准版本中提供了域名绑定及证书功能，需要绑定 80 及 443 端口，如果你不需要这些功能，请使用 Lite 版。
Lite 版与标准版只有镜像地址区别，除不再需要映射 80 及 443 端口外，其余配置均一致。

后续命令演示均以【标准版】为例，请根据实际安装的版本替换参数及镜像地址。

```shell
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Lite 版

```shell
docker run -d --name dpanel --restart=always \
 -p 8807:8080 -e APP_NAME=dpanel \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:lite
 ```

## Podman

Podman 与 Docker 命令兼容，将创建命令中的 docker 替换成 podman 运行即可，例如：

```shell
podman run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /run/podman/podman.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

### Rootless

Podman 可以在非 root 用户下管理容器. 创建面板容器时，你需要先激活普通用户的 podman.sock 会话

```shell
systemctl --user enable --now podman.socket
```

将用户的 podman.sock 文件映射到面板容器的 /var/run/docker.sock 文件

```js
podman run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /run/user/1000/podman/podman.sock:/var/run/docker.sock  \ // [!code focus]
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 挂载 docker.sock 文件

创建面板时需要挂载 docker.sock 文件用于与 Docker 接口通信。
如果你绑定的非默认 /var/run/docker.sock 文件或是运行在 Podman 中，你需要在参数中指定 sock 文件。

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /Users/test/.docker/run/docker.sock:/var/run/docker.sock \  // [!code focus]
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

### 获取 docker.sock 文件路径

在 Docker 环境中你可以使用以下命令查找 sock 文件

```shell
docker context inspect $(docker context show)  --format '{{.Endpoints.docker.Host}}'
```

:::details 输出
unix:///Users/test/.docker/run/docker.sock
:::

### 使用 Docker Api 管理

使用 Docker Api 的形式管理 Docker 时在创建面板容器无须挂载 /var/run/docker.sock 文件。
通过[开启 Docker Tcp 连接](/manual/system-env-tcp)在面板容器创建完后，
通过[配置默认 docker 客户端](/manual/system-env#setting-default-env)配置接口地址即可。

## 自定义面板管理端口

使用默认命令安装面板后通过 http://127.0.0.1:8807 访问面板。
你可以自定义面板容器的 8080 对外映射端口

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 2456:8080 -e APP_NAME=dpanel \  // [!code focus]
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 配置面板代理

创建面板时通过环境变量配置容器内的代理地址 \
如果代理地址为宿主机，请勿使用 127.0.0.1 或 localhost，这些地址指向的是容器本身而非宿主机，请使用宿主机局域网地址

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -e HTTP_PROXY="http://192.168.1.5:7890" \  // [!code focus] 
 -e HTTPS_PROXY="http://192.168.1.5:7890" \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 自定义面板密钥文件 <Badge type="tip" text="DPanel Version >= 1.8.1" />

面板通过 RSA 算法进行登录验证以及 SSH 相关功能。面板程序启动时会自动生成 RSA 公/密钥文件（仅当文件不存在时），文件位于 /dpanel/cert/rsa 目录中。

你也可以将你本机的 ~/.ssh/id_rsa， ~/.ssh/id_rsa.pub 文件挂载到面板容器中。
在添加 SSH 权限时选择【使用面板密钥】使容器可以直接使用宿主机的权限。

通过这样的方式也可以实现权限的统一管理以及快速的替换和更新。

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -v /home/test/.ssh/id_rsa:/dpanel/cert/rsa/id_rsa \  // [!code focus] 
 -v /home/test/.ssh/id_rsa.pub:/dpanel/cert/rsa/id_rsa.pub  \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 自定义宿主机目录存储

:::tip
如果需要挂载 compose yaml 文件或是在 compose yaml 中使用相对路径，请务必将挂载 /dpanel 目录到宿主机。添加 compose 任务查看 [通过挂载存储路径的方式创建](/manual/compose-create#mount)
:::

面板在运行时会产生一些数据，并存储在面板容器内的的 /dpanel 目录中。如果在创建时没有挂载该目录 docker 会自动挂载到存储卷中 \
你可以自定义容器内的 /dpanel 目录的主机挂载目录，必须使用绝对路径。


```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/test/dpanel:/dpanel dpanel/dpanel:latest // [!code focus] 
```

## 配置面板管理员用户名密码

创建面板容器后，首次进入需要先配置管理员用户和密码。忘记密码时可[重置用户名密码](/install/ctrl#重置管理员用户)


## 自定义面板容器名称

如果你想更改面板容器名称或是需要同时安装多个面板，可以通过 APP_NAME 环境变量配置容器名称。

```js
docker run -d --restart=always \ 
 --name dpanel-test -e APP_NAME=dpanel-test \ // [!code focus] 
 -p 80:80 -p 443:443 -p 8807:8080  \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 绑定宿主机 host {#bind-host}

在容器内部访问 127.0.0.1 或是 localhost 指向的是容器本身。

在容器内部访问宿主机时需要使用宿主机在局域网内的地址或是注入到容器内部的宿主机地址 host.dpael.local

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 --add-host=host.dpanel.local:host-gateway \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 更新或重建面板

更新与重新安装的区别就在于是否保留面板挂载的目录（/dpanel）的配置。删除宿主机挂载目录或是重新指定目录，则为重建面板。
否则表示升级面板容器[查看面板升级命令](/manual/system-dpanel-upgrade)

## 手动创建文件管理插件 {#create-explorer-plugin}

:::tip
将文件管理容器的标签 com.dpanel.container.auto_remove=true 配置为 true 时，面板会在每次关闭浏览之后自动清理容器，配置为 false 时则不会清理。
:::

```js
docker run -it -d --name dpanel-plugin-explorer --restart always --pid host --label com.dpanel.container.title="dpanel 文件管理助手" --label com.dpanel.container.auto_remove=false alpine
```