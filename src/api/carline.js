import request from '@/utils/request'
/* 线路货主 */
export function getLineUser(data) {
  return request({
    url: '/api/bss/v1/bss/line/customer/fuzzy/list',
    method: 'get',
    params: data
  })
}
