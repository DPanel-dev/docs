# 镜像加速

## 在面板中配置加速

:::tip
面板默认提供 Docker Hub 仓库，无需重复添加。
:::

根据镜像对应的仓库地址，在 [仓库管理](/manual/image-registry) 中添加对应的仓库，并配置加速地址。

例如，如果需要配置 ghcr.io 的加速地址，需要先添加 ghcr.io 仓库，并填入加速地址。
在 ghcr.io 中配置的加速仅适用于自身。

### 无法在命令行生效

面板的加速地址并未修改 docker 的 daemon.json 文件，所以在面板中配置的加速地址并不会在 docker pull 命令中生效。
所有拉取镜像的操作需要在面板中完成。

### 镜像 Tag

通过加速地址拉取的镜像，面板会给该镜像添加两个 tag，一个为原始的镜像 tag，一个为采用加速地址后的 tag。

采用加速地址拉取镜像后，镜像的 digest 值实际指向的是加速地址的 tag。
如果将加速地址的 tag 删除会导致镜像 digest 值会失丢。
从而导致容器无法正常检测镜像更新。

你可以直接在 docker 的 daemon.json 配置加速地址，这样就不会产生镜像加速的 tag。

### 推荐加速方案

在仓库中配置多个加速地址，面板会采用轮询的方式拉取镜像，直到拉取成功或是失败。
你可以 [国内 Docker 服务状态 & 镜像加速监控](https://status.1panel.top) 查询公开的加速地址。
也可以使用 [KSpeeder](https://kspeeder.com/) 搭建加镜像加速服务。

将地址添加到加速地址列表中即可

## 在 Docker 中配置加速地址

由于面板运行在容器中，不能直接编辑 Docker 配置文件，
需要手动编辑 /lib/systemd/system/docker.service 文件，在 [Service] 节点中添加以下内容

```yaml
[Service]
Environment="http_proxy=http://192.168.0.2:7890"
Environment="https_proxy=http://192.168.0.2:7890"
... 其它配置 ...
```

:::code-group
```shell [重启 docker 服务]
sudo sh -c "systemctl daemon-reload && systemctl restart docker"
```
:::
