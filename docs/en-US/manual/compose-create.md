# Create Containers with Compose

![compose-create](https://cdn.w7.cc/dpanel/compose-create.png)

## Site Identifier

Used to identify the compose project name. When deploying multiple projects with the same compose.yaml, they are distinguished by the site identifier.

## YAML Source

### App Store

![compose-store-1](https://cdn.w7.cc/dpanel/compose-store-1.png)

After [adding an app store](/manual/system-store), click install to go to the Compose [Create Task] page, complete and modify environment variables and related information, then deploy the task.

After installing through the app store, related files will be synced to the `/dpanel/compose` directory.
To ensure yaml files in the app store can be updated at any time, it's recommended to use [override configuration](/manual/compose-create-override) when modifying yaml configurations.

### Create from YAML Text

You can create Compose tasks directly through yaml text. After creating the task, the panel will save the corresponding files to the `/dpanel/compose` directory.

### Remote URL

You can create tasks directly using a remote yaml address.
The difference from **text creation** is: each time you deploy, the panel will pull the latest file content from the remote address for deployment.

### Git Repository <Badge type="tip" text="DPanel Version >= 1.9.1" />

You can directly clone a remote git repository locally to create tasks.

### Mount Storage Path {#mount}

When creating the DPanel panel, you can mount the panel's `/dpanel` directory to the host machine.
Place projects in `/dpanel/compose`, and the panel will automatically discover these directories and create corresponding compose tasks.

You can mount the entire `/dpanel/compose` directory or an individual task directory into the panel container. The following example includes both:

```js
docker run -d -it --name dpanel ...(other parameters omitted)... \
-v /home/dpanel:/dpanel -v /mnt/compose:/dpanel/compose -v /test/dpanel:/dpanel/compose/dpanel \   // [!code focus]
dpanel/dpanel:latest
```

Each project needs to create a subdirectory, and the directory name is the [Site Identifier].
The subdirectory contains one of `docker-compose.yaml`, `docker-compose.yml`, `compose.yaml`, or `compose.yml` files.

#### Directory Structure

```
/dpanel
├─ /compose
│  ├─ /easyimage                        Project subdirectory, directory name is the identifier
│  │  ├─ docker-compose.yaml            The project's compose yaml file
│  │  └─ docker-compose-override.yaml   Custom override configuration file, ending with override.yaml or override.yml
│  ├─ /lucky
│  │  └─ compose.yaml
│  ├─ /qinglong                         Other projects
│  │  └─ compose.yml
│  └─ ...
└─ ....
```

#### Symlink Compose Directories for Binary Deployments

These examples apply when running the DPanel binary on the host. `/home/dpanel-1` is an example data directory; replace it with your actual path. Choose one of the two approaches below; do not run them in sequence.

Before creating a symlink, the source directory and the parent directory of the link location must exist. The link location must not already contain a file, directory, or symlink with the same name. If it does, safely migrate the existing content first; `ln -s` does not replace an existing directory with a symlink.

Entire directory:

```shell
ln -s /mnt/compose /home/dpanel-1/compose
```

Individual task directory:

Automatic discovery does not currently detect symlinks to individual task directories. To add a task, select "Mounted Directory" on the creation page, use the link directory name as the task identifier, and prepare `docker-compose.yaml` in the source directory.

```shell
ln -s /mnt/compose/dpanel /home/dpanel-1/compose/dpanel
```
