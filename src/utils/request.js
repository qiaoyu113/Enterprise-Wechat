import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'

let url = 'http://firmiana-bss.yunniao.cn/'
if (window.location.host !== 'firmiana-bss.yunniao.cn') {
  // if (location.host !== 'http://firmiana-open-api.d2.ynimg.cn:8888/') {
  url = 'http://firmiana-bss.m1.yunniao.cn/'
  // } else {
  // url = 'http://firmiana-open-api-d2.yunniao.cn/'
  // }
}

// create an axios instance
const service = axios.create({
  baseURL: url, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    let token = localStorage.getItem('token')
    if (token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code === 40101 || res.code === 40301) {
      Toast({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      localStorage.removeItem('token')
      localStorage.removeItem('code')
      location.reload()
      // 50008:非法的token; 50012:其他货主端登录了;  40101:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 40101) {
        // to re-login
        Toast.confirm('您无权访问该功能，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(res.message)
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail({
      message: error.message,
      duration: 1.5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
