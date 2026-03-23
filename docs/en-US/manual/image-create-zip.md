# Build Image Through Zip & Git

The difference between building images with Zip packages and Git repositories is: Git is better for sustainable building, while Zip packages are more suitable for single, simple, and quick builds.

## Example

Use the DPanel repository address to quickly build the DPanel image:

:::code-group
```shell [Repository Address]
https://github.com/donknap/dpanel-docs.git
```
:::

## Configuration Instructions

### Build Directory

Specify the root directory when building the image. When using COPY or ADD commands, use this directory as the root directory.
If the configured path is `app/services/nginx`, the corresponding command syntax is:

```shell
docker -t test app/services/nginx
```

### Build Dockerfile Path

Specify the Dockerfile filename or path when building the image. The Dockerfile path always starts from the [Build Directory].

For example, if the Dockerfile path is **app/service/nginx/dockerfile/Dockerfile**, after configuring the [Build Directory] as **app/service/nginx**,
Configure the Dockerfile path as **dockerfile/Dockerfile**.

### Build Arguments

Specify the `--build-arg` parameters when building the image.

## Continuous Build (Git Webhook To Be Supported)

When building images using Git, automatic triggering builds through webhook is available (not yet supported).
