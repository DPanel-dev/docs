# Update DPanel Panel

> The panel cannot self-update. Update operations need to be executed on the host machine.

Updating the panel means re-pulling the image and rebuilding the dpanel container.
During the operation, ensure that the container's `/dpanel` directory is still mounted to the previous storage volume or path when rebuilding.

### Update Through One-Click Script

When running the one-click script, if the specified container name already exists, the script will execute the update logic. See [One-Click Installation Script](/install/shell) for details.

### Update Using docker run Command

You can get the panel update script command through [System] -> [System Update] menu.

The update script will automatically obtain the dpanel container's installation parameters and generate an update command.

### Update Using docker compose

```
docker compose up -d --pull always
```

### Update Through Creating Panel Clone

Copy the panel container and check [Bind Random Port] to create a panel clone. Open the clone and upgrade the original panel container. After the upgrade is complete, delete the clone container in the original panel.
