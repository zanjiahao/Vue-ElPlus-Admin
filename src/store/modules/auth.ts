import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { asyncRoutes } from '@/router/modules/asyncRouter'

interface AuthState {
  routes: MenuType.MenuOptions[]
  addRoutes: MenuType.MenuOptions[]
}

export const useAuthStore = defineStore('auth', () => {
  const initData: AuthState = reactive({
    routes: [], // 保存整体路由，用于菜单整体展示
    addRoutes: [] // 需要添加的菜单权限列表, 留给退出登录时候清除路由使用
  })

  // 获取动态路由
  function generateAsyncRoutes(roles: string[]): any {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('zjh')) {
        // 日常项目中可以用admin当管理者，进行路由的直接赋值，此项目中 zjh 暂定为开发者账号，为最大管理员
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      initData.addRoutes = accessedRoutes
      resolve(accessedRoutes)
    })
  }

  /**
   * 通过递归筛选异步路由表
   * @param routes asyncRoutes
   * @param roles
   */
  function filterAsyncRoutes(routes: MenuType.MenuOptions[], roles: string[]) {
    const res: MenuType.MenuOptions[] = []

    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })

    return res
  }

  /**
   * 使用meta。角色，以确定当前用户是否具有权限
   * @param roles 角色
   * @param route
   */
  function hasPermission(roles: string[], route: MenuType.MenuOptions) {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta?.roles.includes(role))
    } else {
      return true
    }
  }

  // 设置store中记录的整体路由
  function addAllRoutes(routes: any) {
    initData.routes = routes
  }

  return { ...toRefs(initData), generateAsyncRoutes, addAllRoutes }
})
