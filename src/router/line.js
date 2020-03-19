export default [
  {
    path: '/line',
    name: 'line',
    component: () => import('views/line/Line.vue'),
    meta: {
      title: '线路管理',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/linecommend',
    name: 'linecommend',
    component: () => import('views/line/LineCommend.vue'),
    meta: {
      title: '推荐线路',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/linedetail',
    name: 'linedetail',
    component: () => import('views/line/LineDetail.vue'),
    meta: {
      title: '线路详情',
      // auth: true,
      keepAlive: true
    }
  }
]

