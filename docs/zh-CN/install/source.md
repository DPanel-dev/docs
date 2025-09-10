# 使用二进制文件安装

:::tip 
通过二进制包运行 DPanel 等价于 Lite 版，不包含域名转发等相关功能

推荐你使用容器的方式创建面板更具有兼容性。
:::

## 下载二进制文件

通过 [Release](https://github.com/donknap/dpanel/releases) 页面下载已经打包好的二进制文件

### 适用于 Ubuntu Centos Debian 等主流发行版

- dpanel-amd64 
- dpanel-arm
- dpanel-arm64

### 适用于 Apline 等使用 Musl 的发行版 
- dpanel-musl-amd64
- dpanel-musl-arm64
- dpanel-musl-arm

### 适用于 MacOS 

- dpanel-darwin-ARM64
- dpanel-darwin-X64

### 适用于群晖

- dpanel-synology-arm64 
- dpanel-synology-amd64 

### 适用于 Windows

- dpanel.exe 

## 手动编译

如果你当前使用的系统并不适用以上的二进制文件，你可以通过源码自行编译二进制包。

### 环境要求

- Go Version >= 1.23
- 请确保已经正确安装 Libc or Musl，并将 CC CXX 配置到环境变量中
- Windows 系统需要安装 [MinGW](https://winlibs.com/#download-release) 

:::tip
编译源码前，请确保你已经有了 go 语言的运行环境，通过 go version 查看环境版本
:::

```
go version
```

:::details 输出
go version go1.23.4 linux/amd64 或是 go version go1.23.4 windows/amd64
:::


### 下载源码并切至源码目录

```shell
git clone --depth 1 https://github.com/donknap/dpanel.git && cd dpanel
```

### 使用 make 命令编译 

> 1.5.0 替换为实际的版本号，会在首页系统信息中显示

```shell
make build PROJECT_NAME=dpanel CGO_ENABLED=1 VERSION=1.5.0
```

### 使用 go build 编译 

::: code-group

```shell [Linux]
CGO_ENABLED=1 go build -ldflags '-X main.DPanelVersion=1.5.0 -s -w' -o runtime/dpanel
```
```shell [Windows]
set CGO_ENABLED=1
go build -ldflags '-X main.DPanelVersion=1.5.0 -s -w' -o runtime/dpanel.exe
```

:::

## 运行

通过二进制运行 DPanel 面板时，会自动连接当前默认的的 Docker 服务端。
在 Linux 系统下为 /var/run/docker.sock，在 Windows 下为 //./pipe/docker_engine。

通过修改[配置参数](/install/params)个性化运行参数

::: code-group

```shell [Linux]
chmod 755 ./runtime/dpanel
./runtime/dpanel server:start -f config.yaml
```

```shell [Window]
 .\dpanel.exe server:start -f .\config.yaml
```
:::

## 当前环境未安装 Docker

如果当前运行系统中并未安装 Docker，在启动面板后，可以通过 [多服务端管理](/manual/system-env) 功能配置默认管理远程 Docker 服务端。

### 依赖 docker-cli 命令

DPanel 部分功能依赖于 docker、docker compose (docker-compose) 命令。
如果你未安装 Docker 服务端时需要手动安装 Docker 客户端组件, 根据使用的系统 [添加 Docker 软件源](https://docs.docker.com/engine/install/debian/)。

安装 docker-cli 客户端命令组件。

:::tip
Windows 系统，你可以在 WSL 子系统下执行以下命令。面板会自动识别，通过 WSL 调用相关命令。
:::

:::code-group
```shell [Debian]
sudo apt install docker-ce-cli docker-compose-plugin
```
:::