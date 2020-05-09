<template>
  <div class="linedetail">
    <div class="list-wrap">
      <van-tabs v-model="tab_state" color="#3986CB" sticky @click="buryPoint">
        <van-tab title="基本">
          <!-- <h2 class="van-doc-demo-block__title">
            基本信息
          </h2> -->
          <van-cell-group>
            <van-cell title="货主" :value="detail.customerName | DataIsNull" />
            <van-cell title="城市" :value="detail.cityName | DataIsNull" />
            <van-cell title="线路名称" :value="detail.lineName | DataIsNull" />
            <van-cell title="货物类型" :value="detail.cargoType | DataIsNull" />
            <van-cell title="收货人类型" :value="detail.receiverType | DataIsNull" />
            <van-cell title="车型" :value="detail.carTypeName | DataIsNull" />
            <van-cell title="仓位置" :value="detail.warehouse | DataIsNull" />
            <van-cell title="配送区域是否固定" :value=" detail.distributionSites ? (detail.distributionSites === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="是否需要返仓" :value=" detail.returnWarehouse ? (detail.returnWarehouse === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="是否需要搬运" :value=" detail.carry ? (detail.carry === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="是否需要回单" :value=" detail.returnBill ? (detail.returnBill === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="收入结算方式" :value=" detail.incomeSettlementMethodName" />
            <van-cell v-if="detail.incomeSettlementMethod === 1" title="货主单趟最低报价" :value="detail.preLowestQuotations | NumFormat" />
            <van-cell v-if="detail.incomeSettlementMethod === 1" title="预估单趟费用(元)(含油耗、过路、过桥)" :value=" detail.monthlyFuelConsumption | NumFormat" />
            <van-cell v-if="detail.incomeSettlementMethod === 1" title="单趟去油净收入" :value="Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) ? Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) : 0" />
            <van-cell v-if="detail.incomeSettlementMethod === 2" title="预计货主月报价" :value=" detail.preLowestQuotations | NumFormat" />
            <van-cell v-if="detail.incomeSettlementMethod === 2" title="预估月费用(元)(含油耗、过路、过桥)" :value=" detail.monthlyFuelConsumption | NumFormat" />
            <van-cell v-if="detail.incomeSettlementMethod === 2" title="预计去油净收入" :value=" Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) ? Number(detail.preLowestQuotations) - Number(detail.monthlyFuelConsumption) : 0 | NumFormat" />
            <van-cell title="油卡结算(%)" :value=" detail.fuelRatio | DataIsNull" />
            <van-cell title="线路区域" :value=" (detail.provinceAreaName + detail.cityAreaName + detail.countyAreaName) | DataIsNull" />
            <van-cell title="具体区域范围" :value=" detail.districtArea | DataIsNull" />
            <van-cell title="线路编号" :value="detail.lineId | DataIsNull" />
            <van-cell title="线路入池原因" :value="detail.occurReasonName | DataIsNull" />
            <van-cell title="可上车数" :value="detail.deployNum | DataIsNull" />
            <van-cell title="线路稳定性" :value="detail.stabilityRateName | DataIsNull" />
            <van-cell title="账期(天)" :value="detail.billingCycle | DataIsNull" />
            <van-cell title="创建线路难度" :value="detail.handlingDifficultyDegreeName | DataIsNull" />
            <van-cell title="备注信息" :value="detail.remark | DataIsNull" />
            <van-cell title="线路类型" :value="detail.distinguishedTypeName | DataIsNull" />
            <van-cell v-if="detail.waitDirveValidityDuration > 0" title="线路失效截止时间" :value=" detail.waitDirveValidity | DataIsNull" />
            <van-cell v-if="detail.waitDirveValidityDuration > 0" title="等待上车有效期(天)" :value=" detail.waitDirveValidityDuration | DataIsNull" />
            <van-cell title="首岗是否有人跟车" :value="detail.firstNeededFollow ? (detail.firstNeededFollow === 2 ? '否' : '是') : '暂无数据'" />
          </van-cell-group>
          <p v-if="!detail.lineName" class="noMore">
            暂无信息
          </p>
          <!-- <img src="https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/7edacf78ec6c4f1da2b39912a3bcc4ed" alt="" style="-webkit-touch-callout: default;"> -->
        </van-tab>
        <van-tab title="配送">
          <!-- <h2 class="van-doc-demo-block__title">
            配送信息
          </h2> -->
          <van-cell-group>
            <van-cell title="预计每日平均配送点位数" :value="detail.deliveryNum | DataIsNull" />
            <van-cell title="预计每日平均总里程(公里)" :value="detail.distance | DataIsNull" />
            <van-cell title="预计月出车天数" :value="detail.month | DataIsNull" />
            <van-cell v-for="item in detail.lineDeliveryInfoFORMS" :key="item.id" title="预计日工作时间">
              {{ item.workingTimeStart }}~{{ item.workingTimeEnd }}
            </van-cell>
            <van-cell title="预计每日货物总体积(立方米)" :value="detail.volume | DataIsNull" />
            <van-cell title="预计单件货物重量(kg)" :value="detail.singleCargoWeightName | DataIsNull" />
            <van-cell title="每日配送趟数" :value="detail.dayNumName | DataIsNull" />
          </van-cell-group>
          <p v-if="!detail.deliveryNum" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab title="关键">
          <!-- <h2 class="van-doc-demo-block__title">
            关键信息
          </h2> -->
          <van-cell-group>
            <van-cell title="每日总里程（公里）" :value="detail.distance | DataIsNull" />
            <van-cell title="预计月收入" :value="monthlyTransaction | DataIsNull" />
            <van-cell title="配送总时长" :value="timeDiff | DataIsNull" />
          </van-cell-group>
          <p v-if="!detail.distance" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab title="标书">
          <!-- <h2 class="van-doc-demo-block__title">
            标书信息
          </h2> -->
          <van-cell-group>
            <van-cell v-for="item in clueDetail" :key="item.customerName" :title="item.cityName" :value="item.lineName" />
          </van-cell-group>
          <p v-if="clueDetail.length === 0" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab title="记录">
          <!-- <h2 class="van-doc-demo-block__title">
            记录信息
          </h2> -->
          <van-cell-group>
            <van-cell v-for="item in logList" :key="item.operType" :title="item.operType" :value="'(' + item.createrName + ')' + item.createDate" />
          </van-cell-group>
          <p v-if="logList.length === 0" class="noMore">
            暂无信息
          </p>
        </van-tab>
      </van-tabs>
      <!-- <van-button block class="btn_bottom" :disabled="disable" @click="pushSendLink">
        发送此线路
      </van-button> -->
      <van-button class="btn_bottom" @click="check">
        操作
      </van-button>
      <div v-if="backBtn" class="backBtn" @click="goLine">
        <van-icon name="home-o" />
      </div>
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <van-overlay :show="showoverlay" />
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Button, Icon, ActionSheet, ImagePreview, Overlay } from 'vant'
import { getLineDetail, listByLineId, loglist, getMediaIdOfLineDetail, updateState, getUrlOfLineDetailByLineId } from '@/api/line'
// import { getLineDetail, listByLineId, loglist, getMediaIdOfLineDetail } from '@/api/line'
import { getCorpSignature, getAgentSignature } from '@/api/user'
// import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
const wx = window.wx;
var startTime;
export default {
  name: 'LineDetail',
  components: {
    [Tabbar.name]: Tabbar,
    [ImagePreview.name]: ImagePreview,
    [ActionSheet.name]: ActionSheet,
    [Overlay.name]: Overlay,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
    // VoPages
  },
  data() {
    return {
      lineId: '',
      listQuery: {
        state: 0
      },
      tab_state: 0,
      active: 1,
      detail: {},
      clueDetail: [],
      disable: false,
      logList: [],
      follow: [],
      action: [],
      total: 0,
      page: 1,
      show: false,
      showoverlay: false,
      actions: [
        { name: '发送此线路', color: '#3F8AF2' },
        { name: '下载图片', color: '#3F8AF2' }
      ],
      loadedAll: false,
      backBtn: false,
      timeDiff: '',
      driverId: '',
      monthlyTransaction: '',
      loadTimeNum: 0
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.driverId = this.$route.query.driverId;
    this.lineId = id;
    this.timeDiff = this.$route.query.timeDiff
    this.monthlyTransaction = this.$route.query.monthlyTransaction
    this.backBtn = this.$route.query.backBtn
    this.loadTime()
    this.getDetail(id)
  },
  beforeRouteLeave(to, from, next) {
    let that = this;
    let eventLevelVariables = {
      line_type: that.detail.distinguishedTypeName || '',
      duration_look: that.loadTimeNum || '0',
      vehicle_type: that.detail.carVal || '',
      goods_type: that.detail.cargoVal || ''
    }
    clearInterval(startTime);
    that.GLOBAL.buryPointFunction('lineDetail_visit', '线路详情页面访问', eventLevelVariables)
    that.$destroy(true)
    next(true);
  },
  methods: {
    double(mat) {
      return mat < 10 ? '0' + mat : mat;
    },
    loadTime() {
      let date = 0;
      let hour = 0;
      let minute = 0;
      let second = 0;
      let that = this;
      startTime = setInterval(function() {
        second++;
        if (second === 60) {
          minute += 1;
          second = 0;
        }
        if (minute === 60) {
          hour += 1;
          minute = 0;
        }
        if (hour === 24) {
          date += 1;
          hour = 0;
        }
        let days = that.double(date) + '天：' + that.double(hour) + ':' + that.double(minute) + ':' + that.double(second);
        that.loadTimeNum = days
      }, 1000)
    },
    getDetail(id) {
      let that = this;
      getLineDetail({ lineId: id }).then((res) => {
        if (res.data.success) {
          that.detail = res.data.data;
        }
      })
      listByLineId({
        page: 1,
        limit: 100,
        lineId: id
      }).then((res) => {
        if (res.data.success) {
          that.clueDetail = res.data.data;
        }
      })
      loglist({
        lineId: id
      }).then((res) => {
        if (res.data.success) {
          that.logList = res.data.data;
        }
      })
    },
    check() {
      this.show = true;
    },
    pushSendLink() {
      Toast.loading({
        message: '正在生产二维码...',
        forbidClick: true
      });
      const hostName = window.location.href
      let that = this;
      that.disable = true;
      updateState({
        'driverId': that.driverId,
        'lineId': that.lineId,
        'remark': '线路推送至司机',
        'state': 1
      }).then((res) => {
      })
      getMediaIdOfLineDetail({
        lineId: that.lineId,
        busiType: that.detail.busiType
      }).then((res) => {
        if (res.data.success) {
          let mediaidNew = res.data.data;
          getCorpSignature({
            url: hostName
          }).then((res) => {
            if (res.data.success) {
              let data = res.data.data;
              wx.config({
                beta: true,
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.corpId, // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp: Number(data.timestamp), // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ['agentConfig'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
              wx.ready(function() {
                // 开启企业微信debug模式wx.config里的debug为true
                wx.checkJsApi({
                  jsApiList: [
                    'agentConfig',
                    'sendChatMessage',
                    'getCurExternalContact'
                  ],
                  success: function(res) {
                    getAgentSignature({
                      agentId: that.GLOBAL.agentId,
                      url: hostName
                    }).then((res) => {
                      if (res.data.success) {
                        const agentData = res.data.data
                        wx.agentConfig({
                          corpid: agentData.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                          agentid: agentData.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                          timestamp: '' + agentData.timestamp, // 必填，生成签名的时间戳
                          nonceStr: agentData.nonceStr, // 必填，生成签名的随机串
                          signature: agentData.signature, // 必填，签名，见附录1
                          jsApiList: ['sendChatMessage', 'getCurExternalContact'], // 必填
                          success: function(res) {
                            that.GLOBAL.buryPointFunction('send_line', '发送线路', {
                              value: '发送线路'
                            })
                            wx.invoke('sendChatMessage', {
                              msgtype: 'image', // 消息类型，必填
                              image:
                          {
                            mediaid: mediaidNew // 图片的素材id
                          }
                            }, function(res) {
                              Toast.clear();
                              if (res.err_msg === 'sendChatMessage:permission denied') {
                                Toast.fail('暂无功能权限')
                              }
                              that.disable = false;
                              let lineIdNeedBack = { lineId: that.lineId, timeDiff: that.timeDiff, monthlyTransaction: that.monthlyTransaction, driverId: that.driverId }
                              localStorage.setItem('lineIdNeedBack', JSON.stringify(lineIdNeedBack))
                              return
                            })
                            var u = navigator.userAgent;
                            if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
                              setTimeout(() => {
                                wx.invoke('sendChatMessage', {
                                  msgtype: 'image', // 消息类型，必填
                                  image:
                          {
                            mediaid: mediaidNew // 图片的素材id
                          }
                                }, function(res) {
                                  Toast.clear();
                                  if (res.err_msg === 'sendChatMessage:permission denied') {
                                    Toast.fail('暂无功能权限')
                                  }
                                  that.disable = false;
                                  let lineIdNeedBack = { lineId: that.lineId, timeDiff: that.timeDiff, monthlyTransaction: that.monthlyTransaction, driverId: that.driverId }
                                  localStorage.setItem('lineIdNeedBack', JSON.stringify(lineIdNeedBack))
                                })
                              }, 100)
                            }
                          },
                          fail: function(res) {
                            console.log('err', res)
                            if (res.errMsg.indexOf('is not a function') > -1) {
                              alert('<i class="weui-icon-warn">版本过低请升级</i>')
                            }
                          }
                        });
                      }
                      that.disable = false;
                      Toast.clear();
                    })
                  },
                  fail: function(res) {
                    alert('版本过低请升级');
                  }
                });
              });
              wx.error(function(res) {
                console.log(res);
              });
            }
          })
        }
      })
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      let that = this;
      // Toast(item.name);
      if (item.name === '发送此线路') {
        that.pushSendLink()
      } else {
        // that.showoverlay = true;
        Toast.loading({
          message: '正在加载图片...',
          forbidClick: true
        });
        getUrlOfLineDetailByLineId({
          lineId: that.lineId
        }).then((res) => {
          if (res.data.success) {
            Toast.clear()
            // ImagePreview({
            //   images: [
            //     res.data.data
            //   ],
            //   closeable: true
            // });
            ImagePreview({
              images: [
                res.data.data
              ],
              closeable: true,
              closeOnPopstate: true
            });
          }
        })
      }
    },
    isIos() {
      var u = navigator.userAgent;
      if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
        return false;
      }
      return true;
    },
    buryPoint(name, title) {
      this.tab_state = Number(name);
      let eventLevelVariables = {
        tab: title || ''
      }
      this.GLOBAL.buryPointFunction('lineDetail_tab', '线路详情页-tab点击', eventLevelVariables)
    },
    goLine() {
      this.$router.replace({ path: '/linecommend' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/common.scss';
.linedetail{
  padding-bottom: 1.6rem;
  box-sizing: border-box;
  background: #F5F5F5;
  .backBtn{
    width:1rem;
    height: 1rem;
    position: fixed;
    right: 1rem;
    bottom: 1.6rem;
    background:#4D86C6;
    border-radius: 100%;
    text-align: center;
    line-height: 1.2rem;
    font-size: 16px;
    color:#fff;
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
    overflow-y: scroll;
  }
}

// .btn{
//     position: fixed;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     width: 100%;
//     height: 46px;
//     line-height: 46px;
//     background:#2F7DCD;
//     font-size: 16px;
//     color:#fff;
// }

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
