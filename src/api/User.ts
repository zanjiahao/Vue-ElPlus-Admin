import request from '@/plugins/request'
const requestIP = 'https://mock.apifox.cn/m1/1982890-0-default'

// 接口返回的结构体
interface ManageResult<T = {}> {
  code: number
  data: T
}
type PromiseRes<T> = Promise<ManageResult<T>>

// 登录返回接口
interface AdminLoginRes {
  token: string
  tokenHead: string
}

// 获取登录用户信息
export const adminLoginApi = (): PromiseRes<AdminLoginRes> => request.get(`${requestIP}/login-admin`)

export const zjhLoginApi = (): PromiseRes<AdminLoginRes> => request.get(`${requestIP}/login-zjh`)

export const visitorLoginApi = (): PromiseRes<AdminLoginRes> => request.get(`${requestIP}/login-visitor`)
