---
next: false
aside: false
---

:::tip
查看完整的更新记录，跳转至仓库 [Release](https://github.com/donknap/dpanel/releases) 页面
:::

## v1.10.3-beta



## v1.10.2

fix container snapshot restore failure \
fix image import tar.gz extension support and OCI image compatibility \
fix container title not loaded on edit \
fix compose remoteGitUrl task address editing \
fix compose task directory file creation failure \
 \
<br/> \
<br/> \
 \
修复 容器快照恢复失败 \
修复 导入镜像 tar.gz 扩展名支持及 OCI 镜像包兼容 \
修复 编辑容器时未获取到标题 \
修复 Compose 远程 Git 任务地址无法编辑 \
修复 Compose 任务目录新建文件失败

## v1.10.2-beta



## v1.10.1

fix container update check failure \
 \
fix ssh sensitive information not encrypted #284 \
fix cron task multiple cycles trigger issue on manual execution \
fix cron task environment selection compatibility \
fix repository pull defaulting to master branch #283 \
fix image registry auth error without verification enabled \
fix file manager error messages #280 #282 \
fix default environment offline after dpanel restart \
fix volume mount directory in file manager \
fix multi-environment submit no response \
fix pe version default environment monitor failure \
fix ipv6 resolve parsing error \
refactor version detection code \
refactor image registry code \
feat mysql database support \
feat postgresql database support \
 \
<br/> \
<br/> \
 \
修复 检查容器更新失败 \
修复 SSH 敏感信息未加密存储 #284 \
修复 计划任务多周期手动执行触发多次 \
修复 计划任务未选择执行环境的兼容 \
修复 拉取仓库默认指定 master 分支 #283 \
修复 镜像仓库未开启验证时授权失败 \
修复 文件管理器提示错误 #280 #282 \
修复 重启后默认环境显示宕机 \
修复 存储卷文件管理器挂载目录 \
修复 多环境提交没有反应 \
修复 PE 版本默认环境监控失败 \
修复 IPv6 时获取 resolve 错误 \
优化 版本检测代码 \
优化 镜像仓库代码 \
新增 MySQL 数据库支持 \
新增 PostgreSQL 数据库支持

## v1.10.0

# 更新记录 \
修复 容器事件触发缺少容器信息 \
修复 二进制运行时无法查看 Compose 任务目录 \
修复 websocket 连接出错时没有踢出用户数据导致空转 \
修复 申请 https 证书时失败 \
修复 容器快照恢复时 ip 地址的兼容 \
修复 镜像列表列配置没有保存状态 \
修复 复制容器时如果镜像 tag 不存在则使用镜像 hash \
修复 编辑添加容器能力没有生效 \
修复 快照恢复时挂载文件恢复失败 \
修复 更新当前 docker 配置监控没有更新数据 \
修复 编译容器时从 Host 网络切换到 birdge 网络没有生效 \
 \
优化 兼容飞牛系统 \
优化 升级容器时增加使用镜像内的默认配置 \
优化 操作远程 Docker 环境部署 Compose 时同步任务目录文件 \
优化 自定义子目录时程序响应速度 \
优化 程序打包后的大小及内存占用 \
优化 申请证书的过程中，关闭浮动窗口后中止操作 \
优化 标准版的 Nginx 配置，最大限度的容错，不影响 Nginx 进程启动 \
优化 面板的各种数据存储规范 \
优化 统一面板中的各种数据下载 \
优化 默认连接方式，采用异步的形式，不影响程序的正常启动 #275 \
优化 Docker 事件不入库，暂存于内存中。防止频繁写库带来数据损坏风险 \
优化 计划任务采用先生成文件再执行，多行脚本更加具有兼容性 \
优化 一些显示样式 \
优化 文件管理代码及卸载时机 \
优化 更新容器时保持容器之前的启动或是停止状态 \
优化 兼容快照恢复时候的不同配置 \
 \
增加 构建镜像全面支持 buildkit 驱动 \
增加 避免明文保存密码等关键数据入库，采用 rsa 加密（旧数据需要重新提交） \
增加 远程 Compose 任务可以主动同步数据 \
增加 通过 Git 添加 Compose 任务时可以选择分支 \
增加 面板自身的用量统计、备份、恢复功能 \
增加 域名转发功能中可查看 Nginx 运行日志和错误日志 \
增加 配置域名转发时可扩展 Nginx 配置 \
增加 更新容器可重新指定镜像 \
增加 快速重建容器功能 \
增加 主菜单在左侧时增加保持展开收缩配置 \
增加 配置域名转发时可以绑定到非 80 443 端口 \
增加 复制容器后可以不启动，避免同配置造成数据污染 \
增加 配置域名转发可以临时停用，不删除配置前提下 \
增加 导入镜像支持 oci 标准格式，多架构平台的镜像自动只导入当前平台架构 \
增加 web shell 增加多标签 \
增加 创建容器时可以指定不启动 \
 \
 \
 \


## v1.9.3.1

修复 windows 下运行提示证书生成路径不对 \
修复 标准版下https 证书生成失败 #265  \
修复 前端界面在弹出层后文字标题没有隐藏 \
修复 文件管理没有上传，新建等按钮

## v1.9.3

修复 计划任务中不支持复杂的脚本 \
修复 使用 windows docker desktop 时，无法使用 Compose 内挂载相对目录 \
修复 使用 ssh 管理 docker 时，部署 compose 任务报错 \
修复 编辑容器，修改容器名称失败 \
修复 编辑容器时，无法清除配置的运行用户 \
修复 构建镜像时使用 git 方式，指定 dockerfile 文件和路径后构建时找不到文件 #256 \
修复 编辑容器时提示找不到镜像无法获取容器数据 \
修复 修复编辑容器健康检查错误 #257 \
修复 创建 compose 时复制 Yaml 数据后没有自动获取环境变量 \
修复 compose 编辑 yaml 时全屏失效 \
修复 计划任务中调用 dpanel 控制命令错误 \
修复 添加相同的 docker adress 环境时无法删除 \
修复 页面出现 Something went wrong 错误 #259 \
修复 添加本地 localhost 仓库报错，不能使用或是拉取 \
修复 编辑容器的时候给未手动配置子网的网络配置容器ip报错 \
修复 通过 Compose 创建容器添加域名转发后，更新 compose 后转发丢失 \
修复 compose 任务详情页没有新建文件等按钮 \
 \
优化 统一表格菜单，操作菜单分为右键，表格行内，顶部固定跟随三部分。 \
优化 容器快照功能，修改提示文字信息。支持仅备份容器配置 \
优化 控制命令其它参数，具体 https://dpanel.cc/install/ctrl \
优化 标准版重启 nginx，自动检测当前服务是否运行决定是重启还是重载 \
优化 编辑容器时，拉取镜像时默认用当前容器镜像地址填充 \
优化 添加环境的时候可以指定是 docker 或是 podman 类型 [#263](https://github.com/donknap/dpanel/issues/263) \
优化 Makefile 文件，统一构建参数 \
优化 应用商店列表显示资源数量 \
 \
增加 控制命令增加通知命令，在面板中配置邮件参数，在脚本中可发送邮件通知。 \
增加 控制命令增加简易缓存数据存储命令，在计划任务脚本中可实现更加丰富的逻辑 \
增加 控制命令增加清理系统通知，事件，强制释放内存 \
增加 控制命令更新容器命令，增加 --disable-bak 不备份旧容器的参数 \
增加 回收站自动清理15天之前的数据 \
增加 推送镜像文件时增加推送进度 \
增加 基于 debian 的镜像 dpanel/dpanel:latest-debian dpanel/dpanel:lite-debian

## v1.9.2

修复 compose 多环境没有共享 yaml 文件 \
修复 Lite 版会产生僵尸进程 \
修复 编辑容器使用默认 entrypoint 数据选中错误，导致编辑时容器报错 \
修复 编辑容器时，失败后回收站无法恢复 \
修复 使用 1panel 应用商店安装带数据的应用时缺少环境变量参数 \
修复 二进制运行时 docker 服务端异常重启造成占用100% \
修复 通过 ssh 方式添加 docker 服务端时，可能造成泄漏问题 \
修复 [CVE-2025-66292](https://github.com/donknap/dpanel/commit/cbda0d90204e8212f2010774345c952e42069119%20%22fix%20CVE-2025-66292%22)  \
修复 通过挂载文件的方式添加 compose 任务时，没有读取 dpanel-override.yaml 覆盖文件 \
修复 备份控制命令 \
修复 容器转发时ipv6支持 \
修复 通过1panel安装 dpanel 面板时，环境变量被污染 \
修复 windows docker desktop 中创建 Compose 不能使用相对目录 #254 \
 \
优化 兼容 podman  \
优化 前端列表统一添加右健快捷菜单（持续优化） \
优化 通过 yaml 创建 compose 生成标准的 docker-compose.yaml 文件 \
优化 推送镜像时增加进度显示 \
优化 兼容 docker v29 部分新特性（持续优化） \
 \
增加 支持宝塔应用商店 \
增加 通过应用商店安装应用时，可以快速关联已存在容器 \
增加 docker 环境全局监控，实时显示环境异常情况 \
增加 计划任务手动触发、容器事件（启动、停止、创建、销毁）触发

## v1.9.1.3

修复 没有容器数据的时候统计可能造成死循环 \
修复 删除用命令创建的容器，回收站显示多条 \
优化 部分启动时无法连接默认 dockker #235 \
优化 自定义二级目录，规范请求地址

## v1.9.1.2

修复 多个服务端共享 Compose 目录数据详情不显示 Yaml 内容 \
修复 挂载目录 Compose 任务修改 yaml 文件名或是扩展名后，提示找不到文件 \
修复 标准版域名转发时配置转发 http https 错误 \
修复 首页任务数据统计错误

