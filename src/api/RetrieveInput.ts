import request from '@/plugins/request'

// 获取检索输入框下拉数据
export const getRetrieveInputApi = () =>
  request.get('https://mock.apifox.cn/m1/1982890-0-default/api/retrieveInput')
