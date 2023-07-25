<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 页面布局
-->
<template>
  <div class="layout-wrap">
    <component :is="layoutComponents" />
    <SettingsDrawer />
  </div>
</template>

<script lang="ts" setup>
import LayoutHorizontal from './components/LayoutHorizontal/index.vue'
import LayoutVertical from './components/LayoutVertical/index.vue'
import SettingsDrawer from './components/SettingsDrawer/index.vue'
import { useGlobalStore } from '@/store/modules/global'
import { computed, type Component } from 'vue'
const globalStore = useGlobalStore()

const LayoutComponents: Record<string, Component> = {
  horizontal: LayoutHorizontal, // 横
  vertical: LayoutVertical // 竖
}
const layoutComponents = computed(() => LayoutComponents[globalStore.layout])
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.layout-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  transition: opcity;

  :deep(.el-menu-custom) {
    .el-menu-item.is-active {
      color: var(--el-color-primary) !important;
    }
    .el-menu-item,
    .el-sub-menu__title {
      height: $sideBarHeight;
      line-height: $sideBarHeight;
    }
  }
}
</style>
