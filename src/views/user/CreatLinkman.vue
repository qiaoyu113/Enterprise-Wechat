<template>
  <div class="recognition">
    <vo-pages
      :data="list"
      :loaded-all="loadedAll"
      :no-data-hint="false"
    >
      <img src="../../assets/chat.png" alt="">
      <div>
        <van-loading v-if="!btnShow && loginShow" />
        <div v-if="!btnShow" class="font">
          {{ textVal }}
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
import { getCorpSignature, getAgentSignature } from '@/api/user'
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
      textVal: '正在识别联系人信息...',
      btnShow: false,
      loginShow: true,
      active: 1,
      list: [],
      total: 0,
      page: 1,
      loadedAll: false,
      externalUserIds: null
    }
  },
  mounted() {
    this.externalUserIds = this.$route.query.userId;
    if (this.externalUserIds === null || this.externalUserIds === undefined || this.externalUserIds === '') {
      this.btnShow = true
    } else {
      this.Openlinkman();
    }
  },
  methods: {
    Openlinkman() {
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
                'getCurExternalContact',
                'openEnterpriseChat',
                'closeWindow'
              ],
              success: function(res) {
                that.textVal = '正在创建会话...'
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
                      jsApiList: ['sendChatMessage', 'getCurExternalContact', 'openEnterpriseChat', 'closeWindow'], // 必填
                      success: function(res) {
                        wx.openEnterpriseChat({
                          // 注意：userIds和externalUserIds至少选填一个，且userIds+externalUserIds总数不能超过2000。
                          // userIds: userId,
                          // 参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。'wmUXHJDgAAzDgTLZoiOZEcccZghCizRA'
                          externalUserIds: that.externalUserIds, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
                          groupName: '创建会话中',
                          // 必填，会话名称。单聊时该参数传入空字符串""即可。
                          success: function(res) {
                            that.textVal = '已成功创建会话'
                            that.loginShow = false;
                            // 回调
                            var u = navigator.userAgent;
                            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                              if (window.ShowFitness !== undefined) wx.closeWindow();
                            }
                          },
                          fail: function(res) {
                            if (res.errMsg.indexOf('function not exist') > -1) {
                              alert('版本过低请升级')
                            }
                          }
                        });
                      }
                    })
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
