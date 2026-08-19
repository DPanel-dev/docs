# Compose 相对目录

在 Compose YAML 中挂载数据时，可以使用 `相对目录` 来指定数据挂载目录。相对目录会以 YAML 文件所在目录为基准。
使用相对目录的好处是便于统一管理 Compose 配置及数据。

```yaml
services:
  app:
    image: example/app
    volumes:
      - ./data:/data
```

假设项目名为 `example`，上方的 YAML 位于 `/home/compose/example/compose.yaml`，那么 `./data` 表示 YAML 同级的 `/home/compose/example/data` 目录

## 使用宿主机目录挂载 /dpanel 目录

创建 DPanel 容器时，假设使用宿主机目录 `/home/dpanel` 挂载 `/dpanel` 目录。

:::tip
你也可以将 compose 目录单独进行挂载

-v /home/dpanel:/dpanel <br />
-v /home/compose:/dpanel/compose

:::

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest // [!code focus] 
```

那么上方示例中的 `./data` 在 DPanel 容器中位于 `/dpanel/compose/example/data`，对应宿主机上的实际路径为 `/home/dpanel/compose/example/data`，并最终挂载到应用容器的 `/data`。

也就是说 `相对目录` 的实际位置取决于 DPanel 容器的 `/dpanel` 目录或是 `/dpanel/compose` 目录挂载到了宿主机的哪个目录。

## 使用存储卷挂载 /dpanel 目录

创建 DPanel 容器时，假设使用存储卷 `dpanel-data` 挂载 `/dpanel` 目录。

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v dpanel-data:/dpanel dpanel/dpanel:latest // [!code focus] 
```

未显式挂载 `/dpanel` 目录或者使用 `-v dpanel-data:/dpanel` 时，都是采用存储卷的形式来挂载目录，存储卷是由 Docker 统一管理的挂载形式。

卷内目录是不能直接使用的宿主机路径，因此使用 `./data:/data` 将无法将数据挂载到 `相对目录` 中。
如果需要使用卷内的项目数据，可以将 `dpanel-data` 声明为外部存储卷，并通过 `volume.subpath` 指定相对目录。

:::tip
`subpath` 必须相对于存储卷根目录填写；对应目录需要提前存在，且不能以 `/` 开头。`volume.subpath` 要求 Docker API `1.45` 及以上。
:::

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

上述配置会将 `dpanel-data` 存储卷中的 `compose/example/data` 子目录挂载到应用容器的 `/data`。
