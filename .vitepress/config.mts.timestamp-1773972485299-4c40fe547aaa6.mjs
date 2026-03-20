// .vitepress/config.mts
import { defineConfig } from "file:///D:/Workspace/dpanel-docs/node_modules/vitepress/dist/node/index.js";

// .vitepress/locales/zh-CN.ts
function getLink(link) {
  return `/${link ? `${link}` : ""}`;
}
var zhCNConfig = {
  themeConfig: {
    nav: [
      { text: "\u9996\u9875", link: getLink() },
      { text: "\u8BB8\u53EF\u534F\u8BAE", link: getLink("license") },
      { text: "\u4E13\u4E1A\u7248", link: getLink("pro") },
      { text: "\u66F4\u65B0\u8BB0\u5F55", link: getLink("upgrade") },
      { text: "\u8D5E\u52A9", link: "https://afdian.com/a/dpanel" },
      { text: "\u6F14\u793A", link: "https://demo.dpanel.cc" }
    ],
    sidebar: [
      {
        text: "\u5B89\u88C5\u90E8\u7F72",
        collapsed: false,
        items: [
          { text: "\u4F7F\u7528\u5B89\u88C5\u811A\u672C", link: getLink("install/shell") },
          { text: "\u4F7F\u7528 Docker", link: getLink("install/docker") },
          { text: "\u4F7F\u7528 Compose", link: getLink("install/compose") },
          { text: "\u4F7F\u7528 DinD", link: getLink("install/dind") },
          { text: "\u4F7F\u7528\u4E8C\u8FDB\u5236\u6587\u4EF6", link: getLink("install/source") },
          { text: "\u4F7F\u7528 DPanel Desktop", link: getLink("install/desktop") },
          { text: "\u98DE\u725B\u5E94\u7528\u5546\u5E97\u90E8\u7F72", link: getLink("install/fnnas") }
        ]
      },
      {
        text: "\u6269\u5C55\u4F7F\u7528",
        collapsed: false,
        items: [
          { text: "\u542F\u52A8\u53C2\u6570", link: getLink("install/params") },
          { text: "\u63A7\u5236\u547D\u4EE4", link: getLink("install/ctrl") },
          { text: "\u81EA\u5B9A\u4E49\u9762\u677F\u955C\u50CF", link: getLink("install/custom-image") },
          { text: "\u7ED1\u5B9A\u57DF\u540D\u6216\u76EE\u5F55", link: getLink("install/bind-domain") },
          { text: "\u6269\u5C55\u8BED\u8A00\u5305", link: getLink("install/i18n") },
          { text: "\u56FE\u6807\u8D44\u6E90", link: getLink("install/resource") }
        ]
      },
      {
        text: "\u5BB9\u5668\u7BA1\u7406",
        collapsed: false,
        items: [
          { text: "\u5FEB\u901F\u521B\u5EFA", link: getLink("manual/container-create") },
          { text: "\u53C2\u6570\u8BE6\u89E3", link: getLink("manual/container-create-option") },
          { text: "\u68C0\u6D4B\u4E0E\u5347\u7EA7", link: getLink("manual/container-upgrade") },
          { text: "\u5FEB\u7167\u4E0E\u6062\u590D", link: getLink("manual/container-snapshot") },
          { text: "\u8BA1\u5212\u4EFB\u52A1", link: getLink("manual/container-cron") },
          { text: "\u7AEF\u53E3\u8BBF\u95EE", link: getLink("manual/container-port") },
          { text: "\u56DE\u6536\u7AD9", link: getLink("manual/container-rollback") }
        ]
      },
      {
        text: "\u4E3A\u5BB9\u5668\u7ED1\u5B9A\u57DF\u540D",
        collapsed: false,
        items: [
          { text: "\u57DF\u540D\u8F6C\u53D1", link: getLink("manual/container-domain") },
          { text: "\u4F7F\u7528\u7B2C\u4E09\u65B9\u8F6C\u53D1", link: getLink("manual/container-domain-other") },
          { text: "\u8BC1\u4E66\u7BA1\u7406", link: getLink("manual/container-domain-cert") }
        ]
      },
      {
        text: "\u955C\u50CF\u7BA1\u7406",
        collapsed: false,
        items: [
          { text: "\u955C\u50CF\u52A0\u901F", link: getLink("manual/image-proxy") },
          {
            text: "\u6784\u5EFA\u955C\u50CF",
            items: [
              { text: "Dockerfile", link: getLink("manual/image-create-dockerfile") },
              { text: "Zip&Git", link: getLink("manual/image-create-zip") },
              { text: "\u5BB9\u5668", link: getLink("manual/image-create-container") }
            ]
          },
          { text: "\u5BFC\u5165\u955C\u50CF", link: getLink("manual/image-import") },
          { text: "\u4ED3\u5E93\u7BA1\u7406", link: getLink("manual/image-registry") }
        ]
      },
      {
        text: "Compose",
        collapsed: false,
        items: [
          { text: "\u5FEB\u901F\u5F00\u59CB", link: getLink("manual/compose-create") },
          { text: "\u73AF\u5883\u53D8\u91CF", link: getLink("manual/compose-create-env") },
          { text: "\u8986\u76D6\u914D\u7F6E", link: getLink("manual/compose-create-override") },
          { text: "\u7BA1\u7406\u5916\u90E8\u4EFB\u52A1", link: getLink("manual/compose-create-outpath") },
          { text: "\u6279\u91CF\u62C9\u53D6\u955C\u50CF", link: getLink("manual/compose-image-pull") },
          { text: "\u5176\u5B83\u5E73\u53F0\u8FC1\u79FB", link: getLink("manual/compose-third-party") }
        ]
      },
      {
        text: "Swarm",
        collapsed: false,
        items: [
          { text: "\u4ECB\u7ECD", link: getLink("manual/swarm-overview") }
        ]
      },
      {
        text: "\u7CFB\u7EDF\u8BBE\u7F6E",
        collapsed: false,
        items: [
          { text: "\u754C\u9762\u914D\u7F6E", link: getLink("manual/system-basic-theme") },
          { text: "\u591A\u670D\u52A1\u7AEF\u7BA1\u7406", link: getLink("manual/system-env") },
          { text: "\u5BBF\u4E3B\u673A\u7BA1\u7406", link: getLink("manual/system-env-host") },
          { text: "\u5E94\u7528\u5546\u5E97", link: getLink("manual/system-store") },
          { text: "\u66F4\u65B0\u9762\u677F", link: getLink("manual/system-dpanel-upgrade") },
          { text: "\u8FC1\u79FB\u9762\u677F", link: getLink("manual/system-dpanel-migrate") }
        ]
      },
      {
        text: "\u5176\u5B83",
        collapsed: false,
        items: [
          { text: "\u5F00\u542F Docker Tcp \u8FDE\u63A5", link: getLink("manual/system-env-tcp") },
          { text: "\u6865\u63A5\u5BBF\u4E3B\u673A\u7F51\u7EDC", link: getLink("manual/system-bind-macvlan") },
          { text: "\u8BA1\u5212\u4EFB\u52A1\u811A\u672C\u6A21\u677F", link: getLink("manual/system-cron-template") },
          { text: "\u5E38\u89C1\u9519\u8BEF", link: getLink("manual/system-qa") }
        ]
      }
    ]
  }
};

