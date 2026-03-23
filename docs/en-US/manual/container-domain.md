# Domain Forwarding <Badge type="tip" text="DPanel Family == Standard Edition" />

When containers are accessed externally, the container's internal ports can be mapped to host ports. The Standard Edition supports forwarding through domain binding.


## Change Default Port

:::danger
When configuring multiple Docker environments, only the server endpoint with the DPanel panel installed supports domain forwarding functionality.
If you need to forward containers from other Docker environments, please use "Intranet IP" or "Swarm Mode Create Container".
:::

When creating the panel, if 80 and 443 are bound to other ports, you need to carry the port number when accessing the domain:
`http://test.com:880` or `https://test.com:8443`

```js
docker run -d --name dpanel --restart=always \
 -p 880:80 -p 8443:443 -p 8807:8080 -e APP_NAME=dpanel \   // [!code focus]
 -v /Users/test/.docker/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## Domain Forwarding

In [Container Management] - [Domain Forwarding], add domain forwarding for the container.

![domain-1.png](https://cdn.w7.cc/dpanel/domain-1.png){data-zoomable}

## Forward to Panel Itself

When configuring domain forwarding for the panel itself, set [Destination Address] to 127.0.0.1 and [Destination Port] to 8080.

## Forward to Container

After adding a forwarding container through the [Select Container] function, the panel will automatically create a dpanel-local network and add the forwarding target container and the panel itself to that network. The forwarding configuration uses the container's hostname in the dpanel-local network.

The benefit is that forwarding can still work normally when the target container's IP changes. However, you need to ensure that both the DPanel panel container and the target container must join the dpanel-local network when rebuilt.

## Forward PHP-FPM

After creating a php environment through the app store, you can quickly create a new php website through the panel by adding the fpm forwarding type.

## Forward Containers Bound to Host Network

When forwarding containers bound to the host network (created with `--network host`), you can use the following methods:

If the DPanel panel is not bound to the host network, when creating the panel container, you need to [Bind Host](/install/docker#bind-host),
When forwarding, use `host.dpanel.local` as the address. This method completely decouples the host IP address and is recommended.
Or directly use the host's IP address in the LAN for forwarding, but after fixing the IP address, it will affect later migration.

If DPanel is also bound to the host network, you can directly use `127.0.0.1` when forwarding.


## Forward Containers by IP Address

Forward by directly filling in the container's IP address + port. The optional methods are as follows:

- `http://[Container's IP in Bridge network]:[Port inside container]`
- `http://[Host's IP address in LAN]:[Container mapped port]`
- `http://host.dpanel.local:[Container mapped port]`

## Forward Other Intranet Services

Forward to containers on other server endpoints through `http://[Server's IP]:[Container mapped port]`.
For example, if a container is deployed on a host at `192.168.0.13` and port 80 is mapped to the host's port 8080, the forwarding address is `http://192.168.0.13:8080`.
