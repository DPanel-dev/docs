# 使用群晖套件安装

你可以在在群晖的 `套件中心` 中，手动上传 spk 文件安装或是更新 DPanel。

![synology-1](https://cdn.w7.cc/dpanel/synology-1.png?t=1)

### 离线包下载地址

- [amd64](https://github.com/donknap/dpanel/releases/latest/download/dpanel-amd64.spk)
- [arm64](https://github.com/donknap/dpanel/releases/latest/download/dpanel-arm64.spk)
- [更多](https://github.com/donknap/dpanel/releases)

## Docker 授权

由于 `群晖` <Badge type="tip" text="Version >= 7.4" /> 禁用了三方应用的 Root 权限，所以 DPanel 是在普通用户下运行，
待面板启动后，需要管理员授权面板访问本机 Docker，复制下方命令在 SSH 中执行。

```
sudo sh -c 'chgrp dpanel /var/run/docker.sock && chmod 660 /var/run/docker.sock'
```

### 开启群晖终端

![synology-2](https://cdn.w7.cc/dpanel/synology-2.png?t=1)

### 登录 SSH & 执行命令

:::tip
Windows 中使用 `powershell`，MacOS 中使用 `终端`
:::

![synology-3](https://cdn.w7.cc/dpanel/synology-3.gif?t=1)

## 使用群晖反向代理

在安装面板的时候可以配置 `访问方式` 为 `直连访问` 和 `反代访问`。直连访问会将面板端口暴露在群晖主机 IP，你可以直接通过 `http://ip:port` 的形式访问面板。

反代访问则需要你在群晖中配置 `反向代理` 来访问面板，此时不能直连 DPanel 的服务端口，应访问反代规则配置的来源地址。

### 配置反向代理

| 分组 | 配置 |
| --- | --- |
| 来源 | 访问代理名称：dpanel |
| - | 协议：如果开启 HTTPS，则选 HTTPS，否则选 HTTP |
| - | 端口：配置外部访问的端口，比如 5002 |
| 目的地 | 协议：HTTP |
| - | 主机名：127.0.0.1 |
| - | 端口：安装面板时配置的端口 |
| 自定义标题 | 新增 WebSocket |
| 高级设置 | 配置代理服务器读取超时：3600 |

![synology-proxy-1](https://cdn.w7.cc/dpanel/synology-proxy-1.png?t=1)

![synology-proxy-1](https://cdn.w7.cc/dpanel/synology-proxy-2.png?t=1)

## 将群晖做为远程主机管理

除了安装套件外，你还可以把通过 [多服务端管理](/manual/system-env) 将群晖做为远程主机来管理。
在添加前同样需要先 `开启群晖终端` 并授权用户可以访问本机 Docker。

登录 SSH 并执行以下命令后，使用 `SSH` 的方式添加群晖主机即可。

```
sudo sh -c "synogroup --add dpanel && chgrp dpanel /var/run/docker.sock && chmod 660 /var/run/docker.sock'"
```

```
sudo synogroup --memberadd dpanel "$(id -un)"
```