export default [
  {
    path: '/login',
    name: 'login',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/user/Login'], resolve),
    meta: {
      title: '登录'
      // auth: true,
      // keepAlive: true
    }
  },
  {
    path: '/recognition',
    name: 'recognition',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Recognition.vue'),
    component: resolve => require(['@/views/user/Recognition'], resolve),
    meta: {
      title: '用户获取中...',
      keepAlive: true
    }
  },
  {
    path: '/unrecognition',
    name: 'unrecognition',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Unrecognition.vue'),
    component: resolve => require(['@/views/user/Unrecognition'], resolve),
    meta: {
      title: '用户未匹配',
      keepAlive: true
    }
  },
  {
    path: '/checkrecognition',
    name: 'checkrecognition',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/CheckRecognition.vue'),
    component: resolve => require(['@/views/user/CheckRecognition'], resolve),
    meta: {
      title: '匹配确认',
      keepAlive: true
    }
  }
]
