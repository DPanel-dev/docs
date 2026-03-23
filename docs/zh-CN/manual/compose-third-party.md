# 迁移其他第三方平台

面板支持通过挂载目录将其他第三方平台 compose 任务迁移至 DPanel。

## Portainer 迁移

如 portainer 容器的 `/data` 目录挂载在宿主机的 `/home/portainer` 目录。

创建 DPanel 面板时需将 `/home/portainer/compose` 目录挂载到 DPanel 容器的 `/data/compose` 目录。
创建时增加挂载参数，如下：

```shell
docker run -d --name dpanel ...(省略其它参数)... \
 -v /home/portainer/compose:/data/compose \
 dpanel/dpanel:lite
```

### 变更目录名称

由于 portainer 的 compose 目录以数据的 ID 命名，为让 DPanel 识别到这些任务，需将数字命名的目录更改为以 compose 标识命名。

## Dockge 迁移

```shell
docker run -d --name dpanel ...(省略其它参数)... \
 -v /opt/stacks:/opt/stacks \
 dpanel/dpanel:lite
```