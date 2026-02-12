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

/**
 * 获取文件最后提交时间
 * 修复逻辑：CI 环境下严格依赖 Git 时间，失败则不显示 New，防止误判
 */
function getFileLastCommitTime(filePath: string): number {
  try {
    if (!fs.existsSync(filePath)) return 0;

    // 获取 git 最后提交时间
    // 使用 stdio: ignore 忽略 stderr，防止 git 报错中断构建
    const timestamp = execSync(`git log -1 --format=%ct "${filePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    });

    const time = parseInt(timestamp.trim(), 10) * 1000;

    // 严谨判断：如果 git 获取失败 (time 为 NaN 或 0)
    if (Number.isNaN(time) || time === 0) {
      // 【关键修复】
      // 在 CI 环境 (GitHub Actions) 中，如果拿不到 git 时间，直接返回 0。
      // 绝对不能回退到 fs.statSync，因为 CI 里 git checkout 下来的文件时间都是"刚刚"，会导致全显示 New。
      if (process.env.CI) {
        return 0;
      }
      // 只有在本地开发环境，才允许回退到文件系统时间 (方便调试新建未提交的文件)
      return fs.statSync(filePath).mtimeMs;
    }
    return time;
  } catch (e) {
    // 发生错误时，CI 环境返回 0，本地环境尝试返回文件时间
    if (process.env.CI) return 0;
    return fs.existsSync(filePath) ? fs.statSync(filePath).mtimeMs : 0;
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
      // 1. 规范化 link，移除开头的 /
      let relativePath = item.link.replace(/^\//, '');

      // 2. 补全后缀
      if (!relativePath.endsWith('.md')) {
        relativePath += '.md';
      }

      // 3. 拼接完整的物理路径
      // 【关键修复】检查 link 是否已经包含了 baseDir，防止出现 docs/en-US/docs/en-US/...
      let fullPath;

      // 注意：这里简单的字符串包含检查可能不够，建议检查开头
      // baseDir 例如: 'docs/en-US'
      if (relativePath.startsWith(baseDir)) {
        // 如果 link 已经是 /docs/en-US/guide/xxx，则直接基于 cwd 解析
        fullPath = path.resolve(process.cwd(), relativePath);
      } else {
        // 如果 link 是 /guide/xxx，则拼接 baseDir
        fullPath = path.resolve(process.cwd(), baseDir, relativePath);
      }

      // 调试日志：如果构建时还发现路径不对，可以解开下面注释查看
      // console.log(`[Badge Check] Link: ${item.link} -> Full: ${fullPath}`);

      const lastTime = getFileLastCommitTime(fullPath);

      // 4. 判断并注入 HTML
      // 只有时间有效且在阈值内才添加
      if (lastTime > 0 && (now - lastTime < threshold)) {
        // 确保 item.text 是字符串且不重复添加
        if (typeof item.text === 'string' && !item.text.includes('vp-badge-new')) {
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
// 中文配置通常 link 是 /install/xxx，拼接后为 /app/docs/zh-CN/install/xxx (正确)
injectNewBadge(zhCNConfig, 'docs/zh-CN');

// 处理英文配置：物理路径在 docs/en-US
// 英文配置如果使用了 rewrites 或 link 本身带前缀 /docs/en-US/install/xxx
// processSidebar 里的修复逻辑会处理它，避免重复拼接
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