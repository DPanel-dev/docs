<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  locale?: 'zh-CN' | 'en-US'
}>(), {
  locale: 'zh-CN',
})

const route = useRoute()
const loading = ref(true)
const error = ref(false)
const markdown = ref('')
const language = ref<string | null>(null)
const displayLocale = computed(() => {
  return language.value === 'zh-CN' || language.value === 'en-US' ? language.value : props.locale
})
const releaseList = computed(() => {
  // 汇总记录用一级版本标题分段，每个版本沿用英文、双换行标签、中文的源格式。
  const source = markdown.value.replace(/\r\n?/g, '\n').replace(/\\\n/g, '\n').trim()
  return source.split(/(?=^#[ \t]+v\d[^\n]*$)/m).filter((block) => block.trim()).map((block) => {
    const heading = block.match(/^#[ \t]+(v\d[^\n]*)(?:\n|$)/)
    const body = heading ? block.slice(heading[0].length) : block
    return {
      title: heading?.[1].trim() || '',
      sectionList: body.split(/^[ \t]*<br\s*\/?>[ \t]*\n(?:[ \t]*\n)*[ \t]*<br\s*\/?>[ \t]*$/m),
    }
  })
})
const selectedMarkdown = computed(() => {
  if (language.value === null) return markdown.value
  return releaseList.value.map((release) => {
    const body = release.sectionList[language.value === 'en-US' ? 0 : 1]?.trim() || ''
    return release.title ? `# ${release.title}\n\n${body}` : body
  }).join('\n\n')
})
const contentError = computed(() => {
  if (language.value === null) return ''
  if (language.value !== 'zh-CN' && language.value !== 'en-US') {
    return displayLocale.value === 'zh-CN'
      ? '不支持指定的更新记录语言，请使用 zh-CN 或 en-US。'
      : 'Unsupported release notes language. Use zh-CN or en-US.'
  }
  if (!markdown.value.trim()) return emptyText.value
  for (const release of releaseList.value) {
    if (release.sectionList.length !== 2) {
      return `${release.title ? `${release.title}: ` : ''}${displayLocale.value === 'zh-CN'
        ? '更新记录格式异常，无法按指定语言显示。'
        : 'The release notes format cannot be displayed in the requested language.'}`
    }
    if (!release.sectionList[language.value === 'en-US' ? 0 : 1].trim()) {
      return `${release.title ? `${release.title}: ` : ''}${displayLocale.value === 'zh-CN'
        ? '暂无中文更新记录。'
        : 'No English release notes available.'}`
    }
  }
  return ''
})
const html = computed(() => contentError.value ? '' : renderMarkdown(selectedMarkdown.value))

const topLinkText = computed(() => {
  return displayLocale.value === 'zh-CN'
    ? '到 GitHub Releases 获取完整的更新记录'
    : 'Get the complete changelog from GitHub Releases'
})

const loadingText = computed(() => {
  return displayLocale.value === 'zh-CN' ? '正在加载更新记录...' : 'Loading release notes...'
})

const emptyText = computed(() => {
  return displayLocale.value === 'zh-CN' ? '暂无更新内容' : 'No release notes available.'
})

const errorText = computed(() => {
  return displayLocale.value === 'zh-CN'
    ? '加载更新记录失败，请稍后再试。'
    : 'Failed to load release notes. Please try again later.'
})

function renderInlineMarkdown(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
}

function renderMarkdown(markdown: string) {
  const source = markdown
    .replace(/\\\r?\n/g, '\n')
    .replace(/\\/g, '')
    .trim() || emptyText.value
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: string[] = []
  let paragraph: string[] = []
  let listItems: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    blocks.push(`<p>${paragraph.join('<br>')}</p>`)
    paragraph = []
  }

  const flushList = () => {
    if (listItems.length === 0) return
    blocks.push(`<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`)
    listItems = []
  }

  for (const rawLine of lines) {
    const trimmed = rawLine.trim()

    if (!trimmed) {
      flushParagraph()
      flushList()
      continue
    }

    if (trimmed === '<br/>' || trimmed === '<br>') {
      paragraph.push('<br>')
      continue
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      flushParagraph()
      flushList()
      const level = Math.min(6, heading[1].length + 1)
      blocks.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`)
      continue
    }

    const list = trimmed.match(/^[-*]\s+(.*)$/)
    if (list) {
      flushParagraph()
      listItems.push(list[1])
      continue
    }

    flushList()
    paragraph.push(renderInlineMarkdown(trimmed))
  }

  flushParagraph()
  flushList()

  return blocks.join('')
}

async function loadMarkdown() {
  loading.value = true
  error.value = false

  try {
    const fetchUrl = `${props.src}${props.src.includes('?') ? '&' : '?'}_t=${Date.now()}_${Math.random().toString(36).slice(2)}`
    const response = await fetch(fetchUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${fetchUrl}: ${response.status}`)
    }

    markdown.value = await response.text()
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  language.value = new URLSearchParams(window.location.search).get('lang')
  loadMarkdown()
})

watch(() => route.query, (query) => {
  language.value = new URLSearchParams(query).get('lang')
})
</script>

<template>
  <div class="release-notes">
    <p v-if="loading" class="release-notes__state">{{ loadingText }}</p>
    <p v-else-if="error || contentError" class="release-notes__state release-notes__state--error">{{ error ? errorText : contentError }}</p>
    <div v-else class="release-notes__content" :lang="language || undefined" v-html="html" />
  </div>
  <div class="release-notes__top-link">
    <hr />
    <a href="https://github.com/donknap/dpanel/releases" target="_blank" rel="noreferrer">{{ topLinkText }}</a>
  </div>
</template>
