# Compose Relative Directories

## What Is a Compose Relative Directory?

Paths beginning with `./` or `../` are relative directories in Compose. They are resolved from the directory containing `compose.yaml`.

Suppose `compose.yaml` is stored in `/dpanel/compose/example`:

```text
/dpanel/compose/example
├── compose.yaml
└── data
```

The Compose configuration is:

```yaml
services:
  app:
    image: example/app
    volumes:
      - ./data:/data
```

Here, `./data` refers to `/dpanel/compose/example/data`, while `/data` is its mount point inside the `app` container.

DPanel's `/dpanel` directory can use either a host bind mount or a Docker volume. Each storage type requires a different configuration.

## Bind Mount `/dpanel` from the Host

When creating DPanel, mount the host directory `/home/dpanel` at `/dpanel` in the container:

```bash
docker run -d --name dpanel \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /home/dpanel:/dpanel \
  dpanel/dpanel:latest
```

The DPanel path `/dpanel/compose/example` now corresponds to `/home/dpanel/compose/example` on the host, so the relative directory can be used directly:

```yaml
services:
  app:
    image: example/app
    volumes:
      - ./data:/data
```

After deployment, `/home/dpanel/compose/example/data` on the host is mounted at `/data` inside the `app` container.

## Mount `/dpanel` from a Docker Volume

You can also create DPanel with a Docker volume named `dpanel-data`:

```bash
docker run -d --name dpanel \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v dpanel-data:/dpanel \
  dpanel/dpanel:latest
```

The project files are now stored in the `dpanel-data` volume, so `./data:/data` cannot reference the directory inside that volume. Declare the volume as external and use `subpath` to select the project data directory:

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

This configuration mounts `compose/example/data` from the `dpanel-data` volume at `/data` inside the `app` container.

::: tip

- `subpath` is relative to the volume root and must not start with `/`.
- The directory referenced by `subpath` must exist before the service starts.
- Docker API `1.45` or newer is required.

:::
