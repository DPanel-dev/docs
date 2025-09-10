# 多服务端管理

DPanel 支持同时管理多个 Docker、Podman 服务端，支持 Sock 文件、Api、SSH 多种形式添加。

## 添加环境

【系统】- 【多服务端】-【添加服务端】。

![system-docker-env-add.png](https://cdn.w7.cc/dpanel/system-docker-env-add.png?t=7){data-zoomable}

### 通过 Api 添加

使用 Api 添加服务端时，需要先[开启 Docker Tcp 连接](/manual/system-env-tcp)，如果添加的是公网地址，必须同时开启 TLS 连接。
填入 Docker Api 地址，例如：

```
tcp://192.168.0.5:2375
```

### 通过 SSH 添加 {#ssh}

使用主机 SSH 权限管理远程 Docker 服务端可以避免繁琐的配置证书的过程。
配置权限时请使用 ROOT 用户或是具有 Docker 权限的普通用户

#### 新建用户

:::code-group
```shell [新建 dpanel 用户]
sudo useradd -m -G sudo,docker dpanel
```
:::

:::code-group
```shell [配置 dpanel 用户密码]
sudo passwd dpanel
```
:::

#### 已存在用户附加权限

:::code-group
```shell [追加 dpanel 用户权限]
sudo usermod -aG docker dpanel
```

```js [编辑/etc/group文件]
... 其它组信息 ...
docker:x:994:test1,dpanel // [!code focus] 
... 其它组信息 ...
```
:::

#### 验证权限

切换至目标用户并执行一条 docker 命令，正常输出即表示添加成功。

``` shell
docker ps
```

## 切换不同的环境

通过顶部菜单切换不同的 Docker 客户端

## 启用独立 Compose 目录 {#enable-compose-path}

启用独立 Compose 目录后，挂载的 Compose 任务文件只会显示当前服务端的私有任务，存放的目录为：

```shell
/dpanel/compose-服务端标识
```

## 配置默认服务端 {#setting-default-env}

当创建面板容器时未指定 /var/run/docker.sock 文件或是默认环境为远程服务端。
可以通过修改默认服务端（标识为 local）更改连接参数。

当默认服务端无法连接时，可以通过【概览】-【配置默认 Docker 客户端】来修改默认服务端。

![system-docker-env-default.png](https://cdn.w7.cc/dpanel/system-docker-env-default.png)

## 配置服务端访问 ip {#server-url}

默认情况下面板会自动获取当前浏览器的地址或是当前服务端的连接参数自动拼接端口访问地址。
如果你想更改端口访问地址，通过配置【容器端口访问域名】自定义访问地址。

## 版本一致

添加远程 Docker 服务端时，接口会最大限度的协调接口版本，但是如果出现以下错误信息，则表示接口版本无法匹配，
请及时升级 Docker 版本。

:::code-group
```shell [版本不匹配错误信息]
Docker 服务端连接失败，请升级目标
Docker 版本 Error response from daemon: client version 1.48 is too new. Maximum
supported API version is 1.43
```
:::

### 查看 Docker 版本

```shell
docker version
```

:::tip 
API version 表示服务端支持的 API 的版本，此版与 DPanel 概览页中的 Docker SDK 不能相差过大
:::

:::code-group
```js [输出]
Client: Docker Engine - Community 
 Version:           27.5.1
 API version:       1.47 // [!code error]
 Go version:        go1.22.11
 Git commit:        9f9e405
 Built:             Wed Jan 22 13:41:17 2025
 OS/Arch:           linux/amd64
 Context:           default

Server: Docker Engine - Community
 Engine:
  Version:          27.5.1
  API version:      1.47 (minimum version 1.24) // [!code error]
  Go version:       go1.22.11
  Git commit:       4c9b3b0
  Built:            Wed Jan 22 13:41:17 2025
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.7.25
  GitCommit:        bcc810d6b9066471b0b6fa75f557a15a1cbf31bb
 runc:
  Version:          1.2.4
  GitCommit:        v1.2.4-0-g6c52b3f
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```
:::

