# DPanel 桌面运行

## 介绍

DPanel Desktop 基于 [Wails](https://wails.io/) 实现。
本质上是一个 CLI 程序管理器，通过 GUI 可视化的界面，管理主程序的环境变量、运行程序、接管控制台日志输出。

在 Windows 系统中不再受到 Docker 环境的束缚，可以简单、快速的运行 DPanel 面板。
基于 DPanel 的 多 Docker 服务端功能（支持 API、SSH 添加）。
实现了对服务器的零侵入和零占用，杜绝了面板产生的任何安全风险。

通过 DPanel Desktop 你还可以将其它基于 CLI 的程序像是 DPanel 一样方便的运行起来。

## 预览

![desktop-1](https://cdn.w7.cc/dpanel/desktop-1.png){data-zoomable}

## 依赖

:::tip
DPanel Desktop 安装包会默认包含以下组件，二进制运行文件不会提供。
:::

### WebView2

:::warning
低于 Windows10 的系统无法使用 DPanel Desktop。
:::

### dpanel.exe

DPanel Desktop 运行时需要调用 DPanel 主程序，通过 [Releases](https://github.com/donknap/dpanel/releases) 页面下载 dpanel.exe 程序。
后续面板时，将 dpanel.exe 覆盖即可。

### docker.exe & docker-compose.exe

DPanel 面板中会调用 docker 命令及 docker-compose 命令，本机未安装 Docker Desktop 时将不会包含相关命令。
通过 [docker-cli](https://download.docker.com/win/static/stable/x86_64/) 和 [docker-compose-cli](https://github.com/docker/compose/releases) 下载。

### nssm.exe

由于软件签名的原因 DPanel Desktop 自身并未实现注册系统服务和自启动的相关功能。而是采用 nssm.exe 来完成注册服务功能。
通过 [NSSM Download](https://nssm.cc/download) 下载。

## 配置文件 setting.json

```json
{
  "Setting": {
    "System": {
      "AutoLaunch": false,
      "CloseWindowHide": true,
      "Theme": "light"
    },
    "Apps": [
      {
        "Name": "dpanel",
        "HomeUrl": "${HOME_URL}:${APP_SERVER_PORT}",
        "RunOption": {
          "AutoLaunch": true,
          "WorkDir": "./apps/dpanel",
          "StartCommand": "./dpanel server:start",
          "StopCommand": "",
          "Environment": [
            "APP_SERVER_PORT=8086",
            "STORAGE_LOCAL_PATH=${DP_WORK_DIR}/data",
            "HOME_URL=http://127.0.0.1"
          ],
          "LogMaxLine": 1000
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
      }
    ]
  }
}
```