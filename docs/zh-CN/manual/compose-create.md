# 使用 compose 创建容器

在 DPanel 系统中，一个 `Compose` 为一个独立的目录，存放到 `/dpanel/compose` 目录中。任务目录中必须包含 `docker-compose.yaml` `compose.yaml` 文件。

你可以根据自己的需求使用不同的方式来管理你的 `Compose` 任务。


## 文本创建

通过直接编辑 `yaml` 文件创建一个 `Compose` 任务，面板提供了多种导入 `compose.yaml` 文件的方法。

## 远程地址

使用远程 `yaml` 地址创建任务。与`文本创建`的区别在于你可以随时在详情页内同步远程的 `yaml` 文件内容。

## Git 仓库 <Badge type="tip" text="DPanel Version >= 1.9.1" />

可直接将远程 `git` 仓库克隆到本地创建任务。克隆仓库的时候可以指定分支、tag。

## 挂载目录 {#mount}

面板会自动在 `/dpanel/compose` 目录中扫描符合规范的 `Compose` 项目。
你可以通过改变面板容器的挂载或是软链接的形式可以将面板中的 `/dpanel/compose` 目录到主机上的其它位置。

### 目录规范

:::tip
每个项目需创建一个子目录，目录名称即为`标识`。
子目录中包含 `docker-compose.yaml`、`docker-compose.yml`、`compose.yaml`、`compose.yml` 文件之一。
:::

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

### 挂载容器 compose 目录

挂载目录时，你不仅可以挂整个 `Compose` 目录，也可以单独将某一个项目挂载到面板容器中。

```js
docker run -d -it --name dpanel ...(省略其它参数)...  -v /home/dpanel:/dpanel  \
-v /mnt/compose:/dpanel/compose -v /test/dpanel:/dpanel/compose/dpanel \   // [!code focus]
dpanel/dpanel:latest
```


### 软链接二进制 compose 目录

以下示例适用于在宿主机运行 DPanel 二进制的部署，`/home/dpanel-1` 为示例数据目录，请替换为实际路径。两种方案按需选择一种，不要依次执行。

创建链接前，原始目录和链接位置的父目录应已存在，链接位置不应已有同名文件、目录或链接。如已有内容，请先妥善迁移；`ln -s` 不会用链接替换已有目录。

整个目录：

```
ln -s /mnt/compose /home/dpanel-1/compose
```

单个任务目录：

当前自动扫描不会识别单个任务目录的软链接。新增任务时，请在创建页面选择“挂载目录”，填写与链接目录一致的任务标识，并在原始目录中准备 `docker-compose.yaml`。

```
ln -s /mnt/compose/dpanel /home/dpanel-1/compose/dpanel
```


## 应用商店

:::tip
通过应用商店安装后，相关文件会同步至 `/dpanel/compose` 目录。
为保证应用商店中的 yaml 文件可随时更新，修改 yaml 配置时建议采用 [覆盖配置](/manual/compose-create-override)。
:::

![compose-store-1](https://cdn.w7.cc/dpanel/compose-store-1.png)

[添加应用商店](/manual/system-store) 之后，点击安装跳转至 Compose 【创建任务】页面，完善、修改环境变量及相关信息后部署任务。

## 外部任务

对于非面板创建的 `Compose` 项目，通过 DPanel 面板进行管理时，需确保面板可以访问到相关的 `compose.yaml` 文件。

你可以通过[`挂载容器 compose 目录`](/manual/compose-create#mount)的方式将你的外部挂载到面板容器或是软链接目录中。

### 挂载单个项目

通过以下命令查找 `Compose` 项目的 `yaml` 文件所在的真实位置。

```shell
docker compose ls --filter name=my-compose
```

```
NAME                STATUS              CONFIG FILES
my-compose          running(1)          /home/my-compose/compose.yaml
```

将 `yaml` 文件所在的目录原样挂载到面板容器中，面板即可管理该 compose 项目。

```shell
docker run -d -it --name dpanel ...(省略其它参数)... \
-v /home/my-compose/:/home/my-compose/ \   // [!code focus]
dpanel/dpanel:latest
```

## 将任务迁移至面板中

在面板中编辑 `外部任务` 完善 `yaml` 及 `.env` 文件即可。需要注意的即使完善了这些文件操作 `Compose` 任务时并不影响原始的工作目录和数据存储位置。

## 预览

![compose-create](https://cdn.w7.cc/dpanel/compose-create.png?t=1)
