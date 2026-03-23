# Container Creation Parameters

## Container Identifier

The unique identifier name of the container

## hostname

> --hostname name

Specify the container's hostname


## Basic Configuration

### Bind Ports

> -p 8080:80 --publish-all --network host

Configure ports exposed by the container to the outside.

| External Access Port | Container Port | Description |
| --- | --- | --- |
| 8080 | 80 | Map container's port 80 to host's port 8080 |
| 127.0.0.1:8080 | 80 | Port only mapped to 127.0.0.1 |
| 8080 | 80/udp | Map udp port |
| 4444-5555 | 4444-5555 | Map port range |
| Bind Host Network |  | Map all ports in the container to the host |
| Bind All Ports |  | Generate random ports to map all ports in the container to the host |
| IPv6 |  | Also map container ports to IPv6 |

### Environment Variables

> -e TEST=name

Configure container environment variables, supports importing via file and batch adding


### Storage Configuration

> -v testvolume:/home -v /home/test:/home/test

If a persistent directory is declared in the image, Docker will automatically create an anonymous storage volume to mount the directory when creating the container.
A large number of anonymous storage volumes not only affects aesthetics but also makes it difficult to determine the ownership of storage volumes when containers are destroyed.

If you don't manually specify a mount directory, DPanel will name the storage volume based on [Site Identifier + Directory Name] to avoid Docker generating anonymous storage volumes.

If you need to mount these directories, you can configure [Storage Volume] or [Host File/Directory].
The difference is: storage volumes will sync data inside the container to the storage volume when creating the container, while mount directories will not.

### Network Configuration

> docker network create --driver bridge --subnet 192.168.100.0/24 --gateway 192.168.100.1 test \
> docker run --name test ... --network test --ip 192.168.100.2 ...

Docker's default bridge network cannot modify the container's IP address.
Through the network configuration function, after specifying the container's IP address, subnet, and gateway, the panel will automatically create a dedicated network with the same name as the container based on the configuration.

### DNS

> --dns 8.8.8.8 --dns 114.114.114.114

Configure the container's DNS address, specify one address per line

## Association Configuration

### Associate Containers

> docker network create test \
> docker run --name test ... --network test \
> docker network connect test othercontainer

Through the associate containers function, the panel will automatically create a network with the same name as the container and add all associated containers to the dedicated network.
In the dedicated network, any container can interconnect through the [Container Name.pod.dpanel.local] name

### Associate Network

> --network network name --ip ip address

Specify the network to join when creating the container. After enabling the [Associate bridge network] switch, the container will preferentially join the bridge network, otherwise the container will only join the associated network

### Associate Host Network

> --add-host=host.dpanel.local:host-gateway --add-host=my13.local:192.168.1.101

Inject the host IP and host IPs in the host's network into the container's `/etc/hosts` configuration.
When injecting the host IP, use `host-gateway`.

## Runtime Configuration

### Restart Policy

> --restart always

### command, entrypoint, user, working directory

> docker run ... --workdir /root --user root --entrypoint test.sh image name /bin/sh -c "tail -f"

Specify the container's running command, leave empty to use the value declared in the image

### Logs

> --log-opt max-size=10m --log-opt max-file=3

Specify the log driver and log cutting size in the container

### Health Check

> --health-cmd='curl -f http://127.0.0.1/' \
  --health-interval=10s --health-timeout=5s --health-retries=3

| Script Execution Environment | Script Example | Description |
| --- | --- | --- |
| Execute in Docker environment | curl -f http://127.0.0.1:80 | docker will request the port 80 address inside the container to test whether it can be accessed |
| Execute in container | curl -f http://127.0.0.1:80 \|\| exit 1 | Execute commands in the shell environment inside the container, depending on whether there is a curl command inside the container |

### Additional Execution Script

Configure a script to be executed after the container is created, the script can only be configured as a single line.

| Timing | Script Example | Description |
| --- | --- | --- |
| After container creation | apk add php && touch index.html && php -S 0.0.0.0:80 | After the container is created, install the php package, generate an index.html file in the working directory, and start the HTTP service. |

### Container Labels

> --label name=123

### Special Labels

#### Hide container from list

```
com.dpanel.container.hidden=true
```

## Resource Configuration

### Resource Limits

> --cpus 1 --memory 50M

### GPU

> --gpus all

## Capability Configuration

> --cap-add NET_ADMIN

Can enable or disable container permission capabilities
