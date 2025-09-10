# 容器创建参数

## 容器标识

容器的唯一标识名称

## hostname

> --hostname 名称

指定容器的 hostname 


## 基本配置

### 绑定端口

> -p 8080:80 --publish-all --network host 

配置容器对外暴露的端口。

| 外问访问端口 | 容器内端口 | 描述 | 
| --- | --- | --- |
| 8080 | 80 | 映射容器的 80 端口到宿主机的 8080 |
| 127.0.0.1:8080 | 80 | 端口只映射到 127.0.0.1 上 |
| 8080 | 80/udp | 映射udp端口 |
| 4444-5555 | 4444-5555 | 映射端口范围 |
| 绑定 Host 网络 |  | 映射容器内的全部端口到宿主机 |
| 绑定全部端口 |  | 生成随机端口映射容器内的全部端口到宿主机 |
| IpV6 |  | 同时映射容器端口到 IpV6 |

### 环境变量

> -e TEST=name

配置容器环境变量，支持通过文件导入及批量添加


### 存储配置

> -v testvolume:/home -v /home/test:/home/test

如果镜像内声明了持久化的目录。在创建容器时 Docker 会自动新建一个匿名存储卷来挂载目录。\
大量的匿名存储卷不仅会造成观感体验不好。而且在容器被销毁时，也无法判断当时这个存储卷是属于哪个容器。

如果你未手动的指定这些挂载目录 DPanel 会根据【站点标识+目录名】来命名这些存储卷名称。\
可以理解为，面板为了避免 Docker 生成出来匿名存储卷，而定义了一个存储卷的命名规则。

如果你选择挂载这些目录，可以配置【存储卷】或是【宿主机文件或是目录】。\
区别在于存储卷会在创建容器时将容器内的数据同步至存储卷中，挂载目录则不会。

### 网络配置

> docker network create --driver bridge --subnet 192.168.100.0/24 --gateway 192.168.100.1 test \
> docker run --name test ... --network test --ip 192.168.100.2 ...

Docker 的默认 bridge 网络无法修改容器的 ip 地址。
通过网络配置功能，指定容器的 ip 地址、子网、网关后，面板会自动根据配置创建与容器同名的专属网络。

### DNS 

> --dns 8.8.8.8 --dns 114.114.114.114

配置容器的 dns 地址，每行指定一个地址

## 关联配置

### 关联容器

> docker network create test \
> docker run --name test ... --network test \
> docker network connect test othercontainer

通过关联容器功能，面板会自动创建容器的同名网络，将所有关联的容器加入到专属网络中。
在专属网络中，任意一个容器均可以通过 【容器名称.pod.dpanel.local】 名称进行互联

### 关联网络

> --network 网络名称 --ip ip地址

指定创建容器时需要加入的网络。开启【关联 bridge 网络】开关后容器会优先加入 bridge 网络，否则容器只会加入关联的网络

### 关联宿主机网络

> --add-host=host.dpanel.local:host-gateway --add-host=my13.local:192.168.1.101

配置将宿主机 ip 和 宿主机所在的网络中的主机 ip 注入到容器的 /etc/hosts 配置中。
注入宿主机 ip 时应该使用 host-gateway 来替代。

## 运行配置

### 重启策略

> --restart always

### command、entrypoint、user、工作目录

> docker run ... --workdir /root --user root --entrypoint test.sh 镜像名 /bin/sh -c "tail -f"

指定容器的运行命令，为空时使用镜像内声明的值

### 日志

> --log-opt max-size=10m --log-opt max-file=3 

指定容器内的日志驱动及日志切割大小

### 健康检查

> --health-cmd='curl -f http://127.0.0.1/' \
  --health-interval=10s --health-timeout=5s --health-retries=3 

| 脚本执行环境 | 脚本示例 | 描述 | 
| --- | --- | --- |
| 在 Docker 环境中执行 | curl -f http://127.0.0.1:80 | docker 将请求容器内的80端口地址，测试是否可以访问 |
| 在容器内执行 | curl -f http://127.0.0.1:80 \|\| exit 1 | 在容器内的 shell 环境中执行命令，依赖容器内是否有 curl 命令 |

### 附加执行脚本

配置在容器创建后，执行的脚本。脚本只能配置单行。

| 时机 | 脚本示例 | 描述 | 
| --- | --- | --- |
| 容器创建后 | apk add php && touch index.html && php -S 0.0.0.0:80 | 在容器创建后，安装 php 包，在工作目录中生成 index.html 文件，启动 Http 服务。 |

### 容器标签

> --label name=123

## 资源配置

### 资源限制

> --cpus 1 --memory 50M

### 显卡

> --gpus all

## 能力配置

> --cap-add NET_ADMIN

可以开启或是关闭容器的权限能力