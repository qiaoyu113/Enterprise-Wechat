<template>
  <div class="checkrecognition">
    <div class="list-wrap">
      <vo-pages
        :data="[]"
        :loaded-all="loadedAll"
        :no-data-hint="false"
      >
        <van-tabs v-model="listQuery.state" color="#3986CB" sticky>
          <van-tab title="基本">
            <van-cell-group>
              <van-cell v-for="item in detail" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
          </van-tab>
          <van-tab title="跟进">
            <van-cell-group>
              <van-cell v-for="item in follow" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
          </van-tab>
          <van-tab title="行为">
            <van-cell-group>
              <van-cell v-for="item in action" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
          </van-tab>
        </van-tabs>
        <van-button type="info" block class="btn" @click="check">
          确认匹配
        </van-button>
      </vo-pages>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Button } from 'vant'
// import { customerDetail } from '@/api/user'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
// import wx from 'jWeixin';
export default {
  name: 'Checkrecognition',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    VoPages
  },
  data() {
    return {
      listQuery: {
        state: 0
      },
      active: 1,
      detail: [],
      follow: [],
      action: [],
      total: 0,
      page: 1,
      loadedAll: false
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
    //   customerDetail({
    //     custClueId: 201910231017
    //   }).then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.data)
    //       this.detail = res.data.data
    //     }
    //   })
      this.detail = [
        {
          fieldEn: 'field_2',
          fieldName: '外线销售姓名',
          type: 'single_line_text',
          notes: '',
          value: '石晓光'
        }
      ]
    },
    check() {
    //   this.$router.push({ path: '/linedetail', query: { id: '123' }})
      this.$router.replace({ path: '/linecommend' })
    //   customerDetail({
    //     custClueId: 201910231017
    //   }).then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.data)
    //       this.detail = res.data.data
    //     }
    //   })
    }
  }
}
</script>
<style lang="scss" scoped>
.checkrecognition{
    p{
  margin-block-start: 0;
  margin-block-end: 0;
}
.container{
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  .list-wrap{
    height: calc(100% - 50px);
    overflow-y: hidden;
  }
}

.btn{
    width:100%;
    transform: translate3d(0,0,0);
    position: fixed;
    bottom: 0;
    padding-bottom: env(safe-area-inset-bottom);
}

.btn::after{
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid #ebedf0;
    -webkit-transform: scale(.5);
    transform: scale(.5);
}

.article-list {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 15px 15px 0;
  .article {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 15px;
    box-sizing: border-box;
    background: #FFF;
    border-radius: 5px;
    box-shadow: 0 0 6px #e3e3e3;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      padding-left: 15px;
      box-sizing: border-box;
      display: flex;
      width: 235px;
      height: 80px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      p {
        width: 100%;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
      }
      .more-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #666;
      }
    }
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
}
</style>
