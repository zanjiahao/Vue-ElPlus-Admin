import { defineStore } from 'pinia'
import router from '@/router'
import piniaPersistConfig from '@/plugins/piniaPersist'

export const useTabsStore = defineStore({
  id: 'app-tabs',
  state: (): TabsState => ({
    tabsMenuList: []
  }),
  getters: {},
  actions: {
    // Add Tabs
    async addTabs(tabItem: TabsMenuProps) {
      if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem)
      }
    },
    // Remove Tabs
    async removeTabs(tabPath: string, isCurrent: boolean = true) {
      const tabsMenuList = this.tabsMenuList
      if (isCurrent) {
        tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return
          // 删除后看tab后面前面(优先后面标签)有没有其它标签，有就展示
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
          if (!nextTab) return
          router.push(nextTab.path)
        })
      }
      this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath)
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList = this.tabsMenuList.filter(item => {
        return item.path === tabsMenuValue || !item.close
      })
    },
    // Set Tabs
    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList
    }
  },
  persist: piniaPersistConfig('app-tabs')
})
