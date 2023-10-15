<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 菜单栏组件
-->
<template>
  <el-menu
    class="el-menu-custom"
    :default-active="activeMenu"
    :mode="globalStore.layout"
    :background-color="menuBg"
    :text-color="menuText"
    :active-text-color="menuActiveText"
    :ellipsis="true"
    :collapse="isCollapse"
  >
    <template v-if="isVertical">
      <SubMenu
        v-for="routeItem in authRoutes"
        :key="routeItem.path"
        :item="routeItem"
        :base-path="routeItem.path"
      />
    </template>
    <template v-else>
      <div v-for="routeItem in authRoutes" :key="routeItem.path">
        <SubMenu :item="routeItem" :base-path="routeItem.path" />
      </div>
    </template>
  </el-menu>
</template>
<script lang="ts" setup name="Menu">
import SubMenu from '@/layout/components/Menu/SubMenu.vue'
import variables from '@/styles/variables.module.scss'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/store/modules/global'
import { useAuthStore } from '@/store/modules/auth'
const { menuBg, menuText, menuActiveText } = variables

const globalStore = useGlobalStore()
const authStore = useAuthStore()
const route = useRoute()

// 是否是侧边栏菜单
const isVertical = computed(() => {
  return globalStore.layout === 'vertical'
})

const isCollapse = computed(() => {
  // 只有侧边栏模式的时候才能让折叠为开启状态
  return isVertical.value && globalStore.isCollapse
})

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) return meta.activeMenu
  return path
})

// 授权的路由
const authRoutes = computed(() => {
  return authStore.routes || []
})
</script>
