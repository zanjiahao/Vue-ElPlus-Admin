/* global */
declare namespace GlobalType {
  type LayoutType = 'horizontal' | 'vertical'

  type LanguageType = 'zh' | 'en'

  /* Generic Tools */
  type ObjToKeyValArray<T> = {
    [K in keyof T]: [K, T[K]]
  }[keyof T]

  type ObjToKeyValUnion<T> = {
    [K in keyof T]: { key: K; value: T[K] }
  }[keyof T]
}

// 用户相关信息接口
interface UserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

// 全局配置相关接口
interface GlobalState {
  title: string
  language: GlobalType.LanguageType
  layout: GlobalType.LayoutType
  primary: string
  isDark: boolean
  isCollapse: boolean
  breadcrumb: boolean
  breadcrumbIcon: boolean
  tabs: boolean
  tabsIcon: boolean
  footer: boolean
}

// 统一Confirm弹框风格专用接口
interface ConfirmOption {
  type?: 'success' | 'warning' | 'info' | 'error'
  title?: string
  content: string
  confirmButtonText?: string
  cancelButtonText?: string
}
// 统一Alert弹框风格专用
interface AlertOption extends ConfirmOption {
  showClose?: boolean
  showCancelButton?: boolean
  childContent?: string
  isDefaultHtml?: boolean
  customClass?: string
}

/**
 * @description 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param roles ==> 角色权限 例如: ['admin', 'visitor', 'zjh'] 这里我暂定了三种类型人群
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLinkUrl ==> 是跳转外部链接的路径
 * @param meta.roles ==> // 例如: ['admin', 'visitor', 'zjh']
 * @param meta.hidden ==> 是否隐藏
 * @param meta.isKeepAlive ==> 是否缓存
 * */
declare namespace MenuType {
  interface MenuOptions {
    path: string
    name?: string
    redirect?: string
    component?: string | (() => Promise<unknown>)
    meta?: MetaProps
    children?: MenuOptions[]
    roles?: Array
  }
  interface MetaProps {
    title: string
    icon?: string
    activeMenu?: string
    hidden?: boolean
    isLinkUrl?: string
    roles?: Array
    isKeepAlive?: boolean
  }
}

/* KeepAliveState */
interface KeepAliveState {
  keepAliveName: string[]
}

/* tabsMenuProps */
interface TabsMenuProps {
  path: string
  icon?: string
  title?: string
  name?: string
  close?: boolean
}

interface TabsState {
  tabsMenuList: TabsMenuProps[]
}
