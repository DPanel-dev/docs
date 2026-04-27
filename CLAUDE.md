# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VitePress-based documentation site for DPanel, a lightweight Docker/Podman container management panel. The site supports Chinese (zh-CN) and English (en-US) languages.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Architecture

### Config-Driven Automation (`.vitepress/config.mts`)

The config file performs critical build-time operations **before** VitePress configuration:

1. **Upgrade pages are runtime-loaded**: `/upgrade/latest` and `/upgrade/release` use a shared VitePress component to fetch Markdown content from the CDN in the browser.

2. **Injects "New" badges**: The `injectNewBadge()` function walks the sidebar configuration, checks each linked file's last git commit time, and adds a `<span class="vp-badge-new">New</span>` badge to files modified within 30 days. Files checked via `git log -1 --format=%ct`.

### Multi-Language Setup

- **Locales**: `.vitepress/locales/zh-CN.ts` and `.vitepress/locales/en-US.ts` export sidebar/nav configurations
- **Helper function**: `getLink()` handles path prefixing—Chinese uses `/path`, English uses `/docs/en-US/path`
- **Rewrite rule**: In `config.mts`, `rewrites: { 'docs/zh-CN/:rest*': ':rest*' }` maps Chinese docs to root

### Content Reuse Pattern

Use VitePress include directive to avoid duplication:

```markdown
<!--@include: ../include/image.md-->
<!--@include: ../include/yaml.md-->
```

Reusable fragments live in `docs/zh-CN/include/` and `docs/en-US/include/`.

### Custom Theme

- `.vitepress/theme/index.ts`: Extends default VitePress theme, injects custom components via layout slots (e.g., `home-hero-after` for DPAds)
- `.vitepress/theme/style.css`: Custom CSS variables for theming
- Components in `.vitepress/components/`: `DPAds.vue` (ads), `PartnerList.vue` (homepage partners)

### Styling

Images use medium-zoom for lightbox functionality. Add `data-zoomable` attribute to enable.

### Sidebar Structure

Sidebar is organized by feature areas:
- `install/` - Installation methods
- `manual/` - User guides (container management, compose, images, system settings)
- `include/` - Reusable content snippets

## Important Patterns

### Link References

Use `getLink("path")` in locale configs for consistent path handling across languages.

### Version Badges

Mark features requiring minimum DPanel version: `<Badge type="tip" text="DPanel Version >= 1.8.1" />`

### Code Blocks with Focus Lines

Highlight specific lines in code examples using the `// [!code focus]` comment syntax.

### Frontmatter for Special Pages

```yaml
---
next: false    # Hide next/prev navigation
aside: false   # Hide aside table of contents
layout: home   # Use homepage layout
---
```

## File Organization Notes

- Static assets (images, scripts) live in `storage/`
- Git history drives the "New" badge system—avoid rewriting history on doc files if you want accurate badge display
