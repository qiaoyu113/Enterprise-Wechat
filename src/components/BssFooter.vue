<template>
  <van-tabbar
    route
    :safe-area-inset-bottom="true"
  >
    <van-tabbar-item
      icon="aim"
      replace
      to="/bss/index"
    >
      首页
    </van-tabbar-item>
    <van-tabbar-item
      icon="manager-o"
      replace
      to="/bss/my"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'BssFooter',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>
