# 自定义数据库

DPanel 默认使用 SQLite 作为存储数据库，可通过修改配置文件中的 database 配置修改存储数据库。

## MYSQL

```yaml
# ... 省略其他 ...
database:
  default:
    driver: mysql
    user_name: root
    password: ${DB_PASSWORD} # 支持使用环境变量
    host: 172.16.1.151
    port: 3306
    db_name: dpanel
    charset: utf8mb4
    prefix: ims_
```

# PostgreSQL <Badge type="tip" text="DPanel Version >= 1.10.0" />

```yaml
# ... 省略其他 ...
database:
  default:
    driver: postgres
    user_name: root
    password: ${DB_PASSWORD} # 支持使用环境变量
    host: 172.16.1.151
    port: 5432
    db_name: dpanel
    prefix: ims_
    options:
      sslmode: require # 额外参数配置通过 options 传递
```