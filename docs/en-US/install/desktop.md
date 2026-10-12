# Run with DPanel Desktop

## Introduction

DPanel Desktop is built with [Wails V3](https://wails.io/).
It is a CLI program manager with a GUI for configuring the main program's environment variables, running programs, and viewing console logs.

On Windows and macOS, you can open the app to run DPanel without a local Docker environment.

The local DPanel panel's multi-server feature lets you manage Docker hosts on your machine, local network, or the internet.

Start it when you need it and stop it when you are done. It does not need to be installed on the servers you manage or consume their resources, avoiding security risks from running the panel on those servers.

You can also use DPanel Desktop to run other CLI programs in the same way.

## Installation

### Download and install

#### Windows

:::tip
The DPanel Desktop Installer includes the `docker.exe` and `docker-compose.exe` commands.
:::

- [DPanel Desktop Installer](https://cdn.w7.cc/dpanel/release/dpanel-desktop-ce-amd64-installer.exe)
- [DPanel Desktop Portable](https://cdn.w7.cc/dpanel/release/dpanel-desktop-ce-amd64-portable.zip)

#### macOS

:::tip
On macOS, install the `docker`, `docker compose`, and `docker buildx` commands yourself.
:::

- [DPanel Desktop CE (Apple silicon)](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-ce-darwin-arm64.app.zip)
- [DPanel Desktop CE (Intel)](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-ce-darwin-amd64.app.zip)
- [DPanel Desktop PE (Apple silicon)](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-pe-darwin-arm64.app.zip)
- [DPanel Desktop PE (Intel)](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-pe-darwin-amd64.app.zip)

### Homebrew

```shell
brew tap DPanel-dev/homebrew https://github.com/DPanel-dev/homebrew.git && brew trust DPanel-dev/homebrew
```

:::code-group

```shell [Community Edition]
brew install --cask DPanel-dev/homebrew/dpanel
```

```shell [Professional Edition]
brew install --cask DPanel-dev/homebrew/dpanel-pe
```
:::

### Scoop

```shell
scoop bucket add extras
```

:::code-group

```shell [Community Edition]
scoop install extras/dpanel
```

```shell [Professional Edition]
scoop install extras/dpanel-pe
```
:::

## Data

Runtime data is stored in `${DP_HOME_DIR}/dpanel`. By default, `DP_HOME_DIR` points to `~/.dpanel` in the user's home directory, which also contains `setting.json`.

For the Windows portable package, `DP_HOME_DIR` points into the application directory.

### setting.json

:::tip
You can use the DPanel configuration as a reference to add other CLI programs.
:::

```json
{
  "Apps": [
      {
        "HomeUrl": "${DP_HOME_URL}:${APP_SERVER_PORT}",
        "Name": "dpanel",
        "RunOption": {
          "AutoLaunch": true,
          "Environment": [
            "APP_SERVER_PORT=9999",
            "DP_SYSTEM_STORAGE_LOCAL_PATH=${DP_HOME_DIR}/dpanel",
            "DP_HOME_URL=http://127.0.0.1"
          ],
          "LogMaxLine": 1000,
          "StartCommand": "./dpanel server:start",
          "StopCommand": "",
          "WorkDir": "./apps/dpanel"
        },
        "Setting": {
          "Environment": {
            "APP_SERVER_PORT": {
              "Description": {
                "zh-CN": "服务运行端口",
                "en-US": "Service port"
              }
            },
            "DP_HOME_URL": {
              "Description": {
                "zh-CN": "访问地址",
                "en-US": "Access address"
              }
            },
            "DP_SYSTEM_STORAGE_LOCAL_PATH": {
              "Description": {
                "zh-CN": "数据存储目录",
                "en-US": "Data storage directory"
              },
              "Help": {
                "zh-CN": "数据存储目录为 ${DP_HOME_DIR}/dpanel；如需更改，请在启动桌面程序前设置 DP_HOME_DIR 环境变量。",
                "en-US": "Data is stored in ${DP_HOME_DIR}/dpanel. To change it, set DP_HOME_DIR before starting the desktop app."
              },
              "Disabled": true
            }
          }
        }
      }
    ],
    "System": {
      "CloseWindowHide": true,
      "Theme": "light",
      "Language": "auto"
    }
}
```

## Preview

![desktop-1](https://cdn.w7.cc/dpanel/system-desktop-1.png){data-zoomable}

![desktop-1](https://cdn.w7.cc/dpanel/system-desktop-2.png){data-zoomable}

## Dependencies

### WebView2

:::warning
DPanel Desktop cannot be used on systems earlier than Windows 10.
:::

The webview2 runtime is installed by default on Windows 10 and above. If your system does not include the relevant components, download it through [Microsoft Edge WebView2](https://developer.microsoft.com/zh-cn/Microsoft-edge/webview2).

### Docker CLI, Compose, and Buildx

#### Windows

DPanel's Docker features require Docker CLI, Compose, and Buildx. The Windows installer includes `docker.exe` and `docker-compose.exe`. If Docker Desktop is not installed, install the Buildx plugin from [Buildx Releases](https://github.com/docker/buildx/releases). You can download the other clients separately from [Docker CLI](https://download.docker.com/win/static/stable/x86_64/) and [Compose Releases](https://github.com/docker/compose/releases).

#### macOS

You can install them with Homebrew:

```shell
brew install docker docker-compose docker-buildx
```
