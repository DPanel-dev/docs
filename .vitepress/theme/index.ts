// https://vitepress.dev/guide/custom-theme
import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import mediumZoom from 'medium-zoom'
import DPAds from '../components/DPAds.vue'
import LocaleSwitchPrompt from '../components/LocaleSwitchPrompt.vue'
import RemoteReleaseNotes from '../components/RemoteReleaseNotes.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-after': () => h(DPAds),
      'layout-top': () => h(LocaleSwitchPrompt),
    })
  },
  enhanceApp({ app }) {
    app.component('RemoteReleaseNotes', RemoteReleaseNotes)
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
