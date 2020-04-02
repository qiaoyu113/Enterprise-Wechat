<template>
  <div class="clueDetail">
    <div class="list-wrap">
      <van-tabs color="#3986CB" sticky>
        <van-tab title="基本">
          <van-cell-group v-if="JSON.stringify(detail) != '{}'">
            <h2 class="van-doc-demo-block__title">
              基本信息
            </h2>
            <van-cell title="姓名" :value="detail.name" />
            <van-cell title="联系电话" :value="detail.phone" />
            <van-cell title="来源渠道" :value="detail.sourceTypeName" />
            <van-cell title="工作城市" :value="detail.workCityName" />
            <van-cell title="是否能邀约面试" :value=" detail.invited ? (detail.invited === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="是否添加微信" :value=" detail.isAddWechat ? (detail.isAddWechat === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="工作城市" :value="detail.workCityName" />
          </van-cell-group>
          <p v-if="JSON.stringify(detail) == '{}'" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab title="跟进">
          <van-cell-group v-if="JSON.stringify(detail) != '{}'">
            <h2 class="van-doc-demo-block__title">
              跟进信息
            </h2>
            <van-cell title="跟进方式" :value="detail.wayName" />
            <van-cell title="跟进情况" :value="detail.situation" />
          </van-cell-group>
          <p v-if="JSON.stringify(detail) == '{}'" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab title="行为">
          <van-cell-group v-if="clueLog.length">
            <h2 class="van-doc-demo-block__title">
              行为信息
            </h2>
            <van-cell v-for="item in clueLog" :key="item.type" :title="item.operType" :value="'(' + item.creatorName + ')' + item.createDate" />
          </van-cell-group>
          <p v-if="!clueLog.length" class="noMore">
            暂无信息
          </p>
        </van-tab>
      </van-tabs>
      <van-button round type="info" block class="btn" @click="check">
        操作
      </van-button>
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Button, ActionSheet } from 'vant'
import { clueDetail, clueLog } from '@/api/user'
// import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
// import wx from 'jWeixin';
export default {
  name: 'Clue',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      clueLog: [],
      orderList: [],
      lineList: [],
      cost: [],
      total: 0,
      page: 1,
      driverId: '',
      driverType: '1',
      detail: '',
      show: false,
      actions: [
        { name: '产品介绍', color: '#3F8AF2' },
        { name: '推荐线路', color: '#3F8AF2' }
      ],
      loadedAll: false
    }
  },
  mounted() {
    let clueId = this.$route.query.clueId;
    this.clueId = clueId;
    this.getDetail(clueId)
  },
  methods: {
    getDetail(clueId) {
      clueDetail({
        clueId: clueId
      }).then((res) => {
        if (res.data.success) {
          this.detail = res.data.data
        }
      })
      clueLog({
        clueId: clueId
      }).then((res) => {
        if (res.data.success) {
          this.clueLog = res.data.data
        }
      })
    },
    check() {
      this.show = true;
    //   customerDetail({
    //     custClueId: 201910231017
    //   }).then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.data)
    //       this.detail = res.data.data
    //     }
    //   })
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
      if (item.name === '产品介绍') {
        this.$router.push({ path: '/productinfo' })
      } else {
        this.$router.push({ path: '/linecommend' })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.clueDetail{
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
    width:90%;
    margin: 1rem auto;
    }

  .noMore{
    width: 100%;
    text-align: center;
    height:5rem;
    line-height: 6rem;
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

  .van-doc-demo-block__title{
    margin: 0;
    text-align: center;
    padding: 16px;
    color: #4D86C6;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    background-color: #f7f8fa;
  }
}
</style>
