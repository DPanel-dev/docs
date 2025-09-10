// https://vitepress.dev/guide/custom-theme
import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme, { VPImage } from 'vitepress/theme'
import './style.css'
import mediumZoom from 'medium-zoom'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-after': () => h("div", {
        style: {
          overflow: "hidden",
          margin: "0px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30px"
        }
      }, h("img", {
        src: "https://cdn.w7.cc/dpanel/dpanel-logo-1.png",
        width: 100,
      }))
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
