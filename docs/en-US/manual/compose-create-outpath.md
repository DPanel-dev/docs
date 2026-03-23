# Manage Non-Panel Created Tasks

For compose projects not created by the panel, when managing them through the DPanel panel, you need to ensure the panel can access the related compose.yaml files.

You can mount a single yaml file or mount the entire compose directory into the panel container.

:::tip
When mounting the entire directory into the panel container, it needs to comply with the panel's directory specifications. For details, see [Create by Mounting Storage Path](/manual/compose-create#mount).
:::

## Mount Single YAML

### Find the YAML File Used by Compose Task

```shell
docker compose ls --filter name=my-compose
```

:::details Result
```
NAME                STATUS              CONFIG FILES
my-compose          running(1)          /home/compose.yaml
```
:::

### Mount That File into Panel Container

Mount the yaml file from CONFIG FILES into the panel container and keep the path the same, then the panel can manage that compose project.

```shell
docker run -d -it --name dpanel ...(other parameters omitted)... \
-v /home/compose.yaml:/home/compose.yaml \   // [!code focus]
dpanel/dpanel:latest
```

## Add External Task YAML in Panel Compose Directory

Create a new external task directory and yaml file in the panel's `/dpanel/compose` directory. When creating a new directory, note that it must be consistent with the external task name.

```
/dpanel
├─ /compose
│  ├─ /my-compose
│  │  └─ compose.yaml  # yaml filename only supports compose.yaml or docker-compose.yaml
│  └─ ...
└─ ....
```

## Delete External Task

Since external task yaml files are not managed by the panel, deleting an external task is equivalent to deleting all containers under that compose.
For residual yaml files, you need to manually delete them.
