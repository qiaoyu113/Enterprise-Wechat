export default [
  {
    path: '/line',
    name: 'line',
    component: resolve => require(['@/views/line/Line'], resolve),
    meta: {
      title: '线路管理',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/linecommend',
    name: 'linecommend',
    component: resolve => require(['@/views/line/LineCommend'], resolve),
    meta: {
      title: '推荐线路',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/linebatch',
    name: 'linebatch',
    component: resolve => require(['@/views/line/LineBatch'], resolve),
    meta: {
      title: '推荐线路',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/linedetail',
    name: 'linedetail',
    component: resolve => require(['@/views/line/LineDetail'], resolve),
    meta: {
      title: '线路详情',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/linedetailbatch',
    name: 'linedetailbatch',
    component: resolve => require(['@/views/line/LineDetailBatch'], resolve),
    meta: {
      title: '线路详情',
      // auth: true,
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
      keepAlive: true
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
    path: '/outside',
    name: 'outside',
    component: resolve => require(['@/views/line/OutSide'], resolve),
    meta: {
      title: '外线主导',
      // auth: true,
      keepAlive: true
    }
  }
]

