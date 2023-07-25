<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: Mian 渲染入口文件
-->
<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
          <component :is="Component" :key="route.fullPath" v-if="isRouterShow" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup name="AppMain">
import { ref, provide } from 'vue'
import { storeToRefs } from 'pinia'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
const keepAliveStore = useKeepAliveStore()
const { keepAliveName } = storeToRefs(keepAliveStore)

// 注入刷新页面方法 todo
const isRouterShow = ref(true)
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val)
provide('refresh', refreshCurrentPage)
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px 12px;
  background-color: var(--el-bg-color-page);
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }
  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
