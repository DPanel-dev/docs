# 主机管理 <Badge type="tip" text="DPanel Version >= 1.7.0" />

:::tip
通过 SSH 管理远程 Docker 服务端时默认开启主机管理。
:::

在 **多服务端管理** 中，可配置当前宿主机的 SSH 权限，通过面板的 web shell 功能操作宿主机的命令及文件。

## 配置权限

:::danger
配置 **本地** 环境 **主机IP地址** 时，不可使用 `127.0.0.1`，因为该地址代表容器自身。
:::

配置主机的公网地址或局域网地址。如创建面板容器时[绑定主机 Host](/install/docker#bind-host)，
可使用 `host.dpanel.local` 访问宿主机地址。

## SSH 及 SFTP

配置完成后，可在顶部 **Console 图标**或**首页**-**主机管理**中连接宿主机。