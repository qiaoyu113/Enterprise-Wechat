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
      },
      // 创建线路
      {
        path: 'add-line',
        name: 'BssAddLine',
        component: () => import('@/views/bss/AddLine'),
        meta: {
          title: '创建货主',
          showFooter: false,
          keepAlive: true
        }
      },
      // 线路详情
      {
        path: 'line-detail',
        name: 'BssLineDetail',
        component: () => import('@/views/bss/LineDetail'),
        meta: {
          title: '线路详情',
          showFooter: false,
          keepAlive: true
        }
      }
    ]
  }
]
