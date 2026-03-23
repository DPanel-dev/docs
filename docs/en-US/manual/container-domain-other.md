# Use Third-Party System Domain Forwarding

The Lite Edition needs to rely on other third-party systems' reverse proxy functionality to bind domain forwarding.

## Forward Through Container Bridge Network IP

When forwarding through the container's IP in the Bridge network, you don't need to map the container's internal ports when creating the container. Forward directly through the container's IP in the Bridge network.

However, the IP is not fixed. As the container stops and restarts, the IP may change.

```shell
location / {
    proxy_pass http://[Container's IP in Bridge network]:[Port inside container];
}
```

## Forward Through Mapped Ports

When mapping the container's internal ports to host ports, you can forward through `127.0.0.1`:

```shell
location / {
    proxy_pass http://127.0.0.1:[Container mapped port];
}
```
