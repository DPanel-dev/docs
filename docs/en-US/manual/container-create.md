# Create Single Container

A single container refers to an application that can run independently without associating with other containers.

## Configuration

Taking creating a minio container as an example

| Configuration Group | Configuration Item | Value | Description |
| ------ | --- | --- | --- |
| Basic Configuration | Container Identifier | minio | Name of the created container |
|Basic Configuration| Image | docker.1panel.live/minio/minio:latest | Use the [Pull Image] button to get the image |
|Basic Configuration| Bind Port | 9000 | Map port 9000, leave empty for random generation |
|Basic Configuration| Bind Port | 9001 | Map port 9001, leave empty for random generation |
| Storage Configuration| Custom Mount or Storage Volume | miniodata or /home/miniodata | Specify mount /data directory or storage volume, leave empty to generate storage volume |
| Runtime Configuration | Command | server /data --console-address :9001 | Configure startup parameters |

## Access

Use `http://127.0.0.1:9001` to access.

Default username and password are both `minioadmin`.
