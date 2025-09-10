# 环境变量

在 compose.yaml 文件中的环境变量分为两种，用于 compose.yaml 文件中的环境变量或是用于容器中的环境变量

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

## 用于 compose.yaml 文件

在部署时指定 nginx1 服务的镜像 tag。

## 用于容器中

在部署时指定容器 nginx1 和 nginx2 内部的 username 和 password 环境变量

## 在 .env 文件中定义环境变量

新建 .env 文件对环境变量进行赋值

```shell
IMAGE_VERSION=latest
NGINX1_PASSWORD=789456
NGINX2_PASSWORD=123456
USERNAME=admin
```

### 多个服务环境变量同名的问题

在上方的例子中，两个服务中都使用了 USERNAME 环境变量，这时候在 .env 文件中定义的值同时会影响到这两个服务。

这样全局式的环境变量有时候并不是期望的效果，如果希望可以分别指定，需要像示例中为每个环境变量配置一个名称。


## 面板中如何定义？

要创建 compose 任务时，面板会自动查找 yaml 中的环境变量，并生成列表。\
在创建任务的时候，你需要给这些值定义其默认值。

![compose-env-3](https://cdn.w7.cc/dpanel/compose-env-3.png)

在部署的时候，可根据当前的情况进行重定义，重定义操作只会影响到本次部署。

![compose-env-3](https://cdn.w7.cc/dpanel/compose-env-4.png)
