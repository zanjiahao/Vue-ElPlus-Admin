<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 界面设置
-->
<template>
  <el-drawer v-model="drawerVisible" :title="$t('setting.drawerTitle')" size="300px">
    <!-- 布局切换 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Notification /></el-icon>
      <span class="divider-text">{{ $t('setting.layoutTitle') }}</span>
    </el-divider>
    <div class="layout-box mb30">
      <el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
        <div
          :class="['layout-item layout-horizontal', { 'is-active': layout == 'horizontal' }]"
          @click="setLayout('horizontal')"
        >
          <div class="layout-dark"></div>
          <div class="layout-content"></div>
          <el-icon v-if="layout == 'horizontal'"><CircleCheckFilled /></el-icon>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
        <div
          :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]"
          @click="setLayout('vertical')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
          <el-icon v-if="layout == 'vertical'"><CircleCheckFilled /></el-icon>
        </div>
      </el-tooltip>
    </div>

    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon><ColdDrink /></el-icon>
      <span class="divider-text">{{ $t('setting.theme') }}</span>
    </el-divider>
    <!-- 主题颜色 -->
    <div class="theme-item">
      <span>{{ $t('setting.themeClr') }}</span>
      <el-color-picker size="small" v-model="primary" :predefine="colorList" @change="changePrimary" />
    </div>
    <!-- 暗黑模式 -->
    <div class="theme-item">
      <span>{{ $t('setting.darkMode') }}</span>
      <el-switch v-model="isDark" @change="switchDark" inline-prompt active-icon="Sunny" inactive-icon="Moon" />
    </div>

    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      <el-icon><Setting /></el-icon>
      <span class="divider-text">{{ $t('setting.layoutConfig') }}</span>
    </el-divider>
    <!-- 面包屑 -->
    <div class="theme-item">
      <span>{{ $t('setting.breadcrumbLabel') }}</span>
      <el-switch v-model="breadcrumb" />
    </div>
    <!-- 面包屑图标 -->
    <div class="theme-item">
      <span>{{ $t('setting.breadcrumbIconLabel') }}</span>
      <el-switch v-model="breadcrumbIcon" />
    </div>
    <!-- 标签栏 -->
    <div class="theme-item">
      <span>{{ $t('setting.tabsLabel') }}</span>
      <el-switch v-model="tabs" />
    </div>
    <!-- 标签栏图标 -->
    <div class="theme-item">
      <span>{{ $t('setting.tabsIconLabel') }}</span>
      <el-switch v-model="tabsIcon" />
    </div>
    <!-- 页脚 -->
    <div class="theme-item">
      <span>{{ $t('setting.footerLabel') }}</span>
      <el-switch v-model="footer" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTheme } from '@/hooks/useTheme'
import { useGlobalStore, defaultPrimary } from '@/store/modules/global'
import mittBus from '@/utils/mittBus'
const { changePrimary, switchDark } = useTheme()

const globalStore = useGlobalStore()
const { layout, primary, isDark, breadcrumb, breadcrumbIcon, tabs, tabsIcon, footer } = storeToRefs(globalStore)

// 预定义主题颜色
const colorList = [
  defaultPrimary,
  '#daa96e',
  '#0c819f',
  '#009688',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6'
]

// 设置布局方式
const setLayout = (val: any) => {
  globalStore.setGlobalState('layout', val)
}

const drawerVisible = ref(false)
onMounted(() => {
  // 打开主题设置
  mittBus.on('open-setting-drawer', () => (drawerVisible.value = true))
})

// 移除
onUnmounted(() => {
  mittBus.off('open-setting-drawer', () => {})
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
