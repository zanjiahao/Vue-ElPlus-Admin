import axios from 'axios'
import { getToken } from '@/utils/auth'
import { isOnLine } from '@/utils/index'
import { ElMessage } from 'element-plus'
import router from '@/router'

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number) => {
  switch (status) {
    case 400:
      ElMessage.error('请求失败！请您稍后重试')
      break
    case 401:
      ElMessage.error('登录失效！请您重新登录')
      break
    case 403:
      ElMessage.error('当前账号无权限访问！')
      break
    case 404:
      ElMessage.error('你所访问的资源不存在！')
      break
    case 405:
      ElMessage.error('请求方式错误！请您稍后重试')
      break
    case 408:
      ElMessage.error('请求超时！请您稍后重试')
      break
    case 500:
      ElMessage.error('服务异常！')
      break
    case 502:
      ElMessage.error('网关错误！')
      break
    case 503:
      ElMessage.error('服务不可用！')
      break
    case 504:
      ElMessage.error('网关超时！')
      break
    default:
      ElMessage.error('请求失败！')
  }
}

// Full config:  https://github.com/axios/axios#request-config
const request = axios.create({
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30 * 1000, // Timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  // 跨域时候允许携带凭证
  // withCredentials: true
})

/**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
 */
request.interceptors.request.use(
  config => {
    // 在发送请求之前执行处理操作
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    // 对请求错误执行处理操作
    return Promise.reject(error)
  }
)

/**
 * @description 响应拦截器
 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
request.interceptors.response.use(
  response => {
    return response.data
  },
  async error => {
    const { response } = error
    // 根据服务器响应的错误状态码，做不同的处理
    if (response) checkStatus(response.status)
    // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
    const isOnline = await isOnLine()
    if (!isOnline) router.replace('/500')
    return Promise.reject(error)
  }
)

export default request
