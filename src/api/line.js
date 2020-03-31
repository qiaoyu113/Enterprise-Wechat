import request from '@/utils/request'

export function selectLineTask(data) {
  return request({
    url: '/api/bss/v1/bss/line/task/enterprise-wechat/patcher/selectLineTask',
    method: 'post',
    data
  })
}

/* 线路详情 */
export function getLineDetail(data) {
  return request({
    url: '/api/line/line/task/detail',
    method: 'get',
    params: data
  })
}

/* 线路详情 */
export function listByLineId(data) {
  return request({
    url: '/api/bss/v1/bss/tender/listByLineId',
    method: 'post',
    data
  })
}

/* 线路详情 */
export function loglist(data) {
  return request({
    url: '/api/line/line/task/log/list',
    method: 'get',
    params: data
  })
}

/* 线路详情 */
export function getMediaIdOfLineDetail(data) {
  return request({
    url: '/api/line/v1/wechat/corp/getMediaIdOfLineDetail',
    method: 'get',
    params: data
  })
}
