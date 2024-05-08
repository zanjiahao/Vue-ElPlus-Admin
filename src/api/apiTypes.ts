// 接口返回的结构体
export interface ManageResult<T = {}> {
  code: number
  data: T
}
export type PromiseRes<T> = Promise<ManageResult<T>>

// 登录返回接口
export interface AdminLoginRes {
  token: string
  tokenHead: string
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string
  }
}
