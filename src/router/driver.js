export default [
  {
    path: '/driver',
    name: 'driver',
    component: () => import('views/driver/Driver.vue'),
    meta: {
      title: '司机管理',
      // auth: true,
      keepAlive: true
    }
  }
]

