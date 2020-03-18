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
  }
]

