export default [
  {
    path: '/order',
    name: 'order',
    component: () => import('views/order/Order.vue'),
    meta: {
      title: '订单管理',
      // auth: true,
      keepAlive: true
    }
  }
]

