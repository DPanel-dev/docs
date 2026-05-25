# 镜像加速

## 推荐加速方案 {#proxy-url}

:::warning
加速地址仅对当前仓库生效，配置 `docker.io` 仓库仅对拉取 `Docker Hub` 的镜像生效。如果需要配置 `ghcr.io` 的加速地址，需要先添加 `ghcr.io` 仓库，并填入加速地址。
:::

在仓库中配置多个加速地址，面板会采用「**优选**」<Badge type="tip" text="DPanel Version >= 1.10.4" /> 的方式拉取镜像，优先使用最快的加速地址。

通过 [镜像加速检测-1](https://status.1panel.top)、[镜像加速检测-2](https://status.anye.xyz/) 查询公开的加速地址，也可使用 [KSpeeder](https://kspeeder.com/) 搭建镜像加速服务。

## 在面板中配置加速

镜像地址由 `仓库地址/命名空间/镜像名称:标签` 组成，例如 `registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel:lite`，省略仓库地址默认使用 `docker.io`。

根据镜像的仓库地址，在 [仓库管理](/manual/image-registry) 中添加对应仓库并配置加速地址。输入框支持两种格式：逐条添加（每行一个地址）或 `daemon.json` 格式的数组。

配置的加速地址仅对当前仓库生效。

### 无法在命令行生效

面板的加速地址不会写入 `docker` 的 `daemon.json` 文件，所以在面板中配置的加速地址不会在 `docker pull` 命令中生效。
所有拉取镜像的操作需在面板中完成。

反之如果在 `daemon.json` 中配置了加速地址或是在 `docker.service` 配置了代理地址，可以在面板中直接生效。

## 镜像 Tag

:::tip

如不希望产生两个 `tag` 可以配置 `Docker Daemon` 的加速或是代理。 
:::

通过加速地址拉取的镜像，面板会给该镜像添加两个 `tag`，分别为原始的镜像名称和加速地址的镜像名称。

采用加速地址拉取镜像后，镜像的 `digest` 值实际指向的是加速地址的 `tag`。如将加速地址的 `tag` 删除会导致镜像 `digest` 值丢失，从而使容器无法正常检测镜像更新。

## 在 Docker 中配置

### 代理地址

在宿主机中，手动编辑 `/lib/systemd/system/docker.service` 文件，在 `[Service]` 节点中添加以下内容：

```yaml
[Service]
Environment="http_proxy=http://192.168.0.2:7890"
Environment="https_proxy=http://192.168.0.2:7890"
... 其它配置 ...
```

### 加速地址

:::tip
配置可通过 [推荐加速方案](/manual/image-proxy#proxy-url) 中的地址获取
:::

在宿主机中，手动编辑 `/etc/docker/daemon.json` 添加以下内容：

```json
{
    "registry-mirrors": [
        "https://docker.1ms.run",
        "https://docker.1panel.live",
        "https://docker.m.ixdev.cn",
        "https://hub.rat.dev",
        "https://docker.xuanyuan.me"
    ]
}
```

### 重启服务

```shell [重启 docker 服务]
sudo sh -c "systemctl daemon-reload && systemctl restart docker"
```