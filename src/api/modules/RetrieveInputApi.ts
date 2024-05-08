import request from '@/plugins/request'
const env = import.meta.env
const requestIp = env.VITE_USER_NODE_ENV === 'production' ? env.VITE_API_URL : '/api/mock'

// 获取检索输入框下拉数据
export const getRetrieveInputApi = () => request.get(`${requestIp}/retrieveInput`)
