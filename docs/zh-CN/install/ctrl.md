# 面板控制命令 <Badge type="tip" text="DPanel Version >= 1.2.2" />

## 调用方式 

执行命令时根据当前的执行环境，请修改示例代码执行。

### 在宿主机中调用

:::tip
实际运行时，请将下方命令中的 **dpanel** 替换成你的面板容器名字
:::

1. 登录服务器的 ssh 
2. 通过 docker exec 命令执行 DPanel 容器中的控制命令
3. 根据需求，执行对应的命令

```
docker exec dpanel /app/server/dpanel -f /app/server/config.yaml user:reset
```

### 计划任务与二进制调用

:::tip
计划任务中调用时，执行容器留空或是指定为 DPanel 容器
:::

```
/app/server/dpanel -f /app/server/config.yaml user:reset
```

## 重置管理员用户

### 快速重置

将使用随机密码重置用户

```
./dpanel -f config.yaml user:reset
```

### 重置密码

```
./dpanel -f config.yaml user:reset --password 123456
```

### 重置用户名

重置用户名时，必须指定密码

```
./dpanel -f config.yaml user:reset user:reset --password 123456 --username root
```

## 更新应用商店数据

- \--name 指定应用商店名称

```
./dpanel -f config.yaml store:sync --name test
```

### 返回

```
{"total":151}
```

## 检测容器更新

- \--name 指定检测的容器名称
- \--docker-env 指定 docker env 环境名称，默认: local

```
./dpanel -f config.yaml container:upgrade --name containerName --docker-env local
```

### 返回

> upgrade 为 true 表示有更新

```
{"upgrade":false,"digest":"sha256:8f4ac2974ff707bace98ab14923fdf220f44a9803045b655f1d8d3e098f97e55","digestLocal":["registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel@sha256:8f4ac2974ff707bace98ab14923fdf220f44a9803045b655f1d8d3e098f97e55"]}
```

## 升级容器

- \--name 指定容器名称
- \--docker-env 指定 docker env 环境名称
- \--enable-bak 是否备份旧容器，默认: true
- \--disable-bak 不备份旧容器，等同于 --enable-bak=false
- \--image-tag 指定新的镜像名称，此镜像一定要与容器的镜像完全兼容

```
./dpanel -f config.yaml container:upgrade --upgrade --disable-bak --name containerName 
```

### 返回

> 当容没有更新时，返回与 【检测容器镜像是否有新版】 一致

```
{"containerId": "14fc0a4d5e3e31f98f9179512085299b5c502ddf57d584ce39a7cadab6e3f643"}

```

## 生成容器快照

- \--name 指定检测的容器名称
- \--docker-env 指定 docker env 环境名称
- \--enable-image 是否备份容器镜像
- \--backup-image 备份镜像类型 image 或是 container (docker commit)
- \--enable-volume 是否备份挂载目录
- \--backup-volume 指定备份的挂载目录

```
./dpanel -f config.yaml container:backup --name 容器名称 --enable-image --enable-volume
```

### 返回

```
{"path":"/dpanel/backup/dpanel-doc/dpanel-dpanel-doc-20250424175215.snapshot"}
```

## 部署或升级 compose 任务

- \--name compose 任务名称，面板已经部署或是可发现的任务名称
- \--docker-env 指定 docker env 环境名称
- \--environment yaml 中所需要的环境变量，可配置多个, --environment test=1
- \--pull-image 指定拉取镜像方式 dpanel command

```
./dpanel -f config.yaml compose:deploy --name 任务名称 --environment name=test --environment age=10 --pull-image dpanel
```

### 返回

```
{"name":"test123"}

```

## 清理系统消息、事件及缓存 <Badge type="tip" text="DPanel Version >= 1.9.2" />

- \--enable-notice 清除通知和事件
- \--enable-temp-file 清理临时文件

```
./dpanel -f config.yaml system:prune
```

### 返回

```
{"db":"vacuum","events":204,"gc":true,"notice":7,"temp":0}

```

## 发送通知 <Badge type="tip" text="DPanel Version >= 1.9.2" />

- \--subject 通知的标题
- \--content 通知的内容
- \--target 通知的目标，邮件的方式为邮箱。
- \--channel 通知的方式 email 

```
./dpanel -f config.yaml system:notice  --content test123 --target 914417117@qq.com --subject 我来测试一下
```

### 返回

```
{"code":200,"error":"","data":"success"}

```

## 简易缓存数据存储 <Badge type="tip" text="DPanel Version >= 1.9.2" />

利用缓存数据存储功能，可以脚本中做一些数据缓存或是标志位检测。

- \--key 缓存名称
- \--value 缓存内容，为空时获取 --key 的内容
- \--keep 缓存生命周期（秒），默认为 -1 直到主程序重启

```
./dpanel -f config.yaml system:cache --key test1 --value 123
```

### 返回

```
{"value":"123","found":true}

```

## 备份面板数据 <Badge type="tip" text="DPanel Version >= 1.9.4" />

备份 DPanel 面板的数据

- \--backup-path 要备份的目录，留空为全部
- \--ignore-path-prefix 跳过备份的目录前缀，--ignore-path-prefix storage/temp 跳过 storage/temp 开头的目录或是文件

```
./dpanel -f config.yaml system:backup
```

### 返回

```
{"path":"dpanel-main-20260226191909.snapshot"}

```