import request from '@/utils/request'

export function driverDetail(data) {
  return request({
    url: '/api/driver/driver/detail',
    method: 'get',
    params: data
  })
}

// 司机意向保存
export function saveIntentionOfReceiving(data) {
  return request({
    url: '/api/driver/driver/saveIntentionOfReceiving',
    method: 'get',
    params: data
  })
}
