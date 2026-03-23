# 创建 Compose 覆盖配置

使用远程 yaml 或应用商店创建 Compose 任务时，有时需要修改 compose.yaml 中的一些参数，如端口、挂载目录等配置。
如直接修改 yaml，当应用作者发布新版后，需要人工合并这些差异。

此时可使用覆盖 yaml 的方式新建一个 yaml 文件，将配置追加、覆盖到原始的 yaml 文件中。


## 创建覆盖配置文件

:::tip
覆盖配置文件只需添加想要调整的配置项。
:::

![compose-override-yaml.png](https://cdn.w7.cc/dpanel/compose-override-yaml.png)

## 覆盖配置

假设原始的 yaml 文件内容为：

```yaml 
name: easyimage
services:
  easyimage:
    image: ddsderek/easyimage:latest
    ports:
      - target: 80
        published: '8080'
        protocol: tcp
    restart: unless-stopped
    volumes:
      - type: bind
        source: /DATA/AppData/easyimage/config
        target: /app/web/config
      - type: bind
        source: /DATA/AppData/easyimage/i
        target: /app/web/i
    environment:
      TZ: Asia/Shanghai
      PUID: '1000'
      PGID: '1000'
      DEBUG: 'false'
```

### 新增配置

新增一个端口映射，可配置为部署时同时映射 80 及 88：

```
services:
  easyimage:
    ports:
      - 8888:88
```

### 更改配置

更改映射目录，其中一个重新指向宿主机目录，一个指向存储卷：

```
services:
  easyimage:
    ports:
      - 8888:88
    volumes:
      - /home/easyimage/config:/app/web/config
      - easyimage_i:/app/web/i
volumes:
  easyimage_i:
    name: easyimage_i
```

### 强制覆盖配置

:::danger
群晖或老旧 Docker 版本不支持此配置，如有覆盖操作需要直接修改原始文件。
:::

```
# 此覆盖配置，最终会映射到 8888 9999 8080
services:
  easyimage:
    ports:
      - 8888:88
      - 9999:80
```

```
# 采用 !override 的写法，最终只会映射 8888 及 9999
services:
  easyimage:
    ports: !override
      - 8888:88
      - 9999:80
```

### 清空配置

采用 `!reset` 的写法，可将映射端口配置清空，不暴露任何端口。

```
services:
  easyimage:
    ports: !reset
```

## 替换 yaml 中的服务为已存在的容器

用 compose 部署两个 wordpress 项目，会产生多个 mysql 数据库。
但在实际中，大部分做法是让多个 wordpress 共用同一个 mysql 实例，用不同的数据库进行区分。

在下面的 yaml 中，如不想部署 db 服务，让 phpmyadmin 管理已存在的 localmysql，可定义以下覆盖配置。
部署 compose 任务时，取消 db 服务的勾选，面板将不再部署 db 服务。

:::tip
需要注意的是 compose 中的 phpmyadmin 要能访问到 localmysql，需将它们加入到同一个网络中。
:::

```yaml
services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    ports:
      - :3306
    environment:
      MYSQL_ROOT_PASSWORD: ${PASSWORD}
      MYSQL_DATABASE: ${DATABASE}
      MYSQL_PASSWORD: "123456"
    networks:
      - mysql-phpmyadmin
  phpmyadmin:
    depends_on:
      - db
    image: phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      - PMA_HOST=db
      - MYSQL_ROOT_PASSWORD=password
    networks:
      - mysql-phpmyadmin
networks:
  mysql-phpmyadmin: null
volumes:
  db_data: null
```

> 通过 !reset 重写依赖服务，此时 phpmyadmin 管理的就是外部已存在的 localmysql 容器

```yaml
services:
  phpmyadmin:
    depends_on: !reset
    external_links:
      - localmysql:db

```
