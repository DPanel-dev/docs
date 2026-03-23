# Custom Database

DPanel uses SQLite as the default storage database. You can modify the storage database by changing the database configuration in the configuration file.

## MySQL

```yaml
# ... other configurations omitted ...
database:
  default:
    driver: mysql
    user_name: root
    password: ${DB_PASSWORD} # supports environment variables
    host: 172.16.1.151
    port: 3306
    db_name: dpanel
    charset: utf8mb4
    prefix: ims_
```

## PostgreSQL <Badge type="tip" text="DPanel Version >= 1.10.0" />

```yaml
# ... other configurations omitted ...
database:
  default:
    driver: postgres
    user_name: root
    password: ${DB_PASSWORD} # supports environment variables
    host: 172.16.1.151
    port: 5432
    db_name: dpanel
    prefix: ims_
    options:
      sslmode: require # additional parameters passed via options
```
