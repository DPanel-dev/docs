# 域名转发 <Badge type="tip" text="DPanel Family == 标准版" />

容器对外访问时，可以将容器内部端口映射到宿主机端口，在普通版支持通过绑定域名进行转发。


## 更改默认端口

:::danger
配置了多个 Docker 环境时，只有安装了 DPanel 面板的服务端支持域名转发功能。
如果希望可以转发其它 Docker 环境的容器，请使用「内网IP」或是「Swarm 模式创建容器」
:::

创建面板时如果将 80、443 绑定到了其它端口上，那么访问域名时需求携带端口号，
http:\/\/test.com:880 或 https:\/\/test.com:8443

```js
docker run -d --name dpanel --restart=always \
 -p 880:80 -p 8443:443 -p 8807:8080 -e APP_NAME=dpanel \   // [!code focus]
 -v /Users/test/.docker/run/docker.sock:/var/run/docker.sock \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```

## 域名转发

在【容器管理】-【域名转发】为容器添加域名转发

![domain-1.png](https://cdn.w7.cc/dpanel/domain-1.png){data-zoomable}

## 转发到面板自身

为面板自身配置域名转发时，将【目标地址】配置为 127.0.0.1 【目标端口】配置为 8080 即可。

## 转发到容器

当你通过【选择容器】功能添加转发容器后，面板会自动创建 dpanel-local 网络，并把转发目标容器与面板自身加入到该网络中。在转发配置中，则采用容器在 dpanel-local 网络中的 hostname 进行。

这样的好处是当你的目标容器 Ip 发生变化时也可以正常的转发。但是必须保证 DPanel 面板容器和目标容器在重建时必须添加至 dpanel-local 网络中。

## 转发 PHP-FPM

选择通过应用商站创建的 php 环境后，可以通过面板添加 fpm 转发类型快速新建 php 网站。

## 转发绑定宿主机网络的容器

转发绑定宿主机网络的容器（创建时使用 --network host）可以使用以下方法。

当 DPanel 面板没有绑定到宿主机网络，那么在创建面板容器时需要[「绑定宿主机 host」](/install/docker#bind-host)，
转发时使用 host.dpanel.local 做为地址，这种方法完全解耦了宿主机的IP地址，推荐使用。
或是直接使用宿主机在局域网内的 IP 地址进行转发，这种固定了 IP 地址后影响后期的迁移。

你也可以将 DPanel 也绑定到宿主机网络，那么转发时直接使用「127.0.0.1」即可。


## 通过 IP 地址转发容器

通过直接填写容器的 ip 地址 + 端口的形式转发，可选的方式有以下几种：

- http:\//[容器在Bridge网络的IP]:[容器内端口]
- http:\//[宿主机在局域网的IP地址]:[容器映射端口]
- http:\//host.dpanel.local:[容器映射端口] 

## 转发其它内网服务

通过 http:\//[服务端的IP]:[容器映射端口] 转发到其它服务端的容器
比如，在 192.168.0.13 的主机上部署了某个容器并映射了 80 端口到主机的 8080，那么转发地址为 http:\//192.168.0.13:8080