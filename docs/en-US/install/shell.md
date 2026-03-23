# Install Script

The install script generates and runs the docker run or podman run command to create DPanel container through wizard mode.

:::danger Dependencies
Before using the install script, make sure the system contains bash and curl commands, and use package management tools such as apt, yum, and apk to install dependencies.
:::

## Use

:::code-group

```shell [Root]
curl -sSL https://dpanel.cc/quick.sh -o quick.sh && bash quick.sh
```

```shell [Rootless]
sudo sh -c "curl -sSL https://dpanel.cc/quick.sh -o quick.sh && bash quick.sh"
```

```shell [Podman]
curl -sSL https://dpanel.cc/quick.sh -o quick.sh && bash quick.sh
```

```shell [Debug]
curl -sSL https://dpanel.cc/quick.sh -o quick.sh && bash quick.sh test

```
:::

### No Docker ?

:::tip 
If you want to use Podman as a container management client, please install by hand before running install script
:::

If the host doesn't have Docker or Podman installed, the install script will install Docker using the https://get.docker.com script.

The script has been tested on Debian, Ubuntu, and Alpine distributions; Debian is recommended.

If the script fails to install Docker, please install Docker or Podman by hand.

### Upgrade DPanel

You can use install script to upgrade the DPanel container already installed on your system.

After running the install script, specify the name of the DPanel container you want to upgrade.

The script will stop and back up the old container, then create the new DPanel container using the original container configuration and the latest image.

```
curl -sSL https://dpanel.cc/quick.sh -o quick.sh && bash quick.sh test
```
## Generate Docker API TLS certificate

After using the install script to generate a Docker API TLS certificate, configure the certificate according to [Protect the Docker daemon socket](https://docs.docker.com/engine/security/protect-access/).

## Preview

![install-1](https://cdn.w7.cc/dpanel/install-1.png?t=1)