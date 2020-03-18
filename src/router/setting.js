export default [
  {
    path: '/setting',
    name: 'setting',
    component: () => import('views/setting/Setting.vue'),
    meta: {
      title: '工具',
      // auth: true,
      keepAlive: true
    }
  }
]

