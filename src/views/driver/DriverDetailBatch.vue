<template>
  <div class="driverDetail">
    <div class="list-wrap">
      <van-tabs v-model="active" color="#0082EF" sticky @click="buryPoint">
        <van-tab title="基本" class="backgroundTab">
          <van-cell-group v-if="JSON.stringify(detail) != '{}'">
            <!-- <h2 class="van-doc-demo-block__title">
              基本信息
            </h2> -->
            <div class="step-bar">
              <div class="list-item pass">
                <div class="head">
                  <div class="line-wrapper">
                    <i class="line"></i>
                  </div>
                  <div class="icon-wrapper">
                    <van-icon v-if="isJoinCorpWechat" name="checked" color="#70C740" size="28" />
                    <van-icon v-else name="warning" color="#DC6857" size="28" />
                  </div>
                </div>
                <div class="content-wrapper">
                  <span class="content">加入会员</span>
                </div>
              </div>
              <div class="list-item current">
                <div class="head">
                  <div class="line-wrapper">
                    <i class="line"></i>
                  </div>
                  <div class="icon-wrapper">
                    <van-icon v-if="isFollowWorkBench" name="checked" color="#70C740" size="28" />
                    <van-icon v-else name="warning" color="#DC6857" size="28" />
                  </div>
                </div>
                <div class="content-wrapper">
                  <span class="content">订阅线路</span>
                </div>
              </div>
              <div class="list-item future">
                <div class="head">
                  <div class="line-wrapper">
                    <i class="line"></i>
                  </div>
                  <div class="icon-wrapper">
                    <van-icon v-if="isActivationPush" name="checked" color="#70C740" size="28" />
                    <van-icon v-else name="warning" color="#DC6857" size="28" />
                  </div>
                </div>
                <div class="content-wrapper">
                  <span class="content">推送验证</span>
                </div>
              </div>
            </div>
            <div class="matchList">
              <div class="title_sm">
                基本信息
              </div>
            </div>
            <van-cell title="司机状态" :value="detail.stateName | DataIsNull" />
            <van-cell title="姓名" :value="detail.name | DataIsNull" />
            <van-cell title="身份证号" :value="detail.idNumber | DataIsNull" />
            <van-cell title="联系电话" :value="detail.phone | DataIsNull" />
            <van-cell title="司机编号" :value="detail.driverId | DataIsNull" />
            <van-cell title="工作城市" :value="detail.workCityName | DataIsNull" />
            <van-cell title="户籍地址" :value="detail.cityName ? detail.cityName + detail.provinceName : '暂无数据'" />
            <van-cell title="面试时间" :value=" detail.interviewTime | DataIsNull" />
            <van-cell title="货物经验" :value=" detail.cargoTypeName | DataIsNull" />
            <van-cell title="物流从业经验" :value="detail.workExperienceName | DataIsNull" />
            <van-cell title="可接受一天工作时长" :value=" detail.workHourName | DataIsNull" />
            <van-cell title="意向车型" :value=" detail.carTypeName | DataIsNull" />
            <van-cell title="是否有在还贷款" :value=" detail.isHaveLoan ? (detail.isHaveLoan === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="期望月收入" :value=" detail.expMonthlyIncomeName | DataIsNull" />
            <van-cell title="司机年龄" :value=" detail.age | DataIsNull" />
            <van-cell title="可接受首付范围" :value=" detail.acceptPayRangeName | DataIsNull" />
            <van-cell title="现居住地址" :value=" detail.address | DataIsNull" />
            <van-cell title="之前在哪工作" :value=" detail.whereWorked | DataIsNull" />
            <van-cell title="来源渠道" :value=" detail.sourceName | DataIsNull" />
            <van-cell title="征信是否通过" :value=" detail.isCreditPass ? (detail.isCreditPass === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="是否跟车" :value="detail.isPay ? (detail.isPay === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="意向金缴纳日期" :value=" detail.payDate | DataIsNull" />
            <van-cell title="上岗时间" :value=" detail.goToWorkTime | DataIsNull" />
            <van-cell title="平均月收入" :value=" detail.monthlyIncome | DataIsNull" />
            <van-cell title="户口类型" :value=" detail.accountType | DataIsNull" />
            <van-cell title="家里几个孩子" :value=" detail.childrenNum | DataIsNull" />
            <van-cell title="孩子的平均年龄" :value=" detail.childrenAge | DataIsNull" />
            <van-cell title="是否有货车" :value="detail.isHaveCar ? (detail.isHaveCar === 2 ? '否' : '是') : '暂无数据'" />
            <van-cell title="征信是否通过" :value="detail.isCreditPass ? (detail.isCreditPass === 2 ? '否' : '是') : '暂无数据'" />
          </van-cell-group>
          <p v-if="JSON.stringify(detail) == '{}'" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab title="订单" class="backgroundTab">
          <van-cell-group v-if="lineList.length">
            <!-- <h2 class="van-doc-demo-block__title">
              订单信息
            </h2> -->
            <van-cell v-for="item in orderList" :key="item.type" title="订单编号" :value="item.orderId + '(' + item.stateName + ')'" />
          </van-cell-group>
          <p v-if="!lineList.length" class="noMore">
            暂无信息
          </p>
        </van-tab>
        <van-tab title="线路" class="backgroundTab">
          <van-cell-group v-if="lineList.length">
            <!-- <h2 class="van-doc-demo-block__title">
              线路信息
            </h2> -->
            <van-cell v-for="item in lineList" :key="item.type" title="线路编号" :value="item.lineId + '(' + item.stateName + ')'" />
          </van-cell-group>
          <p v-if="!lineList.length" class="noMore">
            暂无信息
          </p>
        </van-tab>
      </van-tabs>
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Button, ActionSheet, Tag, Icon, Dialog } from 'vant'
import { driverDetail, queryOrdersByDriverId, relatedLineInformation, getMediaIdOfActivationQrCode, getCorpSignature, getAgentSignature } from '@/api/user'
// import { judgingIntentionOfReceiving, getManagerSameRequest } from '@/api/driver'
import { judgingIntentionOfReceiving } from '@/api/driver'
import { dictionary, getCityAreaByCode } from '@/api/common'
// import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
// import wx from 'jWeixin';
const wx = window.wx;
var startTime
export default {
  name: 'Driverdetailbatch',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
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
      loadedAll: false,
      judgeType: false,
      driverId: '',
      driverType: '1',
      active: 0,
      loadTimeNum: 0,
      detail: '',
      show: false,
      matchModule: false,
      matchDetail: '',
      imageData: '',
      isActivationPush: false,
      isFollowWorkBench: false,
      isJoinCorpWechat: false,
      actions: [
        { name: '激活推送', color: '#3F8AF2' },
        { name: '产品介绍', color: '#3F8AF2' },
        { name: '推荐线路', color: '#3F8AF2' },
        { name: '重新匹配', color: '#D03228' }
      ],
      carType: [],
      cargoType: [],
      handlingDifficultyDegree: [],
      departureTime: [],
      arrivalArea: [],
      deliveryArea: [],
      workCity: ''
    }
  },
  beforeRouteLeave(to, from, next) {
    let that = this;
    let eventLevelVariables = {
      duration_look: that.loadTimeNum || '0'
    }
    clearInterval(startTime);
    that.GLOBAL.buryPointFunction('customer_visit', '客户信息页面访问', eventLevelVariables)
    next(true);
  },
  created() {
    // window.location.href = '/creatlinkman?userId=wmUXHJDgAAzDgTLZoiOZEcccZghCizRA'
  },
  mounted() {
    let driverId = this.$route.query.driverId;
    this.driverId = driverId;
    this.loadTime()
    this.getDetail(driverId)
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
    // 字典查询
    async getDictionary(type, array) {
      let that = this;
      await dictionary({
        dictType: type
      }).then(res => {
        let arr = res.data.data;
        if (type !== 'Intentional_compartment') {
          let unlimited = { codeVal: '-2', code: '不限' };
          arr.unshift(unlimited);
        }
        arr.forEach(ele => {
          that[array].forEach((item, index) => {
            if (ele.codeVal === item.code) {
              this.$set(that[array][index], 'name', ele.code)
            }
          })
        })
      }).catch(err => {
        Toast.fail(err);
      });
    },
    async baseData() {
      await this.getDictionary('Intentional_compartment', 'carType');
      await this.getDictionary('type_of_goods', 'cargoType');
      await this.getDictionary('handling_difficulty_degree', 'handlingDifficultyDegree');
      await this.getDictionary('departure_time_interval', 'departureTime');
      await this.getCounty(this.workCity);
    },
    async getCounty(workCity) {
      let that = this
      await getCityAreaByCode({
        cityCode: workCity
      }).then(res => {
        if (res.data.success) {
          let arr = res.data.data;
          let unlimited = { code: '-2', name: '不限' };
          arr.unshift(unlimited)
          that.arrivalArea.forEach((ele, index) => {
            arr.forEach(item => {
              if (ele.county === item.code) {
                that.$set(that.arrivalArea[index], 'name', item.name)
              }
            })
          })
          that.deliveryArea.forEach((ele, index) => {
            arr.forEach(item => {
              if (ele.county === item.code) {
                that.$set(that.deliveryArea[index], 'name', item.name)
              }
            })
          })
        }
      }).catch(err => {
        Toast.fail(err);
      });
    },
    getDetail(driverId) {
      driverDetail({
        driverId: driverId
      }).then((res) => {
        if (res.data.success) {
          this.detail = res.data.data;
          this.workCity = res.data.data.workCity;
          if (this.detail.accountType === 1) {
            this.detail.accountType = '城镇户口'
          }
          if (this.detail.accountType === 2) {
            this.detail.accountType = '农村户口'
          }
          this.getManagerSame(driverId)
        }
      })
      queryOrdersByDriverId({
        driverId: driverId
      }).then((res) => {
        if (res.data.success) {
          this.orderList = res.data.data;
        }
      })
      relatedLineInformation({
        driverId: driverId
      }).then((res) => {
        if (res.data.success) {
          this.lineList = res.data.data.lineTenderInformationVOS;
        }
      })
      judgingIntentionOfReceiving({
        driverId: driverId
      }).then((res) => {
        if (res.data.success) {
          this.matchModule = res.data.data.flag;
          if (this.matchModule) {
            let data = res.data.data;
            let matchDetail = Object.assign({}, data);
            this.matchDetail = matchDetail
            let { carType, cargoType, handlingDifficultyDegree, departureTime, arrivalArea, deliveryArea } = data
            let arrivalAreaNew = []
            let deliveryAreaNew = []
            matchDetail.arrivalArea.forEach((ele) => {
              if (ele.across) {
                arrivalAreaNew.push(ele)
              }
            });
            matchDetail.deliveryArea.forEach((ele) => {
              if (ele.across) {
                deliveryAreaNew.push(ele)
              }
            });
            this.matchDetail.arrivalArea = arrivalAreaNew
            this.matchDetail.deliveryArea = deliveryAreaNew
            carType.forEach(ele => {
              this.carType.push({ code: ele })
            });
            cargoType.forEach(ele => {
              this.cargoType.push({ code: ele })
            });
            handlingDifficultyDegree.forEach(ele => {
              this.handlingDifficultyDegree.push({ code: ele })
            });
            departureTime.forEach(ele => {
              this.departureTime.push({ code: ele })
            });
            arrivalArea.forEach(ele => {
              if (!ele.across) {
                this.arrivalArea.push({ county: ele.county })
              }
            });
            deliveryArea.forEach(ele => {
              if (!ele.across) {
                this.deliveryArea.push({ county: ele.county })
              }
            });
            this.baseData();
          }
        }
      })
    },
    getManagerSame(driverId) {
      // getManagerSameRequest({
      //   id: driverId
      // }).then((res) => {
      //   if (res.data.success) {
      //     if (!res.data.data) {
      // this.actions.pop()
      //     }
      //   }
      // })
    },
    buryPoint(name, title) {
      this.active = Number(name);
      localStorage.setItem('active', name)
      let eventLevelVariables = {
        tab: title || ''
      }
      this.GLOBAL.buryPointFunction('customer_tab', '客户信息页-tab点击', eventLevelVariables)
    },
    goRouter(type) {
      let that = this;
      localStorage.setItem('active', 3)
      if (type === 1) {
        that.$destroy(true)
        that.$router.push({ path: '/driverintention', query: { driverId: that.driverId }})// 撮合跟进
      } else if (type === 2) {
        that.$router.push({ path: '/matchcommend', query: { driverId: that.driverId }})// 撮合跟进
      } else if (type === 3) {
        that.$router.push({ path: '/driverfollow', query: { driverId: that.driverId }})// 撮合跟进
      }
    },
    check() {
      this.show = true;
    //   judgingIntentionOfReceiving({
    //     driverId: 201910231017
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
      let eventLevelVariables = {
        option: item.name || ''
      }
      this.GLOBAL.buryPointFunction('customer_options', '客户详情操作按钮点击', eventLevelVariables)
      // Toast(item.name);
      if (item.name === '产品介绍') {
        this.$router.push({ path: '/productinfo' })
      } else if (item.name === '激活推送') {
        this.pushSendLink()
      } else if (item.name === '推荐线路') {
        this.$router.push({ path: '/linecommend' })
      } else {
        Dialog.confirm({
          title: '提示',
          message: '是否确认进行重新匹配?'
        }).then(() => {
          this.$destroy(true)
          this.$router.replace({ path: '/unrecognition', query: { driverId: this.driverId }})
        });
      }
    },
    pushSendLink() {
      Toast.loading({
        message: '正在获取二维码...',
        forbidClick: true
      });
      const hostName = window.location.href
      let that = this;
      if (that.imageData) {
        that.sedLine(that.imageData)
      } else {
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
                        // that.GLOBAL.buryPointFunction('send_line', '发送线路', {
                        //   value: '发送线路'
                        // })
                          const externalUserId = localStorage.getItem('externalUserId')
                          getMediaIdOfActivationQrCode({
                            externalUserId: externalUserId
                          }).then((res) => {
                            if (res.data.success) {
                              let imageData = res.data.data;
                              that.imageData = imageData
                              if (imageData === '') {
                                Toast.success('已通过后台发送')
                                return
                              }
                              that.sedLine(imageData)
                            } else {
                            // alert(JSON.stringify(res))
                            }
                          })
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
    },
    sedLine(imageData) {
      wx.invoke('sendChatMessage', {
        msgtype: 'image', // 消息类型，必填
        image: {
          mediaid: imageData // 图片的素材id
        }
      }, function(res) {
        Toast.clear();
        if (res.err_msg === 'sendChatMessage:permission denied') {
          Toast.fail('暂无功能权限')
        }
        return
      })
      var u = navigator.userAgent;
      if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
        setTimeout(() => {
          wx.invoke('sendChatMessage', {
            msgtype: 'image', // 消息类型，必填
            image: {
              mediaid: imageData // 图片的素材id
            }
          }, function(res) {
            // alert(JSON.stringify(res))
            Toast.clear();
            if (res.err_msg === 'sendChatMessage:permission denied') {
              Toast.fail('暂无功能权限')
            }
          })
        }, 100)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/common.scss";
.driverDetail{
  background: #F5F5F5;
  .backgroundTab{
    height: 100%;
    padding-bottom: 1.6rem;
    box-sizing: border-box;
    // background: #FFF;
  }
  .backgroundTab2{
    background: #F5F5F5;
  }
  .match_box2{
    height: 100%;
    padding-top:8px;
    .van-cell__title{
      font-size: 17px;
      color: #000000;
    }
    .matchGroup{
      margin-bottom: 2px;
      border-top: 1px solid #ebedf0;
      border-bottom: 1px solid #ebedf0;
    }
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
      border: none;
    }
    // .matchList{
    //   width:100%;
    //   background: #fff;
    //   border-bottom: 1px solid #F5F5F5;
    //   box-sizing: border-box;
    //   .title_sm{
    //     height:20px;
    //     line-height: 20px;
    //     font-size: 12px;
    //     color: #B2B2B2;
    //     background: #F5F5F5;
    //     padding: 0 10px;
    //     box-sizing: border-box;
    //   }
    //   .tage_type{
    //     overflow: hidden;
    //     padding:14px 20px 8px;
    //     box-sizing: border-box;
    //     border-top: 1px solid #ebedf0;
    //     // border-bottom: 1px solid #ebedf0;
    //     .van-tag{
    //       padding:0 12px;
    //       box-sizing: border-box;
    //       font-size: 13px;
    //       color: #FFFFFF;
    //       margin-right: 10px;
    //       margin-bottom: 6px;
    //     }
    //     // .tag{
    //       // margin: 2px 6px 8px 0;
    //     // }
    //   }
    // }
  }
  .menuBottom{
    margin: 4px 0;
  }
  .match_box{
    width: 100%;
    text-align: center;
    padding:60px 0;
    box-sizing: border-box;
    img{
      width: 90px;
      height: 90px;
    }
    .hint_weight{
      font-size: 20px;
      color: #2D3034;
      font-weight: bold;
      padding:31px 0 14px;
      box-sizing: border-box;
    }
    .text_nomarl{
      font-size: 14px;
      color: #9B9B9B;
      line-height: 22px;
    }
  }
  /*进度条start*/
    .step-bar {
      padding: 15px 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .van-icon{
        background: #fff;
      }
    }
    .list-item {
        flex: 1;
        .head {
          position: relative;
        }
        .line-wrapper {
          position: absolute;
          height: 3px;
          background-color: #5877A6;
          /* 实现n个元素但有n-1条线的必要条件，且需要将最后的线删除 */
          left: 50%;
          right: -50%;
          top: 13px;
          .line {
                display: block;
                width: 100%;
                height: 100%;
          }
        }
        .icon-wrapper,
        .content-wrapper {
          text-align: center;
        }
        .content-wrapper {
          margin-top: 6px;
        }
        &:last-of-type {
          .line-wrapper {
                display: none;
          }
        }
        .icon {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: relative;
          z-index: 1;
          border: 2px solid #FFF;
        }
        &.current {
          .icon {
            background-color: #2298fe;
          }
          .content {
            color: #333;
          }
        }
        &.pass {
          .icon {
                background-color: #b9defe;
          }
          .content {
            color: #333;
          }
          .line {
                background-color: #5877A6;
          }
        }
        &.future {
          .icon {
                background-color: #dfe4e8;
          }
          .content {
            color: #333;
          }
        }
    }
    .van-step--horizontal:last-child{
      .van-step__line{
        background-color: #5877A6 !important;
      }
    }
  .matchList{
      width:100%;
      background: #fff;
      box-sizing: border-box;
      .title_sm{
        height:24px;
        line-height: 24px;
        font-size: 12px;
        color: #B2B2B2;
        background: #F5F5F5;
        border-top: 1px solid #ebedf0;
        border-bottom: 1px solid #ebedf0;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .tage_type{
        overflow: hidden;
        padding:14px 20px 8px;
        box-sizing: border-box;
        // border-top: 1px solid #ebedf0;
        // border-bottom: 1px solid #ebedf0;
        .van-tag{
          // padding:0 12px;
          padding:0 12px;
          box-sizing: border-box;
          font-size: 13px;
          color: #FFFFFF;
          margin-right: 10px;
          margin-bottom: 5px;
        }
        // .tag{
          // margin: 2px 6px 8px 0;
        // }
      }
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

    .btn2{
      width:90%;
      margin: 63px auto 0;
      height: 46px;
      line-height: 46px;
      background: #3C7FC8;
      font-size: 18px;
      border:none;
      border-radius: 5px;
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
