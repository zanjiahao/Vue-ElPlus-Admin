import request from '@/plugins/request'
import { Upload } from '../apiTypes'
const env = import.meta.env
const requestIp = env.VITE_USER_NODE_ENV === 'production' ? env.VITE_API_URL : '/api/mock'

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (params: FormData) => {
  return request.post<Upload.ResFileUrl>(requestIp + `/file/upload/img`, params)
}

// 视频上传
export const uploadVideo = (params: FormData) => {
  return request.post<Upload.ResFileUrl>(requestIp + `/file/upload/video`, params)
}
