# 通过 DPanel Desktop 运行

## 介绍

DPanel Desktop 基于 [Wails V3](https://wails.io/) 实现。
本质是一个 CLI 程序管理器，通过 GUI 可视化界面管理主程序的环境变量、运行程序、接管控制台日志输出。

在 Windows 和 macOS 系统中，可不再受 Docker 环境束缚，打开程序即可运行 DPanel 面板。
可简单、快速地使用本地 DPanel 面板的【多服务端功能】管理本地、内网、公网的 Docker 主机。

即开即用，随关随停。实现了对服务器的零侵入和零占用，杜绝了面板产生的任何安全风险。
通过 DPanel Desktop 还可将其他基于 CLI 的程序像 DPanel 一样方便地运行起来。

## 安装

### 下载安装

#### Windows

:::tip
DPanel Desktop Installer 安装包会默认包含 `docker.exe` `docker-compose.exe` 命令
:::

- [DPanel Desktop 安装版](https://cdn.w7.cc/dpanel/release/dpanel-desktop-ce-amd64-installer.exe)
- [DPanel Desktop 绿色版](https://cdn.w7.cc/dpanel/release/dpanel-desktop-ce-amd64-portable.zip)

#### MacOS

:::tip
MacOS 需要自行安装 `docker``docker compose` `docker buildx` 命令
:::

- [DPanel Desktop CE（Apple 芯片）](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-ce-darwin-arm64.app.zip)
- [DPanel Desktop CE（Intel 芯片）](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-ce-darwin-amd64.app.zip)
- [DPanel Desktop PE（Apple 芯片）](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-pe-darwin-arm64.app.zip)
- [DPanel Desktop PE（Intel 芯片）](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-pe-darwin-amd64.app.zip)

### Homebrew

```shell
brew tap DPanel-dev/homebrew https://github.com/DPanel-dev/homebrew.git && brew trust DPanel-dev/homebrew
```

:::code-group

```shell [社区版]
brew install --cask DPanel-dev/homebrew/dpanel 
```

```shell [专业版]
brew install --cask DPanel-dev/homebrew/dpanel-pe
```
:::

### Scoop

```shell
scoop bucket add extras
```

:::code-group

```shell [社区版]
scoop install extras/dpanel
```

```shell [专业版]
scoop install extras/dpanel-pe
```
:::

## 数据

运行时的数据存放于 `${DP_HOME_DIR}/dpanel` 目录中，默认情况此环境变量指向 `/用户目录/.dpanel/` 目录，目录下包含程序运行的配置文件 `setting.json` 。

Windows 的便携绿色版，则会将 `${DP_HOME_DIR}` 此环境变量指向到程序的运行目录中。

### setting.json

:::tip
你也可以参考 `DPanel` 程序的配置扩展使用其它 `CLI` 程序
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
      },
    ],
    "System": {
      "CloseWindowHide": true,
      "Theme": "light",
      "Language": "auto"
    }
}
```

## 预览

![desktop-1](https://cdn.w7.cc/dpanel/system-desktop-1.png){data-zoomable}

![desktop-1](https://cdn.w7.cc/dpanel/system-desktop-2.png){data-zoomable}

## 依赖

### WebView2

:::warning
低于 Windows 10 的系统无法使用 DPanel Desktop。
:::

Windows 10 及以上版本默认会安装 WebView2 运行时，如系统未包含相关组件，请通过 [Microsoft Edge WebView2](https://developer.microsoft.com/zh-cn/Microsoft-edge/webview2) 下载。

### Docker CLI、Compose 与 Buildx

#### Windows

DPanel 的 Docker 功能需要 Docker CLI、Compose 和 Buildx。Windows 安装包已包含 `docker.exe` 和 `docker-compose.exe`；如未安装 Docker Desktop，还需从 [Buildx Releases](https://github.com/docker/buildx/releases) 安装 Buildx 插件。需要单独下载客户端时，可使用 [Docker CLI](https://download.docker.com/win/static/stable/x86_64/) 和 [Compose Releases](https://github.com/docker/compose/releases)。


#### MacOS

可通过 Homebrew 安装：

```shell
brew install docker docker-compose docker-buildx
```

