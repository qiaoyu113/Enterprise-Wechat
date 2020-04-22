export default [
  {
    path: '/setting',
    name: 'setting',
    component: resolve => require(['@/views/setting/Setting'], resolve),
    meta: {
      title: '工具',
      // auth: true,
      keepAlive: true
    }
  }
]

