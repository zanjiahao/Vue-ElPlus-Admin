<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 横向布局 | 默认导航栏
-->
<template>
  <div class="horizontal-wrapper">
    <el-affix :offset="0">
      <header class="app-header">
        <div class="logo-box">
          <logo />
        </div>
        <div class="menu-box">
          <Menu />
        </div>
        <tool-bar />
      </header>
      <Tabs v-if="globalStore.tabs" />
    </el-affix>
    <div class="app-body">
      <app-main />
    </div>
    <Footer v-if="globalStore.footer" />
  </div>
</template>

<script lang="ts" setup name="LayoutHorizontal">
import Menu from '../Menu/index.vue'
import AppMain from '../AppMain.vue'
import Logo from '../Logo/index.vue'
import ToolBar from '../ToolBar/index.vue'
import Footer from '../Footer/index.vue'
import Tabs from '../Tabs/index.vue'
import { useGlobalStore } from '@/store/modules/global'
const globalStore = useGlobalStore()
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.horizontal-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .app-header {
    display: flex;
    height: $sideBarHeight;
    padding: 0 10px;
    background-color: $menuBg;
    .logo-box {
      margin-left: 16px;
    }
    .menu-box {
      flex: 1;
      justify-content: space-between;
      height: 100%;
      padding-left: 30px;
      overflow: hidden;
      :deep(.el-menu-custom) {
        height: $sideBarHeight;
        overflow: hidden;
        border-bottom: none;
        .el-menu-item.is-active {
          color: var(--el-color-primary) !important;
          border-bottom: 2px solid var(--el-color-primary);
          .el-sub-menu__title {
            color: var(--el-color-primary) !important;
          }
        }
        .is-active {
          .el-sub-menu__title {
            color: var(--el-color-primary) !important;
            border-bottom: 2px solid var(--el-color-primary) !important;
          }
        }
      }
    }
  }
  .app-body {
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
  }
}
</style>
