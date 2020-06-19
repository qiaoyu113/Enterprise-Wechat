import request from '@/utils/request'
/* 线路货主 */
export function getLineUser(data) {
  return request({
    url: '/api/bss/v1/bss/line/customer/fuzzy/list',
    method: 'get',
    params: data
  })
}
/* 新建线路 */
export function postCreatLine(data) {
  return request({
    url: '/api/line/line/task/create',
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
