# 配置参数

## 指定配置文件

运行面板程序时通过 -f 参数指定配置文件。

```shell
dpanel server:start -f /etc/dpanel/config.yaml

```

## 修改配置

### 直接修改 config.yaml

直接修改 config.yaml 文件中的对应配置即可。

### 通过启动命令覆盖配置

```shell
dpanel server:start -f /etc/dpanel/config.yaml -e STORAGE_LOCAL_PATH=/home/dpanel
```

### 通过环境变量覆盖配置

```shell
export STORAGE_LOCAL_PATH=/home/dpanel && dpanel server:start -f /etc/dpanel/config.yaml
```

## 参数说明

| 名称 | 描述 | 默认值 | 版本 |
| ------------- | :----------- | :---- | :---- |
| APP_NAME | 程序名称 | dpanel | - |
| APP_VERSION | 程序版本 | - | - |
| APP_SERVER_PORT | 程序运行绑定端口 | 8086 | - |
| STORAGE_LOCAL_PATH | 程序运行产生的数据目录 | ./ | - |
| DP_DB_MODE | 数据库读写模式 ro\|rw\|rwc | rwc | - |
| DP_ACME_COMMAND_NAME | 覆盖 acme 的命令路径 | /root/.acme/acme.sh | - |
| DP_ACME_CONFIG_HOME | 覆盖 acme 的配置目录 | /root/.acme/ | - |
| DP_SYSTEM_BASEURL | 面板访问 baseurl | - | > 1.9.1 |
| DP_LOG_CONSOLE_LEVEL | 日志级别 info\|debug | info | > 1.10.0 |
| DP_RUN_IN_CONTAINER | 是否在容器中运行 | 1 | > 1.10.0 |
| DP_DB_JOURNAL | sqlite 模式 WAL \| DELETE | DELETE | > 1.10.0 |

## 配置文件

:::code-group
```yaml [config.yaml]
app:
  name: ${APP_NAME-dpanel}
  version: ${APP_VERSION}
  env: ${APP_ENV-lite}
  family: ${APP_FAMILY-ce}
  server: ${APP_SERVER-http}
  cors:
    - http://localhost:8000
server:
  http:
    host: 0.0.0.0
    port: ${APP_SERVER_PORT-8086}
  prof:
    host: 0.0.0.0
    port: 8087
log:
  default:
    driver: stack
    channels:
      - file
      - console
  file:
    driver: file
    path: ${STORAGE_LOCAL_PATH}/logs/dpanel.log
    level: warn
  console:
    driver: console
    level: debug
database:
  default:
    driver: sqlite
    user_name: ${DB_USERNAME-root}
    password: ${DB_PASSWORD-123456}
    db_name: ${STORAGE_LOCAL_PATH}/dpanel.db
    charset: utf8mb4
    prefix: ims_
    options:
      mode: ${DP_DB_MODE}
system:
  baseurl: ${DP_SYSTEM_BASEURL}
  storage:
    local:
      path: ${STORAGE_LOCAL_PATH}
  permission:
    default_username: __public__
  docker:
    timeout: ${DP_SYSTEM_DOCKER_TIMEOUT-10}
```
:::

