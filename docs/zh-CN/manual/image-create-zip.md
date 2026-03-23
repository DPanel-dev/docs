# 通过 Zip & Git 构建镜像

Zip 包与 Git 仓库构建镜像的区别在于：Git 可更好地进行可持续化构建，而 Zip 包更适合单次简单快速的构建。

## 示例

使用 DPanel 仓库地址，快速构建 DPanel 镜像：

:::code-group
```shell [仓库地址]
https://github.com/donknap/dpanel-docs.git
```
:::

## 配置说明

### 构建目录

指定构建镜像时的根目录，使用 COPY 或 ADD 命令时以此目录为根目录。
如配置路径 `app/services/nginx`，则对应命令中写法为：

```shell
docker -t test app/services/nginx
```

### 构建 Dockerfile 路径

指定构建镜像时 Dockerfile 文件名或路径。Dockerfile 的路径总是从【构建目录】开始。

如 Dockerfile 文件路径为 **app/service/nginx/dockerfile/Dockerfile**，当配置【构建目录】为 **app/service/nginx** 后，
Dockerfile 路径配置为 **dockerfile/Dockerfile** 即可。

### 构建参数

指定构建镜像时的 `--build-arg` 参数。

## 持续构建（Git Webhook 待支持）

使用 Git 方式构建镜像时，可通过 webhook 进行自动触发构建（暂未支持）。