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
    url: '/api/bss/v1/bss/corp/makeAMatch/selectListByKey',
    method: 'post',
    data
  })
}
/**
 * 促撮列表详情
 */
export function matchingRecordDetails(params) {
  return request({
    url: '/api/match/corp/match/history/matchingRecordDetails',
    method: 'get',
    params
  })
}
/**
 * 提交按钮
 */
export function submitSave(data) {
  return request({
    url: '/api/match/corp/match/history/save',
    method: 'post',
    data
  })
}

// 司机意向保存
export function saveIntentionOfReceiving(data) {
  return request({
    url: '/api/driver/corp/driver/saveIntentionOfReceiving',
    method: 'post',
    data
  })
}

// 司机意向判断POST /corp/driver/judgingIntentionOfReceiving
export function judgingIntentionOfReceiving(data) {
  return request({
    url: '/api/driver/corp/driver/judgingIntentionOfReceiving',
    method: 'post',
    data
  })
}

