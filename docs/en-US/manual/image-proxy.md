# Image Acceleration

## Configure Acceleration in Panel

:::tip
The panel provides Docker Hub repository by default, no need to add it again.
:::

According to the corresponding repository address of the image, add the corresponding repository in [Registry Management](/manual/image-registry) and configure the acceleration address.

For example, if you need to configure the acceleration address for ghcr.io, you need to add the ghcr.io repository first and fill in the acceleration address.
The acceleration configured in ghcr.io only applies to itself.

### Cannot Take Effect in Command Line

The panel's acceleration address does not modify docker's daemon.json file, so the acceleration address configured in the panel will not take effect in the docker pull command.
All image pull operations need to be completed in the panel.

### Image Tag

Images pulled through the acceleration address will be given two tags by the panel, one is the original image tag, and the other is the tag using the acceleration address.

When pulling an image through the acceleration address, the image's digest value actually points to the acceleration address's tag.
Deleting the acceleration address's tag will cause the image digest value to be lost, making the container unable to normally detect image updates.

You can also directly configure the acceleration address in docker's daemon.json, which will not generate an image acceleration tag.

### Recommended Acceleration Solution

Configure multiple acceleration addresses in the repository. The panel will use polling to pull images until successful or failed.
You can query public acceleration addresses through [Image Acceleration Detection-1](https://status.1panel.top), [Image Acceleration Detection-2](https://status.anye.xyz/).
You can also use [KSpeeder](https://kspeeder.com/) to build an image acceleration service.

Just add the address to the acceleration address list.

## Configure Acceleration Address in Docker

Since the panel runs in a container and cannot directly edit the Docker configuration file,
You need to manually edit the `/lib/systemd/system/docker.service` file and add the following content in the `[Service]` node:

```yaml
[Service]
Environment="http_proxy=http://192.168.0.2:7890"
Environment="https_proxy=http://192.168.0.2:7890"
... other configurations ...
```

:::code-group
```shell [Restart docker service]
sudo sh -c "systemctl daemon-reload && systemctl restart docker"
```
:::
