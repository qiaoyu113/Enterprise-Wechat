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
    /*
      微信授权方法
    */
    this.getCode()
    /*
    d2环境或微信授权不通时
    */
    window.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlIjoibTEiLCJ1c2VySWQiOiIxMyIsInVzZXJuYW1lIjoid3RfYWRtaW4iLCJ0eXBlIjoiMyIsImJ1c2lQZXJtaXNzaW9uIjoiMCIsImV4cCI6MTU4OTY3OTIwM30.yIIAHjJtxlwftfGga2L6KMtsZ_vthAOq7mXHaJraAcI')
    window.localStorage.setItem('code', '1234')
    window.localStorage.setItem('SetUserData', 'token')
  },
  mounted() {},
  methods: {
    getCode() {
      var code = this.getUrlParam('code')
      if (code == null || code === '') {
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
      console.log('tag', '')
    },
    linkGetCode() {
      var local = window.location.href
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww1350e9d33db61819&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&agentid=' + this.GLOBAL.agentId + '&state=state#wechat_redirect'
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
    getDeveloper(name) {
      if (name === 'qiaoyu' || name === 'zhaowei' || name === 'liweishan') {
        localStorage.setItem('developer', name)
      } else {
        localStorage.setItem('developer', 'qiaoyu')
      }
    },
    handleLogin(code) {
      login({
        code: code,
        state: '',
        agentId: this.GLOBAL.agentId
      })
        .then(res => {
          if (res.data.success) {
            // Toast.success('授权成功');
            localStorage.setItem('token', res.data.data.token)
            let city = res.data.data.city;
            if (city && city !== '') {
              localStorage.setItem('city', city)
            } else {
              localStorage.setItem('city', '110100')
            }
            this.getDeveloper(res.data.data.bssLoginName)
            let loginUrl = localStorage.getItem('loginUrl')
            if (loginUrl) {
              localStorage.removeItem('loginUrl')
              this.$router.replace({ path: loginUrl })
              // window.location.reload = loginUrl
            } else {
              this.$router.replace({ path: '/' })
            }
          } else {
            this.GLOBAL.buryPointFunction('err_login', '授权失败', {
              value: '请求错误'
            })
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
