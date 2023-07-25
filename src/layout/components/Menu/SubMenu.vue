<!--
 * @Author: zanjiahao
 * @LastEditors: zanjiahao
 * @Description: 菜单树列表
-->
<template>
  <template v-if="hasOneShowingChild(item.children, item) && !onlyOneChild.children">
    <el-menu-item v-if="isShowOnlyChild" :index="resolvePath(onlyOneChild.path)" @click="handleClickMenu(onlyOneChild)">
      <svg-icon :name="onlyOneChild.meta?.icon" class-name="icon-style" />
      <span class="sle">{{ onlyOneChild.meta?.title }}</span>
    </el-menu-item>
  </template>
  <template v-else>
    <el-sub-menu :index="resolvePath(item.path)">
      <template #title v-if="item.meta">
        <svg-icon :name="item.meta?.icon" class-name="icon-style" />
        <span class="sle">{{ item.meta?.title }}</span>
      </template>
      <SubMenu
        v-for="childRoute in item.children"
        :key="childRoute.path"
        :item="childRoute"
        :base-path="resolvePath(childRoute.path)" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup name="SubMenu">
import path from 'path-browserify'
import { ref, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

type Props = {
  item: any
  basePath: string
}
// 定义props对象
const props = defineProps<Props>()
let onlyChild: MenuType.MenuOptions = {
  path: '',
  meta: {
    title: '',
    hidden: false // 默认不隐藏，如果碰到404、401、login等页面需要开启隐藏
  }
}
const onlyOneChild = ref(onlyChild)
const { item, basePath } = toRefs(props)

const isShowOnlyChild = computed(() => {
  const { meta } = onlyOneChild.value
  if (meta && !meta.hidden) {
    return true
  }
  return false
})

// 确认children是否只有一个路径
function hasOneShowingChild(children = [], parentInfo = {}) {
  const showingChildren = children.filter((item: any) => {
    if (item.meta.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1) return true

  // 当没有子路由，就显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parentInfo, path: '' }
    return true
  }
  return false
}

// path.resolve() 会返回拼接后的路径
function resolvePath(routePath: string): string {
  return path.resolve(basePath.value, routePath)
}

// 点击跳转
const handleClickMenu = (routeItem: MenuType.MenuOptions) => {
  if (routeItem.meta?.isLinkUrl) return window.open(routeItem.meta.isLinkUrl, '_blank')
  const routePath = path.resolve(basePath.value, routeItem.path)
  router.push(routePath)
}
</script>

<style lang="scss" scoped>
.icon-style {
  margin-right: 10px;
  font-size: 14px;
}
</style>
