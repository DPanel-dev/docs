# Panel Control Commands <Badge type="tip" text="DPanel Version >= 1.2.2" />

## Call Method

Please modify the example code according to the current environment when executing commands.

### Container Installation

:::tip
Replace `dpanel` in the command below with the name of your panel container.
:::

1. Log in to the server via SSH.
2. Use `docker exec` to run a control command in the DPanel container.
3. Run the command you need.

```
docker exec dpanel system:info
```

### Binary Invocation

```shell [Using a YAML config file]
/app/server/dpanel -f /app/server/config.yaml system:info
```

```shell [Using environment variables]
export STORAGE_LOCAL_PATH=/dpanel/data && /app/server/dpanel -f /app/server/config.yaml system:info
```

## View System Information {#system:info}

`system:info` displays the current DPanel runtime environment, access address, security entrance, and administrator account (with the password masked).

```
./dpanel -f config.yaml system:info
```

## Reset Admin User

### Quick Reset

Use a random password to reset user

```
./dpanel -f config.yaml user:reset
```

### Reset Password

```
./dpanel -f config.yaml user:reset --password 123456
```

### Reset Username

When resetting username, must specify password

```
./dpanel -f config.yaml user:reset user:reset --password 123456 --username root
```

## Set the Security Entrance

:::warning
Set `--entrance` to `none` to disable access through the security entrance.
:::

- `--entrance` specifies the security entrance. Leave it empty to generate a random entrance.

```
./dpanel -f config.yaml system:reset --entrance
```

## System Cleanup and Reset

- `--cache` clears rebuildable caches, notices, Docker events, and temporary files.
- `--online-user` invalidates all online users.

```
./dpanel -f config.yaml system:reset --cache --online-user
```

## Update App Store Data

- --name Specify app store name

```
./dpanel -f config.yaml store:sync --name test
```

### Return

```
{"total":151}
```

## Detect Container Updates

- --name Specify the container name to detect
- --docker-env Specify docker env environment name, default: local

Each command execution bypasses the existing check cache and queries the remote registry directly.

```
./dpanel -f config.yaml container:upgrade --name containerName --docker-env local
```

### Return

> `upgrade` set to `true` means an update is available. When a check fails, `error` contains the reason.

```
{"upgrade":false,"digest":"sha256:8f4ac2974ff707bace98ab14923fdf220f44a9803045b655f1d8d3e098f97e55","digestLocal":["registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel@sha256:8f4ac2974ff707bace98ab14923fdf220f44a9803045b655f1d8d3e098f97e55"],"error":""}
```

## Upgrade Container

- --name Specify container name
- --docker-env Specify docker env environment name
- --enable-bak Whether to backup old container, default: true
- --disable-bak Do not backup old container, equivalent to --enable-bak=false
- --image-tag Specify new image name, this image must be fully compatible with the container's image

```
./dpanel -f config.yaml container:upgrade --upgrade --disable-bak --name containerName
```

### Return

> Before upgrading, DPanel checks the container image for updates using the same logic as **Detect Container Updates**.

```
{"containerId": "14fc0a4d5e3e31f98f9179512085299b5c502ddf57d584ce39a7cadab6e3f643"}

```

## Generate Container Snapshot

- --name Specify the container name to detect
- --docker-env Specify docker env environment name
- --enable-image Whether to backup container image
- --backup-image Backup image type image or container (docker commit)
- --enable-volume Whether to backup mount directories
- --backup-volume Specify the mount directory to backup

```
./dpanel -f config.yaml container:backup --name ContainerName --enable-image --enable-volume
```

### Return

```
{"path":"/dpanel/backup/dpanel-doc/dpanel-dpanel-doc-20250424175215.snapshot"}
```

## Deploy or Upgrade Compose Task

- --name Compose task name, already deployed or discoverable task name in the panel
- --docker-env Specify docker env environment name
- --environment Environment variables required in yaml, can configure multiple, --environment test=1
- --pull-image Specify image pull method dpanel command

```
./dpanel -f config.yaml compose:deploy --name TaskName --environment name=test --environment age=10 --pull-image dpanel
```

### Return

```
{"name":"test123"}

```

## Send Notification <Badge type="tip" text="DPanel Version >= 1.9.2" />

- --subject Notification title
- --content Notification content
- --target Notification target, email method is mailbox.
- --channel Notification method email

```
./dpanel -f config.yaml system:notice  --content test123 --target 914417117@qq.com --subject Test notification
```

### Return

```
{"code":200,"error":"","data":"success"}

```

## Simple Cache Data Storage <Badge type="tip" text="DPanel Version >= 1.9.2" />

Using the cache data storage function, you can cache data or detect flag bits in scripts.

- --key Cache name
- --value Cache content, when empty get content of --key
- --keep Cache lifecycle (seconds), default is -1 (until main program restarts)

```
./dpanel -f config.yaml system:cache --key test1 --value 123
```

### Return

```
{"value":"123","found":true}

```

## Backup Panel Data <Badge type="tip" text="DPanel Version >= 1.9.4" />

Backup DPanel panel data

- --backup-path Directory to backup, leave empty for all
- --ignore-path-prefix Skip directory prefix to backup, --ignore-path-prefix storage/temp skips directories or files starting with storage/temp

```
./dpanel -f config.yaml system:backup
```

### Return

```
{"path":"dpanel-main-20260226191909.snapshot"}

```
