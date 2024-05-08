import { defineStore } from 'pinia'
import piniaPersistConfig from '@/plugins/piniaPersist'

export const defaultPrimary: string = '#409eff' // 默认主题颜色

export const useGlobalStore = defineStore({
  id: 'app-global',
  state: (): GlobalState => ({
    title: '网址标题',
    // 语言切换
    language: 'zh',
    // 布局模式 (horizontal | vertical)
    layout: 'vertical',
    // 主题颜色
    primary: defaultPrimary,
    // 暗黑模式
    isDark: false,
    // 折叠
    isCollapse: false,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: true,
    // 标签页
    tabs: true,
    // 标签页图标
    tabsIcon: true,
    // 页脚
    footer: true
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(...args: GlobalType.ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] })
    }
  },
  persist: piniaPersistConfig('app-global')
})
