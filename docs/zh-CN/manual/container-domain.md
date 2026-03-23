# 域名转发 <Badge type="tip" text="DPanel Family == 标准版" />

容器对外访问时，可将容器内部端口映射到宿主机端口，标准版支持通过绑定域名进行转发。


## 更改默认端口

:::danger
配置多个 Docker 环境时，只有安装了 DPanel 面板的服务端支持域名转发功能。
如需转发其他 Docker 环境的容器，请使用「内网IP」或「Swarm 模式创建容器」。
:::

创建面板时如将 80、443 绑定到其他端口，访问域名时需携带端口号：
`http://test.com:880` 或 `https://test.com:8443`

```js
docker run -d --name dpanel --restart=always \
 -p 880:80 -p 8443:443 -p 8807:8080 -e APP_NAME=dpanel \   // [!code focus]
 -v /Users/test/.docker/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 域名转发

在【容器管理】-【域名转发】为容器添加域名转发。

![domain-1.png](https://cdn.w7.cc/dpanel/domain-1.png){data-zoomable}

## 转发到面板自身

为面板自身配置域名转发时，将【目标地址】配置为 127.0.0.1 【目标端口】配置为 8080 即可。

## 转发到容器

通过【选择容器】功能添加转发容器后，面板会自动创建 dpanel-local 网络，并将转发目标容器与面板自身加入该网络。转发配置采用容器在 dpanel-local 网络中的 hostname。

好处是目标容器 IP 变化时仍可正常转发。但需确保 DPanel 面板容器和目标容器重建时必须加入 dpanel-local 网络。

## 转发 PHP-FPM

通过应用商店创建的 php 环境后，可通过面板添加 fpm 转发类型快速新建 php 网站。

## 转发绑定宿主机网络的容器

转发绑定宿主机网络的容器（创建时使用 `--network host`）可使用以下方法：

如 DPanel 面板未绑定宿主机网络，创建面板容器时需[「绑定宿主机 host」](/install/docker#bind-host)，
转发时使用 `host.dpanel.local` 作为地址，这种方法完全解耦了宿主机 IP 地址，推荐使用。
或直接使用宿主机在局域网内的 IP 地址进行转发，但固定 IP 地址后会影响后期迁移。

如将 DPanel 也绑定到宿主机网络，转发时直接使用 `127.0.0.1` 即可。


## 通过 IP 地址转发容器

通过直接填写容器的 IP 地址 + 端口的形式转发，可选方式有以下几种：

- `http://[容器在Bridge网络的IP]:[容器内端口]`
- `http://[宿主机在局域网的IP地址]:[容器映射端口]`
- `http://host.dpanel.local:[容器映射端口]` 

## 转发其他内网服务

通过 `http://[服务端的IP]:[容器映射端口]` 转发到其他服务端的容器。
例如，在 `192.168.0.13` 的主机上部署了某个容器并映射了 80 端口到主机的 8080，转发地址为 `http://192.168.0.13:8080`。