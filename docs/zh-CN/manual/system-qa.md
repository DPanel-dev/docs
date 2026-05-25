# 常见问题

### docker hub 拉取失败

##### 错误信息

```
Retrying in3 seconds

download failed after attempts=6: dial tp 108.160.170.44:443: connect: connection refused
```

- 请开启魔法
- 使用国内镜像源，DPanel 的国内镜像地址为 ccr.ccs.tencentyun.com/dpanel/dpanel:latest

### 无法启动 DPanel 

##### 错误信息

```
Error starting userland
proxy: listen tcp4 0.0.0.0:80: bind: address already in us
```

- 服务器安装过类似于宝塔之类的管理软件，占用了 80 端口。部署时更换端口，例如：-p 880:80 -p 8443:443。
- 去掉绑定 80 及 443 的配置。

### 提示 dpanel-local 网络已存在

##### 错误信息

```
network dpanel-local was found but has incorrect label com.docker.compose.network set to ""
```

- 删掉 `dpanel-local` 网络：`docker network rm dpanel-local`