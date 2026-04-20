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
Invoke-WebRequest https://dpanel.cc/quick.ps1 -OutFile quick.ps1
Set-ExecutionPolicy -Scope Process Bypass
.\quick.ps1
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

### CLI Invocation

If you want to use `CLI` mode directly, append installer arguments after `quick.sh`:

```shell
curl -sSL https://dpanel.cc/quick.sh | sudo bash -s -- --help
```

```shell
curl -sSL https://dpanel.cc/quick.sh | sudo bash -s -- install --name dpanel --type container --version ce --edition lite
```

You can also invoke `CLI` directly through the container:

```shell
docker run --rm -it --pull always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  registry.cn-hangzhou.aliyuncs.com/dpanel/installer:latest --help
```

```shell
docker run --rm -it --pull always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  registry.cn-hangzhou.aliyuncs.com/dpanel/installer:latest install --name dpanel --type container --version ce --edition lite
```

## Usage Modes

### TUI Wizard Mode

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

### CLI Command Mode

`CLI` mode uses the `install`, `upgrade`, and `uninstall` subcommands.

Global flags:

- `--dry-run`: resolve the final execution config and write it to `run.log` without executing
- `--progress plain|quiet`: progress output mode
- `-y, --yes`: auto-confirm prompts
- `-h, --help`: show help
- `-v, --version`: show version

### install

- `--name`: instance name, default `dpanel`
- `--type`: install type, `container` or `binary`
- `--version`: version, `ce`, `pe`, `be`
- `--edition`: edition, `standard` or `lite`
- `--data-path`: data directory
- `--server-host`: server bind host
- `--server-port`: server port, `0` means random
- `--docker-sock`: Docker socket path
- `--dns`: DNS address
- `--proxy`: proxy address
- `--base-image`: base image system, `alpine`, `debian`, `darwin`, `windows`

Example:

```shell
dpanel-installer install --name dpanel --type container --version ce --edition lite
```

### upgrade

- `--name`: instance name, required
- `--version`: target version, `ce`, `pe`, `be`
- `--edition`: target edition, `standard` or `lite`
- `--data-path`: existing install directory
- `--docker-sock`: Docker socket path
- `--dns`: override existing DNS config
- `--proxy`: override existing proxy config
- `--disable-backup`: skip backup before upgrade

Example:

```shell
dpanel-installer upgrade --name dpanel
```

### uninstall

- `--name`: instance name, required
- `--data-path`: existing install directory
- `--docker-sock`: Docker socket path
- `--remove-data`: remove the data directory too

Example:

```shell
dpanel-installer uninstall --name dpanel --remove-data
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

![install-1](https://cdn.w7.cc/dpanel/install-1.png?t=1)
