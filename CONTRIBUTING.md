# DPanel 文档项目写作规范

## 文档编写规范

### 1. 文件命名

- 使用小写字母和连字符: `docker-compose.md`、`image-create-dockerfile.md`
- 文件名应清晰反映内容主题
- 同类文档使用相同的命名模式

### 2. Markdown 写作风格

#### 标题层级

```markdown
# 一级标题（文件标题，通常只出现一次）
## 二级标题（主要章节）
### 三级标题（子章节）
#### 四级标题（细节说明，用于目录生成）
```

#### 警告容器

```markdown
:::danger
危险提示（重要警告、不可逆操作）
:::

:::warning
警告提示（需要注意的事项）
:::

:::tip
技巧提示（有用的建议、最佳实践）
:::
```

#### 代码块

**基础用法**：
````markdown
```shell
docker run -d --name dpanel dpanel/dpanel:latest
```
````

**高亮特定行**：
````markdown
```js
docker run -d --name dpanel \
 -v /var/run/docker.sock:/var/run/docker.sock // [!code focus] \
 -v /home/dpanel:/dpanel dpanel/dpanel:latest
```
````

**代码分组**：
````markdown
:::code-group

```shell [标准版镜像]
dpanel/dpanel:latest
```

```shell [Lite版镜像]
dpanel/dpanel:lite
```
:::
````

#### 版本标记

```markdown
<Badge type="tip" text="DPanel Version >= 1.8.1" />
```

#### 锚点

```markdown
## 手动创建文件管理插件 {#create-explorer-plugin}

[其他地方引用](/install/docker#create-explorer-plugin)
```

#### 表格

```markdown
| 配置组 | 配置项 | 值 | 描述 |
| ------ | --- | --- | --- |
| 基本配置 | 容器标识 | minio | 创建的容器的名称 |
```

#### 图片

```markdown
![compose-create](https://cdn.w7.cc/dpanel/compose-create.png)
```

支持缩放（自动应用）：
```markdown
![compose-create](https://cdn.w7.cc/dpanel/compose-create.png){data-zoomable}
```

#### 内容复用 (Include)

```markdown
<!--@include: ../include/image.md-->
<!--@include: ../include/yaml.md-->
```

### 3. 链接规范

**内部链接**（使用相对路径）：
```markdown
[使用 Docker 安装](/install/docker)
[查看面板升级命令](/manual/system-dpanel-upgrade)
```

**外部链接**：
```markdown
[GitHub Releases](https://github.com/donknap/dpanel/releases)
```

### 4. 内容组织

**典型文档结构**：
```markdown
# 标题

<!-- 可选：图片、引言 -->

:::danger/warning/tip
重要提示
:::

## 主要章节 1
内容...

## 主要章节 2
内容...

### 子章节
内容...

## 参考链接
```

## 多语言规范

### 文件结构

- 中文文档：`docs/zh-CN/`
- 英文文档：`docs/en-US/`
- 保持目录结构一致

### 翻译原则

1. **技术术语保持一致**
2. **代码示例保持一致**（除说明性文字外）
3. **截图使用中文版本**
4. **保持结构同步**

## 常用模式总结

### 1. 多版本镜像展示

```markdown
:::code-group
```shell [标准版镜像]
dpanel/dpanel:latest
```
```shell [Lite版镜像]
dpanel/dpanel:lite
```
:::
```

### 2. 配置说明表格

```markdown
| 配置组 | 配置项 | 值 | 描述 |
| ------ | --- | --- | --- |
```

### 3. 分平台说明

```markdown
:::code-group
```js [Windows]
// Windows 命令
```
```js [Macos]
// macOS 命令
```
:::
```

## 注意事项

1. **修改前检查**：每次修改前先检查是否有相同内容可复用
2. **保持同步**：中英文文档保持结构同步
3. **测试链接**：修改链接后测试是否有效
4. **预览效果**：重要变更后本地预览效果
5. **代码高亮**：指定正确的语言类型以获得更好的高亮效果
6. **版本标记**：新功能添加版本 Badge 标记最低版本要求
