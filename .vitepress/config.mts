import { defineConfig } from 'vitepress'
import { zhCNConfig } from './locales/zh-CN'
import { enUSConfig } from './locales/en-US'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
// ==============================================================================
// 1. 定义 NEW 图标逻辑工具函数
// ==============================================================================

const NEW_THRESHOLD_DAYS = 10;

/**
 * 获取文件最后提交时间
 */
function getFileLastCommitTime(filePath: string): number {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`[Badge Log] ❌ 文件不存在: ${filePath}`);
      return 0;
    }

    // 获取 git 最后提交时间
    const timestamp = execSync(`git log -1 --format=%ct "${filePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();

    if (!timestamp) {
      console.log(`[Badge Log] ⚠️ Git 无记录: ${filePath}`);
      if (process.env.CI) return 0;
      return fs.statSync(filePath).mtimeMs;
    }

    const time = parseInt(timestamp, 10) * 1000;
    console.log(`[Badge Log] ✅ Git 时间: ${new Date(time).toLocaleDateString()} -> ${path.basename(filePath)}`);
    return time;
  } catch (e) {
    console.log(`[Badge Log] 🚨 Git 报错: ${path.basename(filePath)}`);
    if (process.env.CI) return 0;
    return fs.existsSync(filePath) ? fs.statSync(filePath).mtimeMs : 0;
  }
}

/**
 * 递归处理 Sidebar
 */
function processSidebar(items: any[], baseDir: string) {
  const now = Date.now();
  const threshold = NEW_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;

  return items.map((item) => {
    const newItem = { ...item }; // 浅拷贝防止污染原始配置

    if (newItem.items) {
      newItem.items = processSidebar(newItem.items, baseDir);
    }

    if (newItem.link) {
      // 1. 规范化路径：去除参数、补全后缀
      let cleanLink = newItem.link.split(/[?#]/)[0];
      if (cleanLink.endsWith('/')) {
        cleanLink += 'index.md';
      } else if (!cleanLink.endsWith('.md')) {
        cleanLink += '.md';
      }

      const normalizedLink = cleanLink.replace(/^\//, '');

      // 2. 路径对齐：确保 baseDir 和 normalizedLink 不会重复拼接
      let relativeToRoot;
      if (normalizedLink.startsWith(baseDir)) {
        relativeToRoot = normalizedLink;
      } else {
        relativeToRoot = path.join(baseDir, normalizedLink);
      }

      const fullPath = path.resolve(process.cwd(), relativeToRoot);
      const lastTime = getFileLastCommitTime(fullPath);

      // 3. 注入标签
      if (lastTime > 0 && (now - lastTime < threshold)) {
        if (typeof newItem.text === 'string' && !newItem.text.includes('vp-badge-new')) {
          newItem.text = `${newItem.text} <span class="vp-badge-new">New</span>`;
          console.log(`[Badge Log] ✨ 注入成功: ${newItem.text}`);
        }
      }
    }
    return newItem;
  });
}

/**
 * 注入函数
 */
function injectNewBadge(config: any, baseDir: string) {
  // 使用 JSON 序列化进行深拷贝，断开与原始导入对象的引用
  const newConfig = JSON.parse(JSON.stringify(config));
  if (newConfig?.themeConfig?.sidebar) {
    const sidebar = newConfig.themeConfig.sidebar;
    if (Array.isArray(sidebar)) {
      newConfig.themeConfig.sidebar = processSidebar(sidebar, baseDir);
    } else if (typeof sidebar === 'object') {
      for (const key in sidebar) {
        sidebar[key] = processSidebar(sidebar[key], baseDir);
      }
    }
  }
  return newConfig;
}

// ==============================================================================
// 2. 加工配置
// ==============================================================================

// 这里的 'docs/zh-CN' 对应你项目根目录下的实际文件夹路径
const finalZhConfig = injectNewBadge(zhCNConfig, 'docs/zh-CN');
const finalEnConfig = injectNewBadge(enUSConfig, 'docs/en-US');

// ==============================================================================
// 3. 原始配置导出
// ==============================================================================
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
        async: '',
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1086432794987062',
        crossorigin: 'anonymous'
      }
    ],
    [
      'script',
      { id: "baidu" },
      `var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e5b6e51aa6276fb32c9c2bfb075a1b14";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();`
    ],
    [
      'style',
      {},
      `.vp-badge-new {
        display: inline-block;
        margin-left: 4px;
        padding: 0 4px;
        border-radius: 4px;
        background-color: #e91e63;
        color: white;
        font-size: 10px;
        line-height: 14px;
        vertical-align: middle;
        font-weight: bold;
      }`
    ]
  ],
  description: "轻量化的 Docker 可视化管理面板",
  lang: "zh-CN",
  cleanUrls: true,
  themeConfig: {
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
    root: { label: '简体中文', ...finalZhConfig },
    "docs/en-US": { label: 'English', ...finalEnConfig },
  },
})
