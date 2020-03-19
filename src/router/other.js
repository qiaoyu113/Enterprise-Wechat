export default [
  {
    path: '/productinfo',
    name: 'productinfo',
    component: () => import('views/other/ProductInfo.vue'),
    meta: {
      title: '产品介绍',
      // auth: true,
      keepAlive: true
    }
  }
]

