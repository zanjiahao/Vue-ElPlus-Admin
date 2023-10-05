<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 侧边栏菜单布局
-->
<template>
  <div class="vertical-wrapper">
    <div class="left-wrapper" :class="{ 'folded-style': isCollapse }">
      <div class="logo-box">
        <logo />
      </div>
      <el-scrollbar>
        <Menu />
      </el-scrollbar>
    </div>
    <div class="right-wrapper">
      <header class="app-header">
        <div class="head-left">
          <div class="sidebar-switch flx-center" @click="changeCollapse">
            <svg-icon id="guide-collapseIcon" :name="collapseIcon"></svg-icon>
          </div>
          <Breadcrumb v-if="globalStore.breadcrumb" />
        </div>
        <div class="head-tools">
          <tool-bar />
        </div>
      </header>
      <Tabs v-if="globalStore.tabs" />
      <div class="app-body">
        <app-main />
      </div>
      <Footer v-if="globalStore.footer" />
    </div>
  </div>
</template>

<script lang="ts" setup name="LayoutVertical">
import Menu from '../Menu/index.vue'
import AppMain from '../AppMain.vue'
import Logo from '../Logo/index.vue'
import ToolBar from '../ToolBar/index.vue'
import Footer from '../Footer/index.vue'
import Breadcrumb from '../Breadcrumb/index.vue'
import Tabs from '../Tabs/index.vue'
import { computed } from 'vue'
import { useGlobalStore } from '@/store/modules/global'
const globalStore = useGlobalStore()

const collapseIcon = computed(() => {
  return globalStore.isCollapse ? 'expand' : 'shrink'
})
const isCollapse = computed(() => {
  // 只有侧边栏模式的时候才能让折叠为开启状态
  return globalStore.layout === 'vertical' && globalStore.isCollapse
})

// 改变折叠模式
function changeCollapse() {
  globalStore.setGlobalState('isCollapse', !globalStore.isCollapse)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.vertical-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .left-wrapper {
    display: flex;
    flex-direction: column;
    width: $sideBarWidth;
    height: 100%;
    overflow: hidden;
    background-color: $menuBg;
    transition: width 0.3s ease;
    .logo-box {
      height: $sideBarHeight;
      background: #2b2f3a;
    }
    :deep(.el-menu-custom) {
      border-right: none;
    }
  }
  // 折叠后样式
  .folded-style {
    width: 50px;
    overflow-x: hidden;
    :deep(.el-menu-custom) {
      width: 50px;
      overflow-x: hidden;
      white-space: nowrap;
      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        overflow-x: hidden;
      }

      .el-menu-item,
      .el-sub-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 13px;
        white-space: nowrap;
        .svg-icon {
          display: flex;
          margin: 0;
        }
        .el-sub-menu__title {
          padding: 0 13px;
        }
        .sle {
          display: none;
        }
      }
      .el-sub-menu {
        & > ul {
          display: none;
        }
      }

      .is-active .el-sub-menu__title {
        // 深层菜单选中影响的根目录按钮颜色变化
        color: var(--el-color-primary) !important;
      }
    }
  }
  .right-wrapper {
    display: flex;
    flex: 1;
    width: calc(100% - 210px);
    flex-direction: column;
    .app-header {
      display: flex;
      justify-content: space-between;
      height: $sideBarHeight;
      background-color: var(--el-bg-color);
      border-bottom: 1px solid var(--el-border-color-light);
      .head-left {
        display: flex;
        align-items: center;
        .sidebar-switch {
          width: $sideBarHeight;
          height: 100%;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
    .app-body {
      box-sizing: border-box;
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
