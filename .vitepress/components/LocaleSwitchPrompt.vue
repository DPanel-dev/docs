<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Locale = 'zh-CN' | 'en-US'

const PREFERRED_LOCALE_KEY = 'dpanel-docs-preferred-locale'
const PROMPT_DISMISSED_PREFIX = 'dpanel-docs-locale-switch-dismissed:'
const PROMPT_DEADLINE_PREFIX = 'dpanel-docs-locale-switch-deadline:'
const AUTO_REDIRECT_KEY = 'dpanel-docs-locale-auto-redirect'
const SHARED_PATH_PREFIXES = ['/upgrade/']

const route = useRoute()
const AUTO_DISMISS_MS = 8000
const ready = ref(false)
const visible = ref(false)
const currentLocale = ref<Locale>('zh-CN')
const environmentLocale = ref<Locale>('zh-CN')
const remainingSeconds = ref(Math.ceil(AUTO_DISMISS_MS / 1000))
let dismissTimer: ReturnType<typeof window.setTimeout> | null = null
let countdownTimer: ReturnType<typeof window.setInterval> | null = null

const promptTitle = computed(() => {
  return currentLocale.value === 'zh-CN'
    ? 'Need English docs?'
    : '需要切换到中文文档吗？'
})

const promptActionText = computed(() => {
  return currentLocale.value === 'zh-CN' ? 'Switch to English' : '切换到中文'
})

const promptDismissText = computed(() => {
  return currentLocale.value === 'zh-CN'
    ? `Stay here (${remainingSeconds.value}s)`
    : `保持当前语言（${remainingSeconds.value}秒）`
})

const currentPath = computed(() => route.path || '/')

function isSharedPath(path: string) {
  return SHARED_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
}

function detectEnvironmentLocale(): Locale {
  const primaryLanguage = (navigator.languages?.[0] || navigator.language || '').toLowerCase()
  return primaryLanguage.startsWith('en') ? 'en-US' : 'zh-CN'
}

function detectPathLocale(path: string): Locale {
  return path === '/docs/en-US' || path === '/docs/en-US/' || path.startsWith('/docs/en-US/')
    ? 'en-US'
    : 'zh-CN'
}

function toLocalePath(path: string, locale: Locale) {
  if (isSharedPath(path)) return path

  const normalizedPath = detectPathLocale(path) === 'en-US'
    ? path.replace(/^\/docs\/en-US(?=\/|$)/, '') || '/'
    : path

  if (locale === 'zh-CN') {
    return normalizedPath
  }

  if (normalizedPath === '/') {
    return '/docs/en-US/'
  }

  return `/docs/en-US${normalizedPath}`
}

function redirectTo(path: string) {
  const target = `${path}${window.location.search}${window.location.hash}`
  if (target === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    return
  }
  window.location.href = target
}

function clearPromptTimers() {
  if (dismissTimer) {
    window.clearTimeout(dismissTimer)
    dismissTimer = null
  }

  if (countdownTimer) {
    window.clearInterval(countdownTimer)
    countdownTimer = null
  }
}

function getPromptDeadlineKey(locale: Locale) {
  return `${PROMPT_DEADLINE_PREFIX}${locale}`
}

function clearPromptDeadline(locale: Locale) {
  window.sessionStorage.removeItem(getPromptDeadlineKey(locale))
}

function updateRemainingSeconds(deadline: number) {
  const millisecondsLeft = Math.max(deadline - Date.now(), 0)
  remainingSeconds.value = Math.max(1, Math.ceil(millisecondsLeft / 1000))
}

function startAutoDismiss(locale: Locale) {
  clearPromptTimers()
  const deadlineKey = getPromptDeadlineKey(locale)
  const storedDeadline = Number(window.sessionStorage.getItem(deadlineKey))
  const deadline = storedDeadline > Date.now() ? storedDeadline : Date.now() + AUTO_DISMISS_MS

  window.sessionStorage.setItem(deadlineKey, String(deadline))
  updateRemainingSeconds(deadline)

  countdownTimer = window.setInterval(() => {
    const timeLeft = deadline - Date.now()
    if (timeLeft <= 0) {
      dismissPrompt()
      return
    }
    updateRemainingSeconds(deadline)
  }, 1000)

  dismissTimer = window.setTimeout(() => {
    dismissPrompt()
  }, Math.max(deadline - Date.now(), 0))
}

function getTargetLocale() {
  const preferredLocale = window.localStorage.getItem(PREFERRED_LOCALE_KEY) as Locale | null
  return preferredLocale || environmentLocale.value
}

