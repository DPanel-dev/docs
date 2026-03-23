# Common Questions

### Docker Hub Image Pull Failed

##### Error Message

```
Retrying in 3 seconds

download failed after attempts=6: dial tp 108.160.170.44:443: connect: connection refused
```

- Please enable proxy
- Use domestic image sources. DPanel's domestic image address is ccr.ccs.tencentyun.com/dpanel/dpanel:latest

### Unable to Start DPanel

##### Error Message

```
Error starting userland
proxy: listen tcp4 0.0.0.0:80: bind: address already in use
```

- The server has management software similar to Baota installed, occupying port 80. Change ports during deployment, for example: -p 880:80 -p 8443:443.
- Remove the configuration for binding 80 and 443.

### Prompt dpanel-local Network Already Exists

##### Error Message

```
network dpanel-local was found but has incorrect label com.docker.compose.network set to ""
```

- Delete the dpanel-local network: docker network rm dpanel-local
