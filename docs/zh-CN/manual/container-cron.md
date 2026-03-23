# 计划任务 <Badge type="tip" text="DPanel Version >= 1.4.0" />

## 添加计划任务

![image-container-1](//cdn.w7.cc/dpanel/container-cron-1.png)

## 执行容器

DPanel 面板运行在容器中，不具有直接在宿主上运行脚本命令的权限。
配置计划任务时，需指定一个运行命令的容器，默认在 DPanel 面板容器中运行。

在 DPanel 面板容器中，可正常使用 docker、docker compose、curl、git 等命令。
面板容器基于 alpine 系统，也可通过 `apk add` 命令添加所需的包，示例：

:::code-group
```shell [安装 vim]
apk add --no-cache --update vim 
```
:::

## 执行环境

脚本执行环境用于配置脚本在哪个解释器下执行，根据当前容器实际情况配置 sh 或 bash。

## 使用面板控制命令

:::tip
执行面板控制命令必须在 DPanel 容器中。
:::

示例展示如何通过控制命令判断 nginx-test 容器是否有新版本，从而执行一些操作。
脚本如下，详见[查看面板控制命令](/install/ctrl)：

```shell
CHECK=$(/app/server/dpanel -f /app/server/config.yaml container:upgrade --name nginx-test)
if [ $CHECK == *"true"* ]; then
  # 容器有更新时,执行一些操作
  docker stop nginx-test && docker rm nginx-test
  docker run --name nginx-test -p 8080:80 nginx
fi
```

## 操作宿主机环境

:::tip
执行 docker run 相关命令必须在 DPanel 容器中并可正常拉取 busybox 镜像。如无法拉取，请事先通过面板使用加速拉取。
:::

如需在宿主机中执行一些命令，可通过新建特权代理容器方式切换至宿主机的 shell 环境，示例：

:::code-group

```shell [操作主机文件系统]
docker run --rm --name dpanel-host-proxy -v /:/host busybox \
ls -al /host
```

```shell [获取网络信息]
docker run --rm --name dpanel-host-proxy --pid host --privileged busybox \
nsenter --target 1 --net --mount -- /bin/sh -c "ip addr"
```

```shell [获取Docker配置文件]
docker run --rm --name dpanel-host-proxy --pid host --privileged busybox \
nsenter --target 1 --net --mount -- /bin/sh -c "cat /etc/docker/daemon.json"
```
:::

示例中使用了 busybox 镜像，也可更换为其他更熟悉或命令更丰富的镜像，例如 alpine、ubuntu 等。


## 执行周期

### 手动执行 <Badge type="tip" text="DPanel Version >= 1.9.2" />

通过手动触发任务。

### 容器事件 <Badge type="tip" text="DPanel Version >= 1.9.2" />

通过容器事件触发任务，目前支持以下几种事件：

- 容器创建
- 容器销毁
- 容器启动
- 容器停止

容器事件发生时，事件不一定能代表此时容器的状态。例如在容器重启时，会重复触发 **启动** 和 **停止** 事件。
为更精确地执行任务，在触发脚本中应再次确认容器的状态。例如：

```shell
STATUS=$(docker inspect test2-nginx-1 --format '{{.State.Status}}')
RESTART_COUNT=$(docker inspect test2-nginx-1 --format '{{.RestartCount}}')
echo "当前容器状态: ${STATUS}, 是否在重启：$([ "$RESTART_COUNT" -eq 0 ] && echo "否" || echo "是")"

# 根据容器的状态，再去执行对应的操作
```

### 定时任务

兼容 Linux 计划任务表达式，扩展了 **秒** 级参数：

```
* * * * * *     dpanel 中支持的计划任务表达式
------------------------------------------
│ │ │ │ │ │
│ │ │ │ │ └────── 一周当中的某天 (0 - 7) (周日为 0，周一为 1 .... 周六为 6)
│ │ │ │ └──────── 月份 (1 - 12)
│ │ │ └────────── 一月当中的某天 (1 - 31)
│ │ └──────────── 时 (0 - 23)
│ └────────────── 分 (0 - 59)
└──────────────── 秒 (0 - 59)
```

#### 预设周期

面板为方便使用预设了一些常用的周期字段：

| 执行周期类型 | 执行规则说明 |
| :--- | :--- |
| **每月** | 每月 x 日 x 时 x 分执行 |
| **每周** | 每周 x 的 x 时 x 分执行 |
| **每天** | 每天 x 时 x 分执行 |
| **每小时** | 每小时 x 分执行 |
| **每 N 日** | 每月从 1 日开始隔 x 天 x 时 x 分执行 |
| **每 N 时** | 每天从 0 点开始每隔 x 时 x 分执行 |
| **每 N 分** | 每天从 0 点开始每隔 x 分执行 |
| **每 N 秒** | 每天从 0 点开始每隔 x 秒执行 |
| **自定义** | 根据上方的计划任务表达式，自定义复杂的执行周期（如 Cron 表达式） |


## 任务超时

配置任务执行超时时间，超过时长后会强制中止脚本运行。

## 保留日志数量

保留执行的结果日志，默认为 10 条。执行时可能会产生大量结果数据，不建议将此值配置过大。

## 执行脚本&环境变量

面板的计划任务允许在配置脚本的同时，配置一些环境变量参数，用于替换脚本中的参数。

也可使用[计划任务脚本模板](/manual/system-cron-template)功能管理常用脚本。

### 在脚本中使用环境变量

定义以下脚本，并在环境变量中配置 `CONTAINER_NAME` 参数：

```
docker restart ${CONTAINER_NAME}
```