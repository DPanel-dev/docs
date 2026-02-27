<script setup lang="ts">

const props = defineProps<{
  data: { 
    name: string; 
    link: string; 
    logo: string; // 可以是 URL，也可以是 <svg... 源码
    desc: string;
    color?: string; // 可选颜色配置
  }[]
}>()

// 判断是否为 SVG 源码
const isSvgCode = (logo: string) => logo.trim().startsWith('<svg')
</script>

<template>
  <div class="vp-partners">
    <h2 class="title">合作伙伴 & 谁在使用</h2>
    <div class="grid">
      <a v-for="item in data" 
         :key="item.name" 
         :href="item.link" 
         target="_blank" 
         class="card"
         :style="{ '--icon-color': item.color || 'var(--vp-c-brand-1)' }"
      >
        <div class="logo-box">
          <div v-if="isSvgCode(item.logo)" 
               class="svg-raw" 
               v-html="item.logo">
          </div>

          <div v-else-if="item.color" 
               class="svg-mask" 
               :style="{ 'mask-image': `url(${item.logo})`, '-webkit-mask-image': `url(${item.logo})` }">
          </div>
          <img v-else :src="item.logo" :alt="item.name" class="standard-img">
        </div>
        
        <div class="content">
          <p class="name">{{ item.name }}</p>
          <p class="desc">{{ item.desc }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.vp-partners { max-width: 1152px; margin: 64px auto 0; padding: 0; }
.title { font-size: 24px; font-weight: 600; margin-bottom: 32px; border: none; color: var(--vp-c-text-1); text-align: center; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }

.card {
  display: flex; align-items: center; gap: 12px; padding: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: all 0.25s;
  text-decoration: none !important;
}

.card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-mute);
  transform: translateY(-2px);
}

.logo-box {
  width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
  background: var(--vp-c-default-soft); /* 适配暗色模式的微弱背景 */
  border-radius: 8px; padding: 8px; flex-shrink: 0;
  overflow: hidden;
}

/* 样式 1: 处理内联 SVG 源码 */
.svg-raw :deep(svg) {
  width: 32px; height: 32px;
  fill: var(--icon-color);
  transition: fill 0.25s;
}

/* 样式 2: 处理带颜色的图片链接 (Mask 方案) */
.svg-mask {
  width: 32px; height: 32px;
  background-color: var(--icon-color);
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  -webkit-mask-position: center;
}

/* 样式 3: 普通图片展示 */
.standard-img {
  max-width: 100%; max-height: 100%; object-fit: contain;
}

.content { overflow: hidden; }
.name { margin: 0; font-weight: 600; color: var(--vp-c-text-1); font-size: 16px; }
.desc { margin: 2px 0 0; font-size: 12px; color: var(--vp-c-text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

@media (max-width: 640px) {
  .grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
}
</style>