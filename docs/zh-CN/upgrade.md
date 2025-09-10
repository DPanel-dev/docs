---
next: false
aside: false
---

:::tip
查看完整的更新记录，跳转至仓库 [Release](https://github.com/donknap/dpanel/releases) 页面
:::

## v1.8.1.2
### 社区版
修复 首页和查看容器时报错\
修复 通过 ssh 添加服务端后，查看 compose 报错

优化 容器列表状态配色\
优化 启动配置，程序中集成默认 config.yaml 配置，启动时无需再显示指定 -f config.yaml 参数，环境变量说明： https://dpanel.cc/install/params\
优化 启动程序时判断存储目录并自动创建

增加 构建镜像时可以配置完成后直接推送

## v1.8.1.1

### 社区版

:::warning
通过 ssh 的方式管理 docker 服务端如果出现如下报错或是不显示统计信息
请在编辑服务页面重新编辑提交，同步证书后即可。
:::

```
error during connect: Get "http://docker.example.com/v1.51/containers/json?all=1": command [ssh -l dpanel -p 22 -o ConnectTimeout=30 -T -- 192.168.3.11 docker system dial-stdio] has exited with exit status 255, make sure the URL is valid, and Docker 18.09 or later is installed on the remote host: stderr=Permission denied, please try again. Permission denied, please try again. dpanel@192.168.3.11: Permission denied (publickey,password).
```

修复 windows 二进制运行兼容性问题\
修复 执行命令时可能会产生僵尸进程\
修复 compose 下容器列列打开 console 错误\
修复 添加多服务时指定证书报错证书找不到 #218\
修复 容器，compose 列表返回时列表空白

优化 compose 列表页面增另名称排序 #210\
优化 配置默认环境时，可以使用 ssh 的方式


## v1.8.1

### pro
增加 配置登录后默认跳转地址

### 社区版
修复 容器配置为 host 网络时编辑时没有数据\
修复 概览页面回收站数据统计错误，以及回收站页面链接\
修复 登录锁定配置没有初始化保存的数据 #205\
修复 标准版中，证书续签后没有重启 nginx 服务，导致新证书无法生效\
修复 首页用量统计网络与磁盘数据显示实时用量（之前是总量）

优化 dokcer 多服务端添加，ssh 方式支持 root 及 非 root 用户，前提必须有 docker 权限\
优化 表格的分页，重载和编辑数据时保持之前选择的页码\
优化 表格字段排序的持久保存的规则，容器，compose 可默认配置一个列的排序规则，也可以取消\
优化 面板设置，分离配置项，使得每个配置简洁直观\
优化 面板启动（可挂载）生成 rsa 证书，用于登录验证。调用控制面命时不需要再配置 jwt secret token\
优化 重启面板容器后，所有的登录信息强制失效\
优化 重构部分功能代码\
优化 顶部 docker 服务端切换下拉框，切换失败时不选中，增加快速编辑按钮\
优化 面板配置功能，采用单行+弹出层配置功能\
优化 保持登录逻辑，保持时间为直到面板容器重启后\
优化 镜像列表，显示出未使用的镜像

增加 compose 列表页面增加启动停止等批量操作\
增加 compose 列表页显示内部容器绑定的端口，可直接访问\
增加 管理 docker 多服务端的时候支持使用面板自带的证书，方便迁移及更换\
增加 容器和主机 console 刷新按钮，可用于超时重连及重启命令行

## v1.8.0

### Pro 
增加 容器回滚功能

### 社区版

修复 创建容器时添加网络别名时报错 #196\
修复 通过 ssh 添加 docker 服务端时，容器端口ip地址获取错误\
修复 容器全部删除标签后，标签还保留\
修复 容器编辑时没有同步通过 docker update 命令更新的配置a\
修复 构建镜像时没有日志输出\
修复 主机管理文件管理无法解压压缩文件

优化 显示出来哪些镜像 tag 无法检测更新，在选择镜像时可根据实际需求使用 #195\
优化 容器标签分组筛选，支持通过标签，compose，swarm 进行快速筛选容器 #187\
优化 清理镜像，清理时可保留加速镜像 tag 以便可以检测容器更新 #198\
优化 优化前端 js 文件，减少文件大小，增加加载速度\

增加 Swarm 支持，节点管理，服务管理，任务管理 #118\
增加 计划任务执行环境，支持 sh 和 bash，更加兼容不同的容器\
增加 计划任务脚本执行超时时间 #193\
增加 一键安装脚本支持 podman 环境安装\
增加 容器列表和 compose 列表排序记录到浏览器，刷新后生效 #203