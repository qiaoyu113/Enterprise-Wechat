<template>
  <van-tabbar
    route
    :safe-area-inset-bottom="true"
  >
    <van-tabbar-item
      icon="aim"
      replace
      to="/"
    >
      线索
    </van-tabbar-item>
    <van-tabbar-item
      icon="manager-o"
      replace
      to="/driver"
    >
      司机
    </van-tabbar-item>
    <van-tabbar-item
      icon="orders-o"
      replace
      to="/order"
    >
      订单
    </van-tabbar-item>
    <van-tabbar-item
      icon="logistics"
      replace
      to="/line"
    >
      线路
    </van-tabbar-item>
    <van-tabbar-item
      icon="setting-o"
      replace
      to="/setting"
    >
      工具
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'FooterTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>
