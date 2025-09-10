import { LocaleSpecificConfig, DefaultTheme } from 'vitepress'

function getLink(link?: string): string {
  return `/${link ? `${link}` : ""}`
}

export const zhCNConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      { text: '首页', link: getLink() },
      { text: '许可协议', link: getLink("license") },
      { text: '专业版', link: getLink("pro") },
      { text: '更新记录', link: getLink("upgrade") },
      { text: '赞助', link: 'https://afdian.com/a/dpanel' },
      { text: '演示', link: "https://demo.dpanel.cc" },
    ],

    sidebar: [
      {
        text: '安装部署',
        collapsed: false,
        items: [
          { text: '使用安装脚本', link: getLink("install/shell") },
          { text: '使用 Docker 安装', link: getLink("install/docker") },
          { text: '使用 Compose 安装', link: getLink("install/compose") },
          { text: '使用二进制文件安装', link: getLink("install/source") },
          { text: '使用 DinD 安装', link: getLink("install/dind") },
        ]
      },
      {
        text: '扩展使用',
        collapsed: false,
        items: [
          { text: '配置参数', link: getLink("install/params") },
          { text: '自定义面板镜像', link: getLink("install/custom-image") },
          { text: '绑定域名', link: getLink("install/bind-domain") },
          { text: '控制命令', link: getLink("install/ctrl") }
        ]
      },
      {
        text: '容器管理',
        collapsed: false,
        items: [
          { text: '快速创建', link: getLink("manual/container-create") },
          { text: '参数详解', link: getLink("manual/container-create-option") },
          { text: '检测与升级', link: getLink("manual/container-upgrade") },
          { text: '快照与恢复', link: getLink("manual/container-snapshot") },
          { text: '计划任务', link: getLink("manual/container-cron") },
          { text: '端口访问', link: getLink("manual/container-port") },
          { text: '回收站', link: getLink("manual/container-rollback") },
        ]
      },
      {
        text: '为容器绑定域名',
        collapsed: false,
        items: [
          { text: '域名转发', link: getLink("manual/container-domain") },
          { text: '使用第三方转发', link: getLink("manual/container-domain-other") },
          { text: '证书管理', link: getLink("manual/container-domain-cert") },
        ]
      },
      {
        text: '镜像管理',
        collapsed: false,
        items: [
          { text: '镜像加速', link: getLink("manual/image-proxy") },
          {
            text: "构建镜像", items: [
              { text: 'Dockerfile', link: getLink("manual/image-create-dockerfile") },
              { text: 'Zip&Git', link: getLink("manual/image-create-zip") },
              { text: '容器', link: getLink("manual/image-create-container") },
            ]
          },
          { text: '导入镜像', link: getLink("manual/image-import") },
          { text: '仓库管理', link: getLink("manual/image-registry") },
        ]
      },
      {
        text: 'Compose',
        collapsed: false,
        items: [
          { text: '快速开始', link: getLink("manual/compose-create") },
          { text: '环境变量', link: getLink("manual/compose-create-env") },
          { text: '覆盖配置', link: getLink("manual/compose-create-override") },
          { text: '管理外部任务', link: getLink("manual/compose-create-outpath") },
          { text: '批量拉取镜像', link: getLink("manual/compose-image-pull") },
          { text: '其它平台迁移', link: getLink("manual/compose-third-party") },
        ]
      },
      {
        text: 'Swarm',
        collapsed: false,
        items: [
          { text: '介绍', link: getLink("manual/swarm-overview") },
        ]
      },
      {
        text: '系统设置',
        collapsed: false,
        items: [
          { text: '界面配置', link: getLink("manual/system-basic-theme") },
          { text: '多服务端管理', link: getLink("manual/system-env") },
          { text: '宿主机管理', link: getLink("manual/system-env-host") },
          { text: '应用商店', link: getLink("manual/system-store") },
          { text: '更新面板', link: getLink("manual/system-dpanel-upgrade") },
        ]
      },
      {
        text: '其它',
        collapsed: false,
        items: [
          { text: '开启 Docker Tcp 连接', link: getLink("manual/system-env-tcp") },
          { text: '桥接宿主机网络', link: getLink("manual/system-bind-macvlan") },
          { text: '计划任务脚本模板', link: getLink("manual/system-cron-template") },
          { text: 'DPanel 桌面运行', link: getLink("manual/system-desktop") },
          { text: '常见错误', link: getLink("manual/system-qa") },
        ]
      },
    ]
  }
}