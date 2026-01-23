# Run with DPanel Desktop

## Introduction

DPanel Desktop is based on [Wails](https://wails.io/).
It's essentially a CLI program manager, using a GUI to manage the main program's environment variables, run programs, and manage console log output.

On Windows, you're no longer constrained by the Docker environment; simply double-click a program to launch the DPanel.

You can quickly and easily manage local, intranet, and public Docker Engine using the DPanel multi-Dockers functionality.

Start and run instantly, shut down and stop at will. This ensures zero server intrusion and zero server usage, eliminating any security risks associated with the DPanel.

With DPanel Desktop, you can also run other CLI-based programs with the same ease as DPanel.

## Download

:::tip
The DPanel Desktop Installer package includes dpanel.exe, docker.exe, and docker-compose.exe by default.
:::

- [DPanel Desktop Installer](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-amd64-installer.exe)
- [DPanel Desktop Portable](https://github.com/donknap/dpanel/releases/latest/download/dpanel-desktop-amd64-portable.zip)

## Preview

![desktop-1](https://cdn.w7.cc/dpanel/system-desktop-1.png){data-zoomable}

![desktop-1](https://cdn.w7.cc/dpanel/system-desktop-2.png){data-zoomable}

## Dependencies

### WebView2

:::warning
DPanel Desktop cannot be used on systems earlier than Windows 10.
:::

The webview2 runtime is installed by default on Windows 10 and above. If your system does not include the relevant components, download it through [Microsoft Edge WebView2](https://developer.microsoft.com/zh-cn/Microsoft-edge/webview2).

### dpanel.exe

DPanel Desktop requires the DPanel main program to run. Download the dpanel.exe program from the [Releases](https://github.com/donknap/dpanel/releases) page.

Subsequent upgrades can simply overwrite dpanel.exe.

### docker.exe & docker-compose.exe

The DPanel panel calls docker and docker-compose commands. If Docker Desktop is not installed locally, these commands will not be included.
Download [docker-cli](https://download.docker.com/win/static/stable/x86_64/) and [docker-compose-cli](https://github.com/docker/compose/releases).

## Setting File setting.json

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
            "Description": "Port of Server Running"
          },
          "HOME_URL": {
            "Description": "Manage Url"
          },
          "STORAGE_LOCAL_PATH": {
            "Description": "Path of data storage"
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