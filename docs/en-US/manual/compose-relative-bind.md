# Compose Relative Directories

When mounting data in a Compose YAML file, you can use a `relative directory` to specify the data mount directory.
A relative directory is resolved from the directory containing the YAML file.
Using relative directories makes it easier to manage Compose configuration and data together.

```yaml
services:
  app:
    image: example/app
    volumes:
      - ./data:/data
```

Assume the project is named `example` and the YAML file is located at `/home/compose/example/compose.yaml`.
Then `./data` refers to the `/home/compose/example/data` directory beside the YAML file.

## Mount `/dpanel` from a Host Directory

Assume that the host directory `/home/dpanel` is mounted to `/dpanel` when creating the DPanel container.

:::tip
You can also mount the Compose directory separately:

-v /home/dpanel:/dpanel <br />
-v /home/compose:/dpanel/compose

:::

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest // [!code focus]
```

In the example above, `./data` is located at `/dpanel/compose/example/data` inside the DPanel container,
corresponds to `/home/dpanel/compose/example/data` on the host, and is ultimately mounted at `/data`
in the application container.

In other words, the actual location of a `relative directory` depends on which host directory the DPanel
container's `/dpanel` or `/dpanel/compose` directory is mounted to.

## Mount `/dpanel` Using a Docker Volume

Assume that the Docker volume `dpanel-data` is mounted to `/dpanel` when creating the DPanel container.

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v dpanel-data:/dpanel dpanel/dpanel:latest // [!code focus]
```

If `/dpanel` is not mounted explicitly, or if `-v dpanel-data:/dpanel` is used, the directory is mounted
as a Docker volume. Docker manages the contents of a volume and its mount internally.

Directories inside a volume cannot be used directly as host paths. Therefore, using `./data:/data` cannot
mount data from a `relative directory`.
If you need to use project data inside the volume, declare `dpanel-data` as an external volume and use
`volume.subpath` to specify the relative directory.

:::tip
`subpath` must be specified relative to the root of the Docker volume. The directory must already exist,
must not begin with `/`, and `volume.subpath` requires Docker API `1.45` or newer.
:::

```yaml
services:
  app:
    image: example/app
    volumes:
      - type: volume
        source: dpanel-data
        target: /data
        volume:
          subpath: compose/example/data

volumes:
  dpanel-data:
    external: true
```

The configuration above mounts the `compose/example/data` subdirectory from the `dpanel-data` volume at
`/data` in the application container.
