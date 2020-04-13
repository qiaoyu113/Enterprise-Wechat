import request from '@/utils/request'

export function driverDetail(data) {
  return request({
    url: '/api/driver/driver/detail',
    method: 'get',
    params: data
  })
}

export function judgingIntentionOfReceiving(data) {
  return request({
    url: '/api/driver/corp/driver/judgingIntentionOfReceiving',
    method: 'post',
    data
  })
}
