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
              <h2 class="van-doc-demo-block__title">
                基本信息
              </h2>
              <van-cell v-for="item in detail" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
            <p v-if="follow.length === 0" class="noMore">
              暂无信息
            </p>
          </van-tab>
          <van-tab title="跟进">
            <van-cell-group>
              <h2 class="van-doc-demo-block__title">
                跟进信息
              </h2>
              <van-cell v-for="item in follow" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
            <p v-if="follow.length === 0" class="noMore">
              暂无信息
            </p>
          </van-tab>
          <van-tab title="行为">
            <van-cell-group>
              <h2 class="van-doc-demo-block__title">
                行为信息
              </h2>
              <van-cell v-for="item in action" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
            <p v-if="follow.length === 0" class="noMore">
              暂无信息
            </p>
          </van-tab>
        </van-tabs>
        <van-button round type="info" block class="btn" @click="check">
          确认匹配
        </van-button>
      </vo-pages>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Button, Dialog } from 'vant'
import { matchConfirm, driverDetail, clueDetail, clueLog } from '@/api/user'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
// import wx from 'jWeixin';
export default {
  name: 'Checkrecognition',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Dialog.name]: Dialog,
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
      loadedAll: false,
      driverId: '',
      driverType: '',
      driverDetail: '',
      clueDetail: ''
    }
  },
  mounted() {
    let driverId = this.$route.query.driverId;
    this.driverId = driverId;
    let driverType = this.$route.query.driverType;
    this.driverType = driverType;
    const externalUserId = localStorage.getItem('externalUserId')
    if (driverId && externalUserId && driverType) {
      this.getDetail(driverId, externalUserId, driverType)
    } else {
      Dialog.alert({
        message: '匹配不到用户'
      }).then(() => {
        this.$router.replace({ path: '/' })
      });
    }
  },
  methods: {
    check(driverId, externalUserId, driverType) {
      matchConfirm({
        'driverId': driverId,
        'driverType': driverType,
        'externalUserId': externalUserId
      }).then((res) => {
        if (res.data.success) {
          this.$router.replace({ path: '/linecommend' })
        }
      })
    },
    getDetail(driverId, externalUserId, driverType) {
      if (driverType === 1) {
        driverDetail({
          driverId: driverId
        }).then((res) => {
          if (res.data.success) {
            console.log(res.data.data)
            this.driverDetail = res.data.data
          }
        })
      } else {
        clueDetail({
          clueId: driverId
        }).then((res) => {
          if (res.data.success) {
            console.log(res.data.data)
            this.clueDetail = res.data.data
          }
        })
        clueLog({
          clueId: driverId
        }).then((res) => {
          if (res.data.success) {
            console.log(res.data.data)
            this.clueLog = res.data.data
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.checkrecognition{
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
  .noMore{
    width: 100%;
    text-align: center;
    height:5rem;
    line-height: 6rem;
  }
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
    margin: auto;
    margin-top:1rem;
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
