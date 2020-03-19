export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    meta: {
      title: '登录'
      // auth: true,
      // keepAlive: true
    }
  },
  {
    path: '/recognition',
    name: 'recognition',
    component: () => import(/* webpackChunkName: "login" */ 'views/user/Recognition.vue'),
    meta: {
      title: '用户获取中...',
      keepAlive: true
    }
  },
  {
    path: '/unrecognition',
    name: 'unrecognition',
    component: () => import(/* webpackChunkName: "login" */ 'views/user/Unrecognition.vue'),
    meta: {
      title: '用户未匹配',
      keepAlive: true
    }
  },
  {
    path: '/checkrecognition',
    name: 'checkrecognition',
    component: () => import(/* webpackChunkName: "login" */ 'views/user/CheckRecognition.vue'),
    meta: {
      title: '匹配确认',
      keepAlive: true
    }
  }
]
