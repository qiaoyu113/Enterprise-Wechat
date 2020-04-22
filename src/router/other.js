export default [
  {
    path: '/productinfo',
    name: 'productinfo',
    component: resolve => require(['@/views/other/ProductInfo'], resolve),
    meta: {
      title: '产品介绍',
      // auth: true,
      keepAlive: true
    }
  }
]

