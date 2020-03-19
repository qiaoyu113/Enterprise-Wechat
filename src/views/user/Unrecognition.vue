<template>
  <div class="unrecognition">
    <vo-pages
      :data="[]"
      :no-data-hint="false"
    >
      <img src="../../assets/unrecognition.png" alt="">
      <div class="font">
        <p>未匹配客户信息</p>
        <p>请完善客户信息</p>
      </div>
      <van-cell-group class="input_border">
        <van-field v-model="phone" type="tel" label="手机号" />
      </van-cell-group>
      <van-button type="info" block @click="submitPhone">
        尝试匹配
      </van-button>
    </vo-pages>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Cell, Popup, Field, Button, CellGroup } from 'vant'
// import { fetchList } from '@/api/clue'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
export default {
  name: 'Unrecognition',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    VoPages
  },
  data() {
    return {
      active: 1,
      list: [],
      total: 0,
      page: 1,
      phone: '',
      show: false
    }
  },
  mounted() {
  },
  methods: {
    submitPhone() {
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
        Toast.fail('手机号码有误，请重填');
        return false;
      }
      this.$router.replace({ path: '/checkrecognition' })
    }
  }
}
</script>
<style lang="scss" scoped>
.unrecognition{
  width: 100%;
  text-align: center;
  padding-top:5rem;
  box-sizing: border-box;
  p{
    margin-block-start: 0;
    margin-block-end: 0;
  }
  img{
    width:3rem;
    margin-bottom: 1rem;
  }
  .font{
    font-size: 14px;
    color:#666;
    padding: 0.4rem 0;
  }
  .input_border{
    border-top:1px solid #F5F6F7;
    display: block;
    margin-top:40px;
  }
}
</style>
