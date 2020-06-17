<template>
  <div class="linelist">
    <van-nav-bar
      title="线路管理"
      left-text="返回"
      right-text="+新建"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-search disabled placeholder="请输入搜索关键词" @click="goSearch" />
    <van-tabs v-model="active" type="card" sticky class="tab">
      <van-tab v-for="(item, index) in tabarr" :key="index">
        <template #title>
          <span :class="index === 0 ? 'tabnum' : ''" v-text="item.name"></span>
          <span class="tabnum" v-text="`(${item.num})`"></span>
        </template>
        <div class="listbox">
          <lineItem />
          <lineItem />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import lineItem from './components/LineItem'
import { Toast, NavBar, Icon, Search, Tab, Tabs } from 'vant'
export default {
  name: 'Linelist',
  components: {
    lineItem,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      active: 0,
      tabarr: [
        { name: '已失效', num: 0 },
        { name: '待审核', num: 0 },
        { name: '可售线路', num: 0 },
        { name: '售罄线路', num: 0 }
      ]
    }
  },
  methods: {
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
    goSearch() {
      this.$router.push('lineSearch')
    }
  }
}
</script>
<style lang="scss">
.linelist{
  background-color: #e4e4e4;
  min-height: 100vh;
  .van-nav-bar .van-icon, .van-nav-bar__text,.van-tab--active{
    color: #333333!important;
  }
  .van-nav-bar__title{
    font-weight: bold;
  }
  .van-nav-bar__right{
    top: 8px;
    font-size: 12px;
  }
  .tab{
    .van-tab__text{
      font-size: 13px;
    }
    .van-tabs__nav--card{
      margin: 0;
    }
    .van-tabs__nav--card,.van-tabs__nav--card .van-tab{
      border: none;
      color: #000000;
    }
     .van-tabs__nav--card .van-tab.van-tab--active{
      background-color: #ffdc96!important;
      color: #333333;
    }
    .tabnum{
      color: red;
    }
  }
}
</style>>