// .vitepress/locales/en-US.ts
function getLink2(link) {
  return `/docs/en-US${link ? `/${link}` : ""}`;
}
var enUSConfig = {
  themeConfig: {
    nav: [
      { text: "Home", link: getLink2("") },
      { text: "License", link: getLink2("license") },
      { text: "Pro Edition", link: getLink2("pro") },
      { text: "Upgrade", link: "https://github.com/donknap/dpanel/release" },
      { text: "Sponsor", link: "https://afdian.com/a/dpanel" },
      { text: "Demo", link: "https://demo.deepanel.com" }
    ],
    sidebar: [
      {
        text: "Install",
        collapsed: false,
        items: [
          { text: "Install Script", link: getLink2("install/shell") },
          { text: "Install with Docker", link: getLink2("install/docker") },
          { text: "Install with Compose", link: getLink2("install/compose") },
          { text: "Install with DinD", link: getLink2("install/dind") },
          { text: "Run with binary", link: getLink2("install/source") },
          { text: "Run with DPanel Desktop", link: getLink2("install/desktop") }
        ]
      },
      {
        text: "Extended",
        collapsed: false,
        items: [
          { text: "Run params", link: getLink2("install/params") },
          { text: "Control command", link: getLink2("install/ctrl") },
          { text: "Custom image", link: getLink2("install/custom-image") },
          { text: "Custom i18n", link: getLink2("install/i18n") },
          { text: "Icon Resource", link: getLink2("install/resource") }
        ]
      }
    ]
  }
};

