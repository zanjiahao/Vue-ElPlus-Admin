// 操作token get/set/remove
import Cookies from 'js-cookie'

const TokenKey = 'bk_token' // 自定义修改

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: any) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
