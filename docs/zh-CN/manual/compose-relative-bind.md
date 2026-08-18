# Compose 相对目录

## 什么是 Compose 相对目录

Compose 中以 `./` 或 `../` 开头的路径称为相对目录。相对目录以 `compose.yaml` 所在目录为基准。

假设 `compose.yaml` 位于 `/dpanel/compose/example`：

```text
/dpanel/compose/example
├── compose.yaml
└── data
```

Compose 配置如下：

```yaml
services:
  app:
    image: example/app
    volumes:
      - ./data:/data
```

其中，`./data` 表示 `/dpanel/compose/example/data`，`/data` 表示该目录在 `app` 容器内的挂载位置。

DPanel 的 `/dpanel` 可以挂载宿主机目录，也可以使用 Docker 存储卷。两种存储方式对应不同的配置方法。

## `/dpanel` 挂载宿主机目录

创建 DPanel 时，将宿主机的 `/home/dpanel` 挂载到容器的 `/dpanel`：

```bash
docker run -d --name dpanel \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /home/dpanel:/dpanel \
  dpanel/dpanel:latest
```

此时，DPanel 容器内的 `/dpanel/compose/example` 对应宿主机的 `/home/dpanel/compose/example`，可以直接使用相对目录：

```yaml
services:
  app:
    image: example/app
    volumes:
      - ./data:/data
```

部署后，宿主机的 `/home/dpanel/compose/example/data` 会挂载到 `app` 容器的 `/data`。

## `/dpanel` 使用 Docker 存储卷

创建 DPanel 时，也可以使用名为 `dpanel-data` 的存储卷：

```bash
docker run -d --name dpanel \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v dpanel-data:/dpanel \
  dpanel/dpanel:latest
```

此时项目文件位于 `dpanel-data` 存储卷中，不能使用 `./data:/data` 引用卷内目录。需要将该存储卷声明为外部存储卷，并通过 `subpath` 指定项目的数据目录：

```yaml
services:
  app:
    image: example/app
    volumes:
      - type: volume
        source: dpanel-data
        target: /data
        volume:
          subpath: compose/example/data

volumes:
  dpanel-data:
    external: true
```

上述配置会将 `dpanel-data` 存储卷中的 `compose/example/data` 子目录挂载到 `app` 容器的 `/data`。

::: tip

- `subpath` 相对于存储卷根目录填写，不能以 `/` 开头。
- `subpath` 对应的目录必须在启动服务前已经存在。
- Docker API 版本必须不低于 `1.45`。

:::
