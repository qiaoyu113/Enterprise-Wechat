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
        <van-field v-model="phone" type="textarea" autosize label="手机号" placeholder="请输入手机号" maxlength="11" @blur="blurInp" />
      </van-cell-group>
      <van-button type="info" block @click="submitPhone">
        尝试匹配
      </van-button>
    </vo-pages>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Cell, Popup, Field, Button, CellGroup } from 'vant'
import { marchPhone, getCorpSignature, getAgentSignature } from '@/api/user'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
const wx = window.wx;
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
    blurInp() {
      window.scroll(0, 0);
    },
    submitPhone() {
      let that = this;
      if (!(/^1[3456789]\d{9}$/.test(that.phone))) {
        Toast.fail('手机号码有误，请重填');
        return false;
      }
      const externalUserId = localStorage.getItem('externalUserId')
      if (externalUserId) {
        marchPhone({
          externalUserId: externalUserId,
          phone: that.phone
        }).then((res) => {
          if (res.data.success) {
            let matchSuccess = res.data.data.matchSuccess
            if (matchSuccess) {
              // 1是司机，2是线索
              // const state = res.data.data.driverType;
              const driverId = res.data.data.driverId;
              const driverType = res.data.data.driverType;
              // if (state === 1) {
              //   that.$router.replace({ path: '/driverDetail?driverId=' + driverId })
              // } else if (state === 2) {
              //   that.$router.replace({ path: '/clueDetail?clueId=' + driverId })
              // } else {
              //   // 无法识别
              //   Toast.fail('暂未匹配到客户信息');
              // }
              that.$router.replace({ path: '/checkrecognition', query: { driverId: driverId, driverType: driverType }})
            } else {
              // 无法识别
              Toast.fail('暂未匹配到客户信息');
            }
          } else {
            Toast.fail(res.data.errorMsg);
          }
        })
      } else {
        const hostName = window.location.href
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
                          wx.invoke('getCurExternalContact', {
                          }, function(res) {
                            if (res.err_msg === 'getCurExternalContact:ok') {
                            // console.log('userId', res.userId) // 返回当前外部联系人userId
                              localStorage.setItem('externalUserId', res.userId)
                              marchPhone({
                                externalUserId: res.userId,
                                phone: that.phone
                              }).then((res) => {
                                if (res.data.success) {
                                  let matchSuccess = res.data.data.matchSuccess
                                  if (matchSuccess) {
                                  // 1是司机，2是线索
                                    // const state = res.data.data.driverType;
                                    const driverId = res.data.data.driverId;
                                    // if (state === 1) {
                                    //   that.$router.replace({ path: '/driverDetail?driverId=' + driverId })
                                    // } else if (state === 2) {
                                    //   that.$router.replace({ path: '/clueDetail?clueId=' + driverId })
                                    // } else {
                                    //   // 无法识别
                                    //   Toast.fail('暂未匹配到客户信息');
                                    // }
                                    that.$router.replace({ path: '/checkrecognition', query: { driverId: driverId }})
                                  } else {
                                  // 无法识别
                                    Toast.fail('暂未匹配到客户信息');
                                  }
                                } else {
                                  Toast.fail(res.data.errorMsg);
                                }
                              })
                            } else {
                            // 错误处理
                              Toast.fail('无法识别外部联系人');
                            }
                          });
                        },
                        fail: function(res) {
                          console.log('err', res)
                          if (res.errMsg.indexOf('is not a function') > -1) {
                            alert('版本过低请升级')
                          }
                        }
                      });
                    }
                  })
                },
                fail: function(res) {
                  alert('版本过低请升级2');
                }
              });
            });
            wx.error(function(res) {
              console.log(res);
            });
          }
        })
      }
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
    height: 45px;
    display: block;
    margin-top:40px;
    overflow: hidden;
  }
}
</style>
