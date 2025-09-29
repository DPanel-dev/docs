# 环境变量

在 compose.yaml 文件中的环境变量分为两种，用于 compose.yaml 文件中的环境变量或是用于容器中的环境变量
你可以通过 **环境变量** 功能动态的控制 yaml 文件中任何配置。示例:

:::code-group
```yaml [示例]
services:
  nginx1:
    image: nginx:${IMAGE_VERSION}
    environment:
      PASSWORD: ${NGINX1_PASSWORD}
      USERNAME:
  nginx2:
    image: nginx:latest
    environment:
      PASSWORD: ${NGINX2_PASSWORD}
      USERNAME:
```
:::


用于 compose.yaml 文件，在部署时，通过 ${IMAGE_VERSION} 指定 nginx1 服务的镜像 tag。
用于容器时，通过 ${NGINX1_PASSWORD} ${NGINX2_PASSWORD} 透传到容器内部。

## 在 .env 文件中定义环境变量

新建 .env 文件对环境变量进行赋值

```shell
IMAGE_VERSION=latest
NGINX1_PASSWORD=789456
NGINX2_PASSWORD=123456
USERNAME=admin
```

### 多个服务环境变量同名的问题

在上方的例子中，两个服务中都使用了 ${USERNAME} 环境变量，这时候在 .env 文件中定义的值同时会影响到这两个服务。
如果希望可以分别指定，需要采用示例中密码的配置方式，为每个环境变量再配置一个环境变量。

## 面板中如何定义？

创建 compose 任务时，面板会自动查找 yaml 中的环境变量，并生成列表。\
在创建任务的时候，你可以给这些环境变量配置值。

如果是通过 **挂载目录** 的形式添加的 compose 任务，面板则会查找同级目录下的 .env 文件并展现出来环境变量。
面板会将 .env 文件中的环境变量进行双向同步。无论你在哪里编辑，都会更新至 .env 文件或是任务详情中。

