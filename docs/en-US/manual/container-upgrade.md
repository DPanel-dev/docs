# Detection and Upgrade <Badge type="tip" text="DPanel Version >= 1.4.2" />

The container details page can check whether the current container has updates and upgrade the container.
The upgrade operation retains all configurations of the current container, re-pulls the image, and redeploys the container.

:::tip
Under multi-server, please ensure that each server's version is consistent, otherwise incompatibility may occur and cause the upgrade to fail.
:::

![container-upgrade-1](https://cdn.w7.cc/dpanel/container-upgrade-1.png)

## Detection Strategy

To avoid overly frequent requests to external interfaces, you can configure [Detection Strategy] when checking container upgrades:

- **Auto Detect**: Checks for updates every time you enter the container details page, can skip cache and force detection once.
- **Ignore This Time**: When the image used by the container has not changed, detection will be ignored.
- **Permanently Ignore**: Ignore the current container, other containers using the same image are not affected.


## Image Update Detection Logic

### Digest

The image's digest value is the unique identifier of the image in the remote repository. The panel detects image updates through this value.
If the image does not contain a digest value, updates cannot be detected.

For images supporting different architecture platforms, even if only one platform changes, it will cause the digest value to change, thereby detecting an update.

Images pulled using the panel's repository acceleration address have a digest value belonging to the acceleration tag. After deleting this tag, updates cannot be detected.

### Naming Convention

The image name such as `dpanel/dpanel:latest`, `dpanel/dpanel:lite`, etc., the part after the colon (:) is called Tag, used to identify the image version (digest).

Usually, the composition of tags has the following situations:

| Type | Example |
| :--- | :--- |
| Fixed identifier | `dpanel/dpanel:lite`, `nginx:latest`, `nginx:mainline`|
| Major version number | `dpanel/dpanel:1` `nginx:1.27` |
| Minor version number | `dpanel/dpanel:1.4.0-lite`, `nginx:1.27.3` |
| Based on release time | `minio/minio:RELEASE.2024-10-02T17-50-41Z` |

When an image is released, it will cover tags from large to small in order. For example, when nginx releases 1.27.4, it will be pushed to `nginx:1.27`, `nginx:latest`, `nginx:mainline`, `nginx:1.27.4`, etc. at the same time, while the minor version `nginx:1.27.3` will not be covered.

### Detect Updates

- When you use nginx:latest to create a container, when nginx has an update push, it can detect an update.
- When you use nginx:1.27 to create a container, an update is detected only when nginx releases a 1.27.* related version.
- When you use nginx:1.27.3 to create a container, usually no update can be detected.

When creating a container, you need to choose an appropriate image Tag based on your own situation to ensure that the [Quick Upgrade Container] function can be used normally.

## Update Rollback

When DPanel updates a container, it will stop the old container and rename it to [Container Name-Update Time], and the old image will also be renamed to [Image Name-Update Time].
After updating the container, you can restart the old container to complete the update rollback.
