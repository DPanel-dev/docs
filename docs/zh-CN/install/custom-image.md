# 自定义面板镜像

基于 DPanel 提供的镜像，可添加一些个性化的运行环境或脚本，构建个性化镜像。

<!--@include: ../include/image.md-->

## Dockerfile

:::code-group

```yaml [标准版]
FROM dpanel/dpanel:latest

# 添加或复制脚本或文件
# COPY source target

# 使用 apk add 安装包
RUN apk add python3

# 通过 RUN 运行其他脚本
RUN ls -al

ENTRYPOINT [ "/docker/entrypoint.sh" ]
```

```yaml [Lite 版]
FROM dpanel/dpanel:lite

# 添加或复制脚本或文件
# COPY source target

# 使用 apk add 安装包
RUN apk add python3

# 通过 RUN 运行其他脚本
RUN ls -al

ENTRYPOINT [ "sh", "-c", "/app/server/dpanel server:start -f /app/server/config.yaml" ]
```
:::

## 构建镜像

```shell
docker build -t my-dpanel .
```