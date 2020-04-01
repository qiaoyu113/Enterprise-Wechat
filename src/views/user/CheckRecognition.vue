<template>
  <div class="checkrecognition">
    <div class="list-wrap">
      <van-tabs v-model="listQuery.state" color="#3986CB" sticky>
        <van-tab v-if="driverType === 1" title="基本">
          <van-cell-group v-if="JSON.stringify(detail) != '{}'">
            <h2 class="van-doc-demo-block__title">
              基本信息
            </h2>
            <van-cell title="姓名" :value="detail.name | DataIsNull" />
            <van-cell title="身份证号" :value="detail.idNumber | DataIsNull" />
            <van-cell title="联系电话" :value="detail.phone | DataIsNull" />
            <van-cell title="司机编号" :value="detail.driverId | DataIsNull" />
            <van-cell title="工作城市" :value="detail.workCityName | DataIsNull" />
            <van-cell title="户籍地址" :value=" detail.cityName + detail.provinceName | DataIsNull" />
            <van-cell title="面试时间" :value=" detail.interviewTime | DataIsNull" />
            <van-cell title="货物经验" :value=" detail.cargoTypeName | DataIsNull" />
            <van-cell title="物流从业经验" :value="detail.workExperienceName | DataIsNull" />
            <van-cell title="可接受一天工作时长" :value=" detail.workHourName | DataIsNull" />
            <van-cell title="意向车型" :value=" detail.carTypeName | DataIsNull" />
            <van-cell title="是否有在还贷款" :value=" detail.isHaveLoan === 2 ? '否' : '是'" />
            <van-cell title="期望月收入" :value=" detail.expMonthlyIncomeName | DataIsNull" />
            <van-cell title="司机年龄" :value=" detail.age | DataIsNull" />
            <van-cell title="可接受首付范围" :value=" detail.acceptPayRangeName | DataIsNull" />
            <van-cell title="现居住地址" :value=" detail.address | DataIsNull" />
            <van-cell title="之前在哪工作" :value=" detail.whereWorked | DataIsNull" />
            <van-cell title="来源渠道" :value=" detail.sourceName | DataIsNull" />
            <van-cell title="征信是否通过" :value="detail.isCreditPass === 2 ? '否' : '是'" />
            <van-cell title="是否跟车" :value="detail.isPay === 2 ? '否' : '是'" />
            <van-cell title="意向金缴纳日期" :value=" detail.payDate | DataIsNull" />
            <van-cell title="上岗时间" :value=" detail.goToWorkTime | DataIsNull" />
            <van-cell title="平均月收入" :value=" detail.monthlyIncome | DataIsNull" />
            <van-cell title="户口类型" :value=" detail.accountType | DataIsNull" />
            <van-cell title="家里几个孩子" :value=" detail.childrenNum | DataIsNull" />
            <van-cell title="孩子的平均年龄" :value=" detail.childrenAge | DataIsNull" />
            <van-cell title="是否有货车" :value="detail.isHaveCar === 2 ? '否' : '是'" />
            <van-cell title="征信是否通过" :value="detail.isCreditPass === 2 ? '否' : '是'" />
          </van-cell-group>
          <p v-if="JSON.stringify(detail) == '{}'" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab v-if="driverType === 2" title="基本">
          <van-cell-group v-if="JSON.stringify(detail) != '{}'">
            <h2 class="van-doc-demo-block__title">
              基本信息
            </h2>
            <van-cell title="姓名" :value="detail.name | DataIsNull" />
            <van-cell title="联系电话" :value="detail.phone | DataIsNull" />
            <van-cell title="来源渠道" :value="detail.sourceTypeName | DataIsNull" />
            <van-cell title="工作城市" :value="detail.workCityName | DataIsNull" />
            <van-cell title="是否能邀约面试" :value=" detail.invited === 2 ? '否' : '是'" />
            <van-cell title="是否添加微信" :value=" detail.isAddWechat === 2 ? '否' : '是'" />
          </van-cell-group>
          <p v-if="JSON.stringify(detail) == '{}'" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab v-if="driverType === 1" title="订单">
          <van-cell-group v-if="clueLog.length">
            <h2 class="van-doc-demo-block__title">
              订单信息
            </h2>
            <van-cell v-for="item in orderList" :key="item.type" title="订单编号" :value="item.orderId + '(' + item.stateName + ')'" />
          </van-cell-group>
          <p v-if="!clueLog.length" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab v-if="driverType === 1" title="线路">
          <van-cell-group v-if="lineList.length">
            <h2 class="van-doc-demo-block__title">
              线路信息
            </h2>
            <van-cell v-for="item in lineList" :key="item.type" title="线路编号" :value="item.lineId + '(' + item.stateName + ')'" />
          </van-cell-group>
          <p v-if="!lineList.length" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <!-- <van-tab v-if="driverType === 1" title="运费">
          <van-cell-group v-if="records.length">
            <h2 class="van-doc-demo-block__title">
              运费信息
            </h2>
            <van-cell v-for="item in records" :key="item.type" :title="item.runningDate" :value="item.cost + '元' " />
          </van-cell-group>
          <p v-if="!records.length" class="noMore">
            暂无信息
          </p>
        </van-tab> -->
        <van-tab v-if="driverType === 2" title="跟进">
          <van-cell-group v-if="JSON.stringify(detail) != '{}'">
            <h2 class="van-doc-demo-block__title">
              跟进信息
            </h2>
            <van-cell title="跟进方式" :value="detail.wayName | DataIsNull" />
            <van-cell title="跟进情况" :value="detail.situation | DataIsNull" />
          </van-cell-group>
          <p v-if="JSON.stringify(detail) == '{}'" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <!-- <van-tab v-if="driverType === 1" title="行为">
          <van-cell-group>
            <h2 class="van-doc-demo-block__title">
              行为信息
            </h2>
            <van-cell v-for="item in action" :key="item.type" :title="item.fieldName" :value="item.value" />
          </van-cell-group>
          <p v-if="follow.length === 0" class="noMore">
            暂无信息
          </p>
        </van-tab> -->
        <van-tab v-if="driverType === 2" title="行为">
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
      <van-button round type="info" block class="btn" @click="checkPush">
        确认匹配
      </van-button>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Button, Dialog } from 'vant'
