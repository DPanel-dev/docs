# Container Updates <Badge type="tip" text="DPanel Version >= 1.11.2" />

When updating a container, DPanel pulls the image again and recreates the container using its existing configuration. Whether the old container is retained depends on the backup option. If the image has not changed, this simply rebuilds the container with the same image.

You can check and update a single container in `Container Details`, or check and update multiple containers on the `Container Updates` page.

##### Update a Container

![container-upgrade-1](https://cdn.w7.cc/dpanel/container-upgrade-1.png?t=3)

##### Batch Updates

![container-upgrade-2](https://cdn.w7.cc/dpanel/container-upgrade-2.png?t=3)

## Check Cache

Container update checks are managed through `Container Updates`. DPanel records the check time, status, and any errors for each container.

To avoid frequent registry requests, opening or refreshing `Container Details` reuses results from the last 10 minutes and runs a new check if they are older. Batch check results in `Container Updates` are refreshed only when you run a check manually.

## Ignore Checks

For containers using local images or those you do not want to update, you can choose one of the following ignore modes. Running a manual check in `Container Details` removes the container's ignore setting.

- **Ignore Current Version**: Ignores only the image version currently used by the container. Checks can resume after its image changes.
- **Ignore Permanently**: Always ignores this container. Other containers using the same image are not affected.

## How Update Detection Works

A digest identifies image content. DPanel compares local and remote digests to detect updates. It also reports an update when the same local tag points to a different image from the one used by the container.

For multi-architecture images, changes to another architecture may change the overall digest and trigger an update notice, even if the image for your architecture is unchanged.

If deleting a registry mirror tag removes the local digest, DPanel can still try using historical digests saved in the container.

Containers created with a fixed image ID or an `image@sha256:…` reference do not support update checks.


### Detection Rules

If the same local tag points to a different image, DPanel reports an update immediately. Otherwise, it queries the remote digest. When local digests are missing, it tries historical digests saved in the container.

| Condition | Result |
| :--- | :--- |
| The same local tag points to a different image from the one used by the container | Update available; no remote query |
| The remote digest matches any local or historical digest used for comparison | No update available |
| The remote digest matches none of the available digests | Update available |
| Both local and historical digests are missing, but the remote manifest is successfully retrieved | Update available, even if the remote response contains no digest |
| The remote manifest does not exist, or local or historical digests are available but the remote response contains no digest | Unable to check |
| A query fails due to network, authentication, or other errors | Check failed |

### Naming Convention

The part after the colon in an image name is called a tag, such as `latest` in `dpanel/dpanel:latest`. Tags identify versions or release variants, and the same tag can point to different image content over time.

Common tag naming patterns include:

| Type | Example |
| :--- | :--- |
| Fixed identifier | `dpanel/dpanel:lite`, `nginx:latest`, `nginx:mainline` |
| Version series | `dpanel/dpanel:1`, `nginx:1.27` |
| Specific version | `dpanel/dpanel:1.4.0-lite`, `nginx:1.27.3` |
| Release timestamp | `minio/minio:RELEASE.2024-10-02T17-50-41Z` |

The publisher decides whether a tag is updated. DPanel checks only the image associated with the current tag; it does not compare version numbers or switch tags automatically.

## Update Rollback

Select `Back up the old container before updating` to retain a backup named `container-name-bak-timestamp`. No backup is retained by default.
To roll back, stop the new container, then start the backup container. This does not restore mounted data.
