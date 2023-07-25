import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')
const comp401 = () => import('@/views/error-page/401.vue')
const comp404 = () => import('@/views/error-page/404.vue')
const comp500 = () => import('@/views/error-page/500.vue')

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'menu-home'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  }
]

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: '/401',
    name: '401',
    component: comp401,
    meta: {
      title: '401',
      hidden: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: comp404,
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/500',
    name: '500',
    component: comp500,
    meta: {
      title: '500',
      hidden: true
    }
  },
  // 解决刷新页面、路由警告, 不识别的path自动匹配404
  {
    path: '/:pathMatch(.*)*',
    component: comp404
  }
]
