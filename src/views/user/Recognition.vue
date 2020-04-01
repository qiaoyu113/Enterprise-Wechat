<template>
  <div class="recognition">
    <vo-pages
      :data="list"
      :loaded-all="loadedAll"
      :no-data-hint="false"
    >
      <img src="../../assets/recognition.png" alt="">
      <div>
        <van-loading v-if="!btnShow" />
        <div v-if="!btnShow" class="font">
          正在识别联系人信息...
        </div>
        <div v-if="btnShow" class="font">
          识别不到该用户
        </div>
      </div>
    </vo-pages>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Loading } from 'vant'
import { getCorpSignature, getAgentSignature, externalUserId } from '@/api/user'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
const wx = window.wx;
export default {
  name: 'Recognition',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Loading.name]: Loading,
    VoPages
  },
  data() {
    return {
      listQuery: {
        key: '',
        page: 1,
        limit: 100,
        endDate: '',
        appletSource: '',
        startDate: '',
        expandManager: '',
        clueType: '',
        carType: '',
        isSettledIn: '',
        workCity: '',
        sourceType: '',
        isPayDeposit: '',
        state: '1'
      },
      btnShow: false,
      active: 1,
      list: [],
      total: 0,
      page: 1,
      loadedAll: false
    }
  },
  mounted() {
    this.getUserConfig()
  },
  methods: {
    getUserConfig() {
      let that = this;
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
                console.log('checkJsApi', res)
                getAgentSignature({
                  agentId: that.GLOBAL.agentId,
                  url: hostName
                }).then((res) => {
                  if (res.data.success) {
                    const agentData = res.data.data
                    console.log('agentData', agentData)
                    wx.agentConfig({
                      corpid: agentData.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                      agentid: agentData.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                      timestamp: '' + agentData.timestamp, // 必填，生成签名的时间戳
                      nonceStr: agentData.nonceStr, // 必填，生成签名的随机串
                      signature: agentData.signature, // 必填，签名，见附录1
                      jsApiList: ['sendChatMessage', 'getCurExternalContact'], // 必填
                      success: function(res) {
                        console.log('success', res)
                        wx.invoke('getCurExternalContact', {
                        }, function(res) {
                          if (res.err_msg === 'getCurExternalContact:ok') {
                            // console.log('userId', res.userId) // 返回当前外部联系人userId
                            localStorage.setItem('externalUserId', toString(res.userId))
                            externalUserId(
                              res.userId
                            ).then((res) => {
                              if (res.data.success) {
                                if (res.data.data.matchSuccess) {
                                  // 1是司机，2是线索
                                  const state = res.data.data.driverType;
                                  const driverId = res.data.data.driverId;
                                  if (state === 1) {
                                    that.$router.replace({ path: '/driverDetail', query: { driverId: driverId }})
                                  } else if (state === 2) {
                                    that.$router.replace({ path: '/clueDetail', query: { clueId: driverId }})
                                  } else {
                                    // 无法识别
                                    that.$router.replace({ path: '/unrecognition' })
                                  }
                                } else {
                                  // 无法识别
                                  that.$router.replace({ path: '/unrecognition' })
                                }
                              }
                            })
                          } else {
                            // 错误处理
                            this.btnShow = true;
                          }
                        });
                        // wx.invoke('sendChatMessage', {
                        //   msgtype: 'text', // 消息类型，必填
                        //   text: {
                        //     content: '测试' // 文本内容
                        //   },
                        //   image:
                        //   {
                        //     mediaid: '2TLVdgtYCwWc3BXOlAErsdp93e7IKfqA__9OYWVOtNEA_ex0lGEK3cxC1yze78X09' // 图片的素材id
                        //   },
                        //   video:
                        //   {
                        //     mediaid: '' // 视频的素材id
                        //   },
                        //   file:
                        //   {
                        //     mediaid: '' // 文件的素材id
                        //   },
                        //   news:
                        //   {
                        //     link: 'www.baidu.com', // H5消息页面url 必填
                        //     title: '百度', // H5消息标题
                        //     desc: '百度', // H5消息摘要
                        //     imgUrl: 'https://upload.jianshu.io/users/upload_avatars/10311999/16dbb33b-6d2d-47c9-9d6a-fbadccc67e85.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' // H5消息封面图片URL
                        //   }
                        // }, function(res) {
                        //   console.log('测试1通过')
                        //   wx.invoke('sendChatMessage', {
                        //     msgtype: 'text', // 消息类型，必填
                        //     text: {
                        //       content: '测试22222' // 文本内容
                        //     },
                        //     image:
                        //     {
                        //       mediaid: '2TLVdgtYCwWc3BXOlAErsdp93e7IKfqA__9OYWVOtNEA_ex0lGEK3cxC1yze78X09' // 图片的素材id
                        //     },
                        //     video:
                        //     {
                        //       mediaid: '' // 视频的素材id
                        //     },
                        //     file:
                        //     {
                        //       mediaid: '' // 文件的素材id
                        //     },
                        //     news:
                        //     {
                        //       link: 'www.baidu.com', // H5消息页面url 必填
                        //       title: '百度', // H5消息标题
                        //       desc: '百度', // H5消息摘要
                        //       imgUrl: 'https://upload.jianshu.io/users/upload_avatars/10311999/16dbb33b-6d2d-47c9-9d6a-fbadccc67e85.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' // H5消息封面图片URL
                        //     }
                        //   }, function(res) {
                        //     console.log('测试2通过')
                        //   })
                        // })
                      },
                      fail: function(res) {
                        console.log('err', res)
                        if (res.errMsg.indexOf('is not a function') > -1) {
                          alert('<i class="weui-icon-warn">版本过低请升级3</i>')
                        }
                      }
                    });
                  }
                })
              },
              fail: function(res) {
                alert(that.GLOBAL.agentId)
                alert(JSON.stringify(res))
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
</script>
<style lang="scss" scoped>
.recognition {
  width: 100%;
  text-align: center;
  padding:5rem 0;
  box-sizing: border-box;
  img{
    width:3rem;
    margin-bottom: 1rem;
  }
  .font{
    font-size: 14px;
    color:#666;
    padding: 0.8rem 0;
  }
}
</style>
