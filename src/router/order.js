export default [
  {
    path: '/order',
    name: 'order',
    component: resolve => require(['@/views/order/Order'], resolve),
    meta: {
      title: '订单管理',
      // auth: true,
      keepAlive: true
    }
  }
]

