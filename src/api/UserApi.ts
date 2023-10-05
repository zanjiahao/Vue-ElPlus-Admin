import request from '@/plugins/request'
const env = import.meta.env
const requestIp = env.VITE_USER_NODE_ENV === 'production' ? env.VITE_API_URL : '/api/mock'

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
export const adminLoginApi = (): PromiseRes<AdminLoginRes> => request.get(`${requestIp}/login-admin`)

export const zjhLoginApi = (): PromiseRes<AdminLoginRes> => request.get(`${requestIp}/login-zjh`)

export const visitorLoginApi = (): PromiseRes<AdminLoginRes> => request.get(`${requestIp}/login-visitor`)
