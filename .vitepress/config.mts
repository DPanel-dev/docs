import { defineConfig } from 'vitepress'
import { zhCNConfig } from './locales/zh-CN'
import { enUSConfig } from './locales/en-US'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// ==============================================================================
// 1. 定义 NEW 图标逻辑工具函数
// ==============================================================================

const NEW_THRESHOLD_DAYS = 7; // 7天内更新显示 NEW

function getFileLastCommitTime(filePath: string): number {
  try {
    if (!fs.existsSync(filePath)) return 0;
    // 获取 git 最后提交时间
    const timestamp = execSync(`git log -1 --format=%ct "${filePath}"`, { encoding: 'utf-8' });
    const time = parseInt(timestamp.trim(), 10) * 1000;
    // 如果 git 获取失败（例如新文件），尝试获取文件系统时间
    if (Number.isNaN(time) || time === 0) {
      return fs.statSync(filePath).mtimeMs;
    }
    return time;
  } catch (e) {
    return 0;
  }
}

/**
 * 递归处理 Sidebar
 * @param items Sidebar 数组
 * @param baseDir 文件在项目中的物理根目录 (例如 'docs/zh-CN')
 */
function processSidebar(items: any[], baseDir: string) {
  const now = Date.now();
  const threshold = NEW_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;

  return items.map((item) => {
    // 递归处理子项
    if (item.items) {
      item.items = processSidebar(item.items, baseDir);
    }

    // 处理具体链接
    if (item.link) {
      // 1. 处理文件后缀
      let relativePath = item.link;
      if (!relativePath.endsWith('.md')) {
        relativePath += '.md';
      }
      // 2. 移除开头的 /，防止 path.resolve 错误定位到系统根目录
      relativePath = relativePath.replace(/^\//, '');

      // 3. 拼接完整的物理路径
      // 注意：这里结合了 baseDir (docs/zh-CN) 来找到真实文件
      const fullPath = path.resolve(process.cwd(), baseDir, relativePath);

      const lastTime = getFileLastCommitTime(fullPath);

      // 4. 判断并注入 HTML
      if (lastTime && (now - lastTime < threshold)) {
        // 防止重复添加（如果开发模式下热更新）
        if (!item.text.includes('vp-badge-new')) {
          item.text = `${item.text} <span class="vp-badge-new">New</span>`;
        }
      }
    }
    return item;
  });
}

/**
 * 辅助函数：处理 Sidebar 可能是对象（多侧边栏）的情况
 */
function injectNewBadge(config: any, baseDir: string) {
  if (config?.themeConfig?.sidebar) {
    const sidebar = config.themeConfig.sidebar;
    if (Array.isArray(sidebar)) {
      config.themeConfig.sidebar = processSidebar(sidebar, baseDir);
    } else if (typeof sidebar === 'object') {
      // 如果是多侧边栏对象结构 { '/guide/': [] }
      for (const path in sidebar) {
        sidebar[path] = processSidebar(sidebar[path], baseDir);
      }
    }
  }
}

// ==============================================================================
// 2. 在导出前，对导入的配置进行“加工”
// ==============================================================================

// 处理中文配置：物理路径在 docs/zh-CN
injectNewBadge(zhCNConfig, 'docs/zh-CN');

// 处理英文配置：物理路径在 docs/en-US
injectNewBadge(enUSConfig, 'docs/en-US');


// ==============================================================================
// 3. 原始配置导出
// ==============================================================================
// https://vitepress.dev/reference/site-config
export default defineConfig({
  rewrites: {
    'docs/zh-CN/:rest*': ':rest*'
  },
  title: "DPanel",
  titleTemplate: 'DPanel',
  head: [
    [
      'link',
      { rel: 'icon', href: '/storage/image/dpanel.ico' }
    ],
    [
      'script',
      {
        id: "baidu"
      },
      `var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e5b6e51aa6276fb32c9c2bfb075a1b14";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();`
    ]
  ],
  description: "轻量化的 Docker 可视化管理面板",
  lang: "zh-CN",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: "https://cdn.w7.cc/dpanel/dpanel-logo-small.png"
    },
    editLink: {
      pattern: 'https://github.com/donknap/dpanel-docs/tree/master/docs/:path'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/donknap/dpanel' },
    ],
    search: {
      provider: "local",
    },
    footer: {
      message: `<div style="display:flex; justify-content: center; gap: 10px; margin-bottom:20px;">
      <a href="https://github.com/donknap/dpanel" target="_blank"><img src="https://img.shields.io/github/stars/donknap/dpanel.svg" /></a>
      <a href="https://github.com/donknap/dpanel" target="_blank"><img src="https://img.shields.io/docker/pulls/dpanel/dpanel" /></a>
      <a href="https://github.com/donknap/dpanel/releases" target="_blank"><img src="https://img.shields.io/github/v/release/donknap/dpanel" /></a>
      <a href="https://hellogithub.com/repository/c69089b776704985b989f98626de977a" target="_blank"><img src="https://abroad.hellogithub.com/v1/widgets/recommend.svg?rid=c69089b776704985b989f98626de977a&claim_uid=ekhLfDOxR5U0mVw&theme=small" alt="Featured｜HelloGitHub" /></a>
      </div>`,
      copyright: 'Copyright © 2024-present DPanel Development Team <a href="https://beian.miit.gov.cn/" target="_blank">晋ICP备2022006920号-3</a>'
    },
    outline: {
      level: [2, 4]
    },
  },
  markdown: {
    lineNumbers: true
  },
  lastUpdated: true,
  locales: {
    root: { label: '简体中文', ...zhCNConfig },
    "docs/en-US": { label: 'English', ...enUSConfig },
  },
})