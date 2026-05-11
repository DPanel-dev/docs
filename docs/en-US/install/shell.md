# Use Installer

DPanel Installer supports two usage modes.

- `TUI` wizard mode: install DPanel through an interactive interface, and discover installed instances for upgrade or uninstall.
- `CLI` command mode: suitable for unattended or integration scenarios.

## How to Get It

### Get via Script

:::danger Requirements
Before running `quick.sh` on Linux or macOS, make sure the system contains `bash`, `curl`, `tar`, and `gzip`.
Before running `quick.ps1` on Windows, make sure the system contains `PowerShell` and `tar`.
Before running the installer, make sure the current user has Docker access and can access the Docker socket.
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

```shell [Legacy Script]
curl -sSL https://dpanel.cc/quick-v1.sh | bash
```
:::

### Get via Container

If Docker is already available in the environment, you can start the installer directly from the image.

:::code-group

```shell [Docker Hub]
docker run --rm -it --pull always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  dpanel/installer:latest
```

```shell [Aliyun Registry]
docker run --rm -it --pull always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  registry.cn-hangzhou.aliyuncs.com/dpanel/installer:latest
```
:::

## TUI Wizard Mode

The installer enters `TUI` mode by default. Follow the prompts to complete the operation.
`TUI` mode supports install, upgrade, uninstall, Docker Engine install, and Docker API TLS certificate generation.

### Install Docker Engine

:::tip
If you want to use Podman as the container management client, or use Docker Desktop on Windows, install it before running the installer.
:::

The installer uses the integrated script at `https://linuxmirrors.cn/docker.sh` to install Docker Engine and Docker Compose.
It also supports configuring Docker registry mirrors.

### Generate Docker API TLS Certificate

Before generating TLS certificates, configure the domain name and password in `config.yaml`.
After generation, configure the certificates according to [Protect the Docker daemon socket](https://docs.docker.com/engine/security/protect-access/).

## CLI Command Mode

`CLI` mode uses the `install`, `upgrade`, and `uninstall` subcommands, just append parameters after the `TUI` mode command.

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

Global flags:

- `-y, --yes`: auto-confirm prompts
- `-v, --version`: show version
- `--progress`: output mode, `plain` (default) or `quiet`
- `-d, --detach`: run the current command in detached mode

### install

- `--name`: instance name (required)
- `--data-path`: data path (required). In `container` mode, this is the bind mount directory; in `binary` mode, this is the install storage directory
- `--type`: install type, `container` or `binary`. If omitted, it is auto-detected based on Docker availability
- `--version`: version, `ce` community edition, `pe` professional edition
- `--edition`: edition, `standard` or `lite`
- `--dev`: use development version
- `--base-image`: base image system in `container` mode, `alpine`, `debian`
- `--network-mode`: container network mode, `bridge` or `host`
- `--server-host`: server bind host
- `--server-port`: server port, `0` means random
- `--docker-sock`: Docker socket path (local connection)
- `--dns`: DNS address
- `--proxy`: proxy address (used for both HTTP and HTTPS)
- `--base-url`: panel base URL path prefix, e.g. `/dpanel`
- `--log-level`: log level, `info` or `debug`

Example:

```shell
curl -sSL https://dpanel.cc/quick.sh | bash -s -- install --name dpanel --data-path /home/dpanel --type container
```

### upgrade

#### In-place upgrade

Use this when you want to keep current settings and only upgrade the instance:

- `--name` is required
- `--data-path` is optional (only needed when default discovery cannot find the instance)

```shell
curl -sSL https://dpanel.cc/quick.sh | bash -s -- upgrade --name dpanel
```

#### Upgrade with changed parameters

Use this when you want to override part of the existing settings during upgrade:

- `--name` is required
- `--data-path` is optional (use it when discovery fails)
- You can override these settings during upgrade:
  - version/image selection: `--version`, `--edition`, `--dev`, `--base-image`
  - runtime/network settings: `--network-mode`, `--dns`, `--proxy`, `--base-url`, `--log-level`
  - upgrade behavior: `--backup`
  - connection/discovery assistance: `--docker-sock`, `--data-path`

```shell
curl -sSL https://dpanel.cc/quick.sh | bash -s -- upgrade --name dpanel --version ce --edition standard --network-mode bridge --backup
```

### uninstall

- `--name`: instance name to uninstall (required)
- `--remove-data`: remove the data directory too
- `--data-path`: existing install directory when auto-discovery fails
- `--docker-sock`: Docker socket path (local connection)

Example:

```shell
curl -sSL https://dpanel.cc/quick.sh | bash -s -- uninstall --name dpanel --remove-data
```

## Configuration File

The installer is stored under `~/.dpanel/installer` by default. After running the installer, a default `config.yaml` file is generated.
It is mainly used to customize or extend environment variables during installation. Example:

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

## Preview

![install-1](https://cdn.w7.cc/dpanel/install-2.png?t=1)
