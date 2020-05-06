<template>
  <div class="ProductInfo">
    <h2 class="van-doc-demo-block__title">
      产品推荐
    </h2>
    <van-radio-group v-model="radio" class="productBox">
      <van-radio v-for="(item, index) in productList" :key="item.id" :name="index" class="productList">
        <p class="title">
          产品{{ index + 1 }}
        </p>
        <img style="margin-top:0.4rem;" :src="item.mediaUrl" alt="">
        <!-- <p>{{ item.mediaDesc }}</p> -->
      </van-radio>
      <div v-if="!productList.length">
        暂无数据
      </div>
    </van-radio-group>
    <van-button type="info" block class="btn_bottom" :disabled="disable" @click="sendCustmer">
      发送给客户
    </van-button>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Cell, Popup, Field, Button, CellGroup, RadioGroup, Radio } from 'vant'
// import { fetchList } from '@/api/clue'
import { productIntroduce } from '@/api/common'
import { getCorpSignature, getAgentSignature } from '@/api/user'
import 'vo-pages/lib/vo-pages.css'
const wx = window.wx;
export default {
  name: 'ProductInfo',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      active: 1,
      radio: '',
      productList: [],
      total: 0,
      page: 1,
      phone: '',
      show: false,
      disable: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let that = this;
      productIntroduce({}).then((res) => {
        if (res.data.success) {
          that.productList = res.data.data
        }
      })
    },
    submitPhone() {
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
        Toast.fail('手机号码有误，请重填');
        return false;
      }
      this.$router.replace({ path: '/checkrecognition' })
    },
    sendCustmer() {
      let that = this;
      const hostName = window.location.href
      let index = this.radio
      if (index === '') {
        Toast.fail('请选择一个产品')
        return false;
      }
      Toast.loading({
        message: '正在发送产品...',
        forbidClick: true
      });
      that.disable = true;
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
            jsApiList: ['agentConfig', 'sendChatMessage', 'getCurExternalContact'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function() {
            // 开启企业微信debug模式wx.config里的debug为true
            wx.checkJsApi({
              jsApiList: [
                'agentConfig'
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
                        let id = that.productList[index].mediaId
                        let eventLevelVariables = {
                          product_type: id || ''
                        }
                        that.GLOBAL.buryPointFunction('send_product', '发送产品介绍', eventLevelVariables)
                        wx.invoke('sendChatMessage', {
                          msgtype: 'image', // 消息类型，必填
                          image:
                            {
                              mediaid: id // 图片的素材id
                            }
                        }, function(res) {
                          Toast.clear();
                          // Toast.success('')
                          that.disable = false;
                          console.log('发送图片回调', res)
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
                              image:
                            {
                              mediaid: id // 图片的素材id
                            }
                            }, function(res) {
                              Toast.clear();
                              // Toast.success('')
                              that.disable = false;
                              console.log('发送图片回调', res)
                              if (res.err_msg === 'sendChatMessage:permission denied') {
                                Toast.fail('暂无功能权限')
                              }
                            })
                          }, 100)
                        }
                        Toast.clear();
                        that.disable = false;
                      },
                      fail: function(res) {
                        console.log('err', res)
                        that.disable = false;
                        Toast.clear();
                        Toast.fail(res)
                        if (res.errMsg.indexOf('is not a function') > -1) {
                          alert('<i class="weui-icon-warn">版本过低请升级</i>')
                        }
                      }
                    });
                  }
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
  }
}
</script>
<style lang="scss">
@import '../../style/common.scss';
.ProductInfo{
  width: 100%;
  min-height: 100vh;
  text-align: center;
  // padding:1rem;
  box-sizing: border-box;
  background-color: #f7f8fa;
  text-align: center;
  .title{
    width: 100%;
    font-weight: bold;
    color:#333;
    text-align: center;
  }
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
  .productList{
    width:100%;
    text-align: center;
    padding: 0.6rem 0.5rem;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 0.6rem;
    box-sizing: border-box;
  }
  .van-doc-demo-block__title{
    margin: 0;
    text-align: center;
    padding: 16px;
    color: #4D86C6;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    background-color: #f7f8fa;
  }
  .productBox{
    padding: 0.3rem 0.6rem 1.6rem 0.6rem;
    box-sizing: border-box;
  }
  .van-radio__label{
    width: 100% !important;
  }
}
</style>
