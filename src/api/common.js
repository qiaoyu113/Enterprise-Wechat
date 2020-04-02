import request from '@/utils/request'

/* 上传图片 */
export function upImgData(data) {
  return request({
    url: '/api/base/v1/upload/uploadOSS/img/true/-1',
    method: 'post',
    data
  })
}

/* 字典 */
export function dictionary(data) {
  return request({
    url: '/api/base/base/dict/qryDictByType',
    method: 'get',
    params: data
  })
}

/* 产品介绍 */
export function productIntroduce(data) {
  return request({
    url: '/api/product/product/enterprise-weChat/patcher/product-introduce',
    method: 'get',
    params: data
  })
}