function evaluate() {
  if (typeof window === 'undefined') return

  currentLocale.value = detectPathLocale(currentPath.value)
  environmentLocale.value = detectEnvironmentLocale()

  const path = currentPath.value
  if (isSharedPath(path)) {
    visible.value = false
    ready.value = true
    return
  }

  const targetLocale = getTargetLocale()
  if (currentLocale.value !== targetLocale) {
    const pendingRedirect = window.sessionStorage.getItem(AUTO_REDIRECT_KEY)
    if (pendingRedirect === targetLocale) {
      window.sessionStorage.removeItem(AUTO_REDIRECT_KEY)
    } else {
      window.localStorage.setItem(PREFERRED_LOCALE_KEY, currentLocale.value)
    }
  }

  if (currentLocale.value !== getTargetLocale()) {
    window.sessionStorage.setItem(AUTO_REDIRECT_KEY, targetLocale)
    redirectTo(toLocalePath(path, targetLocale))
    return
  }

  const dismissedKey = `${PROMPT_DISMISSED_PREFIX}${currentLocale.value}`
  visible.value = window.sessionStorage.getItem(dismissedKey) !== '1'
  if (visible.value) {
    startAutoDismiss(currentLocale.value)
  } else {
    clearPromptTimers()
    clearPromptDeadline(currentLocale.value)
  }
  ready.value = true
}

function switchLocale() {
  const nextLocale: Locale = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  window.localStorage.setItem(PREFERRED_LOCALE_KEY, nextLocale)
  window.sessionStorage.removeItem(AUTO_REDIRECT_KEY)
  window.sessionStorage.removeItem(`${PROMPT_DISMISSED_PREFIX}${nextLocale}`)
  clearPromptDeadline(currentLocale.value)
  visible.value = false
  redirectTo(toLocalePath(currentPath.value, nextLocale))
}

function keepCurrentLocale() {
  window.localStorage.setItem(PREFERRED_LOCALE_KEY, currentLocale.value)
  dismissPrompt()
}

function dismissPrompt() {
  clearPromptTimers()
  window.sessionStorage.setItem(`${PROMPT_DISMISSED_PREFIX}${currentLocale.value}`, '1')
  clearPromptDeadline(currentLocale.value)
  visible.value = false
}

onMounted(() => {
  evaluate()
})

watch(() => route.path, (newPath, oldPath) => {
  if (!ready.value) return
  if (visible.value && oldPath && newPath !== oldPath && detectPathLocale(newPath) === detectPathLocale(oldPath)) {
    keepCurrentLocale()
    return
  }
  evaluate()
})

onBeforeUnmount(() => {
  clearPromptTimers()
})
</script>

<template>
  <Transition name="locale-switch-fade">
    <div v-if="ready && visible" class="locale-switch-prompt" role="status" aria-live="polite">
      <p class="locale-switch-prompt__title">{{ promptTitle }}</p>
      <div class="locale-switch-prompt__actions">
        <button type="button" class="locale-switch-prompt__button locale-switch-prompt__button--primary" @click="switchLocale">
          {{ promptActionText }}
        </button>
        <button type="button" class="locale-switch-prompt__button locale-switch-prompt__button--secondary" @click="dismissPrompt">
          {{ promptDismissText }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.locale-switch-prompt {
  position: fixed;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 140;
  display: flex;
  align-items: center;
  gap: 14px;
  width: min(720px, calc(100vw - 32px));
  padding: 12px 16px;
  border: 1px solid color-mix(in srgb, var(--vp-c-tip-1) 45%, white);
  border-radius: 14px;
  background: color-mix(in srgb, var(--vp-c-bg) 72%, var(--vp-c-tip-soft));
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.16);
}

.locale-switch-prompt__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  flex: 1;
}

.locale-switch-prompt__actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.locale-switch-prompt__button {
  appearance: none;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.locale-switch-prompt__button--primary {
  border: 1px solid var(--vp-c-brand-3);
  background: var(--vp-c-brand-3);
  color: var(--vp-c-white);
}

.locale-switch-prompt__button--primary:hover {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-2);
}

.locale-switch-prompt__button--secondary {
  border: 1px solid color-mix(in srgb, var(--vp-c-tip-1) 20%, var(--vp-c-divider));
  background: rgba(255, 255, 255, 0.55);
  color: var(--vp-c-text-1);
}

.locale-switch-prompt__button--secondary:hover {
  border-color: var(--vp-c-tip-1);
  background: rgba(255, 255, 255, 0.8);
}

.locale-switch-fade-enter-active,
.locale-switch-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.locale-switch-fade-enter-from,
.locale-switch-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .locale-switch-prompt {
    top: 64px;
    left: 16px;
    right: 16px;
    transform: none;
    width: auto;
    align-items: flex-start;
    flex-direction: column;
  }

  .locale-switch-prompt__actions {
    width: 100%;
    flex-direction: column;
  }

  .locale-switch-prompt__button {
    width: 100%;
  }
}
</style>
