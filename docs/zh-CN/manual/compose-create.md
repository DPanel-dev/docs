# 使用 compose 创建容器

![compose-create](https://cdn.w7.cc/dpanel/compose-create.png)

## 站点标识

用于标识 compose 项目名称。当同一个 compose.yaml 部署多个项目时，通过站点标识进行区分。

## yaml 来源

### 应用商店

![compose-store-1](https://cdn.w7.cc/dpanel/compose-store-1.png)

[添加应用商店](/manual/system-store) 之后，点击安装跳转至 Compose 【创建任务】页面，完善、修改环境变量及相关信息后部署任务。

通过应用商店安装后，相关文件会同步至 `/dpanel/compose` 目录。
为保证应用商店中的 yaml 文件可随时更新，修改 yaml 配置时建议采用 [覆盖配置](/manual/compose-create-override)。

### yaml 文本创建

可直接通过 yaml 文本创建 Compose 任务，任务创建后面板会将相应文件保存至 `/dpanel/compose` 目录。

### 远程地址

可直接使用远程 yaml 地址创建任务。
与 **文本创建** 的区别在于：每次部署时，面板会从远程地址拉取最新的文件内容进行部署。

### Git 仓库 <Badge type="tip" text="DPanel Version >= 1.9.1" />

可直接将远程 git 仓库克隆到本地创建任务。

### 挂载存储路径 {#mount}

创建 DPanel 面板时，可将面板的 `/dpanel` 目录挂载到宿主机。
将项目放置到 `/dpanel/compose` 中，面板将自动发现这些目录并创建对应的 compose 任务。

也可单独挂载 `/dpanel/compose` 目录，例如：

```js
docker run -d -it --name dpanel ...(省略其它参数)... \
-v /home/dpanel:/dpanel -v /mnt/compose:/dpanel/compose \   // [!code focus]
dpanel/dpanel:latest
```

每个项目需创建一个子目录，目录名称即为【站点标识】。
子目录中包含 `docker-compose.yaml`、`docker-compose.yml`、`compose.yaml`、`compose.yml` 文件之一。

#### 目录结构

```
/dpanel
├─ /compose
│  ├─ /easyimage                        项目子目录，目录名即为标识
│  │  ├─ docker-compose.yaml            该项目的 compose yaml 文件
│  │  └─ docker-compose-override.yaml   自定义覆盖配置文件，以 override.yaml override.yml 结尾
│  ├─ /lucky                                     
│  │  └─ compose.yaml
│  ├─ /qinglong                         其它项目
│  │  └─ compose.yml
│  └─ ... 
└─ ....
```

## 多服务端 yaml 数据隔离 <Badge type="tip" text="DPanel Version >= 1.5.1" />

面板支持多个 Docker 服务端共享 compose 任务文件。
创建一个 compose 任务后，这些数据可在每个客户端进行部署。

也支持为任意远程服务端配置独立的 compose 目录，用于文件数据隔离。

### 开启配置

通过[多服务端管理](/manual/system-env#enable-compose-path)开启独立目录，目录以 `compose-` 为前缀，以当前环境名称结尾。

例如：远程 docker 环境名为 `test123`，则目录名称为 `compose-test123`。其内部结构与默认的 compose 目录一致。