// .vitepress/config.mts
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
async function generateUpgradeDocs() {
  const targetPath = path.resolve("docs/zh-CN/upgrade.md");
  const targetJsonPath = path.resolve("storage/api/upgrade.json");
  const repo = "donknap/dpanel";
  const url = `https://api.github.com/repos/${repo}/releases?per_page=10`;
  try {
    console.log("\u23F3 Fetching latest releases from GitHub...");
    const response = await fetch(url, {
      headers: { "User-Agent": "VitePress-Builder" }
    });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    const releases = await response.json();
    let markdown = `---
next: false
aside: false
---

:::tip
\u67E5\u770B\u5B8C\u6574\u7684\u66F4\u65B0\u8BB0\u5F55\uFF0C\u8DF3\u8F6C\u81F3\u4ED3\u5E93 [Release](https://github.com/donknap/dpanel/releases) \u9875\u9762
:::

`;
    releases.forEach((release) => {
      markdown += `## ${release.tag_name}

`;
      const formattedBody = release.body.replace(/\r?\n/g, " \\\n");
      markdown += `${formattedBody}

`;
    });
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetPath, markdown, "utf-8");
    console.log(`\u2705 upgrade.md \u81EA\u52A8\u751F\u6210\u6210\u529F: ${targetPath}`);
    const jsonContent = releases.map((release) => ({
      version: release.tag_name,
      description: release.body
    }));
    const jsonDir = path.dirname(targetJsonPath);
    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir, { recursive: true });
    }
    fs.writeFileSync(targetJsonPath, JSON.stringify(jsonContent, null, 2), "utf-8");
    console.log(`\u2705 upgrade.json \u81EA\u52A8\u751F\u6210\u6210\u529F: ${targetJsonPath}`);
  } catch (error) {
    console.error("\u274C \u83B7\u53D6 GitHub Release \u5931\u8D25:", error);
    if (!fs.existsSync(targetPath)) {
      fs.writeFileSync(targetPath, "# \u66F4\u65B0\u65E5\u5FD7\n\n\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u76F4\u63A5\u524D\u5F80 [GitHub Releases](https://github.com/donknap/dpanel/releases) \u67E5\u770B\u3002", "utf-8");
    }
  }
}
await generateUpgradeDocs();
var NEW_THRESHOLD_DAYS = 7;
function getFileLastCommitTime(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`[Badge Log] \u274C \u6587\u4EF6\u4E0D\u5B58\u5728: ${filePath}`);
      return 0;
    }
    const timestamp = execSync(`git log -1 --format=%ct "${filePath}"`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"]
    }).trim();
    if (!timestamp) {
      console.log(`[Badge Log] \u26A0\uFE0F Git \u65E0\u8BB0\u5F55: ${filePath}`);
      if (process.env.CI) return 0;
      return fs.statSync(filePath).mtimeMs;
    }
    const time = parseInt(timestamp, 10) * 1e3;
    console.log(`[Badge Log] \u2705 Git \u65F6\u95F4: ${new Date(time).toLocaleDateString()} -> ${path.basename(filePath)}`);
    return time;
  } catch (e) {
    console.log(`[Badge Log] \u{1F6A8} Git \u62A5\u9519: ${path.basename(filePath)}`);
    if (process.env.CI) return 0;
    return fs.existsSync(filePath) ? fs.statSync(filePath).mtimeMs : 0;
  }
}
function processSidebar(items, baseDir) {
  const now = Date.now();
  const threshold = NEW_THRESHOLD_DAYS * 24 * 60 * 60 * 1e3;
  return items.map((item) => {
    const newItem = { ...item };
    if (newItem.items) {
      newItem.items = processSidebar(newItem.items, baseDir);
    }
    if (newItem.link) {
      let cleanLink = newItem.link.split(/[?#]/)[0];
      if (cleanLink.endsWith("/")) {
        cleanLink += "index.md";
      } else if (!cleanLink.endsWith(".md")) {
        cleanLink += ".md";
      }
      const normalizedLink = cleanLink.replace(/^\//, "");
      let relativeToRoot;
      if (normalizedLink.startsWith(baseDir)) {
        relativeToRoot = normalizedLink;
      } else {
        relativeToRoot = path.join(baseDir, normalizedLink);
      }
      const fullPath = path.resolve(process.cwd(), relativeToRoot);
      const lastTime = getFileLastCommitTime(fullPath);
      if (lastTime > 0 && now - lastTime < threshold) {
        if (typeof newItem.text === "string" && !newItem.text.includes("vp-badge-new")) {
          newItem.text = `${newItem.text} <span class="vp-badge-new">New</span>`;
          console.log(`[Badge Log] \u2728 \u6CE8\u5165\u6210\u529F: ${newItem.text}`);
        }
      }
    }
    return newItem;
  });
}
function injectNewBadge(config, baseDir) {
  const newConfig = JSON.parse(JSON.stringify(config));
  if (newConfig?.themeConfig?.sidebar) {
    const sidebar = newConfig.themeConfig.sidebar;
    if (Array.isArray(sidebar)) {
      newConfig.themeConfig.sidebar = processSidebar(sidebar, baseDir);
    } else if (typeof sidebar === "object") {
      for (const key in sidebar) {
        sidebar[key] = processSidebar(sidebar[key], baseDir);
      }
    }
  }
  return newConfig;
}
var finalZhConfig = injectNewBadge(zhCNConfig, "docs/zh-CN");
var finalEnConfig = injectNewBadge(enUSConfig, "docs/en-US");
var config_default = defineConfig({
  rewrites: {
    "docs/zh-CN/:rest*": ":rest*"
  },
  title: "DPanel",
  titleTemplate: "DPanel",
  head: [
    [
      "link",
      { rel: "icon", href: "/storage/image/dpanel.ico" }
    ],
    [
      "script",
      {
        async: "",
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1086432794987062",
        crossorigin: "anonymous"
      }
    ],
    [
      "script",
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
      "style",
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
  description: "\u8F7B\u91CF\u5316\u7684 Docker \u53EF\u89C6\u5316\u7BA1\u7406\u9762\u677F",
  lang: "zh-CN",
  cleanUrls: true,
  themeConfig: {
    logo: {
      src: "https://cdn.w7.cc/dpanel/dpanel-logo-small.png"
    },
    editLink: {
      pattern: "https://github.com/donknap/dpanel-docs/tree/master/docs/:path"
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/donknap/dpanel" }
    ],
    search: {
      provider: "local"
    },
    footer: {
      message: `<div style="display:flex; justify-content: center; gap: 10px; margin-bottom:20px;">
      <a href="https://github.com/donknap/dpanel" target="_blank"><img src="https://img.shields.io/github/stars/donknap/dpanel.svg" /></a>
      <a href="https://github.com/donknap/dpanel" target="_blank"><img src="https://img.shields.io/docker/pulls/dpanel/dpanel" /></a>
      <a href="https://github.com/donknap/dpanel/releases" target="_blank"><img src="https://img.shields.io/github/v/release/donknap/dpanel" /></a>
      <a href="https://hellogithub.com/repository/c69089b776704985b989f98626de977a" target="_blank"><img src="https://abroad.hellogithub.com/v1/widgets/recommend.svg?rid=c69089b776704985b989f98626de977a&claim_uid=ekhLfDOxR5U0mVw&theme=small" alt="Featured\uFF5CHelloGitHub" /></a>
      </div>`,
      copyright: 'Copyright \xA9 2024-present DPanel Development Team <a href="https://beian.miit.gov.cn/" target="_blank">\u664BICP\u59072022006920\u53F7-3</a>'
    },
    outline: {
      level: [2, 4]
    }
  },
  markdown: {
    lineNumbers: true
  },
  lastUpdated: true,
  locales: {
    root: { label: "\u7B80\u4F53\u4E2D\u6587", ...finalZhConfig },
    "docs/en-US": { label: "English", ...finalEnConfig }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIiwgIi52aXRlcHJlc3MvbG9jYWxlcy96aC1DTi50cyIsICIudml0ZXByZXNzL2xvY2FsZXMvZW4tVVMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3Jrc3BhY2VcXFxcZHBhbmVsLWRvY3NcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya3NwYWNlXFxcXGRwYW5lbC1kb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29ya3NwYWNlL2RwYW5lbC1kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcclxuaW1wb3J0IHsgemhDTkNvbmZpZyB9IGZyb20gJy4vbG9jYWxlcy96aC1DTidcclxuaW1wb3J0IHsgZW5VU0NvbmZpZyB9IGZyb20gJy4vbG9jYWxlcy9lbi1VUydcclxuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJ1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gMS4gXHU4MUVBXHU1MkE4XHU4M0I3XHU1M0Q2IEdpdEh1YiBSZWxlYXNlIFx1NUU3Nlx1NzUxRlx1NjIxMCB1cGdyYWRlLm1kXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVVcGdyYWRlRG9jcygpIHtcclxuICAvLyBcdTI2QTBcdUZFMEYgXHU4QkY3XHU2ODM5XHU2MzZFXHU0RjYwXHU3Njg0XHU1QjlFXHU5NjQ1XHU3NkVFXHU1RjU1XHU3RUQzXHU2Nzg0XHU4QzAzXHU2NTc0XHU4RkQ5XHU5MUNDXHUzMDAyXHU1OTgyXHU2NzlDXHU0RjYwXHU3Njg0IHVwZ3JhZGUubWQgXHU1NzI4XHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHVGRjBDXHU2NTM5XHU0RTNBIHBhdGgucmVzb2x2ZSgndXBncmFkZS5tZCcpXHJcbiAgY29uc3QgdGFyZ2V0UGF0aCA9IHBhdGgucmVzb2x2ZSgnZG9jcy96aC1DTi91cGdyYWRlLm1kJyk7XHJcbiAgY29uc3QgdGFyZ2V0SnNvblBhdGggPSBwYXRoLnJlc29sdmUoJ3N0b3JhZ2UvYXBpL3VwZ3JhZGUuanNvbicpO1xyXG4gIGNvbnN0IHJlcG8gPSAnZG9ua25hcC9kcGFuZWwnO1xyXG4gIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLyR7cmVwb30vcmVsZWFzZXM/cGVyX3BhZ2U9MTBgO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc29sZS5sb2coJ1x1MjNGMyBGZXRjaGluZyBsYXRlc3QgcmVsZWFzZXMgZnJvbSBHaXRIdWIuLi4nKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgIGhlYWRlcnM6IHsgJ1VzZXItQWdlbnQnOiAnVml0ZVByZXNzLUJ1aWxkZXInIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XHJcblxyXG4gICAgY29uc3QgcmVsZWFzZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgbGV0IG1hcmtkb3duID0gYC0tLVxyXG5uZXh0OiBmYWxzZVxyXG5hc2lkZTogZmFsc2VcclxuLS0tXHJcblxyXG46Ojp0aXBcclxuXHU2N0U1XHU3NzBCXHU1QjhDXHU2NTc0XHU3Njg0XHU2NkY0XHU2NUIwXHU4QkIwXHU1RjU1XHVGRjBDXHU4REYzXHU4RjZDXHU4MUYzXHU0RUQzXHU1RTkzIFtSZWxlYXNlXShodHRwczovL2dpdGh1Yi5jb20vZG9ua25hcC9kcGFuZWwvcmVsZWFzZXMpIFx1OTg3NVx1OTc2MlxyXG46OjpcclxuXHJcbmA7XHJcblxyXG4gICAgcmVsZWFzZXMuZm9yRWFjaCgocmVsZWFzZTogYW55KSA9PiB7XHJcbiAgICAgIG1hcmtkb3duICs9IGAjIyAke3JlbGVhc2UudGFnX25hbWV9XFxuXFxuYDtcclxuICAgICAgY29uc3QgZm9ybWF0dGVkQm9keSA9IHJlbGVhc2UuYm9keS5yZXBsYWNlKC9cXHI/XFxuL2csICcgXFxcXFxcbicpO1xyXG4gICAgICBtYXJrZG93biArPSBgJHtmb3JtYXR0ZWRCb2R5fVxcblxcbmA7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBcdTc4NkVcdTRGRERcdTc2RUVcdTVGNTVcdTVCNThcdTU3MjhcclxuICAgIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZSh0YXJnZXRQYXRoKTtcclxuICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSB7XHJcbiAgICAgIGZzLm1rZGlyU3luYyhkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZzLndyaXRlRmlsZVN5bmModGFyZ2V0UGF0aCwgbWFya2Rvd24sICd1dGYtOCcpO1xyXG4gICAgY29uc29sZS5sb2coYFx1MjcwNSB1cGdyYWRlLm1kIFx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NjIxMFx1NTI5RjogJHt0YXJnZXRQYXRofWApO1xyXG5cclxuICAgIGNvbnN0IGpzb25Db250ZW50ID0gcmVsZWFzZXMubWFwKChyZWxlYXNlOiBhbnkpID0+ICh7XHJcbiAgICAgIHZlcnNpb246IHJlbGVhc2UudGFnX25hbWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiByZWxlYXNlLmJvZHlcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBcdTc4NkVcdTRGREQgSlNPTiBcdTc2RUVcdTVGNTVcdTVCNThcdTU3MjhcdTVFNzZcdTUxOTlcdTUxNjVcclxuICAgIGNvbnN0IGpzb25EaXIgPSBwYXRoLmRpcm5hbWUodGFyZ2V0SnNvblBhdGgpO1xyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGpzb25EaXIpKSB7XHJcbiAgICAgIGZzLm1rZGlyU3luYyhqc29uRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIC8vIFx1NEY3Rlx1NzUyOCBKU09OLnN0cmluZ2lmeSBcdTc2ODRcdTdCMkNcdTRFMDlcdTRFMkFcdTUzQzJcdTY1NzAgMiBcdTY3NjVcdTdGOEVcdTUzMTZcdThGOTNcdTUxRkFcdTY4M0NcdTVGMEZcclxuICAgIGZzLndyaXRlRmlsZVN5bmModGFyZ2V0SnNvblBhdGgsIEpTT04uc3RyaW5naWZ5KGpzb25Db250ZW50LCBudWxsLCAyKSwgJ3V0Zi04Jyk7XHJcbiAgICBjb25zb2xlLmxvZyhgXHUyNzA1IHVwZ3JhZGUuanNvbiBcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTYyMTBcdTUyOUY6ICR7dGFyZ2V0SnNvblBhdGh9YCk7XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdcdTI3NEMgXHU4M0I3XHU1M0Q2IEdpdEh1YiBSZWxlYXNlIFx1NTkzMVx1OEQyNTonLCBlcnJvcik7XHJcbiAgICAvLyBcdTVCQjlcdTk1MTlcdTU5MDRcdTc0MDZcdUZGMUFcdTU5ODJcdTY3OUNcdTdGNTFcdTdFRENcdTU5MzFcdThEMjVcdTRFMTRcdTY3MkNcdTU3MzBcdTZDQTFcdTY3MDlcdThGRDlcdTRFMkFcdTY1ODdcdTRFRjZcdUZGMENcdTVDMzFcdTc1MUZcdTYyMTBcdTRFMDBcdTRFMkFcdTdGM0FcdTc3MDFcdTY1ODdcdTRFRjZcdUZGMENcdTk2MzJcdTZCNjIgVml0ZVByZXNzIFx1NjI3RVx1NEUwRFx1NTIzMFx1OTg3NVx1OTc2Mlx1ODAwQ1x1NjJBNVx1OTUxOVxyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHRhcmdldFBhdGgpKSB7XHJcbiAgICAgIGZzLndyaXRlRmlsZVN5bmModGFyZ2V0UGF0aCwgJyMgXHU2NkY0XHU2NUIwXHU2NUU1XHU1RkQ3XFxuXFxuXHU3RjUxXHU3RURDXHU4QkY3XHU2QzQyXHU1OTMxXHU4RDI1XHVGRjBDXHU4QkY3XHU3NkY0XHU2M0E1XHU1MjREXHU1RjgwIFtHaXRIdWIgUmVsZWFzZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9kb25rbmFwL2RwYW5lbC9yZWxlYXNlcykgXHU2N0U1XHU3NzBCXHUzMDAyJywgJ3V0Zi04Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBcdTk2M0JcdTU4NUVcdTYyNjdcdTg4NENcdUZGMUFcdTc4NkVcdTRGREQgdXBncmFkZS5tZCBcdTc1MUZcdTYyMTBcdTVCOENcdTZCRDVcdTU0MEVcdUZGMENcdTUxOERcdTVGODBcdTRFMEJcdTYyNjdcdTg4NENcdTU0MEVcdTdFRURcdTkxNERcdTdGNkVcdTg5RTNcdTY3OTBcclxuYXdhaXQgZ2VuZXJhdGVVcGdyYWRlRG9jcygpO1xyXG5cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyAyLiBcdTVCOUFcdTRFNDkgTkVXIFx1NTZGRVx1NjgwN1x1OTAzQlx1OEY5MVx1NURFNVx1NTE3N1x1NTFGRFx1NjU3MFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmNvbnN0IE5FV19USFJFU0hPTERfREFZUyA9IDc7XHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU2NTg3XHU0RUY2XHU2NzAwXHU1NDBFXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRGaWxlTGFzdENvbW1pdFRpbWUoZmlsZVBhdGg6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcclxuICAgICAgY29uc29sZS5sb2coYFtCYWRnZSBMb2ddIFx1Mjc0QyBcdTY1ODdcdTRFRjZcdTRFMERcdTVCNThcdTU3Mjg6ICR7ZmlsZVBhdGh9YCk7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFx1ODNCN1x1NTNENiBnaXQgXHU2NzAwXHU1NDBFXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XHJcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBleGVjU3luYyhgZ2l0IGxvZyAtMSAtLWZvcm1hdD0lY3QgXCIke2ZpbGVQYXRofVwiYCwge1xyXG4gICAgICBlbmNvZGluZzogJ3V0Zi04JyxcclxuICAgICAgc3RkaW86IFsncGlwZScsICdwaXBlJywgJ2lnbm9yZSddXHJcbiAgICB9KS50cmltKCk7XHJcblxyXG4gICAgaWYgKCF0aW1lc3RhbXApIHtcclxuICAgICAgY29uc29sZS5sb2coYFtCYWRnZSBMb2ddIFx1MjZBMFx1RkUwRiBHaXQgXHU2NUUwXHU4QkIwXHU1RjU1OiAke2ZpbGVQYXRofWApO1xyXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuQ0kpIHJldHVybiAwO1xyXG4gICAgICByZXR1cm4gZnMuc3RhdFN5bmMoZmlsZVBhdGgpLm10aW1lTXM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGltZSA9IHBhcnNlSW50KHRpbWVzdGFtcCwgMTApICogMTAwMDtcclxuICAgIGNvbnNvbGUubG9nKGBbQmFkZ2UgTG9nXSBcdTI3MDUgR2l0IFx1NjVGNlx1OTVGNDogJHtuZXcgRGF0ZSh0aW1lKS50b0xvY2FsZURhdGVTdHJpbmcoKX0gLT4gJHtwYXRoLmJhc2VuYW1lKGZpbGVQYXRoKX1gKTtcclxuICAgIHJldHVybiB0aW1lO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGBbQmFkZ2UgTG9nXSBcdUQ4M0RcdURFQTggR2l0IFx1NjJBNVx1OTUxOTogJHtwYXRoLmJhc2VuYW1lKGZpbGVQYXRoKX1gKTtcclxuICAgIGlmIChwcm9jZXNzLmVudi5DSSkgcmV0dXJuIDA7XHJcbiAgICByZXR1cm4gZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkgPyBmcy5zdGF0U3luYyhmaWxlUGF0aCkubXRpbWVNcyA6IDA7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogXHU5MDEyXHU1RjUyXHU1OTA0XHU3NDA2IFNpZGViYXJcclxuICovXHJcbmZ1bmN0aW9uIHByb2Nlc3NTaWRlYmFyKGl0ZW1zOiBhbnlbXSwgYmFzZURpcjogc3RyaW5nKSB7XHJcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcclxuICBjb25zdCB0aHJlc2hvbGQgPSBORVdfVEhSRVNIT0xEX0RBWVMgKiAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxuICByZXR1cm4gaXRlbXMubWFwKChpdGVtKSA9PiB7XHJcbiAgICBjb25zdCBuZXdJdGVtID0geyAuLi5pdGVtIH07IC8vIFx1NkQ0NVx1NjJGN1x1OEQxRFx1OTYzMlx1NkI2Mlx1NkM2MVx1NjdEM1x1NTM5Rlx1NTlDQlx1OTE0RFx1N0Y2RVxyXG5cclxuICAgIGlmIChuZXdJdGVtLml0ZW1zKSB7XHJcbiAgICAgIG5ld0l0ZW0uaXRlbXMgPSBwcm9jZXNzU2lkZWJhcihuZXdJdGVtLml0ZW1zLCBiYXNlRGlyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobmV3SXRlbS5saW5rKSB7XHJcbiAgICAgIC8vIDEuIFx1ODlDNFx1ODMwM1x1NTMxNlx1OERFRlx1NUY4NFx1RkYxQVx1NTNCQlx1OTY2NFx1NTNDMlx1NjU3MFx1MzAwMVx1ODg2NVx1NTE2OFx1NTQwRVx1N0YwMFxyXG4gICAgICBsZXQgY2xlYW5MaW5rID0gbmV3SXRlbS5saW5rLnNwbGl0KC9bPyNdLylbMF07XHJcbiAgICAgIGlmIChjbGVhbkxpbmsuZW5kc1dpdGgoJy8nKSkge1xyXG4gICAgICAgIGNsZWFuTGluayArPSAnaW5kZXgubWQnO1xyXG4gICAgICB9IGVsc2UgaWYgKCFjbGVhbkxpbmsuZW5kc1dpdGgoJy5tZCcpKSB7XHJcbiAgICAgICAgY2xlYW5MaW5rICs9ICcubWQnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkTGluayA9IGNsZWFuTGluay5yZXBsYWNlKC9eXFwvLywgJycpO1xyXG5cclxuICAgICAgLy8gMi4gXHU4REVGXHU1Rjg0XHU1QkY5XHU5RjUwXHVGRjFBXHU3ODZFXHU0RkREIGJhc2VEaXIgXHU1NDhDIG5vcm1hbGl6ZWRMaW5rIFx1NEUwRFx1NEYxQVx1OTFDRFx1NTkwRFx1NjJGQ1x1NjNBNVxyXG4gICAgICBsZXQgcmVsYXRpdmVUb1Jvb3Q7XHJcbiAgICAgIGlmIChub3JtYWxpemVkTGluay5zdGFydHNXaXRoKGJhc2VEaXIpKSB7XHJcbiAgICAgICAgcmVsYXRpdmVUb1Jvb3QgPSBub3JtYWxpemVkTGluaztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWxhdGl2ZVRvUm9vdCA9IHBhdGguam9pbihiYXNlRGlyLCBub3JtYWxpemVkTGluayk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZ1bGxQYXRoID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlbGF0aXZlVG9Sb290KTtcclxuICAgICAgY29uc3QgbGFzdFRpbWUgPSBnZXRGaWxlTGFzdENvbW1pdFRpbWUoZnVsbFBhdGgpO1xyXG5cclxuICAgICAgLy8gMy4gXHU2Q0U4XHU1MTY1XHU2ODA3XHU3QjdFXHJcbiAgICAgIGlmIChsYXN0VGltZSA+IDAgJiYgKG5vdyAtIGxhc3RUaW1lIDwgdGhyZXNob2xkKSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbmV3SXRlbS50ZXh0ID09PSAnc3RyaW5nJyAmJiAhbmV3SXRlbS50ZXh0LmluY2x1ZGVzKCd2cC1iYWRnZS1uZXcnKSkge1xyXG4gICAgICAgICAgbmV3SXRlbS50ZXh0ID0gYCR7bmV3SXRlbS50ZXh0fSA8c3BhbiBjbGFzcz1cInZwLWJhZGdlLW5ld1wiPk5ldzwvc3Bhbj5gO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYFtCYWRnZSBMb2ddIFx1MjcyOCBcdTZDRThcdTUxNjVcdTYyMTBcdTUyOUY6ICR7bmV3SXRlbS50ZXh0fWApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0l0ZW07XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdTZDRThcdTUxNjVcdTUxRkRcdTY1NzBcclxuICovXHJcbmZ1bmN0aW9uIGluamVjdE5ld0JhZGdlKGNvbmZpZzogYW55LCBiYXNlRGlyOiBzdHJpbmcpIHtcclxuICAvLyBcdTRGN0ZcdTc1MjggSlNPTiBcdTVFOEZcdTUyMTdcdTUzMTZcdThGREJcdTg4NENcdTZERjFcdTYyRjdcdThEMURcdUZGMENcdTY1QURcdTVGMDBcdTRFMEVcdTUzOUZcdTU5Q0JcdTVCRkNcdTUxNjVcdTVCRjlcdThDNjFcdTc2ODRcdTVGMTVcdTc1MjhcclxuICBjb25zdCBuZXdDb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbmZpZykpO1xyXG4gIGlmIChuZXdDb25maWc/LnRoZW1lQ29uZmlnPy5zaWRlYmFyKSB7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gbmV3Q29uZmlnLnRoZW1lQ29uZmlnLnNpZGViYXI7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzaWRlYmFyKSkge1xyXG4gICAgICBuZXdDb25maWcudGhlbWVDb25maWcuc2lkZWJhciA9IHByb2Nlc3NTaWRlYmFyKHNpZGViYXIsIGJhc2VEaXIpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2lkZWJhciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gc2lkZWJhcikge1xyXG4gICAgICAgIHNpZGViYXJba2V5XSA9IHByb2Nlc3NTaWRlYmFyKHNpZGViYXJba2V5XSwgYmFzZURpcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG5ld0NvbmZpZztcclxufVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIDMuIFx1NTJBMFx1NURFNVx1OTE0RFx1N0Y2RVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vIFx1OEZEOVx1OTFDQ1x1NzY4NCAnZG9jcy96aC1DTicgXHU1QkY5XHU1RTk0XHU0RjYwXHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0XHU1QjlFXHU5NjQ1XHU2NTg3XHU0RUY2XHU1OTM5XHU4REVGXHU1Rjg0XHJcbmNvbnN0IGZpbmFsWmhDb25maWcgPSBpbmplY3ROZXdCYWRnZSh6aENOQ29uZmlnLCAnZG9jcy96aC1DTicpO1xyXG5jb25zdCBmaW5hbEVuQ29uZmlnID0gaW5qZWN0TmV3QmFkZ2UoZW5VU0NvbmZpZywgJ2RvY3MvZW4tVVMnKTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyA0LiBcdTUzOUZcdTU5Q0JcdTkxNERcdTdGNkVcdTVCRkNcdTUxRkFcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmV3cml0ZXM6IHtcclxuICAgICdkb2NzL3poLUNOLzpyZXN0Kic6ICc6cmVzdConXHJcbiAgfSxcclxuICB0aXRsZTogXCJEUGFuZWxcIixcclxuICB0aXRsZVRlbXBsYXRlOiAnRFBhbmVsJyxcclxuICBoZWFkOiBbXHJcbiAgICBbXHJcbiAgICAgICdsaW5rJyxcclxuICAgICAgeyByZWw6ICdpY29uJywgaHJlZjogJy9zdG9yYWdlL2ltYWdlL2RwYW5lbC5pY28nIH1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICdzY3JpcHQnLFxyXG4gICAgICB7XHJcbiAgICAgICAgYXN5bmM6ICcnLFxyXG4gICAgICAgIHNyYzogJ2h0dHBzOi8vcGFnZWFkMi5nb29nbGVzeW5kaWNhdGlvbi5jb20vcGFnZWFkL2pzL2Fkc2J5Z29vZ2xlLmpzP2NsaWVudD1jYS1wdWItMTA4NjQzMjc5NDk4NzA2MicsXHJcbiAgICAgICAgY3Jvc3NvcmlnaW46ICdhbm9ueW1vdXMnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICdzY3JpcHQnLFxyXG4gICAgICB7IGlkOiBcImJhaWR1XCIgfSxcclxuICAgICAgYHZhciBfaG10ID0gX2htdCB8fCBbXTtcclxuICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgICAgIGhtLnNyYyA9IFwiaHR0cHM6Ly9obS5iYWlkdS5jb20vaG0uanM/ZTViNmU1MWFhNjI3NmZiMzJjOWMyYmZiMDc1YTFiMTRcIjtcclxuICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdO1xyXG4gICAgICAgIHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaG0sIHMpO1xyXG4gICAgICB9KSgpO2BcclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICdzdHlsZScsXHJcbiAgICAgIHt9LFxyXG4gICAgICBgLnZwLWJhZGdlLW5ldyB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA0cHg7XHJcbiAgICAgICAgcGFkZGluZzogMCA0cHg7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlOTFlNjM7XHJcbiAgICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMTRweDtcclxuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICB9YFxyXG4gICAgXVxyXG4gIF0sXHJcbiAgZGVzY3JpcHRpb246IFwiXHU4RjdCXHU5MUNGXHU1MzE2XHU3Njg0IERvY2tlciBcdTUzRUZcdTg5QzZcdTUzMTZcdTdCQTFcdTc0MDZcdTk3NjJcdTY3N0ZcIixcclxuICBsYW5nOiBcInpoLUNOXCIsXHJcbiAgY2xlYW5VcmxzOiB0cnVlLFxyXG4gIHRoZW1lQ29uZmlnOiB7XHJcbiAgICBsb2dvOiB7XHJcbiAgICAgIHNyYzogXCJodHRwczovL2Nkbi53Ny5jYy9kcGFuZWwvZHBhbmVsLWxvZ28tc21hbGwucG5nXCJcclxuICAgIH0sXHJcbiAgICBlZGl0TGluazoge1xyXG4gICAgICBwYXR0ZXJuOiAnaHR0cHM6Ly9naXRodWIuY29tL2RvbmtuYXAvZHBhbmVsLWRvY3MvdHJlZS9tYXN0ZXIvZG9jcy86cGF0aCdcclxuICAgIH0sXHJcbiAgICBzb2NpYWxMaW5rczogW1xyXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2RvbmtuYXAvZHBhbmVsJyB9LFxyXG4gICAgXSxcclxuICAgIHNlYXJjaDoge1xyXG4gICAgICBwcm92aWRlcjogXCJsb2NhbFwiLFxyXG4gICAgfSxcclxuICAgIGZvb3Rlcjoge1xyXG4gICAgICBtZXNzYWdlOiBgPGRpdiBzdHlsZT1cImRpc3BsYXk6ZmxleDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGdhcDogMTBweDsgbWFyZ2luLWJvdHRvbToyMHB4O1wiPlxyXG4gICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2RvbmtuYXAvZHBhbmVsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCJodHRwczovL2ltZy5zaGllbGRzLmlvL2dpdGh1Yi9zdGFycy9kb25rbmFwL2RwYW5lbC5zdmdcIiAvPjwvYT5cclxuICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9kb25rbmFwL2RwYW5lbFwiIHRhcmdldD1cIl9ibGFua1wiPjxpbWcgc3JjPVwiaHR0cHM6Ly9pbWcuc2hpZWxkcy5pby9kb2NrZXIvcHVsbHMvZHBhbmVsL2RwYW5lbFwiIC8+PC9hPlxyXG4gICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2RvbmtuYXAvZHBhbmVsL3JlbGVhc2VzXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCJodHRwczovL2ltZy5zaGllbGRzLmlvL2dpdGh1Yi92L3JlbGVhc2UvZG9ua25hcC9kcGFuZWxcIiAvPjwvYT5cclxuICAgICAgPGEgaHJlZj1cImh0dHBzOi8vaGVsbG9naXRodWIuY29tL3JlcG9zaXRvcnkvYzY5MDg5Yjc3NjcwNDk4NWI5ODlmOTg2MjZkZTk3N2FcIiB0YXJnZXQ9XCJfYmxhbmtcIj48aW1nIHNyYz1cImh0dHBzOi8vYWJyb2FkLmhlbGxvZ2l0aHViLmNvbS92MS93aWRnZXRzL3JlY29tbWVuZC5zdmc/cmlkPWM2OTA4OWI3NzY3MDQ5ODViOTg5Zjk4NjI2ZGU5NzdhJmNsYWltX3VpZD1la2hMZkRPeFI1VTBtVncmdGhlbWU9c21hbGxcIiBhbHQ9XCJGZWF0dXJlZFx1RkY1Q0hlbGxvR2l0SHViXCIgLz48L2E+XHJcbiAgICAgIDwvZGl2PmAsXHJcbiAgICAgIGNvcHlyaWdodDogJ0NvcHlyaWdodCBcdTAwQTkgMjAyNC1wcmVzZW50IERQYW5lbCBEZXZlbG9wbWVudCBUZWFtIDxhIGhyZWY9XCJodHRwczovL2JlaWFuLm1paXQuZ292LmNuL1wiIHRhcmdldD1cIl9ibGFua1wiPlx1NjY0QklDUFx1NTkwNzIwMjIwMDY5MjBcdTUzRjctMzwvYT4nXHJcbiAgICB9LFxyXG4gICAgb3V0bGluZToge1xyXG4gICAgICBsZXZlbDogWzIsIDRdXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgbWFya2Rvd246IHtcclxuICAgIGxpbmVOdW1iZXJzOiB0cnVlXHJcbiAgfSxcclxuICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICBsb2NhbGVzOiB7XHJcbiAgICByb290OiB7IGxhYmVsOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JywgLi4uZmluYWxaaENvbmZpZyB9LFxyXG4gICAgXCJkb2NzL2VuLVVTXCI6IHsgbGFiZWw6ICdFbmdsaXNoJywgLi4uZmluYWxFbkNvbmZpZyB9LFxyXG4gIH0sXHJcbn0pIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3Jrc3BhY2VcXFxcZHBhbmVsLWRvY3NcXFxcLnZpdGVwcmVzc1xcXFxsb2NhbGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3Jrc3BhY2VcXFxcZHBhbmVsLWRvY3NcXFxcLnZpdGVwcmVzc1xcXFxsb2NhbGVzXFxcXHpoLUNOLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3Jrc3BhY2UvZHBhbmVsLWRvY3MvLnZpdGVwcmVzcy9sb2NhbGVzL3poLUNOLnRzXCI7aW1wb3J0IHsgTG9jYWxlU3BlY2lmaWNDb25maWcsIERlZmF1bHRUaGVtZSB9IGZyb20gJ3ZpdGVwcmVzcydcclxuXHJcbmZ1bmN0aW9uIGdldExpbmsobGluaz86IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGAvJHtsaW5rID8gYCR7bGlua31gIDogXCJcIn1gXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB6aENOQ29uZmlnOiBMb2NhbGVTcGVjaWZpY0NvbmZpZzxEZWZhdWx0VGhlbWUuQ29uZmlnPiA9IHtcclxuICB0aGVtZUNvbmZpZzoge1xyXG4gICAgbmF2OiBbXHJcbiAgICAgIHsgdGV4dDogJ1x1OTk5Nlx1OTg3NScsIGxpbms6IGdldExpbmsoKSB9LFxyXG4gICAgICB7IHRleHQ6ICdcdThCQjhcdTUzRUZcdTUzNEZcdThCQUUnLCBsaW5rOiBnZXRMaW5rKFwibGljZW5zZVwiKSB9LFxyXG4gICAgICB7IHRleHQ6ICdcdTRFMTNcdTRFMUFcdTcyNDgnLCBsaW5rOiBnZXRMaW5rKFwicHJvXCIpIH0sXHJcbiAgICAgIHsgdGV4dDogJ1x1NjZGNFx1NjVCMFx1OEJCMFx1NUY1NScsIGxpbms6IGdldExpbmsoXCJ1cGdyYWRlXCIpIH0sXHJcbiAgICAgIHsgdGV4dDogJ1x1OEQ1RVx1NTJBOScsIGxpbms6ICdodHRwczovL2FmZGlhbi5jb20vYS9kcGFuZWwnIH0sXHJcbiAgICAgIHsgdGV4dDogJ1x1NkYxNFx1NzkzQScsIGxpbms6IFwiaHR0cHM6Ly9kZW1vLmRwYW5lbC5jY1wiIH0sXHJcbiAgICBdLFxyXG5cclxuICAgIHNpZGViYXI6IFtcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTVCODlcdTg4QzVcdTkwRThcdTdGNzInLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NEY3Rlx1NzUyOFx1NUI4OVx1ODhDNVx1ODExQVx1NjcyQycsIGxpbms6IGdldExpbmsoXCJpbnN0YWxsL3NoZWxsXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTRGN0ZcdTc1MjggRG9ja2VyJywgbGluazogZ2V0TGluayhcImluc3RhbGwvZG9ja2VyXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTRGN0ZcdTc1MjggQ29tcG9zZScsIGxpbms6IGdldExpbmsoXCJpbnN0YWxsL2NvbXBvc2VcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NEY3Rlx1NzUyOCBEaW5EJywgbGluazogZ2V0TGluayhcImluc3RhbGwvZGluZFwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU0RjdGXHU3NTI4XHU0RThDXHU4RkRCXHU1MjM2XHU2NTg3XHU0RUY2JywgbGluazogZ2V0TGluayhcImluc3RhbGwvc291cmNlXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTRGN0ZcdTc1MjggRFBhbmVsIERlc2t0b3AnLCBsaW5rOiBnZXRMaW5rKFwiaW5zdGFsbC9kZXNrdG9wXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTk4REVcdTcyNUJcdTVFOTRcdTc1MjhcdTU1NDZcdTVFOTdcdTkwRThcdTdGNzInLCBsaW5rOiBnZXRMaW5rKFwiaW5zdGFsbC9mbm5hc1wiKSB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTYyNjlcdTVDNTVcdTRGN0ZcdTc1MjgnLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NTQyRlx1NTJBOFx1NTNDMlx1NjU3MCcsIGxpbms6IGdldExpbmsoXCJpbnN0YWxsL3BhcmFtc1wiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2M0E3XHU1MjM2XHU1NDdEXHU0RUU0JywgbGluazogZ2V0TGluayhcImluc3RhbGwvY3RybFwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU4MUVBXHU1QjlBXHU0RTQ5XHU5NzYyXHU2NzdGXHU5NTVDXHU1MENGJywgbGluazogZ2V0TGluayhcImluc3RhbGwvY3VzdG9tLWltYWdlXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTdFRDFcdTVCOUFcdTU3REZcdTU0MERcdTYyMTZcdTc2RUVcdTVGNTUnLCBsaW5rOiBnZXRMaW5rKFwiaW5zdGFsbC9iaW5kLWRvbWFpblwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2MjY5XHU1QzU1XHU4QkVEXHU4QTAwXHU1MzA1JywgbGluazogZ2V0TGluayhcImluc3RhbGwvaTE4blwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1NkZFXHU2ODA3XHU4RDQ0XHU2RTkwJywgbGluazogZ2V0TGluayhcImluc3RhbGwvcmVzb3VyY2VcIikgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTVCQjlcdTU2NjhcdTdCQTFcdTc0MDYnLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NUZFQlx1OTAxRlx1NTIxQlx1NUVGQScsIGxpbms6IGdldExpbmsoXCJtYW51YWwvY29udGFpbmVyLWNyZWF0ZVwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1M0MyXHU2NTcwXHU4QkU2XHU4OUUzJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9jb250YWluZXItY3JlYXRlLW9wdGlvblwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2OEMwXHU2RDRCXHU0RTBFXHU1MzQ3XHU3RUE3JywgbGluazogZ2V0TGluayhcIm1hbnVhbC9jb250YWluZXItdXBncmFkZVwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1RkVCXHU3MTY3XHU0RTBFXHU2MDYyXHU1OTBEJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9jb250YWluZXItc25hcHNob3RcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1OEJBMVx1NTIxMlx1NEVGQlx1NTJBMScsIGxpbms6IGdldExpbmsoXCJtYW51YWwvY29udGFpbmVyLWNyb25cIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1N0FFRlx1NTNFM1x1OEJCRlx1OTVFRScsIGxpbms6IGdldExpbmsoXCJtYW51YWwvY29udGFpbmVyLXBvcnRcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NTZERVx1NjUzNlx1N0FEOScsIGxpbms6IGdldExpbmsoXCJtYW51YWwvY29udGFpbmVyLXJvbGxiYWNrXCIpIH0sXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1NEUzQVx1NUJCOVx1NTY2OFx1N0VEMVx1NUI5QVx1NTdERlx1NTQwRCcsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1N0RGXHU1NDBEXHU4RjZDXHU1M0QxJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9jb250YWluZXItZG9tYWluXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTRGN0ZcdTc1MjhcdTdCMkNcdTRFMDlcdTY1QjlcdThGNkNcdTUzRDEnLCBsaW5rOiBnZXRMaW5rKFwibWFudWFsL2NvbnRhaW5lci1kb21haW4tb3RoZXJcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1OEJDMVx1NEU2Nlx1N0JBMVx1NzQwNicsIGxpbms6IGdldExpbmsoXCJtYW51YWwvY29udGFpbmVyLWRvbWFpbi1jZXJ0XCIpIH0sXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1OTU1Q1x1NTBDRlx1N0JBMVx1NzQwNicsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU5NTVDXHU1MENGXHU1MkEwXHU5MDFGJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9pbWFnZS1wcm94eVwiKSB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlx1Njc4NFx1NUVGQVx1OTU1Q1x1NTBDRlwiLCBpdGVtczogW1xyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0RvY2tlcmZpbGUnLCBsaW5rOiBnZXRMaW5rKFwibWFudWFsL2ltYWdlLWNyZWF0ZS1kb2NrZXJmaWxlXCIpIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnWmlwJkdpdCcsIGxpbms6IGdldExpbmsoXCJtYW51YWwvaW1hZ2UtY3JlYXRlLXppcFwiKSB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NUJCOVx1NTY2OCcsIGxpbms6IGdldExpbmsoXCJtYW51YWwvaW1hZ2UtY3JlYXRlLWNvbnRhaW5lclwiKSB9LFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1QkZDXHU1MTY1XHU5NTVDXHU1MENGJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9pbWFnZS1pbXBvcnRcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NEVEM1x1NUU5M1x1N0JBMVx1NzQwNicsIGxpbms6IGdldExpbmsoXCJtYW51YWwvaW1hZ2UtcmVnaXN0cnlcIikgfSxcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnQ29tcG9zZScsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1RkVCXHU5MDFGXHU1RjAwXHU1OUNCJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9jb21wb3NlLWNyZWF0ZVwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9jb21wb3NlLWNyZWF0ZS1lbnZcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1ODk4Nlx1NzZENlx1OTE0RFx1N0Y2RScsIGxpbms6IGdldExpbmsoXCJtYW51YWwvY29tcG9zZS1jcmVhdGUtb3ZlcnJpZGVcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1N0JBMVx1NzQwNlx1NTkxNlx1OTBFOFx1NEVGQlx1NTJBMScsIGxpbms6IGdldExpbmsoXCJtYW51YWwvY29tcG9zZS1jcmVhdGUtb3V0cGF0aFwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2Mjc5XHU5MUNGXHU2MkM5XHU1M0Q2XHU5NTVDXHU1MENGJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9jb21wb3NlLWltYWdlLXB1bGxcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NTE3Nlx1NUI4M1x1NUU3M1x1NTNGMFx1OEZDMVx1NzlGQicsIGxpbms6IGdldExpbmsoXCJtYW51YWwvY29tcG9zZS10aGlyZC1wYXJ0eVwiKSB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdTd2FybScsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU0RUNCXHU3RUNEJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9zd2FybS1vdmVydmlld1wiKSB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdcdTdDRkJcdTdFREZcdThCQkVcdTdGNkUnLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NzU0Q1x1OTc2Mlx1OTE0RFx1N0Y2RScsIGxpbms6IGdldExpbmsoXCJtYW51YWwvc3lzdGVtLWJhc2ljLXRoZW1lXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTU5MUFcdTY3MERcdTUyQTFcdTdBRUZcdTdCQTFcdTc0MDYnLCBsaW5rOiBnZXRMaW5rKFwibWFudWFsL3N5c3RlbS1lbnZcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1NUJCRlx1NEUzQlx1NjczQVx1N0JBMVx1NzQwNicsIGxpbms6IGdldExpbmsoXCJtYW51YWwvc3lzdGVtLWVudi1ob3N0XCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTVFOTRcdTc1MjhcdTU1NDZcdTVFOTcnLCBsaW5rOiBnZXRMaW5rKFwibWFudWFsL3N5c3RlbS1zdG9yZVwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2NkY0XHU2NUIwXHU5NzYyXHU2NzdGJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9zeXN0ZW0tZHBhbmVsLXVwZ3JhZGVcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1x1OEZDMVx1NzlGQlx1OTc2Mlx1Njc3RicsIGxpbms6IGdldExpbmsoXCJtYW51YWwvc3lzdGVtLWRwYW5lbC1taWdyYXRlXCIpIH0sXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1x1NTE3Nlx1NUI4MycsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU1RjAwXHU1NDJGIERvY2tlciBUY3AgXHU4RkRFXHU2M0E1JywgbGluazogZ2V0TGluayhcIm1hbnVhbC9zeXN0ZW0tZW52LXRjcFwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2ODY1XHU2M0E1XHU1QkJGXHU0RTNCXHU2NzNBXHU3RjUxXHU3RURDJywgbGluazogZ2V0TGluayhcIm1hbnVhbC9zeXN0ZW0tYmluZC1tYWN2bGFuXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdThCQTFcdTUyMTJcdTRFRkJcdTUyQTFcdTgxMUFcdTY3MkNcdTZBMjFcdTY3N0YnLCBsaW5rOiBnZXRMaW5rKFwibWFudWFsL3N5c3RlbS1jcm9uLXRlbXBsYXRlXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTVFMzhcdTg5QzFcdTk1MTlcdThCRUYnLCBsaW5rOiBnZXRMaW5rKFwibWFudWFsL3N5c3RlbS1xYVwiKSB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgIF1cclxuICB9XHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFdvcmtzcGFjZVxcXFxkcGFuZWwtZG9jc1xcXFwudml0ZXByZXNzXFxcXGxvY2FsZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtzcGFjZVxcXFxkcGFuZWwtZG9jc1xcXFwudml0ZXByZXNzXFxcXGxvY2FsZXNcXFxcZW4tVVMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmtzcGFjZS9kcGFuZWwtZG9jcy8udml0ZXByZXNzL2xvY2FsZXMvZW4tVVMudHNcIjtpbXBvcnQgeyBMb2NhbGVTcGVjaWZpY0NvbmZpZywgRGVmYXVsdFRoZW1lIH0gZnJvbSAndml0ZXByZXNzJ1xyXG5cclxuZnVuY3Rpb24gZ2V0TGluayhsaW5rPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gYC9kb2NzL2VuLVVTJHtsaW5rID8gYC8ke2xpbmt9YCA6IFwiXCJ9YFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZW5VU0NvbmZpZzogTG9jYWxlU3BlY2lmaWNDb25maWc8RGVmYXVsdFRoZW1lLkNvbmZpZz4gPSB7XHJcbiAgdGhlbWVDb25maWc6IHtcclxuICAgIG5hdjogW1xyXG4gICAgICB7IHRleHQ6ICdIb21lJywgbGluazogZ2V0TGluayhcIlwiKSB9LFxyXG4gICAgICB7IHRleHQ6ICdMaWNlbnNlJywgbGluazogZ2V0TGluayhcImxpY2Vuc2VcIikgfSxcclxuICAgICAgeyB0ZXh0OiAnUHJvIEVkaXRpb24nLCBsaW5rOiBnZXRMaW5rKFwicHJvXCIpIH0sXHJcbiAgICAgIHsgdGV4dDogJ1VwZ3JhZGUnLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2RvbmtuYXAvZHBhbmVsL3JlbGVhc2UnIH0sXHJcbiAgICAgIHsgdGV4dDogJ1Nwb25zb3InLCBsaW5rOiAnaHR0cHM6Ly9hZmRpYW4uY29tL2EvZHBhbmVsJyB9LFxyXG4gICAgICB7IHRleHQ6ICdEZW1vJywgbGluazogXCJodHRwczovL2RlbW8uZGVlcGFuZWwuY29tXCIgfSxcclxuICAgIF0sXHJcblxyXG4gICAgc2lkZWJhcjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ0luc3RhbGwnLFxyXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ0luc3RhbGwgU2NyaXB0JywgbGluazogZ2V0TGluayhcImluc3RhbGwvc2hlbGxcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0luc3RhbGwgd2l0aCBEb2NrZXInLCBsaW5rOiBnZXRMaW5rKFwiaW5zdGFsbC9kb2NrZXJcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0luc3RhbGwgd2l0aCBDb21wb3NlJywgbGluazogZ2V0TGluayhcImluc3RhbGwvY29tcG9zZVwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnSW5zdGFsbCB3aXRoIERpbkQnLCBsaW5rOiBnZXRMaW5rKFwiaW5zdGFsbC9kaW5kXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdSdW4gd2l0aCBiaW5hcnknLCBsaW5rOiBnZXRMaW5rKFwiaW5zdGFsbC9zb3VyY2VcIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ1J1biB3aXRoIERQYW5lbCBEZXNrdG9wJywgbGluazogZ2V0TGluayhcImluc3RhbGwvZGVza3RvcFwiKSB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdFeHRlbmRlZCcsXHJcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnUnVuIHBhcmFtcycsIGxpbms6IGdldExpbmsoXCJpbnN0YWxsL3BhcmFtc1wiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnQ29udHJvbCBjb21tYW5kJywgbGluazogZ2V0TGluayhcImluc3RhbGwvY3RybFwiKSB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnQ3VzdG9tIGltYWdlJywgbGluazogZ2V0TGluayhcImluc3RhbGwvY3VzdG9tLWltYWdlXCIpIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdDdXN0b20gaTE4bicsIGxpbms6IGdldExpbmsoXCJpbnN0YWxsL2kxOG5cIikgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0ljb24gUmVzb3VyY2UnLCBsaW5rOiBnZXRMaW5rKFwiaW5zdGFsbC9yZXNvdXJjZVwiKSB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgXVxyXG4gIH1cclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlIsU0FBUyxvQkFBb0I7OztBQ0V4VCxTQUFTLFFBQVEsTUFBdUI7QUFDdEMsU0FBTyxJQUFJLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRTtBQUNsQztBQUVPLElBQU0sYUFBd0Q7QUFBQSxFQUNuRSxhQUFhO0FBQUEsSUFDWCxLQUFLO0FBQUEsTUFDSCxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxRQUFRLEVBQUU7QUFBQSxNQUM5QixFQUFFLE1BQU0sNEJBQVEsTUFBTSxRQUFRLFNBQVMsRUFBRTtBQUFBLE1BQ3pDLEVBQUUsTUFBTSxzQkFBTyxNQUFNLFFBQVEsS0FBSyxFQUFFO0FBQUEsTUFDcEMsRUFBRSxNQUFNLDRCQUFRLE1BQU0sUUFBUSxTQUFTLEVBQUU7QUFBQSxNQUN6QyxFQUFFLE1BQU0sZ0JBQU0sTUFBTSw4QkFBOEI7QUFBQSxNQUNsRCxFQUFFLE1BQU0sZ0JBQU0sTUFBTSx5QkFBeUI7QUFBQSxJQUMvQztBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1A7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxVQUNMLEVBQUUsTUFBTSx3Q0FBVSxNQUFNLFFBQVEsZUFBZSxFQUFFO0FBQUEsVUFDakQsRUFBRSxNQUFNLHVCQUFhLE1BQU0sUUFBUSxnQkFBZ0IsRUFBRTtBQUFBLFVBQ3JE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
