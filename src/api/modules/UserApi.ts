import request from '@/plugins/request'
import { PromiseRes, AdminLoginRes } from '../apiTypes'
const env = import.meta.env
const requestIp = env.VITE_USER_NODE_ENV === 'production' ? env.VITE_API_URL : '/api/mock'

// 获取登录用户信息
export const adminLoginApi = (): PromiseRes<AdminLoginRes> => request.get(`${requestIp}/login-admin`)

export const zjhLoginApi = (): PromiseRes<AdminLoginRes> => request.get(`${requestIp}/login-zjh`)

export const visitorLoginApi = (): PromiseRes<AdminLoginRes> => request.get(`${requestIp}/login-visitor`)
