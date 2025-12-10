# Install with Compose

## Compose Yaml
:::code-group

```yaml [Standard Edition]
services:
  dpanel:
    image: dpanel/dpanel:latest
    container_name: dpanel # Changing contianer_name, please modify the APP_NAME environment variable below
    restart: always
    ports:
      - 80:80
      - 443:443
      - 8807:8080 # Replace 8807 to change the panel management port
    environment:
      APP_NAME: dpanel # Please keep this name consistent with container_name
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /home/dpanel:/dpanel # Change /home/dpanel to the host directory you want to mount.
    extra_hosts:
      - "host.dpanel.local:host-gateway"
    logging:
      driver: "json-file"
      options:
        max-size: "5m"
        max-file: "10"
```

```yaml [Lite Edition]
services:
  dpanel:
    image: dpanel/dpanel:lite
    container_name: dpanel # Changing contianer_name, please modify the APP_NAME environment variable below
    restart: always
    ports:
      - 8807:8080 # Replace 8807 to change the panel management port
    environment:
      APP_NAME: dpanel # Please keep this name consistent with container_name
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /home/dpanel:/dpanel # Change /home/dpanel to the host directory you want to mount.
    extra_hosts:
      - "host.dpanel.local:host-gateway"
    logging:
      driver: "json-file"
      options:
        max-size: "5m"
        max-file: "10"
```

:::