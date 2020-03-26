<template>
  <div class="login">
    <img src="../../assets/wxlogo.png" alt="">
    <div v-if="!btnShow">
      <van-loading />
      <div class="font">
        正在连接...
      </div>
    </div>
    <div>
      <van-button v-if="btnShow" round type="primary" @click="reLinkGetCode()">
        重新授权
      </van-button>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user';
import { Field, Icon, Button, Toast, Loading } from 'vant';
// import wx from 'weixin-js-sdk';
import { mapActions } from 'vuex'
// const wx = window.wx;
export default {
  name: 'Login',
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Loading.name]: Loading
  },
  data() {
    return {
      phoneNumber: 'wt_admin',
      password: '123',
      code: '',
      loginWay: 'password',
      passwordType: 'password',
      phoneNumberError: '',
      btnShow: false
    };
  },
  created: function() {
    this.getCode()
    // window.localStorage.setItem('token', '123')
    // window.localStorage.setItem('code', '123')
    // window.localStorage.setItem('SetUserData', 'token')
  },
  mounted() {
    // wx.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
    //   timestamp: '', // 必填，生成签名的时间戳
    //   nonceStr: '', // 必填，生成签名的随机串
    //   signature: '', // 必填，签名，见附录1
    //   jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // });
    // wx.ready(function() {
    //   wx.openEnterpriseChat({
    //     // 注意：userIds和externalUserIds至少选填一个，且userIds+externalUserIds总数不能超过2000。
    //     userIds: 'zhangshan;lisi;wangwu', // 参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
    //     externalUserIds: 'wmEAlECwAAHrbWYDOK5u3Bf13xlYDAAA;wmEAlECwAAHibWYDOK5u3Af13xlYDAAA', // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
    //     groupName: '讨论组', // 必填，会话名称。单聊时该参数传入空字符串""即可。
    //     success: function(res) {
    //     // 回调
    //     },
    //     fail: function(res) {
    //       if (res.errMsg.indexOf('function not exist') > -1) {
    //         alert('版本过低请升级')
    //       }
    //     }
    //   });
    // });
    // wx.error(function(res) {
    //   console.log(res);
    // });
  },
  methods: {
    getCode() {
      var code = this.getUrlParam('code')
      if (code == null || code === '') {
        // localStorage.setItem('token', 123)
        // this.$router.replace({ path: '/' })
        this.linkGetCode()
      } else {
        const token = localStorage.getItem('token')
        if (token) {
          // this.logout()
          this.$router.forward()
        } else {
          localStorage.setItem('code', code)
          this.handleLogin(code)
        }
      }
    },
    linkGetCode() {
      var local = window.location.href
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww1350e9d33db61819&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&agentid=1000013&state=state#wechat_redirect'
    },
    reLinkGetCode() {
      localStorage.removeItem('code');
      this.$router.replace('/login')
      this.linkGetCode()
    },
    getUrlParam(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let url = window.location.href.split('#')[0]
      let search = url.split('?')[1]
      if (search) {
        var r = search.substr(0).match(reg)
        if (r !== null) return unescape(r[2])
        return null
      } else {
        return null
      }
    },
    handleLogin(code) {
      login({
        code: code,
        // code: '123',
        state: '',
        agentId: '1000013'
      })
        .then(res => {
          if (res.data.success) {
            Toast.success('授权成功');
            localStorage.setItem('token', res.data.data.token)
            let loginUrl = localStorage.getItem('loginUrl')
            if (loginUrl) {
              localStorage.removeItem('loginUrl')
              this.$router.replace({ path: loginUrl })
              // window.location.reload = loginUrl
            } else {
              this.$router.replace({ path: '/' })
            }
          } else {
            Toast.fail(res.data.errorMsg);
            localStorage.removeItem('code');
            this.btnShow = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapActions({
      login: 'user/login'
    })
  }
};
</script>
<style lang="scss" scoped>
.login {
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
