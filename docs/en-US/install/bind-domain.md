# Bind Domain for Panel <Badge type="tip" text="DPanel Version >= 1.9.1" />

This example uses `http://127.0.0.1:8807` as an example. In practice, configure reverse proxy based on the panel container's mapped port.
You can also use `http://[panel's bridge network IP address]:8080`.

## Nginx Reverse Proxy

:::warning
When configuring reverse proxy or CDN, please enable WebSocket support.
:::

```nginx
server {
    listen 80;
    server_name test.dpanel.cc;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;

        proxy_pass http://127.0.0.1:8807/;
        proxy_redirect off;
    }
}
```

## Configure Subdirectory

When configuring a panel subdirectory, besides configuring Nginx reverse proxy, you also need to configure the [baseurl environment variable](/install/params) when creating the panel container:

```shell
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \
 -e DP_SYSTEM_BASEURL="/apps" \  // [!code focus]
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

```nginx
server {
    listen 80;
    server_name test.dpanel.cc;
    location /apps {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;

        proxy_pass http://127.0.0.1:8807/apps;
        proxy_redirect off;
    }
}
```
