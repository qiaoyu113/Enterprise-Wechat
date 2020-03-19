export default [
  {
    path: '/',
    name: 'clue',
    component: () => import('views/clue/Clue.vue'),
    meta: {
      title: '线索管理',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/cluedetail',
    name: 'cluedetail',
    component: () => import('views/clue/ClueDetail.vue'),
    meta: {
      title: '线索详情',
      // auth: true,
      keepAlive: true
    }
  }
]