import { matchConfirm, driverDetail, clueDetail, clueLog, queryOrdersByDriverId, relatedLineInformation } from '@/api/user'
// import VoPages from 'vo-pages'
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
    [Button.name]: Button
  },
  data() {
    return {
      listQuery: {
        state: 0
      },
      active: 1,
      clueLog: [],
      orderList: [],
      lineList: [],
      cost: [],
      total: 0,
      page: 1,
      loadedAll: false,
      driverId: '',
      driverType: '1',
      detail: ''
    }
  },
  mounted() {
    let driverId = this.$route.query.driverId;
    this.driverId = driverId;
    let driverType = this.$route.query.driverType;
    this.driverType = driverType;
    const externalUserId = localStorage.getItem('externalUserId')
    alert(externalUserId)
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
    checkPush() {
      let that = this;
      let externalUserIds = localStorage.getItem('externalUserId')
      matchConfirm({
        'driverId': that.driverId,
        'driverType': that.driverType,
        'externalUserId': externalUserIds
      }).then((res) => {
        if (res.data.success) {
          if (that.driverType === 1) {
            this.$router.replace({ path: '/driverdetail', query: { driverId: that.driverId }})
          } else {
            this.$router.replace({ path: '/cluedetail', query: { driverId: that.driverId }})
          }
        }
      })
    },
    getDetail(driverId, externalUserId, driverType) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      if (driverType === 1) {
        driverDetail({
          driverId: driverId
        }).then((res) => {
          if (res.data.success) {
            Toast.clear();
            this.detail = res.data.data
          } else {
            Toast.clear();
            Toast.fail(res.data.errorMsg);
          }
        })
        queryOrdersByDriverId({
          driverId: driverId
        }).then((res) => {
          if (res.data.success) {
            this.orderList = res.data.data;
          } else {
            Toast.clear();
            Toast.fail(res.data.errorMsg);
          }
        })
        relatedLineInformation({
          driverId: driverId
        }).then((res) => {
          if (res.data.success) {
            this.lineList = res.data.data.lineTenderInformationVOS;
          } else {
            Toast.clear();
            Toast.fail(res.data.errorMsg);
          }
        })
        // getRecord({

        // })
      } else {
        clueDetail({
          clueId: driverId
        }).then((res) => {
          if (res.data.success) {
            console.log(res.data.data)
            this.detail = res.data.data
          } else {
            Toast.clear();
            Toast.fail(res.data.errorMsg);
          }
        })
        clueLog({
          clueId: driverId
        }).then((res) => {
          if (res.data.success) {
            this.clueLog = res.data.data
          } else {
            Toast.clear();
            Toast.fail(res.data.errorMsg);
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.checkrecognition{
  padding-bottom: 0.8rem;
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
