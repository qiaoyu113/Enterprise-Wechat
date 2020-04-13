import request from '@/utils/request'

export function driverDetail(data) {
  return request({
    url: '/api/driver/driver/detail',
    method: 'get',
    params: data
  })
}

/**
 * 促撮列表查询
 */
export function getSelectList(data) {
  return request({
    url: '/api/bss/v1/bss/corp/makeAMatch/selectListByKey?jia=true',
    method: 'post',
    data
  })
}

export function judgingIntentionOfReceiving(data) {
  return request({
    url: '/api/driver/corp/driver/judgingIntentionOfReceiving',
    method: 'post',
    data
  })
}

