<template>
  <div>
    <div class="header">
      <div class="logo">
        <img src="http://img.cixi518.com/ljh_logo.jpeg" alt="default_logo">
      </div>
    </div>
    <div class="content">
      <van-field
        v-model="phoneNumber"
        placeholder="手机号码"
        left-icon="phone-o"
        :error-message="phoneNumberError"
      />
      <!-- eye -->
      <van-field
        v-if="loginWay==='password'"
        v-model="password"
        placeholder="登录密码"
        left-icon="lock"
        :type="passwordType"
      >
        <van-icon slot="right-icon" :name="passwordIcon" @click="switchPasswordType" />
      </van-field>
      <van-field v-else v-model="password" placeholder="短信验证码" left-icon="comment-o" type="text">
        <VerifyCodeBtn slot="button" @sendVerifyCode="sendVerifyCode" />
      </van-field>
      <div class="button-wrap">
        <van-button size="large" type="info" @click="handleLogin">
          登录
        </van-button>
      </div>
      <div class="more-wrap">
        <router-link class="link" to="/register">
          没有账号？去注册
        </router-link>
        <div class="switch-way" @click="switchLoginWay">
          {{ loginWayObj.toggleMsg }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user';
import { Field, Icon, Button, Toast } from 'vant';
import wx from 'weixin-js-sdk';
// import { mapActions } from 'vuex'
import VerifyCodeBtn from '@/components/VerifyCodeBtn';
export default {
  name: 'Login',
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    VerifyCodeBtn
  },
  data() {
    return {
      phoneNumber: 'wt_admin',
      password: '123',
      code: '',
      loginWay: 'password',
      passwordType: 'password',
      phoneNumberError: ''
    };
  },
  computed: {
    loginWayObj: function() {
      if (this.loginWay === 'password') {
        return {
          icon: 'closed-eye',
          toggleMsg: '验证码登录'
        };
      }
      return {
        icon: 'eye',
        toggleMsg: '密码登录'
      };
    },
    passwordIcon: function() {
      return this.passwordType === 'password' ? 'closed-eye' : 'eye';
    }
  },
  mounted() {
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
      timestamp: '', // 必填，生成签名的时间戳
      nonceStr: '', // 必填，生成签名的随机串
      signature: '', // 必填，签名，见附录1
      jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function() {
      wx.openEnterpriseChat({
        // 注意：userIds和externalUserIds至少选填一个，且userIds+externalUserIds总数不能超过2000。
        userIds: 'zhangshan;lisi;wangwu', // 参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        externalUserIds: 'wmEAlECwAAHrbWYDOK5u3Bf13xlYDAAA;wmEAlECwAAHibWYDOK5u3Af13xlYDAAA', // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
        groupName: '讨论组', // 必填，会话名称。单聊时该参数传入空字符串""即可。
        success: function(res) {
        // 回调
        },
        fail: function(res) {
          if (res.errMsg.indexOf('function not exist') > -1) {
            alert('版本过低请升级')
          }
        }
      });
    });
    wx.error(function(res) {
      console.log(res);
    });
  },
  methods: {
    sendVerifyCode() {
      this.phoneNumberError = '';
      if (!this.phoneNumber) {
        // 根据需求做判断
        this.phoneNumberError = '手机号码必填';
      }
    },
    switchPasswordType() {
      this.passwordType =
        this.passwordType === 'password' ? 'text' : 'password';
    },
    switchLoginWay() {
      this.password = this.code = '';
      this.loginWay = this.loginWay === 'password' ? 'verifyCode' : 'password';
    },
    handleLogin() {
      console.log(window.location.host);
      login({
        username: this.phoneNumber,
        password: this.password
      })
        .then(res => {
          console.log(res.data.data.flag);
          if (res.data.data.flag) {
            Toast.fail('成功');
          } else {
            Toast.fail(res.data.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    // ...mapActions({
    //   login: 'user/login'
    // })
  }
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
.content {
  width: 100%;
  height: auto;
  padding: 0 15px;
  box-sizing: border-box;
  .button-wrap {
    width: 100%;
    height: auto;
    margin-top: 15px;
  }
}
.more-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 14px;
  a.link {
    color: #1989fa;
  }
  .switch-way {
    color: #333;
  }
}
</style>
