# Control Command <Badge type="tip" text="DPanel Version >= 1.2.2" />

The control command needs to be run in the DPanel container. If you change the DPanel container name, please replace dpanel in the command below with your name

1. Log in to the server's ssh
2. Execute the control command in the DPanel container through the docker exec command
3. Execute the command

### Reset Admin Account {#user-reset}

#### Quick Reset

The user will be reset with a random password

```
docker exec dpanel ./dpanel -f config.yaml user:reset
```

#### Reset Password

```
docker exec dpanel ./dpanel -f config.yaml user:reset --password 123456
```

#### Reset Username

When resetting a username, you must also specify a password

```
docker exec dpanel ./dpanel -f config.yaml user:reset user:reset --password 123456 --username root
```

### Sync Store

- \--name The app store name

```
docker exec dpanel ./dpanel -f config.yaml store:sync --name somename
```

#### Result

```
{"total":151}
```

### Check Container New Version

- \--name Container name
- \--docker-env The docker environment to which the container belongs

```
docker exec dpanel ./dpanel -f config.yaml container:upgrade --name containername --docker-env local
```

#### Result

> upgrade is true to indicate an update

```
{"upgrade":false,"digest":"sha256:8f4ac2974ff707bace98ab14923fdf220f44a9803045b655f1d8d3e098f97e55","digestLocal":["registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel@sha256:8f4ac2974ff707bace98ab14923fdf220f44a9803045b655f1d8d3e098f97e55"]}
```

### Upgrade Container

- \--name Container name
- \--upgrade Upgrading the container
- \--docker-env The docker environment to which the container belongs

```
docker exec dpanel ./dpanel -f config.yaml container:upgrade --name containername --upgrade
```

#### Result

> When the container is not updated, the return value is the same as [Check Container New Version]

```
{"containerId": "14fc0a4d5e3e31f98f9179512085299b5c502ddf57d584ce39a7cadab6e3f643"}

```

### Container snapshot

- \--name Container name
- \--docker-env The docker environment to which the container belongs
- \--enable-image Backup container images

```
docker exec dpanel ./dpanel -f config.yaml container:backup --name containername --enable-image 1
```

#### Result

```
{"path":"/dpanel/backup/dpanel-doc/dpanel-dpanel-doc-20250424175215.snapshot"}
```

### Deploy compose task

- \--name compose Task name, the name of the task that has been deployed or discovered by the panel
- \--docker-env Specify the docker env environment name
- \--environment The environment variables required in yaml, multiple configurations are allowed
- \--service-name Only the service name to be deployed, multiple configurations are allowed
- \--remove-orphans Clean up and delete expired service containers
- \--pull-image Specify the image pull method dpanel command

```
docker exec dpanel ./dpanel -f config.yaml compose:deploy --name 任务名称 --remove-orphans 1 --environment name=test --environment age=10 --service-name test --service-name test2 --pull-image dpanel
```

#### Result

```
{"name":"test123"}

```