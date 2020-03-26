<template>
  <div class="ProductInfo">
    <h2 class="van-doc-demo-block__title">
      产品推荐
    </h2>
    <vo-pages
      :data="[]"
      :no-data-hint="false"
    >
      <van-radio-group v-model="radio">
        <van-radio v-for="(item, index) in productList" :key="item.id" :name="index" class="productList">
          <div>
            <img src="https://pics7.baidu.com/feed/77c6a7efce1b9d1611b44a9fa0c5de898d5464fb.jpeg?token=efa759282eaf6e93922a39093415da5d" alt="">
            <p>小剪短发傲娇哦啊手机费哦啊点手机费阿加撒地方好烦骄傲</p>
          </div>
        </van-radio>
      </van-radio-group>
      <van-button round type="info" block class="btn" @click="sendCustmer">
        发送给客户
      </van-button>
    </vo-pages>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Cell, Popup, Field, Button, CellGroup, RadioGroup, Radio } from 'vant'
// import { fetchList } from '@/api/clue'
import { getCorpSignature, getAgentSignature } from '@/api/user'
import VoPages from 'vo-pages'
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
    [CellGroup.name]: CellGroup,
    VoPages
  },
  data() {
    return {
      active: 1,
      radio: '',
      productList: [],
      total: 0,
      page: 1,
      phone: '',
      show: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let that = this;
      that.productList = [
        {
          text: '欢迎来到梧桐专车',
          picUrl: '323232'
        },
        {
          text: '欢迎来到梧桐共享',
          picUrl: '534534'
        }
      ]
    },
    submitPhone() {
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
        Toast.fail('手机号码有误，请重填');
        return false;
      }
      this.$router.replace({ path: '/checkrecognition' })
    },
    sendCustmer() {
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
                  agentId: '1000013',
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
                        wx.invoke('sendChatMessage', {
                          msgtype: 'text', // 消息类型，必填
                          text: {
                            content: '测试' // 文本内容
                          },
                          image:
                          {
                            mediaid: '2TLVdgtYCwWc3BXOlAErsdp93e7IKfqA__9OYWVOtNEA_ex0lGEK3cxC1yze78X09' // 图片的素材id
                          },
                          video:
                          {
                            mediaid: '' // 视频的素材id
                          },
                          file:
                          {
                            mediaid: '' // 文件的素材id
                          },
                          news:
                          {
                            link: 'www.baidu.com', // H5消息页面url 必填
                            title: '百度', // H5消息标题
                            desc: '百度', // H5消息摘要
                            imgUrl: 'https://upload.jianshu.io/users/upload_avatars/10311999/16dbb33b-6d2d-47c9-9d6a-fbadccc67e85.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' // H5消息封面图片URL
                          }
                        }, function(res) {
                          console.log('测试1通过', res)
                          wx.invoke('sendChatMessage', {
                            msgtype: 'text', // 消息类型，必填
                            text: {
                              content: '测试22222' // 文本内容
                            },
                            image:
                            {
                              mediaid: '2TLVdgtYCwWc3BXOlAErsdp93e7IKfqA__9OYWVOtNEA_ex0lGEK3cxC1yze78X09' // 图片的素材id
                            },
                            video:
                            {
                              mediaid: '' // 视频的素材id
                            },
                            file:
                            {
                              mediaid: '' // 文件的素材id
                            },
                            news:
                            {
                              link: 'www.baidu.com', // H5消息页面url 必填
                              title: '百度', // H5消息标题
                              desc: '百度', // H5消息摘要
                              imgUrl: 'https://upload.jianshu.io/users/upload_avatars/10311999/16dbb33b-6d2d-47c9-9d6a-fbadccc67e85.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' // H5消息封面图片URL
                            }
                          }, function(res) {
                            console.log('测试2通过', res)
                          })
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
<style lang="scss" scoped>
.ProductInfo{
  width: 100%;
  text-align: center;
  padding:1rem;
  box-sizing: border-box;
  background-color: #f7f8fa;
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
      padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 0.6rem;
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
