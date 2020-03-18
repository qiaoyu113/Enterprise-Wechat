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
  }
]

