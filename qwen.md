# QWEN.md

## 项目概览

- 本项目为 DPanel 文档站，基于 VitePress。
- 多语言：中文 `docs/zh-CN/`，英文 `docs/en-US/`。

## 开发命令

```bash
# 安装依赖
npm install

# 本地开发
npm run docs:dev

# 生产构建
npm run docs:build

# 构建预览
npm run docs:preview
```

## 项目级协作规范

1. 文档修改遵循**中文优先**：
   - 先修改 `zh-CN` 文档；
   - 由用户确认无问题后，再同步 `en-US` 文档；
   - 除非用户明确要求“同时修改”或“先改英文”。

2. Installer 文档结构遵循“双维度 + 任务导向”：
   - 先区分**运行入口**：脚本（`quick.sh` / `quick.ps1`）与容器（`docker run`）；
   - 再区分**交互模式**：`CLI` 与 `TUI`；
   - 重点突出核心任务：`install` / `upgrade` / `uninstall`。

3. 当涉及 Installer 文档重构时：
   - 先给出清晰大纲；
   - 确认后再展开完整改写。

## 文档写作与结构规范

### 1) 文件命名

- 使用小写字母和连字符，如：`docker-compose.md`。
- 文件名应清晰表达主题。
- 同类文档保持一致命名模式。

### 2) Markdown 规范

- 标题层级：`#`（文件标题）→ `##`（主章节）→ `###`（子章节）→ `####`（细节）。
- 提示容器：
  - `:::danger`：危险/不可逆操作
  - `:::warning`：注意事项
  - `:::tip`：建议/最佳实践
- 代码块需声明语言类型（如 `shell`、`yaml`、`js`）。
- 重点代码行使用 `// [!code focus]`。
- 多方案展示使用 `:::code-group`。
- 新功能或最低版本要求需加版本标记：
  - `<Badge type="tip" text="DPanel Version >= 1.8.1" />`
- 可复用片段优先使用 include：
  - `<!--@include: ../include/image.md-->`
  - `<!--@include: ../include/yaml.md-->`

### 3) 链接规范

- 内部链接使用站点路径（如 `/install/docker`）。
- 外部链接使用完整 URL。
- 修改链接后需检查可用性。

### 4) 图片与表格

- 图片可使用 `{data-zoomable}` 支持缩放。
- 表格列定义保持简洁统一，表头语义清晰。

### 5) Frontmatter（特殊页面）

```yaml
---
next: false
aside: false
layout: home
---
```

## 多语言规范

- 目录结构保持一致：`docs/zh-CN/` ↔ `docs/en-US/`。
- 技术术语、代码示例保持一致。
- 文档结构保持同步。

## VitePress 项目约定

- 多语言导航与侧边栏配置：
  - `.vitepress/locales/zh-CN.ts`
  - `.vitepress/locales/en-US.ts`
- 链接拼装统一使用 `getLink()`。
- `config.mts` 中中文重写规则：
  - `rewrites: { 'docs/zh-CN/:rest*': ':rest*' }`
- 主题扩展入口：`.vitepress/theme/index.ts`。
- 自定义样式：`.vitepress/theme/style.css`。
- 组件目录：`.vitepress/components/`。
- 静态资源目录：`storage/`。

## 内容维护注意事项

1. 修改前先检查是否已有可复用内容。
2. 中英文保持结构与信息同步（遵循“中文优先”流程）。
3. 重要变更后执行本地预览。
4. 避免无意义重写历史，以免影响“New”标记基于 git 时间的判断。

## 与全局 MEMORY.md 的边界说明

1. `memory/MEMORY.md` 属于**全局规范与偏好**存储，不在本项目内定义细则。
2. 本仓库 `QWEN.md` 仅维护**项目级/业务级规范**。
3. 跨项目通用规则（协作方式、语言偏好、沟通流程）写入全局 `memory/MEMORY.md`。
4. 当前项目私有规则（目录结构、文档风格、业务术语、流程）仅写在本仓库规范中。
5. 如某条项目规则演变为跨项目通用规则，再升级到全局 `memory/MEMORY.md`。
