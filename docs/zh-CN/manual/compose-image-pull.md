# 拉取镜像

由于某些原因，部署 Compose 任务时可能无法拉取到镜像。

可通过配置【[仓库管理](/manual/image-proxy)】，在部署 Compose 时勾选【使用面板拉取镜像】。
或已配置过 daemon.json 后，在部署时勾选【使用命令拉取镜像】。

需要注意的是这两个配置并不相通，在面板中配置了加速地址时不会在命令中生效，反之亦然。
部署时，需根据实际情况选择使用命令拉取镜像或由面板拉取镜像。

![compose-pull](https://cdn.w7.cc/dpanel/compose-env-2.png?a=3)