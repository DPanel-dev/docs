<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { computed } from 'vue'
</script>

<template>
  <div class="DPCenter">
    <div class="container">
      <a href="https://www.lcayun.com/actcloud.html" target="_blank"><img src="https://cdn.w7.cc/dpanel/6bc4515550b8c066261317ce5cd5ab02.png" width="100%" style="height: 80px;" /></a>
    </div>
  </div>
</template>

<style scoped>
.DPCenter {
  position: relative;
  padding: 0 24px;
  margin-bottom: 20px;
}

@media (min-width: 640px) {
  .DPCenter {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .DPCenter {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}
</style>
