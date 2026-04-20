# 使用安装程序

DPanel 安装器支持两种使用模式。

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

## 使用方式

### TUI 向导模式

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

### CLI 命令模式

`CLI` 模式通过 `install`、`upgrade`、`uninstall` 子命令使用。

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

- `--dry-run`：仅解析最终执行配置并写入 `run.log`
- `--progress plain|quiet`：输出进度模式
- `-y, --yes`：自动确认提示
- `-h, --help`：查看帮助
- `-v, --version`：查看版本

### install

- `--name`：实例名称，默认 `dpanel`
- `--type`：安装方式，`container` 或 `binary`
- `--version`：版本，`ce`、`pe`、`be`
- `--edition`：版本类型，`standard` 或 `lite`
- `--data-path`：数据目录
- `--server-host`：服务绑定地址
- `--server-port`：服务端口，`0` 表示随机端口
- `--docker-sock`：Docker Socket 路径
- `--dns`：DNS 地址
- `--proxy`：代理地址
- `--base-image`：基础镜像系统，`alpine`、`debian`、`darwin`、`windows`

示例：

```shell
dpanel-installer install --name dpanel --type container --version ce --edition lite
```

### upgrade

- `--name`：实例名称，必填
- `--version`：更新后的版本，`ce`、`pe`、`be`
- `--edition`：更新后的版本类型，`standard` 或 `lite`
- `--data-path`：已有安装目录
- `--docker-sock`：Docker Socket 路径
- `--dns`：覆盖原有 DNS 配置
- `--proxy`：覆盖原有代理配置
- `--disable-backup`：更新前不备份

示例：

```shell
dpanel-installer upgrade --name dpanel
```

### uninstall

- `--name`：实例名称，必填
- `--data-path`：已有安装目录
- `--docker-sock`：Docker Socket 路径
- `--remove-data`：同时删除数据目录

示例：

```shell
dpanel-installer uninstall --name dpanel --remove-data
```

## 配置文件

安装器默认保存在 `~/.dpanel/installer` 目录中。运行安装器后会生成默认的 `config.yaml` 配置文件，
主要用于在安装面板时自定义或扩展一些环境变量，示例如下：

```yaml
settings:
  # Installer theme: 1-5
  theme: 1
  # Installer log file path, supports $SETTING_LOG_PATH or ${SETTING_LOG_PATH-./run.log}
  log_path: ${SETTING_LOG_PATH-./run.log}

install:
  # HTTP proxy used by binary runtime and container environment
  HTTP_PROXY: ""
  # HTTPS proxy used by binary runtime and container environment
  HTTPS_PROXY: ""
  # Custom DNS server passed to DPanel runtime
  DP_DNS: ""
  # Console log level, e.g. info or debug
  DP_LOG_CONSOLE_LEVEL: ""
  # File log level, e.g. warn or debug
  DP_LOG_FILE_LEVEL: ""
  # Public base URL used by DPanel runtime
  DP_SYSTEM_BASEURL: ""
  # SQLite open mode, e.g. ro rw rwc
  DP_DB_MODE: ""
  # SQLite journal mode, e.g. DELETE or WAL
  DP_DB_JOURNAL: ""
  # Custom acme command path
  DP_ACME_COMMAND_NAME: ""
  # Custom acme config directory
  DP_ACME_CONFIG_HOME: ""

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
