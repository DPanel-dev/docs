# 配置参数

## 指定配置文件

运行面板程序时通过 -f 参数指定配置文件。

```shell
dpanel server:start -f /etc/dpanel/config.yaml

```

## 修改配置

### 直接修改 config.yaml

直接修改 config.yaml 文件的对应的配置即可

### 通过启动命令覆盖配置

```shell
dpanel server:start -f /etc/dpanel/config.yaml -e STORAGE_LOCAL_PATH=/home/dpanel
```

## 参数说明

| 名称 | 描述 | 默认值 |
| ------------- | :-----------: | ----: |
| APP_NAME | 程序名称 | dpanel |
| APP_VERSION | 程序版本 | - |
| APP_SERVER_PORT | 程序运行绑定端口 | 8086 |
| STORAGE_LOCAL_PATH | 程序运行产生的数据目录 | ./ |
| DB_MODE | 数据库读写模式 ro\|rw\|rwc | rwc |

## 完整配置文件

```yaml
app:
  name: ${APP_NAME-dpanel}
  version: ${APP_VERSION}
  env: ${APP_ENV-lite}
  family: ${APP_FAMILY-ce}
  server: http
  cors:
    - http://localhost:8000
server:
  http:
    host: 0.0.0.0
    port: ${APP_SERVER_PORT-8086}
log:
  default:
    driver: stack
    channels:
      - file
      - console
  file:
    driver: file
    path: /var/tmp/dpanel.log
    level: info
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
      mode: ${DB_MODE}
storage:
  local:
    path: ${STORAGE_LOCAL_PATH}
common:
  public_user_name: ${PUBLIC_USERNAME-__public__}
```

