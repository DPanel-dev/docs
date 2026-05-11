# 使用安装程序

DPanel 安装器支持安装、更新、卸载三类操作。

安装器有两种**运行方式**：

- 通过脚本运行（`quick.sh` / `quick.ps1`）
- 通过容器运行（`docker run`）

安装器有两种**工作模式**：

- `TUI` 向导模式：通过交互界面安装面板，并支持获取已安装列表进行更新或卸载。
- `CLI` 命令模式：适合无人值守或集成场景。

## 获取方式

### 通过脚本获取

:::danger 使用依赖
Linux / macOS 运行 `quick.sh` 前请确保系统已安装 `bash`、`curl`、`tar`、`gzip` 命令。
Windows 运行 `quick.ps1` 前请确保系统已安装 `PowerShell`、`tar` 命令。
运行安装程序前，请确保当前用户具有 Docker 操作权限，可正常访问 Docker Socket。
:::

:::code-group

```shell [Linux / macOS]
curl -sSL https://dpanel.cc/quick.sh | bash
```

```shell [Linux / macOS Root]
curl -sSL https://dpanel.cc/quick.sh | sudo bash
```

```powershell [Windows]
powershell -ExecutionPolicy Bypass -Command "iwr -useb https://dpanel.cc/quick.ps1 | iex"
```

```shell [旧版安装脚本]
curl -sSL https://dpanel.cc/quick-v1.sh | bash
```
:::

### 通过容器获取

如当前环境已经具备 Docker，也可以直接通过镜像启动安装程序。

:::code-group

```shell [Hub 镜像]
docker run --rm -it --pull always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  dpanel/installer:latest
```

```shell [阿里云镜像]
docker run --rm -it --pull always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  registry.cn-hangzhou.aliyuncs.com/dpanel/installer:latest
```
:::

## TUI 向导模式

安装器默认进入 `TUI` 模式，按照步骤提示操作即可。
`TUI` 模式支持安装、更新、卸载、安装 Docker Engine、生成 Docker Api TLS 证书等功能。

### 安装 Docker Engine

:::tip
如需使用 Podman 作为容器管理客户端，或在 Windows 环境中使用 Docker Desktop，请在运行安装程序前自行安装。
:::

安装器使用 `https://linuxmirrors.cn/docker.sh` 集成脚本安装 Docker Engine 和 Docker Compose。
并支持配置 Docker 加速源。

### 生成 Docker Api TLS 证书

生成 TLS 证书前需要在 `config.yaml` 中配置证书域名和密码。生成完成后可根据 [开启 Docker TCP 远程连接](/manual/system-env-tcp) 配置证书。

## CLI 命令模式

`CLI` 模式通过 `install`、`upgrade`、`uninstall` 子命令使用，只需要在 `TUI` 模式后面增加参数即可。

:::code-group

```shell
curl -sSL https://dpanel.cc/quick.sh | bash -s -- install --help
```

```shell [Hub 镜像]
docker run --rm -it --pull always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  dpanel/installer:latest install --help
```
:::

全局参数：

- `-y, --yes`：自动确认提示
- `-v, --version`：查看版本
- `--progress`：输出模式，`plain`（默认）或 `quiet`
- `-d, --detach`：以后台任务模式执行当前命令

### install

- `--name`：实例名称（必填）
- `--data-path`：数据目录（必填）。`container` 模式为挂载目录，`binary` 模式为安装存储目录
- `--type`：安装方式，`container`、`binary`。未指定时自动检测 Docker 可用性后决定
- `--version`：版本，`ce` 社区版、`pe` 专业版
- `--edition`：版本类型，`standard` 标准版、`lite` 精简版
- `--dev`：使用开发版
- `--base-image`：`container` 模式下指定基础镜像系统，`alpine`、`debian`
- `--network-mode`：容器网络模式，`bridge`、`host`
- `--server-host`：服务绑定地址
- `--server-port`：服务端口，`0` 表示随机端口
- `--docker-sock`：Docker Socket 路径（本地连接）
- `--dns`：DNS 地址
- `--proxy`：代理地址（同时用于 HTTP/HTTPS）
- `--base-url`：面板访问前缀路径，例如 `/dpanel`
- `--log-level`：日志级别，`info` 或 `debug`

:::tip
如果检测到同名已安装实例，安装器会自动切换到 `upgrade` 流程。
:::

示例：

```shell
curl -sSL https://dpanel.cc/quick.sh | bash -s -- install --name dpanel --data-path /home/dpanel --type container
```

### upgrade

#### 原样升级

用于保持现有配置不变，只执行升级：

- `--name`：必填
- `--data-path`：按需指定（仅在默认自动发现找不到实例时需要）

```shell
curl -sSL https://dpanel.cc/quick.sh | bash -s -- upgrade --name dpanel
```

#### 修改升级参数

用于在升级时覆盖部分现有配置：

- `--name`：必填
- `--data-path`：按需指定（自动发现失败时使用）
- 可覆盖参数：
  - 版本与镜像：`--version`、`--edition`、`--dev`、`--base-image`
  - 运行与网络：`--network-mode`、`--dns`、`--proxy`、`--base-url`、`--log-level`
  - 升级行为：`--backup`
  - 连接与发现辅助：`--docker-sock`、`--data-path`

```shell
curl -sSL https://dpanel.cc/quick.sh | bash -s -- upgrade --name dpanel --version ce --edition standard --network-mode bridge --backup
```

### uninstall

- `--name`：指定要卸载的实例名称（必填）
- `--remove-data`：同时删除数据目录
- `--data-path`：自动发现失败时指定已有安装目录
- `--docker-sock`：Docker Socket 路径（本地连接）

:::warning
`--remove-data` 会删除数据目录，删除后不可恢复。
:::

示例：

```shell
curl -sSL https://dpanel.cc/quick.sh | bash -s -- uninstall --name dpanel --remove-data
```

## 配置文件

安装器会在可执行文件同目录生成并读取 `config.yaml`。
主要用于在安装面板时自定义或扩展一些环境变量，示例如下：

```yaml
settings:
  # Installer theme: 1-5
  theme: 1
  # Installer log file path, supports $SETTING_LOG_PATH or ${SETTING_LOG_PATH-./run.log}
  log_path: ${SETTING_LOG_PATH-./run.log}

env:
  # Extra env vars only. Do not put installer-managed keys (APP_*, DP_* managed by UI/CLI) here.

script:
  install_docker:
    # Registry mirrors used by install_docker.sh
    DOCKER_REGISTRY_ADDRESS: docker.1ms.run,docker.1panel.live,docker.m.daocloud.io

  generate_docker_tls:
    # Required when generating Docker TLS certificates
    GENERATE_DOCKER_TLS_IP: ""
    # Optional passphrase for CA private key
    GENERATE_DOCKER_TLS_PASSWORD: ""
```

## 预览

![install-1](https://cdn.w7.cc/dpanel/install-2.png?t=1)
