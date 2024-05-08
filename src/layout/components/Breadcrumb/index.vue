<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 面包屑
-->
<template>
  <div class="breadcrumb-box">
    <el-breadcrumb separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
          <div class="el-breadcrumb__inner is-link" @click="onBreadcrumbClick(item)">
            <svg-icon v-show="item.meta.icon && globalStore.breadcrumbIcon" :name="item.meta.icon"> </svg-icon>
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@/store/modules/global'
const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()

const breadcrumbList = computed(() => {
  // 当只关心几个属性时，深入遍历复杂对象是浪费的。这里用函数读取部分参数
  let breadcrumbData = [...getBreadcrumbList(route.matched)]
  // 当第一个不是首页情况下默认添加首页路由
  if (breadcrumbData[0].path !== '/home') {
    breadcrumbData.unshift({
      path: '/home',
      meta: { icon: 'menu-home', title: '首页' },
      children: []
    })
  }
  return breadcrumbData
})

function getBreadcrumbList(matched: Array<any>) {
  return matched.filter(item => {
    const { children, meta, path } = item
    if (path !== '/') return { children, meta, path }
  })
}

const onBreadcrumbClick = (item: MenuType.MenuOptions) => {
  if (item.children?.length === 0) router.push(item.path)
}
</script>

<style scoped lang="scss">
.breadcrumb-box {
  display: flex;
  align-items: center;
  padding-right: 50px;
  height: 20px;
  overflow: hidden;
  mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__inner {
      display: flex;
      align-items: center;
      .breadcrumb-title {
        margin-left: 6px;
      }
    }
  }
}
</style>
