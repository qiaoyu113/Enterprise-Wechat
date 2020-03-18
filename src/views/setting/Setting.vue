<template>
  <div class="setting">
    <vo-pages
      :data="[]"
      :no-data-hint="false"
    >
      <van-cell is-link @click="showPopup">
        产品介绍助手
      </van-cell>
      <van-cell is-link @click="showPopup">
        标准话术
      </van-cell>
      <van-cell is-link @click="showPopup">
        统计分析
      </van-cell>
    </vo-pages>
    <van-popup v-model="show">
      <div class="popShow">
        正在开发中，敬请期待...
      </div>
    </van-popup>
    <footer-tabbar />
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Cell, Popup } from 'vant'
// import { fetchList } from '@/api/clue'
import FooterTabbar from '@/components/FooterTabbar'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
export default {
  name: 'Setting',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    VoPages,
    FooterTabbar
  },
  data() {
    return {
      active: 1,
      list: [],
      total: 0,
      page: 1,
      show: false
    }
  },
  mounted() {
  },
  methods: {
    showPopup() {
      this.show = true;
    }
  }
}
</script>
<style lang="scss" scoped>
p{
  margin-block-start: 0;
  margin-block-end: 0;
}
.setting{
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  padding:0.8rem 0;
  box-sizing: border-box;
  .popShow{
      padding: 0.3rem 0.6rem;
      box-sizing: border-box;
  }
}
.focus{
  width:100%;
  text-align: center;
  padding-top: 1rem;
  box-sizing: border-box;
  img{
    width: 60%;
  }
  p{
    color:#666;
    font-size: 14px;
  }
}
.setting >>> .no-data_hint{
    display: none !important;
}
</style>
