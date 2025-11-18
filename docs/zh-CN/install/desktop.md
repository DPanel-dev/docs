# 通过 DPanel Desktop 运行

## 介绍

DPanel Desktop 基于 [Wails](https://wails.io/) 实现。
本质上是一个 CLI 程序管理器，通过 GUI 可视化的界面，管理主程序的环境变量、运行程序、接管控制台日志输出。

在 Windows 系统中，可以不再受到 Docker 环境的束缚，双击程序就可以运行 DPanel 面板。
可以简单、快速的使用本地的 DPanel 面板的【多服务端功能】管理本地、内网、公网的 Docker 主机。

即开即用，随关随停。实现了对服务器的零侵入和零占用，杜绝了面板产生的任何安全风险。

通过 DPanel Desktop 你还可以将其它基于 CLI 的程序像是 DPanel 一样方便的运行起来。

## 下载地址

:::tip
DPanel Desktop Installer 安装包会默认包含 dpanel.exe、 docker.exe 及 docker-compose.exe。
:::

- [DPanel Desktop Installer (Github 下载)](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-amd64-installer.exe)
- [DPanel Desktop Installer (官网下载)](https://dpanel.cc/download/dpanel-desktop-amd64-installer.exe)
- [DPanel Desktop](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop.exe)

## 预览

![desktop-1](https://cdn.w7.cc/dpanel/system-desktop-1.png){data-zoomable}

![desktop-1](https://cdn.w7.cc/dpanel/system-desktop-2.png){data-zoomable}

## 依赖

### WebView2

:::warning
低于 Windows10 的系统无法使用 DPanel Desktop。
:::

Windows 10 及以上默认会安装 webview2 运行时，如果你的系统未包含相关组件通过 [Microsoft Edge WebView2](https://developer.microsoft.com/zh-cn/Microsoft-edge/webview2) 下载。

### dpanel.exe

DPanel Desktop 运行时需要调用 DPanel 主程序，通过 [Releases](https://github.com/donknap/dpanel/releases) 页面下载 dpanel.exe 程序。
后续升级时，将 dpanel.exe 覆盖即可。

### docker.exe & docker-compose.exe

DPanel 面板中会调用 docker 命令及 docker-compose 命令，本机未安装 Docker Desktop 时将不会包含相关命令。
通过 [docker-cli](https://download.docker.com/win/static/stable/x86_64/) 和 [docker-compose-cli](https://github.com/docker/compose/releases) 下载。

## 配置文件 setting.json

```json
{
  "Apps": [
    {
      "HomeUrl": "${HOME_URL}:${APP_SERVER_PORT}",
      "Name": "dpanel",
      "RunOption": {
        "AutoLaunch": true,
        "Environment": [
          "APP_SERVER_PORT=9999",
          "HOME_URL=http://127.0.0.1",
          "STORAGE_LOCAL_PATH=${DP_HOME_DIR}\\dpanel"
        ],
        "LogMaxLine": 1000,
        "StartCommand": "./dpanel server:start",
        "StopCommand": "",
        "WorkDir": ".\\apps\\dpanel"
      },
      "Setting": {
        "Environment": {
          "APP_SERVER_PORT": {
            "Description": "服务运行端口"
          },
          "HOME_URL": {
            "Description": "访问地址"
          },
          "STORAGE_LOCAL_PATH": {
            "Description": "数据存储目录"
          }
        }
      }
    },
    {
      "Name": "xray",
      "RunOption": {
        "LogMaxLine": 1000,
        "StartCommand": "xray",
        "StopCommand": "",
        "WorkDir": ".\\apps\\Xray-windows-64"
      }
    }
  ],
  "System": {
    "AutoLaunch": false,
    "CloseWindowHide": false,
    "Theme": "light"
  }
}
```