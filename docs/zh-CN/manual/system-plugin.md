# 系统插件 <Badge type="tip" text="DPanel Version >= 1.11.3" />

插件是 DPanel 系统的功能扩展方式。

插件主要有两个作用。一是承载非所有用户都需要的功能，让主程序保持精简；二是接入第三方应用，为其提供适合的可视化配置界面，方便用户来使用。

插件基于 `统一配置` `Compose` `微前端` 来实现。系统通过 `Compose` 来实现插件的安装、升级、卸载。插件可以配置表单选项，用于可视化的配置容器参数，方便用户使用。
也可以通过配置注册前端地址，将自己的页面显示在 DPanel 系统中，后期通过二开的方式，实现统一登录。

本规范约定了插件如何安装和运行、如何收集配置、如何接入页面，以及如何在权限范围内调用 DPanel API。你可以结合示例 [`dp_example`](https://github.com/DPanel-dev/plugin/tree/main/dp_example) 插件更好的了解插件的定义及使用。

## 分发及同步

插件通过 Git 仓库来组织一个或是多个插件。你可以在 `系统` - `插件管理` 中添加插件源，官方插件源会内置在程序中，首次使用需要先进行同步。

同步完成后，插件数据会存放至 `/dpanel/plugin` 目录中，并以 `命名空间/仓库名` 创建子目录。

插件同时时支持配置多个加速源，避免无法拉取仓库或是拉取时间过长。你可以 `fork` 官方插件仓库模板，将仓库数据打包成镜像，推送到 Hub 或是 Aliyun。
如果你可以自行提供加速地址，也可以将仓库为 `Zip` 文件方便用户拉取。

## 目录组织

插件以目录的形式存在，一个目录表示一个独立完整的插件。目录名必须与 `plugin.name` 一致，格式为 `前缀_插件名`。前缀标识发布者，两部分使用小写字母、数字和连字符。

```text
DPanel-dev/plugin/
├── thirdparty_rclone/
│   ├── manifest.yaml
│   └── compose.yaml
└── dp_example/
    ├── manifest.yaml
    ├── compose.yaml
    ├── asset/
    └── server/
```

每一个插件中必须包含 `manifest.yaml` 和 `compose.yaml` 两个文件。


## 配置

插件中 `manifest.yaml` 是基本的插件的配置描述文件，`compose.yaml` 则是最终插件运行的容器启动编排文件。插件中可以根据自己的需求决定是否提供前端文件以及后端源码，这一切需要自行在 `compose.yaml` 中实现容器的构建和创建 。

对于一些不需要复杂前端的三方系统，可以通过 `manifest.yaml` 注册配置表单，系统在启动的时候会通地环境变量注入到 `compose.yaml` 文件中完成启动。


## manifest.yaml

```yaml
version: "1.0"
plugin:
  name: dp_example
  version: "1.0.0"
  defaultLang: zh
  title:
    zh: DPanel 插件示例
    en: DPanel Plugin Example
  bootstrap: compose
  
view:
  type: wujie
  entry: "http://{{DP_PLUGIN_HOST_IP}}:{{SERVER_PORT}}/"

config:
  - name: DEMO_NAME
    label:
      zh: 示例名称
      en: Demo Name
    type: text
    required: true
```
