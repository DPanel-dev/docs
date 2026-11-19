// https://vitepress.dev/guide/custom-theme
import { onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import mediumZoom from 'medium-zoom'
import SiteLayout from './SiteLayout.vue'
import RemoteReleaseNotes from '../components/RemoteReleaseNotes.vue'

export default {
  extends: DefaultTheme,
  Layout: SiteLayout,
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
