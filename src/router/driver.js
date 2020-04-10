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
  }, {
    path: '/driverdetail',
    name: 'driverdetail',
    component: () => import('views/driver/DriverDetail.vue'),
    meta: {
      title: '司机详情',
      // auth: true,
      keepAlive: true
    }
  }, {
    path: '/matchcommend',
    name: 'matchcommend',
    component: () => import('views/driver/MatchCommend.vue'),
    meta: {
      title: '促撮推荐',
      // auth: true,
      keepAlive: true
    }
  }
]

