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
      { text: 'Upgrade', link: 'https://github.com/donknap/dpanel/release' },
      { text: 'Sponsor', link: 'https://afdian.com/a/dpanel' },
      { text: 'Demo', link: "https://demo.dpanel.cc" },
    ],

    sidebar: [
      {
        text: 'Install',
        collapsed: false,
        items: [
          { text: 'Install Script', link: getLink("install/shell") },
          { text: 'Install with Docker', link: getLink("install/docker") },
          { text: 'Install with Compose', link: getLink("install/compose") },
          { text: 'Install with DinD', link: getLink("install/dind") },
          { text: 'Run with binary', link: getLink("install/source") },
          { text: 'Run with DPanel Desktop', link: getLink("install/desktop") },
        ]
      },
      {
        text: 'Extended',
        collapsed: false,
        items: [
          { text: 'Custom image', link: getLink("install/custom-image") },
          { text: 'Bind domain or subdirectory', link: getLink("install/bind-domain") },
          { text: 'Control command', link: getLink("install/ctrl") }
        ]
      },
    ]
  }
}