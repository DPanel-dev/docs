# Migrate from Other Third-Party Platforms

The panel supports migrating compose tasks from other third-party platforms to DPanel by mounting directories.

## Portainer Migration

If the portainer container's `/data` directory is mounted on the host's `/home/portainer` directory.

When creating the DPanel panel, you need to mount the `/home/portainer/compose` directory to the DPanel container's `/data/compose` directory.
Add mount parameters when creating, as follows:

```shell
docker run -d --name dpanel ...(other parameters omitted)... \
 -v /home/portainer/compose:/data/compose \
 dpanel/dpanel:lite
```

### Change Directory Name

Since Portainer's compose directory is named with the data ID, to let DPanel recognize these tasks, you need to change the numerically named directories to be named with the compose identifier.

## Dockge Migration

```shell
docker run -d --name dpanel ...(other parameters omitted)... \
 -v /opt/stacks:/opt/stacks \
 dpanel/dpanel:lite
```
