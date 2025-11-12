# 为面板绑定域名 <Badge type="tip" text="DPanel Version >= 1.9.1" />

本例中使用的 http:\/\/127.0.0.1:8807 地址为示例，实际根据面板容器映射端口配置反向代理，
也可以使用 http:\/\/[面板在bridge网络的ip地址]:8080。


## Nginx 反向代理

:::warning
配置反向代理或是 cdn 请开启 websocket 支持
:::

```
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

## 配置子目录

配置面板子目录时，除了需要配置 Nginx 反向代理，还需要在创建面板容器时配置 [baseurl 环境变量](/install/params)。

```js
docker run -d --name dpanel --restart=always \
 -p 80:80 -p 443:443 -p 8807:8080 -e APP_NAME=dpanel \ 
 -e DP_SYSTEM_BASEURL="/apps" \  // [!code focus] 
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

```
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