# Update DPanel

DPanel can update itself from within the panel. During an update, the panel invokes the DPanel installer. The installer reads the current instance configuration, pulls the new image, and recreates the panel container.

The update keeps the current container name, ports, mounts, and runtime configuration. Make sure the container's `/dpanel` directory remains mounted to the original volume or host path so that recreating the container does not remove panel data.

## Update from the panel

Go to **System -> System Update**, check for a new version, and start the update.

![upgrade](https://cdn.w7.cc/dpanel/system-upgrade.png)

The panel does not replace the application directly inside its running container. Instead, it starts an independent installer to complete the update. The installer stops and recreates the panel container, so the panel will be temporarily unavailable. Refresh the page after the container has restarted.

:::warning Before updating
- We recommend backing up the panel data from **System -> Panel Settings -> Usage and Backup**.
- Do not manually stop or remove installer-related containers or processes during the update.
- If the page looks incorrect after the update, force-refresh the browser to clear old static assets from its cache.
:::

## Update manually with the installer

Updates started from the panel and updates started manually use the same workflow. If the panel is unavailable or an in-panel update fails, use the [DPanel installer](/install/shell) on the host and select the corresponding instance to update it.

## Update with Docker Compose

If the panel is managed by Docker Compose, you can also run the following command in the Compose project directory:

```shell
docker compose up -d --pull always
```

Before updating, confirm that the Compose configuration still mounts the existing `/dpanel` data directory.
