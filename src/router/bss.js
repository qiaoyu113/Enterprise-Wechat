export default [
  {
    path: '/bss',
    name: 'bss',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    redirect: '/bss/index',
    meta: {
      title: '首页',
      keepAlive: true
    },
    children: [
      // 首页
      {
        path: '/bss/index',
        name: 'bssIndex',
        component: resolve => require(['@/views/bss/Bss'], resolve),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      // 我的
      {
        path: '/bss/my',
        name: 'bssMy',
        component: resolve => require(['@/views/bss/My'], resolve),
        meta: {
          title: '我的',
          keepAlive: true
        }
      }
    ]
  }
]
