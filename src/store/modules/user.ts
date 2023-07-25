import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { resetRouter } from '@/router'
import { removeToken } from '@/utils/auth'
import { mockUser } from '@/assets/mock/userMock'

export const useUserStore = defineStore('user', () => {
  const initData: UserState = reactive({
    token: '',
    name: '',
    avatar: '', // 头像
    introduction: '', // 介绍
    roles: [] // 角色
  })

  // Set Token
  function setToken(token: string) {
    initData.token = token
  }
  // remove token
  function resetToken() {
    initData.token = ''
    removeToken() // 清除cookie中token
  }
  function setName(val: string) {
    initData.name = val
  }
  function setAvatar(val: string) {
    initData.avatar = val
  }
  function setIntroduction(val: string) {
    initData.introduction = val
  }
  function setRoles(val: string[]) {
    initData.roles = val
  }

  function getInfo() {
    return new Promise<any>((resolve): any => {
      let info: any = null
      const userToken = initData.token.split('-')[0]
      info = mockUser[userToken] || {}
      const { roles, name, avatar, introduction } = info
      setName(name)
      setAvatar(avatar)
      setIntroduction(introduction)
      setRoles(roles)
      resolve(info)
    })
  }

  // 退出登录
  function logout() {
    resetToken()
    setName('')
    setAvatar('')
    setIntroduction('')
    setRoles([])
    resetRouter()
  }

  return {
    ...toRefs(initData),
    setToken,
    resetToken,
    setName,
    setAvatar,
    setIntroduction,
    setRoles,
    getInfo,
    logout
  }
})
