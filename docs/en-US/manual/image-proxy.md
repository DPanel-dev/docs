# Image Acceleration

## Recommended Acceleration Solution {#proxy-url}

:::warning
The acceleration address only applies to the current repository. Configuring the `docker.io` repository only applies to pulling images from Docker Hub. If you need to configure acceleration for `ghcr.io`, you need to add the `ghcr.io` repository first and fill in the acceleration address.
:::

Configure multiple acceleration addresses in the repository. The panel will use **polling** <Badge type="tip" text="DPanel Version >= 1.10.4" /> to pull images, prioritizing the fastest acceleration address.

You can query public acceleration addresses through [Image Acceleration Detection-1](https://status.1panel.top), [Image Acceleration Detection-2](https://status.anye.xyz/), or use [KSpeeder](https://kspeeder.com/) to build your own acceleration service.

## Configure Acceleration in Panel

An image address is composed of `registry address/namespace/image name:tag`, for example: `registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel:lite`. Images with omitted registry address use `docker.io` by default.

According to the registry address of the image, add the corresponding repository in [Registry Management](/manual/image-registry) and configure the acceleration address. The input box supports two formats: one address per line, or a `daemon.json` format array.

The configured acceleration address only takes effect for the current repository.

### Cannot Take Effect in Command Line

The panel's acceleration address is not written to docker's `daemon.json` file, so the acceleration address configured in the panel will not take effect in the `docker pull` command.
All image pull operations need to be completed in the panel.

Conversely, if an acceleration address is configured in `daemon.json` or a proxy address is configured in `docker.service`, it will take effect directly in the panel.

## Image Tag

:::tip

If you don't want two `tag`s, you can configure the acceleration or proxy in `Docker Daemon`.
:::

Images pulled through the acceleration address will be given two `tag`s by the panel, one is the original image name and the other is the image name using the acceleration address.

When pulling an image through the acceleration address, the image's `digest` value actually points to the acceleration address's `tag`.
Deleting the acceleration address's `tag` will cause the image `digest` value to be lost, making the container unable to normally detect image updates.

## Configure in Docker

### Proxy Address

Manually edit the `/lib/systemd/system/docker.service` file on the host and add the following content in the `[Service]` node:

```yaml
[Service]
Environment="http_proxy=http://192.168.0.2:7890"
Environment="https_proxy=http://192.168.0.2:7890"
... other configurations ...
```

### Acceleration Address

:::tip
You can obtain the configuration from the addresses in [Recommended Acceleration Solution](/manual/image-proxy#proxy-url)
:::

Manually edit `/etc/docker/daemon.json` on the host and add the following content:

```json
{
    "registry-mirrors": [
        "https://docker.1ms.run",
        "https://docker.1panel.live",
        "https://docker.m.ixdev.cn",
        "https://hub.rat.dev",
        "https://docker.xuanyuan.me"
    ]
}
```

### Restart Service

```shell [Restart docker service]
sudo sh -c "systemctl daemon-reload && systemctl restart docker"
```
