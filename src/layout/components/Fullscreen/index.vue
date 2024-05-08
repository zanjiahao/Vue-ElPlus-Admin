<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 全屏组件
-->
<template>
  <div class="fullscreen" @click="toggle">
    <svg-icon
      id="guide-fullscreen"
      :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      class="svg-icon"
    />
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()
</script>

<style lang="scss" scoped>
.svg-icon {
  color: rgb(191 203 217);
}
</style>
