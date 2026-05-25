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
    details: 无需安装任何插件，面板原生提供中文、英文、日文等多国语言包。
  - title: 快速部署
    icon: 🐳
    details: 支持通过容器或二进制包方式运行，简单、易用、兼容性好
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

<script setup>
import PartnerList from '/.vitepress/components/PartnerList.vue'

const partners = [
  { name: 'ROG ASUS', desc: '玩家国度路由器系列', link: 'https://rog.asus.com.cn/', logo: `<svg width="32" height="18" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" class="Footer__footerLogo__ucsxG"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.143 11.094c-2.552 1.888-2.936 2.676-2.627 3.273a20.501 20.501 0 002.58 3.2v.023a11.358 11.358 0 01-4.046-3.097c-.935-1.264-3.596-5.474-3.596-5.474.297.142.634.314.992.495 1.573.799 3.54 1.796 4.173 1.443 5.736-5.593 8.835-8.558 10.954-9.222C26.517-.139 30.677.54 30.677.54 23.67 2.194 16.384 7.825 13.19 10.294c-.425.328-.777.6-1.046.8zm-.445 3.575a8.9 8.9 0 01-1.158-.645s8.482-6.043 13.5-8.429A24.683 24.683 0 0132 3.292a2.404 2.404 0 01-.949 1.622h-.047c-11.95 4.874-16.992 8.657-17.395 8.966 0 .007 4.862 1.918 7.59 1.37 2.727-.547 4.824-5.469 4.824-5.469l1.758-.54-9.578 2.893.525-.266.033-.011c.797-.409 2.504-1.253 5.313-2.567 3.348-1.575 6.669-2.893 6.669-2.893-1.11 3.083-4.653 9.767-7.789 10.791-1.167.375-7.158-.72-11.256-2.519zm7.03-2.8l.009-.005-.142.052.133-.048zm9.975-6.217zM1.812 11.596A17.537 17.537 0 010 7.996s4.478 4.178 6.662 5.703l-.059-.028c-.484-.112-3.928-.956-4.791-2.075z" fill="#B3B3B3"></path></svg>` },
  { name: '兮克', desc: '专注于高速率网络设备的研发和生产', link: 'https://seekswan.com', logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAPFBMVEVHcEzSMyvgJR/fJR7NMirlHxnZKSPjIRznHBfmHhjeKCHlHxrcKiLVMCjbKSKmSDzlHxrmHhnZKCHnHRjFPAhcAAAAFHRSTlMAJnv/NLJWpv/+hWT0FtEJk9hE7ZQWmh4AAADESURBVHgBtdJFgsUgEEXRlxRyK8RI9r/Wdm9g9s8QLVPDpLHZwmAzxpQxdRmG491PFi9agaS2yX3SZrD0HsCDtIO1/zje3z7Bc/N+pejFZrDrvx1Pnz/hcyvDqA+rt95Il75Mdgc9QInxXM4cYz7nNLWy+O1fEGE3zMD5sOmfdATjxV0SnGq6eDFLW1DHDiQNJEAjx/sXAxWyBjIUDVxA1UCCSmfgrpJKhaiOyAsHNU1Jzot6tp/f4IY7X+o5qXXRSPfuMwgjB71zsYBFAAAAAElFTkSuQmCC' },
  { name: '飞牛', desc: '骨灰级玩家团队倾心打造的NAS系统', link: 'https://www.fnnas.com/', logo: 'https://static2.fnnas.com/official/og.png' },
  { name: '奇妙页', desc: '探索AI创意与灵感的奇妙世界', link: 'https://www.qmye.com', logo: `<svg preserveAspectRatio="xMinYMid" style="height: 25px;" id="_图层_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 70 18"> <!-- Generator: Adobe Illustrator 29.6.1, SVG Export Plug-In . SVG Version: 2.1.1 Build 9) --> <path d="M3.09,4.88c-.95,1-1.72,2.26-2.19,3.55-.71,1.93-.52,4.1.54,5.86,1.08,1.8,3.04,3.12,5.12,3.42,1.35.2,2.57-.14,3.82-.64,0,0,1.48-.59,2.63-2.12-.04.06-.24.09-.31.11-.29.09-.58.15-.88.19-1.03.14-2.08.02-3.06-.31-1.84-.61-3.57-1.86-4.68-3.45-1.07-1.53-1.52-3.39-1.28-5.24.03-.23.07-.46.12-.69.03-.16.08-.43.17-.68Z"></path> <path d="M14.36,9.37c-.1-.51-.26-1.01-.46-1.49-.48-1.15-1.18-2.29-2.03-3.2L7.68.24l-.71.71s-.06.06-.09.09c-.08.09-.16.17-.24.26-.12.13-.24.25-.36.38-.15.16-.29.31-.44.47-.16.17-.32.34-.48.52-.17.18-.33.35-.5.53-.16.17-.32.34-.47.5-.14.15-.28.29-.41.44-.11.11-.21.23-.32.34-.06.07-.13.14-.19.2,0,.01-.02.02-.03.03-.06.06-.07.17-.09.25-.11.45-.2.91-.25,1.37-.04.46-.05.93,0,1.39.02.23.05.46.09.68.31,1.76,1.4,3.31,2.75,4.45,1.37,1.15,3.09,1.9,4.89,1.99h.25s1.26.03,1.99-.37c0,0,.02-.01.03-.02.58-.61.91-1.49,1.11-2.29.23-.92.34-1.87.16-2.81v.02ZM9.57,5.47c-.39,0-.71-.32-.71-.71s.32-.71.71-.71.71.32.71.71-.32.71-.71.71ZM11.65,7.61h0c-.35.25-.83.18-1.09-.17l-.26-.36c-.25-.35-.18-.83.17-1.09h0c.35-.25.83-.18,1.09.17l.26.36c.25.35.18.83-.17,1.09ZM12.54,9.53c-.39,0-.71-.32-.71-.71s.32-.71.71-.71.71.32.71.71-.32.71-.71.71Z"></path> <path d="M32.12,14.72l-.83,1.59-5.02-2.81c-.95,0-1.8-.21-2.55-.63-.75-.42-1.34-1.01-1.76-1.77-.42-.76-.63-1.61-.63-2.57,0-.72.12-1.38.37-2,.25-.62.59-1.14,1.02-1.58.43-.43.96-.77,1.57-1.02.61-.25,1.28-.37,1.99-.37s1.38.12,1.99.37c.61.25,1.14.59,1.57,1.02.43.43.77.96,1.02,1.58.25.62.37,1.29.37,2,0,1.01-.23,1.89-.7,2.65-.47.75-1.1,1.3-1.91,1.64l3.5,1.91ZM24.17,10.79c.55.59,1.26.88,2.12.88s1.57-.29,2.12-.88.83-1.34.83-2.26-.28-1.67-.83-2.27c-.55-.59-1.26-.89-2.12-.89s-1.57.3-2.12.89c-.55.59-.83,1.35-.83,2.27s.28,1.67.83,2.26Z"></path> <path d="M37.59,13.28h-1.94l1.2-9.51h2.04l2.77,6.86,2.77-6.86h2.04l1.2,9.51h-1.93l-.75-6.32-2.64,6.32h-1.35l-2.64-6.32-.74,6.32Z"></path> <path d="M56.36,13.28h-1.94v-3.77l-3.25-5.74h2.26l1.96,3.82,1.96-3.82h2.26l-3.25,5.74v3.77Z"></path> <path d="M69.25,13.28h-5.61V3.77h5.61v1.73h-3.67v2.08h3.46v1.68h-3.46v2.27h3.67v1.74Z"></path></svg>` },
]
</script>

<PartnerList :data="partners" />