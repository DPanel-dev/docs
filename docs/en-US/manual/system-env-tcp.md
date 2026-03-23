# Enable Docker Tcp Connection

## Systemd

:::code-group
```shell [Modify startup configuration file]
sudo vi /lib/systemd/system/docker.service
```

```shell [Override startup configuration file]
sudo vi /etc/systemd/system/docker.service.d/override.conf
```

```shell [Override startup configuration file]
systemctl edit docker
```
:::

### Configure TCP Listening

Add TCP listening to the original startup parameters:

```js
[Service]
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock // [!code --]
ExecStart=  // [!code ++]
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H fd:// --containerd=/run/containerd/containerd.sock // [!code ++]
```

### Configure TCP TLS Listening {#tls}

:::danger
When in a public network environment, enabling TCP connection must enable TLS.
:::

#### Generate Certificate

:::code-group
```shell [Generate using installation script]
curl -sSL https://dpanel.cc/quick.sh -o quick.sh && bash quick.sh
```
```shell [Generate manually]
https://docs.docker.com/engine/security/protect-access/
```
:::

#### Certificate Files

| Name | Description |
| ------------- | :-----------: |
| ca.pem | Upload certificate when enabling TLS for adding multi-server |
| cert.pem | -- |
| key.pem  | -- |
| ca.pem | Certificate associated when Docker configures TLS |
| server-cert.pem | -- |
|server-key.pem  | -- |

#### Modify Docker Startup Parameters

```js
[Service]
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock // [!code --]
ExecStart=  // [!code ++]
ExecStart=/usr/bin/dockerd --tlsverify --tlscacert=/root/docker-ca/ca.pem --tlscert=/root/docker-ca/server-cert.pem --tlskey=/root/docker-ca/server-key.pem -H tcp://0.0.0.0:2376 -H fd:// --containerd=/run/containerd/containerd.sock // [!code ++]
```

### Reload Configuration & Restart Service

```shell
sudo sh -c "systemctl daemon-reload && systemctl restart docker"
```

## Windows Docker Desktop

Enable TCP connection through Setting -> General -> Expose daemon on tcp://localhost:2375 without TLS.
