# 使用 Compose 安装

<!--@include: ../include/image.md-->

## Compose Yaml
:::code-group

```yaml [标准版]
services:
  dpanel:
    image: dpanel/dpanel:latest
    container_name: dpanel # 更改此名称后，请同步修改下方 APP_NAME 环境变量
    restart: always
    ports:
      - 80:80
      - 443:443
      - 8807:8080 # 替换 8807 可更改面板访问端口
    environment:
      APP_NAME: dpanel # 请保持此名称与 container_name 一致
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /home/dpanel:/dpanel # 将 /home/dpanel 更改为你想要挂载的宿主机目录
    extra_hosts:
      - "host.dpanel.local:host-gateway"
    logging:
      driver: "json-file"
      options:
        max-size: "5m"
        max-file: "10"
```

```yaml [Lite 版]
services:
  dpanel:
    image: dpanel/dpanel:lite
    container_name: dpanel # 更改此名称后，请同步修改下方 APP_NAME 环境变量
    restart: always
    ports:
      - 8807:8080 # 替换 8807 可更改面板访问端口
    environment:
      APP_NAME: dpanel # 请保持此名称与 container_name 一致
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /home/dpanel:/dpanel # 将 /home/dpanel 更改为你想要挂载的宿主机目录
    extra_hosts:
      - "host.dpanel.local:host-gateway"
    logging:
      driver: "json-file"
      options:
        max-size: "5m"
        max-file: "10"
```
:::