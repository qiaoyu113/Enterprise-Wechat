<template>
  <div class="linesearch">
    <!-- <van-nav-bar
      left-text="返回"
      :title="tabtext"
      left-arrow
      @click-left="onClickLeft"
    /> -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
    />
    <div class="searchbox">
      <div>京东</div>
      <div>京东</div>
      <div>京东</div>
    </div>
    <div>
      <lineItem />
    </div>
  </div>
</template>
<script>
import lineItem from './components/LineItem'
import { Toast, NavBar, Icon, Search } from 'vant';
export default {
  name: 'Linesearch',
  components: {
    lineItem,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search
  },
  data() {
    return {
      value: '',
      tabtext: '搜索'
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">
.linesearch {
  background-color: #e4e4e4;
  min-height: 100vh;
  .van-nav-bar .van-icon,
  .van-nav-bar__text,
  .van-tab--active {
    color: #333333 !important;
  }
  .van-nav-bar__title {
    font-weight: bold;
  }
  .van-nav-bar__right {
    top: 8px;
    font-size: 12px;
  }
  .searchbox > div {
    background-color: white;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border: 1px solid black;
  }
  .searchbox > div:first-child {
    border-bottom: none;
  }
  .searchbox > div:last-child {
    border-top: none;
  }
}
</style>>
