<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 动效卡片标题
-->
<template>
  <div class="moduleTitle">
    {{ props.title }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.moduleTitle {
  font-size: 24px;
  font-family: 'SourceHanSansCN-Bold' !important;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 11;
}
</style>
