/* Layout */
import Layout from '@/views/layout/Layout'

export default [
  {
    path: '/bss',
    name: 'Bss',
    component: Layout,
    redirect: '/bss/index',
    meta: {
      title: '首页',
      keepAlive: true
    },
    children: [
      // 首页
      {
        path: 'index',
        name: 'BssIndex',
        component: () => import('@/views/bss/Bss'),
        meta: {
          title: '首页',
          showFooter: true, // 是否显示底部bar
          keepAlive: true
        }
      },
      // 我的
      {
        path: 'my',
        name: 'BssMy',
        component: () => import('@/views/bss/My'),
        meta: {
          title: '我的',
          showFooter: true,
          keepAlive: true
        }
      }
    ]
  }
]
