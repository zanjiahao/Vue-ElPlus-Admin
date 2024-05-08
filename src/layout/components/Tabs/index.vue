<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: Tab标签组件
-->
<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <svg-icon :name="item.icon" class="tabs-icon" v-show="item.icon && tabsIcon"></svg-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs'
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@/store/modules/global'
import { useTabsStore } from '@/store/modules/tabs'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
import { TabsPaneContext, TabPaneName } from 'element-plus'
import MoreButton from './components/MoreButton.vue'

const route = useRoute()
const router = useRouter()
const tabStore = useTabsStore()
const globalStore = useGlobalStore()
const keepAliveStore = useKeepAliveStore()

const tabsMenuValue = ref(route.fullPath)
const tabsMenuList = computed(() => tabStore.tabsMenuList)
const tabsIcon = computed(() => globalStore.tabsIcon)

onMounted(() => {
  tabsDrop()
  initTabs()
})

// 监听路由的变化（防止浏览器后退/前进不变化）
watch(
  () => route.fullPath,
  () => {
    tabsMenuValue.value = route.fullPath
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: route.fullPath !== '/home' ? true : false
    }
    tabStore.addTabs(tabsParams)
    route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string)
  },
  { immediate: true }
)

// tabs 拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector('.el-tabs__nav') as HTMLElement, {
    draggable: '.el-tabs__item', // 指定那些元素可以被拖拽
    animation: 300, // 动画时间
    onEnd({ newIndex, oldIndex }) {
      // 拖拽结束事件
      // 取当前位置的项插入到新索引下的位置，更新tabsMenuList数组
      const tabsList = [...tabStore.tabsMenuList]
      const currRow = tabsList.splice(oldIndex as number, 1)[0]
      tabsList.splice(newIndex as number, 0, currRow)
      tabStore.setTabs(tabsList)
    }
  })
}

// 初始化需要固定的 tabs
const initTabs = () => {
  const baseTab = [
    {
      icon: 'menu-home',
      title: '首页',
      path: '/home',
      name: 'Home',
      close: false
    }
  ]
  // 避免登录情况下已经有除首页外的指定路由，那会在tab组件渲染之前在store变量内记录路由数据
  // store内有的话就放置在首页后面
  const oldTabs = tabStore.tabsMenuList.filter((item: any) => item.title !== '首页')
  // 定制新的tabs列表
  tabStore.setTabs(baseTab.concat(oldTabs as []))
}

// 跳转
const tabClick = (tabItem: TabsPaneContext) => {
  router.push(tabItem.props.name as string)
}

// 删除tab
const tabRemove = (fullPath: TabPaneName) => {
  const name = tabStore.tabsMenuList.filter(item => item.path == fullPath)[0].name || ''
  keepAliveStore.removeKeepAliveName(name)
  tabStore.removeTabs(fullPath as string, fullPath == route.fullPath)
}
</script>

<style scoped lang="scss">
.tabs-box {
  background-color: var(--el-bg-color);
  .tabs-menu {
    position: relative;
    width: 100%;
    .el-dropdown {
      position: absolute;
      top: 8px;
      right: 13px;
    }
    :deep(.el-tabs) {
      .el-tabs__header {
        box-sizing: border-box;
        height: 40px;
        padding: 0 10px;
        margin: 0;
        .el-tabs__nav-wrap {
          position: absolute;
          width: calc(100% - 110px);
          .el-tabs__nav {
            display: flex;
            border: none;
            .el-tabs__item {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #afafaf;
              border: none;
              .tabs-icon {
                margin: 1.5px 4px 0 0;
                font-size: 15px;
              }
              .is-icon-close {
                margin-top: 1px;
              }
              &.is-active {
                color: var(--el-color-primary);
                &::before {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: 0;
                  content: '';
                  border-bottom: 2px solid var(--el-color-primary) !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
