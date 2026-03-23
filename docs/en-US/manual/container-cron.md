# Scheduled Tasks <Badge type="tip" text="DPanel Version >= 1.4.0" />

## Add Scheduled Task

![image-container-1](//cdn.w7.cc/dpanel/container-cron-1.png)

## Execute Container

The DPanel panel runs in a container and does not have permission to directly run script commands on the host.
When configuring scheduled tasks, you need to specify a container to run commands, which by default run in the DPanel panel container.

In the DPanel panel container, you can normally use commands such as docker, docker compose, curl, git, etc.
The panel container is based on the alpine system, and you can also add required packages through the `apk add` command, for example:

:::code-group
```shell [Install vim]
apk add --no-cache --update vim
```
:::

## Execution Environment

The script execution environment is used to configure which interpreter the script executes under. Configure sh or bash according to the actual situation of the current container.

## Use Panel Control Commands

:::tip
Executing panel control commands must be in the DPanel container.
:::

The example shows how to determine whether the nginx-test container has a new version through control commands, thereby performing some operations.
The script is as follows, see [View Panel Control Commands](/install/ctrl) for details:

```shell
CHECK=$(/app/server/dpanel -f /app/server/config.yaml container:upgrade --name nginx-test)
if [ $CHECK == *"true"* ]; then
  # When the container has an update, perform some operations
  docker stop nginx-test && docker rm nginx-test
  docker run --name nginx-test -p 8080:80 nginx
fi
```

## Operate Host Environment

:::tip
Executing docker run related commands must be in the DPanel container and be able to normally pull the busybox image. If it cannot be pulled, please use acceleration to pull through the panel first.
:::

If you need to execute some commands on the host, you can switch to the host's shell environment by creating a new privileged proxy container, for example:

:::code-group

```shell [Operate host file system]
docker run --rm --name dpanel-host-proxy -v /:/host busybox \
ls -al /host
```

```shell [Get network information]
docker run --rm --name dpanel-host-proxy --pid host --privileged busybox \
nsenter --target 1 --net --mount -- /bin/sh -c "ip addr"
```

```shell [Get Docker configuration file]
docker run --rm --name dpanel-host-proxy --pid host --privileged busybox \
nsenter --target 1 --net --mount -- /bin/sh -c "cat /etc/docker/daemon.json"
```
:::

The example uses the busybox image. You can also replace it with other images you are more familiar with or have richer commands, such as alpine, ubuntu, etc.


## Execution Cycle

### Manual Execution <Badge type="tip" text="DPanel Version >= 1.9.2" />

Trigger tasks manually.

### Container Event <Badge type="tip" text="DPanel Version >= 1.9.2" />

Trigger tasks through container events, currently supports the following events:

- Container created
- Container destroyed
- Container started
- Container stopped

When a container event occurs, the event does not necessarily represent the container's state at that moment. For example, when a container restarts, it will repeatedly trigger **started** and **stopped** events.
To execute tasks more precisely, the container's state should be confirmed again in the trigger script. For example:

```shell
STATUS=$(docker inspect test2-nginx-1 --format '{{.State.Status}}')
RESTART_COUNT=$(docker inspect test2-nginx-1 --format '{{.RestartCount}}')
echo "Current container status: ${STATUS}, Is restarting: $([ "$RESTART_COUNT" -eq 0 ] && echo "No" || echo "Yes")"

# Perform corresponding operations based on the container's status
```

### Scheduled Task

Compatible with Linux scheduled task expressions, extended with **second** level parameters:

```
* * * * * *     Scheduled task expressions supported in dpanel
------------------------------------------
│ │ │ │ │ │
│ │ │ │ │ └────── Day of week (0 - 7) (Sunday is 0, Monday is 1 .... Saturday is 6)
│ │ │ │ └──────── Month (1 - 12)
│ │ │ └────────── Day of month (1 - 31)
│ │ └──────────── Hour (0 - 23)
│ └────────────── Minute (0 - 59)
└──────────────── Second (0 - 59)
```

#### Preset Cycle

The panel has preset some commonly used cycle fields for convenience:

| Execution Cycle Type | Execution Rule Description |
| :--- | :--- |
| **Monthly** | Execute on day x at hour x minute x every month |
| **Weekly** | Execute on week x at hour x minute x |
| **Daily** | Execute every day at hour x minute x |
| **Hourly** | Execute every hour at minute x |
| **Every N Days** | Execute every x days starting from the 1st of each month at hour x minute x |
| **Every N Hours** | Execute every x hours starting from 0:00 every day at minute x |
| **Every N Minutes** | Execute every x minutes starting from 0:00 every day |
| **Every N Seconds** | Execute every x seconds starting from 0:00 every day |
| **Custom** | Customize complex execution cycles based on the above scheduled task expressions (such as Cron expressions) |


## Task Timeout

Configure the task execution timeout. After exceeding the duration, the script execution will be forcibly terminated.

## Retain Log Count

Retain the execution result logs, default is 10. Execution may generate a large amount of result data, it is not recommended to configure this value too large.

## Execute Script & Environment Variables

The panel's scheduled tasks allow configuring some environment variable parameters when configuring scripts, used to replace parameters in the script.

You can also use the [Scheduled Task Script Template](/manual/system-cron-template) function to manage commonly used scripts.

### Use Environment Variables in Scripts

Define the following script and configure the `CONTAINER_NAME` parameter in environment variables:

```
docker restart ${CONTAINER_NAME}
```
