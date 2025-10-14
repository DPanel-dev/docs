---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "DPanel"
  text: "轻量化容器管理面板"
  tagline: 优雅的管理 Docker、Podman 容器一个面板就够了！ 
  image:
    src: https://cdn.w7.cc/dpanel/dpanel-logo-1.png
    alt: DPanel
  actions:
    - theme: alt
      text: 面板介绍
      link: /README
    - theme: alt
      text: 专业版
      link: /pro
    - theme: brand
      text: 快速开始
      link: /install/docker
features:
  - title: 多语言支持
    icon: 🇨🇳
    details: 无需安装任何插件，面板原生提供中、英、日多国语言包。
  - title: 快速部署
    icon: 🐳
    details: 支持通过容器、二进制包方式运行，简单、易用、兼容性好
  - title: 轻量化
    icon: 📊
    details: 资源占用极低（镜像 ~150M 内存 ~20M）适合各种 Nas、路由、小型服务器
  - title: 安全性
    icon: 🔐
    details: 通过容器的方式运行，不需要特权，对宿主机没有依赖及侵入，安全可靠
  - title: 域名转发、SSL证书
    icon: 🆖
    details: 标准版中内置 Nginx 组件，快速绑定域名转发容器端口
  - title: 应用商店
    icon: 🎁
    details: 支持 1panel、casaos 等多种协议应用商店，并可同时添加多个商店 
  - title: 多主机管理
    icon: 💻
    details: 支持通过 Api（TLS）、SSH 同时管理多个 Docker 客户端
  - title: 容器快照
    icon: 📷
    details: 容器全量快照备份、恢复、迁移到其它 Docker 环境	
  - title: 容器文件管理
    icon: 📂
    details: 支持管理容器以及宿主机的文件
  - title: 容器快速升级
    icon: 🚀
    details: 容器镜像升级检测、快速升级
  - title: 容器标签分组及快捷访问
    icon: 📌
    details: 通过 compose、swarm、标签对容器进行分组筛选，可配置容器的快捷访问
  - title: Compose
    icon: 📝
    details: 支持多种方式添加、管理 Compose 项目
  - title: Swarm
    icon: 🐝
    details: 支持管理 Docker Swarm 集群
  - title: 暗色皮肤及自定义主题
    icon: 🎨
    details: 界面配置，暗色皮肤、菜单位置、字体大小、分页数、控制台样式等	
  - title: 权限系统
    icon: 👨🏻‍💻
    details: 多用户、菜单权限、数据权限	
---