# 开启 Docker Tcp 连接

## Systemd 

:::code-group
```shell [修改启动配置文件]
sudo vi /lib/systemd/system/docker.service
```

```shell [覆盖启动配置文件]
sudo vi /etc/systemd/system/docker.service.d/override.conf
```

```shell  [覆盖启动配置文件]
systemctl edit docker
```
:::

### 配置 Tcp 监听

在原有的启动参数中新增 tcp 监听

```js
[Service]
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock // [!code --]
ExecStart=  // [!code ++]
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H fd:// --containerd=/run/containerd/containerd.sock // [!code ++]
```

### 配置 Tcp TLS 监听 {#tls}

:::danger
处于公网环境时，开启 Tcp 连接时必须开启 TLS
:::

#### 生成证书

:::code-group
```shell [安装脚本生成]
curl -sSL https://dpanel.cc/quick.sh -o quick.sh && bash quick.sh
```
```shell [手动生成]
https://docs.docker.com/engine/security/protect-access/
```
:::

#### 证书文件

| 名称 | 描述 |
| ------------- | :-----------: |
| ca.pem | 添加多服务端开启 TLS 上传证书 |
| cert.pem | --  |
| key.pem  | --  |
| ca.pem | Docker 配置 TLS 时关联证书 |
| server-cert.pem | --  |
|server-key.pem  | --  |

#### 修改 Docker 启动参数

```js
[Service]
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock // [!code --]
ExecStart=  // [!code ++]
ExecStart=/usr/bin/dockerd --tlsverify --tlscacert=/root/docker-ca/ca.pem --tlscert=/root/docker-ca/server-cert.pem --tlskey=/root/docker-ca/server-key.pem -H tcp://0.0.0.0:2376 -H fd:// --containerd=/run/containerd/containerd.sock // [!code ++]
```

### 重载配置&重启服务

```shell
sudo sh -c "systemctl daemon-reload && systemctl restart docker"
```

## Windows Docker Desktop

通过 Setting -> General -> Expose daemon on tcp://localhost:2375 without TLS 开启 TCP 连接