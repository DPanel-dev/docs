# 使用 Docker 安装

:::danger
管理容器文件时，面板会自动创建 dpanel-plugin-explorer 容器进行权限隔离。
该容器使用 alpine 镜像，不暴露任何端口，关闭访问页面后自动销毁。
你也可以 [手动创建](/install/docker#create-explorer-plugin)，容器名称需保持为 dpanel-plugin-explorer。
如无法接受自动创建，请勿使用【文件管理】功能。
:::

<br />

###### [:rocket::rocket::rocket: 使用安装脚本可快速安装、升级 DPanel 面板](/install/shell)

<!--@include: ../include/image.md-->

## 标准版

:::warning
#### <span style="color: #cd1f00">后续命令演示均以【标准版】为例，请根据实际安装的版本替换参数及镜像地址。</span>
:::

标准版提供域名绑定及证书功能，需要映射 80 及 443 端口。如不需要这些功能，请使用 Lite 版。
Lite 版与标准版仅镜像地址不同，除无需映射 80 及 443 端口外，其余配置一致。

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

Podman 提供与 Docker 高度兼容的 CLI，将创建命令中的 docker 替换为 podman 即可：

```shell
podman run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /run/podman/podman.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

### Rootless

Podman 支持在非 root 用户下管理容器。创建面板容器前，需先激活普通用户的 podman.sock 会话：

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

## Docker Desktop (Windows / macOS)

通过 `//var/run/docker.sock` 挂载 docker.sock 文件：

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

## 使用 Docker Tcp 管理

使用 [Docker Tcp](/manual/system-env-tcp) 时，创建面板容器无需挂载 /var/run/docker.sock 文件，通过 DOCKER_HOST 环境变量指定接口地址即可。

:::tip
通过 `--add-host` 将宿主机 IP 绑定到容器，否则需使用宿主机在局域网内的 IP。
:::

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 --add-host=host.dpanel.local:host-gateway  \ // [!code focus]
 -e DOCKER_HOST=tcp://host.dpanel.local:2375 \  // [!code focus]
 -v /home/dpanel dpanel/dpanel:latest
```

## 自定义面板管理端口

使用默认命令安装后，通过 `http://127.0.0.1:8807` 访问面板。可自定义 8080 端口的对外映射端口：

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 2456:8080 -e APP_NAME=dpanel \  // [!code focus]
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 使用主机网络 --network host 

使用主机网络时，默认通过 `http://hostip:8080` 访问面板。如需更改端口，添加环境变量 `APP_SERVER_PORT=2456`。
需确保主机端口未被占用（标准版还包含 80 及 443 端口）。

:::warning
使用主机网络时，添加容器域名转发时只能通过 IP:PORT 的形式
:::

```js
docker run -d --name dpanel --restart=always \
 -e APP_NAME=dpanel -e APP_SERVER_PORT=2456 --network host \  // [!code focus]
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 配置面板代理

创建面板时通过环境变量配置容器内代理地址。
如代理地址为宿主机，请勿使用 127.0.0.1 或 localhost（这些地址指向容器本身），应使用宿主机局域网地址：

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -e HTTP_PROXY="http://192.168.1.5:7890" \  // [!code focus] 
 -e HTTPS_PROXY="http://192.168.1.5:7890" \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 自定义面板密钥文件 <Badge type="tip" text="DPanel Version >= 1.8.1" />

面板使用 RSA 算法进行登录验证及 SSH 相关功能，启动时自动生成 RSA 公/私钥文件（仅当文件不存在时），位于 **_/dpanel/cert/rsa_** 目录。

也可将本机的 **_~/.ssh/id_rsa_**、**_~/.ssh/id_rsa.pub_** 文件挂载到面板容器。
添加 SSH 权限时选择【使用面板密钥】，容器即可直接使用宿主机权限，实现权限的统一管理及快速更新：

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
如果 `/dpanel` 挂载的是宿主机目录，Compose 中可以直接使用相对目录；如果 `/dpanel` 使用 Docker 存储卷，则需要通过存储卷 `subpath` 挂载其中的子目录。具体查看[Compose 相对目录](/manual/compose-relative-bind)。
:::

面板运行时产生的数据存储在容器内的 `/dpanel` 目录中。创建时如未挂载该目录，Docker 会自动挂载到存储卷。
可自定义容器内 `/dpanel` 目录的宿主机挂载路径（需使用绝对路径）：


```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/test/dpanel:/dpanel dpanel/dpanel:latest // [!code focus] 
```

## 配置面板管理员用户名密码

创建面板容器后，首次进入需要先配置管理员用户和密码。忘记密码时可[重置用户名密码](/install/ctrl#重置管理员用户)


## 自定义面板容器名称

如需更改面板容器名称或同时安装多个面板，可通过 `APP_NAME` 环境变量配置：

```js
docker run -d --restart=always \ 
 --name dpanel-test -e APP_NAME=dpanel-test \ // [!code focus] 
 -p 80:80 -p 443:443 -p 8807:8080  \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 自定义面板访问二级目录

默认情况下面板访问地址为 **http:\/\/127.0.0.1:8807/dpanel/ui**，你可以通过配置环境变量 **DP_SYSTEM_BASEURL** 指定二级访问目录为 
**http:\/\/127.0.0.1:8807/apps/dpanel/ui**。

:::warning
自定义目录时，需要尽量避免包含 /dpanel、/ws/common、/api 防止重复替换导致路径错误
:::

```js
docker run -d --restart=always \ 
 --name dpanel
 -e DP_SYSTEM_BASEURL=/apps \ // [!code focus] 
 -p 80:80 -p 443:443 -p 8807:8080  \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 绑定宿主机 host {#bind-host}

容器内访问 127.0.0.1 或 localhost 指向容器本身。

访问宿主机时，需使用宿主机在局域网内的地址或注入的宿主机地址 `host.dpanel.local`：

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 --add-host=host.dpanel.local:host-gateway \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 切割日志文件

面板将警告及以上级别的日志写入 `/dpanel/logs/` 目录，运行时日志由 Docker 管理。
为避免日志文件过大，可配置容器日志切割：


```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 --log-driver json-file  --log-opt max-size=5m --log-opt max-file=10 \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 开启 IPV6

如 Docker 环境未配置默认 IPv6 支持，标准版将无法转发 IPv6 地址。可在面板中创建任意 IPv6 网络，并将面板容器加入该网络。


## 禁用安全策略

通过执行 `docker info` 可以查看安全策略：

```
 runc version: v1.1.12-0-g51d5e94
 init version: de40ad0
 Security Options:
  seccomp
   Profile: builtin
 Kernel Version: 4.19.91-27.7.an7.x86_64
```

当系统开启了 `Seccomp` 安全策略后，在更新、重建 DPanel 容器时会出现目录没有权限访问的错误信息。，如下：

```text
disk I/O error: operation not permitted
panic: disk I/O error: operation not permitted
```

通过 `--security-opt` 参数来临时关掉安全策略：

```js
docker run -d --restart=always \ 
 --name dpanel
 --security-opt seccomp=unconfined \ // [!code focus] 
 -p 80:80 -p 443:443 -p 8807:8080  \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 更新或重建面板

更新与重建的区别在于是否保留面板挂载目录（`/dpanel`）的配置。
删除宿主机挂载目录或重新指定目录为重建面板，否则为升级面板[查看升级命令](/manual/system-dpanel-upgrade)。

## 手动创建文件管理插件 {#create-explorer-plugin}

:::tip
将文件管理容器的标签 `com.dpanel.container.auto_remove` 配置为 `true` 时，面板会在每次关闭浏览器后自动清理容器；配置为 `false` 则不清理。
:::

```js
docker run -it -d --name dpanel-plugin-explorer --restart always --pid host --label com.dpanel.container.title="DPanel 文件管理助手" --label com.dpanel.container.auto_remove=false alpine
```
