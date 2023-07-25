<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 更多
-->
<template>
  <el-dropdown trigger="click" :teleported="false">
    <el-button size="small" type="primary">
      <span>{{ $t('tabs.more') }}</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- 关闭当前 -->
        <el-dropdown-item @click="closeCurrentTab">
          <el-icon><Remove /></el-icon>{{ $t('tabs.closeCurrent') }}
        </el-dropdown-item>
        <!-- 关闭其它 -->
        <el-dropdown-item @click="closeOtherTab">
          <el-icon><CircleClose /></el-icon>{{ $t('tabs.closeOther') }}
        </el-dropdown-item>
        <!-- 关闭所有 -->
        <el-dropdown-item @click="closeAllTab">
          <el-icon><FolderDelete /></el-icon>{{ $t('tabs.closeAll') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/store/modules/tabs'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const tabStore = useTabsStore()
const keepAliveStore = useKeepAliveStore()

// Close Current
const closeCurrentTab = () => {
  if (route.fullPath === '/home') return
  tabStore.removeTabs(route.fullPath)
  keepAliveStore.removeKeepAliveName(route.name as string)
}

// Close Other
const closeOtherTab = () => {
  tabStore.closeMultipleTab(route.fullPath)
  keepAliveStore.setKeepAliveName([route.name] as string[])
}

// Close All
const closeAllTab = () => {
  tabStore.closeMultipleTab()
  keepAliveStore.setKeepAliveName()
  router.push('/')
}
</script>
