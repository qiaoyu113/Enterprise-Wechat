import request from '@/utils/request'

export function selectLineTask(data) {
  return request({
    url: 'api/bss/v1/bss/line/task/enterprise-wechat/patcher/selectLineTask',
    method: 'post',
    data
  })
}
