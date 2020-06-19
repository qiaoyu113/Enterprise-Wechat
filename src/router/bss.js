/* Layout */
import Layout from '@/views/layout/Layout'

export default [{
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
    {
      path: '/linelist',
      name: 'linelist',
      component: resolve => require(['@/views/line/LineList'], resolve),
      meta: {
        title: '线路管理',
        // auth: true,
        keepAlive: false
      }
    },
    {
      path: '/lineSearch',
      name: 'lineSearch',
      component: resolve => require(['@/views/line/LineSearch'], resolve),
      meta: {
        title: '线路搜索',
        // auth: true,
        keepAlive: true
      }
    },
    {
      path: '/outSide',
      name: 'outSide',
      component: resolve => require(['@/views/line/OutSide'], resolve),
      meta: {
        title: '外线主导',
        // auth: true,
        keepAlive: false
      }
    }
  ]
}]
