<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  locale?: 'zh-CN' | 'en-US'
}>(), {
  locale: 'zh-CN',
})

const loading = ref(true)
const error = ref('')
const html = ref('')

const topLinkText = computed(() => {
  return props.locale === 'zh-CN'
    ? '到 GitHub Releases 获取完整的更新记录'
    : 'Get the complete changelog from GitHub Releases'
})

const loadingText = computed(() => {
  return props.locale === 'zh-CN' ? '正在加载更新记录...' : 'Loading release notes...'
})

const emptyText = computed(() => {
  return props.locale === 'zh-CN' ? '暂无更新内容' : 'No release notes available.'
})

const errorText = computed(() => {
  return props.locale === 'zh-CN'
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
    .replace(/^\s*#\s+.+?(?:\r?\n)+/, '')
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
  error.value = ''

  try {
    const fetchUrl = `${props.src}${props.src.includes('?') ? '&' : '?'}_t=${Date.now()}_${Math.random().toString(36).slice(2)}`
    const response = await fetch(fetchUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${fetchUrl}: ${response.status}`)
    }

    html.value = renderMarkdown(await response.text())
  } catch (err) {
    console.error(err)
    error.value = errorText.value
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMarkdown()
})
</script>

<template>
  <div class="release-notes">
    <p v-if="loading" class="release-notes__state">{{ loadingText }}</p>
    <p v-else-if="error" class="release-notes__state release-notes__state--error">{{ error }}</p>
    <div v-else class="release-notes__content" v-html="html" />
  </div>
  <p class="release-notes__top-link">
    <hr />
    <a href="https://github.com/donknap/dpanel/releases" target="_blank" rel="noreferrer">{{ topLinkText }}</a>
  </p>
</template>
