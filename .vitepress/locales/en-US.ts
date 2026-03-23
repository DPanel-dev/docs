import { LocaleSpecificConfig, DefaultTheme } from 'vitepress'

function getLink(link?: string): string {
  return `/docs/en-US${link ? `/${link}` : ""}`
}

export const enUSConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: [
      { text: 'Home', link: getLink("") },
      { text: 'License', link: getLink("license") },
      { text: 'Pro Edition', link: getLink("pro") },
      { text: 'Upgrade', link: getLink("upgrade") },
      { text: 'Sponsor', link: 'https://afdian.com/a/dpanel' },
      { text: 'Demo', link: "https://demo.dpanel.cc" },
    ],

    sidebar: [
      {
        text: 'Installation',
        collapsed: false,
        items: [
          { text: 'Install Script', link: getLink("install/shell") },
          { text: 'Install with Docker', link: getLink("install/docker") },
          { text: 'Install with Compose', link: getLink("install/compose") },
          { text: 'Install with DinD', link: getLink("install/dind") },
          { text: 'Run with binary', link: getLink("install/source") },
          { text: 'Run with DPanel Desktop', link: getLink("install/desktop") },
          { text: 'Deploy via FNNAS App Store', link: getLink("install/fnnas") },
        ]
      },
      {
        text: 'Extended Usage',
        collapsed: false,
        items: [
          { text: 'Configuration Parameters', link: getLink("install/params") },
          { text: 'Panel Control Commands', link: getLink("install/ctrl") },
          { text: 'Custom Panel Image', link: getLink("install/custom-image") },
          { text: 'Custom Database', link: getLink("install/custom-db") },
          { text: 'Bind Domain or Directory', link: getLink("install/bind-domain") },
          { text: 'Custom Language Pack', link: getLink("install/i18n") },
          { text: 'Related Resources', link: getLink("install/resource") }
        ]
      },
      {
        text: 'Container Management',
        collapsed: false,
        items: [
          { text: 'Quick Create', link: getLink("manual/container-create") },
          { text: 'Parameter Details', link: getLink("manual/container-create-option") },
          { text: 'Detection and Upgrade', link: getLink("manual/container-upgrade") },
          { text: 'Snapshot and Restore', link: getLink("manual/container-snapshot") },
          { text: 'Scheduled Tasks', link: getLink("manual/container-cron") },
          { text: 'Port Access', link: getLink("manual/container-port") },
          { text: 'Recycle Bin', link: getLink("manual/container-rollback") },
        ]
      },
      {
        text: 'Bind Domain for Container',
        collapsed: false,
        items: [
          { text: 'Domain Forwarding', link: getLink("manual/container-domain") },
          { text: 'Use Third-Party Forwarding', link: getLink("manual/container-domain-other") },
          { text: 'Certificate Management', link: getLink("manual/container-domain-cert") },
        ]
      },
      {
        text: 'Image Management',
        collapsed: false,
        items: [
          { text: 'Image Acceleration', link: getLink("manual/image-proxy") },
          {
            text: "Build Image", items: [
              { text: 'Dockerfile', link: getLink("manual/image-create-dockerfile") },
              { text: 'Zip&Git', link: getLink("manual/image-create-zip") },
              { text: 'Container', link: getLink("manual/image-create-container") },
            ]
          },
          { text: 'Import Image', link: getLink("manual/image-import") },
          { text: 'Registry Management', link: getLink("manual/image-registry") },
        ]
      },
      {
        text: 'Compose',
        collapsed: false,
        items: [
          { text: 'Quick Start', link: getLink("manual/compose-create") },
          { text: 'Environment Variables', link: getLink("manual/compose-create-env") },
          { text: 'Override Configuration', link: getLink("manual/compose-create-override") },
          { text: 'Manage External Tasks', link: getLink("manual/compose-create-outpath") },
          { text: 'Batch Pull Images', link: getLink("manual/compose-image-pull") },
          { text: 'Migrate from Other Platforms', link: getLink("manual/compose-third-party") },
        ]
      },
      {
        text: 'Swarm',
        collapsed: false,
        items: [
          { text: 'Overview', link: getLink("manual/swarm-overview") },
        ]
      },
      {
        text: 'System Settings',
        collapsed: false,
        items: [
          { text: 'Interface Configuration', link: getLink("manual/system-basic-theme") },
          { text: 'Multi-Server Management', link: getLink("manual/system-env") },
          { text: 'Host Management', link: getLink("manual/system-env-host") },
          { text: 'App Store', link: getLink("manual/system-store") },
          { text: 'Update Panel', link: getLink("manual/system-dpanel-upgrade") },
          { text: 'Migrate Panel', link: getLink("manual/system-dpanel-migrate") },
        ]
      },
      {
        text: 'Other',
        collapsed: false,
        items: [
          { text: 'Enable Docker Tcp Connection', link: getLink("manual/system-env-tcp") },
          { text: 'Bind Host Network', link: getLink("manual/system-bind-macvlan") },
          { text: 'Scheduled Task Script Template', link: getLink("manual/system-cron-template") },
          { text: 'Common Issues', link: getLink("manual/system-qa") },
        ]
      },
    ]
  }
}