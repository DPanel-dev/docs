<script setup lang="ts">
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { onMounted, ref, watch } from 'vue'
import DPAds from '../components/DPAds.vue'
import LocaleSwitchPrompt from '../components/LocaleSwitchPrompt.vue'

const route = useRoute()
const embed = ref(false)

onMounted(() => {
  embed.value = new URLSearchParams(window.location.search).get('embed') === '1'
})

watch(() => route.query, (query) => {
  embed.value = new URLSearchParams(query).get('embed') === '1'
})
</script>

<template>
  <DefaultTheme.Layout :class="{ 'embed-layout': embed }">
    <template #home-hero-after><DPAds /></template>
    <template #layout-top><LocaleSwitchPrompt /></template>
  </DefaultTheme.Layout>
</template>

<style>
/* 桌面主题会降低侧栏层级；嵌入模式仍是抽屉，须保持在遮罩上方。 */
.embed-layout {
  --vp-z-index-sidebar: calc(var(--vp-z-index-backdrop) + 1);
}

/* 嵌入时在宽屏上也沿用主题的菜单抽屉、遮罩和键盘关闭行为。 */
.embed-layout .VPSidebar:not(.open) {
  opacity: 0;
  visibility: hidden;
  transform: translateX(-100%);
}

@media (min-width: 60rem) {
  .embed-layout .VPNavBar.has-sidebar {
    --vp-nav-col-offset: 0px;
  }

  .embed-layout .VPSidebar {
    padding: 2rem 2rem 6rem;
    width: var(--vp-sidebar-width);
    max-width: calc(100vw - 4rem);
    box-shadow: var(--vp-c-shadow-3);
  }

  .embed-layout .VPSidebar .curtain {
    display: none;
  }

  .embed-layout .VPContent.has-sidebar {
    padding-left: 0;
    padding-right: 0;
  }

  .embed-layout .VPLocalNav.has-sidebar {
    display: block;
    padding-left: 0;
  }

  .embed-layout .VPLocalNav .menu {
    display: flex;
  }

  .embed-layout .VPBackdrop {
    display: block;
  }
}
</style>
