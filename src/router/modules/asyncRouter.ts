const Layout = () => import('@/layout/index.vue')

export const asyncRoutes: MenuType.MenuOptions[] = [
  {
    path: '/project',
    name: 'project',
    component: Layout,
    meta: {
      title: '项目列表',
      icon: 'menu-project',
      roles: ['zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'project-test',
        component: () => import('@/views/project/index.vue'),
        name: 'ProjectTest',
        meta: {
          title: '项目测试',
          icon: 'menu-project',
          roles: ['zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/assembly',
    name: 'assembly',
    component: Layout,
    meta: {
      title: '常用组件',
      icon: 'menu-components',
      roles: ['admin', 'zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'draggable-sort',
        component: () => import('@/views/assembly/draggableSort/index.vue'),
        name: 'DraggableSort',
        meta: {
          title: '拖拽排序九宫格',
          icon: 'menu-component',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'draggable-draw',
        component: () => import('@/views/assembly/draggableDraw/index.vue'),
        name: 'DraggableDraw',
        meta: {
          title: '拖拽拉伸',
          icon: 'menu-component',
          roles: ['zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  // 菜单嵌套
  {
    path: '/menu-nest',
    name: 'menuNest',
    component: Layout,
    meta: {
      title: '菜单嵌套',
      icon: 'menu-nest',
      roles: ['admin', 'zjh', 'editor'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'menu-nest1',
        name: 'Nest1',
        component: () => import('@/views/menuNest/Nest1/index.vue'),
        meta: {
          title: '菜单1',
          icon: 'menu-nest',
          roles: ['admin', 'zjh', 'editor'],
          isKeepAlive: true
        }
      },
      {
        path: 'menu-nest2',
        name: 'Nest2',
        meta: {
          title: '菜单2',
          icon: 'menu-nest',
          roles: ['admin', 'zjh', 'editor'],
          isKeepAlive: true
        },
        children: [
          {
            path: 'menu-nest21',
            name: 'Nest21',
            component: () => import('@/views/menuNest/Nest2/Nest21/index.vue'),
            meta: {
              title: '菜单2-1',
              icon: 'menu-nest',
              roles: ['admin', 'zjh', 'editor'],
              isKeepAlive: true
            }
          },
          {
            path: 'menu-nest22',
            name: 'Nest22',
            meta: {
              title: '菜单2-2',
              icon: 'menu-nest',
              roles: ['admin', 'zjh'],
              isKeepAlive: true
            },
            children: [
              {
                path: 'menu-nest221',
                name: 'Nest221',
                component: () => import('@/views/menuNest/Nest2/Nest22/Nest221/index.vue'),
                meta: {
                  title: '菜单2-2-1',
                  icon: 'menu-nest',
                  roles: ['admin', 'zjh'],
                  isKeepAlive: true
                }
              },
              {
                path: 'menu-nest222',
                name: 'Nest222',
                component: () => import('@/views/menuNest/Nest2/Nest22/Nest222/index.vue'),
                meta: {
                  title: '菜单2-2-2',
                  icon: 'menu-nest',
                  roles: ['admin', 'zjh'],
                  isKeepAlive: true
                }
              }
            ]
          },
          {
            path: 'menu-nest23',
            name: 'Nest23',
            component: () => import('@/views/menuNest/Nest2/Nest23/index.vue'),
            meta: {
              title: '菜单2-3',
              icon: 'menu-nest',
              roles: ['admin', 'zjh'],
              isKeepAlive: true
            }
          }
        ]
      },
      {
        path: 'menu-nest3',
        name: 'Nest3',
        component: () => import('@/views/menuNest/Nest3/index.vue'),
        meta: {
          title: '菜单3',
          icon: 'menu-nest',
          roles: ['admin', 'zjh', 'editor'],
          isKeepAlive: true
        }
      }
    ]
  },
  // 表单
  {
    path: '/form',
    name: 'form',
    component: Layout,
    meta: {
      title: '表单 Form',
      icon: 'menu-form',
      roles: ['admin', 'zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'basic-form',
        name: 'BasicForm',
        component: () => import('@/views/form/basicForm/index.vue'),
        meta: {
          title: '基础表单',
          icon: 'menu-form',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      },
      {
        path: 'validate-form',
        name: 'ValidateForm',
        component: () => import('@/views/form/validateForm/index.vue'),
        meta: {
          title: '校验表单',
          icon: 'menu-form',
          roles: ['admin', 'zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: '/directives',
    name: 'Directives',
    component: Layout,
    meta: {
      title: '指令',
      icon: 'menu-direct',
      roles: ['zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'debounce-direct',
        component: () => import('@/views/directives/debounceDirect/index.vue'),
        name: 'DebounceDirect',
        meta: {
          title: '防抖指令',
          icon: 'menu-direct',
          roles: ['zjh'],
          isKeepAlive: true
        }
      }
    ]
  },
  // 有 isLinkUrl 属于外部链接
  {
    path: '/link',
    name: 'Link',
    meta: {
      title: '外部链接',
      icon: 'menu-link',
      roles: ['admin', 'zjh'],
      isKeepAlive: true
    },
    children: [
      {
        path: 'vue',
        name: 'Vue',
        meta: {
          icon: 'menu-link',
          title: 'Vue 官网',
          isLinkUrl: 'https://cn.vuejs.org/guide/introduction.html',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      },
      {
        path: 'vite',
        name: 'Vite',
        meta: {
          icon: 'menu-link',
          title: 'Vite 官网',
          isLinkUrl: 'https://cn.vitejs.dev/guide/',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      },
      {
        path: 'juejin',
        name: 'Juejin',
        meta: {
          icon: 'menu-link',
          title: '掘金',
          isLinkUrl: 'https://juejin.cn/',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      },
      {
        path: 'vue-i18n',
        name: 'VueI18n',
        meta: {
          icon: 'menu-link',
          title: 'Vue-i18n 文档',
          isLinkUrl: 'https://kazupon.github.io/vue-i18n/zh/installation.html',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      },
      {
        path: 'element-plus',
        name: 'ElementPlus',
        meta: {
          icon: 'menu-link',
          title: 'ElementPlus 官网',
          isLinkUrl: 'https://element-plus.gitee.io/zh-CN/',
          roles: ['admin', 'zjh'],
          isKeepAlive: false
        }
      }
    ]
  }
]
