import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRouter, errorRouter } from '@/router/modules/staticRouter'
import NProgress from '@/plugins/nprogress'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth' // get token from cookie
import { useGlobalStore } from '@/store/modules/global'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
const whiteList = ['/login'] // no redirect whitelist

const CreateRouter = () =>
  createRouter({
    // 每次切换路由页面回滚到顶部
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHashHistory(),
    routes: [...staticRouter, ...errorRouter]
  })

const router = CreateRouter()

// 前置守卫
router.beforeEach(async (to, from, next) => {
  const globalStore = useGlobalStore()
  const authStore = useAuthStore()
  const userStore = useUserStore()

  NProgress.start()
  // 根据路由元信息设置页面标题
  document.title = `${to.meta.title}` || globalStore.title

  // 获取Token，确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    // 保存到 store 中，防止是页面刷新情况下 store 中已经被清除了
    userStore.setToken(hasToken)
    // 初始化静态路由
    authStore.addAllRoutes(router.options.routes)
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否通过getInfo获取了权限角色
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 角色必须是数组！例如：['admin']或，['developer'，'visitor']
          const { roles } = await userStore.getInfo()

          // 基于角色生成可访问路由数组
          const accessRoutes = await authStore.generateAsyncRoutes(roles)

          // 动态添加可访问路由
          accessRoutes.forEach(async (item: any) => {
            const { name } = item
            if (name && !router.hasRoute(name)) {
              router.addRoute(item)
              router.options.routes = router.options.routes.concat(item)
            }
          })
          authStore.addAllRoutes(router.options.routes) // 保存授权路由，便于菜单展示

          // 路由的重定向
          // 设置replace:true，这样导航就不会留下历史记录，登录后回退不会回到登录页面
          next({ ...to, replace: true })
        } catch (error) {
          // 删除令牌并转到登录页面重新登录
          await userStore.resetToken() // 重置token信息和登录用户信息
          ElMessage({
            type: 'error',
            message: JSON.stringify(error) || 'Has Error'
          })
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 在免费登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条 (访问之后再调一次)
  NProgress.done()
})

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const authStore = useAuthStore()
  authStore.addRoutes.forEach(route => {
    const { name } = route
    if (name && router.hasRoute(name)) router.removeRoute(name)
  })
  const newRouter = CreateRouter()
  router.options.routes = newRouter.options.routes
}

export default router
