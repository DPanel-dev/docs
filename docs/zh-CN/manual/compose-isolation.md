# 数据隔离 <Badge type="tip" text="DPanel Version >= 1.5.1" />

面板支持多个 Docker 服务端共享 `Compose` 任务文件。
创建一个 `Compose` 任务后，这些数据可在每个客户端进行部署。

也支持为任意远程服务端配置独立的 `Compose` 目录，用于文件数据隔离。

### 开启配置

通过[`多服务端管理`](/manual/system-env#enable-compose-path)开启独立目录，目录以 `compose-` 为前缀，以当前环境名称结尾。

例如：远程 docker 环境名为 `test123`，则目录名称为 `compose-test123`。其内部结构与默认的 compose 目录一致。