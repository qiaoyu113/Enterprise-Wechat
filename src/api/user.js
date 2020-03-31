import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/v1/jwt/crop/getCorpWechatToken',
    method: 'post',
    data
  })
}

export function getAgentSignature(data) {
  return request({
    url: '/api/wechat/v1/wechat/ticket/getAgentSignature',
    method: 'get',
    params: data
  })
}

export function getCorpSignature(data) {
  return request({
    url: '/api/wechat/v1/wechat/ticket/getCorpSignature',
    method: 'get',
    params: data
  })
}

export function externalUserId(data) {
  return request({
    url: '/api/driver/driver/match/driver/externalUserId',
    method: 'post',
    data
  })
}

export function marchPhone(data) {
  return request({
    url: '/api/driver/driver/match/driver/phone',
    method: 'post',
    data
  })
}

export function driverDetail(data) {
  return request({
    url: '/api/driver/driver/detail',
    method: 'post',
    data
  })
}

export function clueDetail(data) {
  return request({
    url: '/api/driver/driver/clue/bss/clueInfo',
    method: 'get',
    params: data
  })
}

export function clueLog(data) {
  return request({
    url: '/api/driver/driver/clue/log/list',
    method: 'get',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function customerDetail(token) {
  return request({
    url: '/api/line/line/customer/customerPool/detail',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
