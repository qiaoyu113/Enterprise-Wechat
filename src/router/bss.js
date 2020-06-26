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
    // 创建线路
    {
      path: 'add-line',
      name: 'BssAddLine',
      component: () => import('@/views/bss/AddLine'),
      meta: {
        title: '创建线路',
        showFooter: false
      }
    },
    {
      path: 'copy-line',
      name: 'BssCopyLine',
      component: () => import('@/views/bss/AddLine'),
      meta: {
        title: '复制线路',
        showFooter: false
      }
    },
    {
      path: 'edit-line',
      name: 'BssEditLine',
      component: () => import('@/views/bss/AddLine'),
      meta: {
        title: '编辑线路',
        showFooter: false
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
    },
    // 货主列表
    {
      path: 'consignorList',
      name: 'consignorList',
      component: () => import('@/views/consignor/lists/index.vue'),
      meta: {
        title: '货主列表',
        showFooter: true, // 是否显示底部bar
        keepAlive: true
      }
    },
    // 货主详情
    {
      path: 'consignorDetail',
      name: 'consignorDetail',
      component: () => import('@/views/consignor/detail/index.vue'),
      meta: {
        title: '货主详情',
        showFooter: true, // 是否显示底部bar
        keepAlive: true
      }
    },
    // 选择货主
    {
      path: 'consignorSearch',
      name: 'consignorSearch',
      component: () => import('@/views/consignor/search/index.vue'),
      meta: {
        title: '选择货主',
        showFooter: true, // 是否显示底部bar
        keepAlive: true
      }
    },
    // 创建货主
    {
      path: 'consignorAdd',
      name: 'consignorAdd',
      component: () => import('@/views/consignor/addOrEdit/index.vue'),
      meta: {
        title: '创建货主',
        showFooter: true, // 是否显示底部bar
        keepAlive: true
      }
    },
    // 编辑货主
    {
      path: 'consignorEdit',
      name: 'consignorEdit',
      component: () => import('@/views/consignor/addOrEdit/index.vue'),
      meta: {
        title: '编辑货主',
        showFooter: true, // 是否显示底部bar
        keepAlive: true
      }
    },
    // 线路管理
    {
      path: 'lineList',
      name: 'lineList',
      component: resolve => require(['@/views/line/LineList'], resolve),
      meta: {
        title: '线路管理',
        showFooter: true,
        keepAlive: true
      }
    },
    // 线路搜索
    {
      path: 'lineSearch',
      name: 'lineSearch',
      component: resolve => require(['@/views/line/LineSearch'], resolve),
      meta: {
        title: '线路搜索',
        showFooter: true,
        keepAlive: true
      }
    },
    // 外线主导
    {
      path: 'outSide',
      name: 'outSide',
      component: resolve => require(['@/views/line/OutSide'], resolve),
      meta: {
        title: '外线主导',
        // auth: true,
        showFooter: true,
        keepAlive: true
      }
    }
  ]
}]
