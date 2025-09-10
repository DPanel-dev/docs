# 迁移其它三方平台

面板支持通过挂载目录的时候将其它三方平台 compose 任务迁移至 DPanel

## Portainer 迁移

假如你的 portainer 容器的 /data 目录挂载在宿主机的 /home/portainer 目录。

在创建 DPanel 面板的时候你需要将 /home/protainer/compose 目录挂载到 DPanel 容器的 /data/compose 目录。\
在创建时增加挂载参数，如下：

```
docker run -it -d --name dpanel ...(省略其它参数)... \
 -v /home/protainer/compose:/data/compose \
 dpanel/dpanel:lite
```

### 变更目录名称

由于 portainer 的 compose 目录以数据的 id 命名，为了可以让 DPanel 识别到这些任务，需要将数字命名的目录更改为以 compose 标识命名。

## dockage 迁移

```
docker run -it -d --name dpanel ...(省略其它参数)... \
 -v /opt/stacks:/opt/stacks \
 dpanel/dpanel:lite
```