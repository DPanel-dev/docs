// https://vitepress.dev/guide/custom-theme
import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme, { VPImage } from 'vitepress/theme'
import './style.css'
import mediumZoom from 'medium-zoom'
import DPAds from '../components/DPAds.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 'home-hero-after': () => h(DPAds)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
  setup() {
    onMounted(() => {
      mediumZoom('[data-zoomable]', {
        background: '#00000066',
        margin: 50,
        scrollOffset: 0,
      });
    });
  },
} satisfies Theme
