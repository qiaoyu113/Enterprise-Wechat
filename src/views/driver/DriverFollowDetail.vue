<template>
  <div class="DriverFollowDetail">
    <div v-if="params" class="lineList">
      <div class="lineListTop">
        <div class="name">
          <van-tag v-if="params.lineSaleName" class="top-tag" type="warning">
            {{ params.lineSaleName }}
          </van-tag>
          <p class="line-tit">
            {{ params.lineName }} / {{ params.customerName }}
          </p>
          <p class="address">
            {{ params.warehouse }}
          </p>
          <div class="tagBox">
            <template v-for="key in keyList">
              <template
                v-if="
                  Array.isArray(params[key.name]) && params[key.name].length > 0
                "
              >
                <van-tag
                  v-for="(value, index) in params[key.name]"
                  :key="index"
                  round
                  size="medium"
                  :class="value.matched | setClass('-bg tag_margin')"
                >
                  {{ key.name === 'warehouses' ? '[仓] ' : ''
                  }}{{ key.name === 'deliveryAreas' ? '[配] ' : ''
                  }}{{ value.name }}
                </van-tag>
              </template>
            </template>
          </div>
          <div class="matchRate">
            匹配度 <span>{{ params.suitability }}%</span>
          </div>
          <div class="needCarBox">
            <template v-for="key in keyList">
              <template
                v-if="
                  Array.isArray(params[key.name]) && params[key.name].length > 0
                "
              >
                <div :key="key.name" class="needCarList">
                  <div class="top">
                    {{ key.key }}
                  </div>
                  <div class="bottom">
                    <van-icon
                      :name="
                        params[key.name].some((val) => val.matched) | setType
                      "
                      :class="
                        params[key.name].some((val) => val.matched) | setClass
                      "
                      size="20"
                    />
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div v-if="params.remark" class="list-note">
        <p>{{ params.remark }}</p>
      </div>
    </div>
    <div v-if="list.length > 0" class="speed">
      <div class="speed-tit">
        跟进记录
      </div>
      <div class="list-ct">
        <van-row
          v-for="(item, index) in list"
          :key="index"
          class="list-speed"
          type="flex"
          align="center"
        >
          <van-col class="list-speed-lt">
            {{ item.stateName }}
          </van-col>
          <van-col class="list-speed-rt">
            <div class="list-speed-top">
              {{ item.remark }}
            </div>
            <div class="list-speed-time">
              {{ item.createDate }}
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-button
      :color="
        list.some((item) => item.state == 5 || item.state == 4)
          ? '#A6C5E5'
          : '#2F7DCD'
      "
      class="speed-btn"
      :disabled="list.some((item) => item.state == 5 || item.state == 4)"
      @click="showAction = true"
    >
      撮合跟进
    </van-button>
    <van-action-sheet
      v-model="showAction"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    />
    <van-dialog
      v-model="show"
      class-name="driver-dialog"
      :title="dialogForm.name"
      :before-close="submitSave"
      show-cancel-button
    >
      <van-field
        v-model="saveForm.remark"
        required
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="100"
        placeholder="请输入备注"
        show-word-limit
      />
    </van-dialog>
  </div>
</template>

<script>
import {
  Icon,
  Button,
  Tag,
  Col,
  Row,
  Cell,
  ActionSheet,
  Dialog,
  Field,
  Toast
} from 'vant';
import { matchingRecordDetails, submitSave } from 'api/driver';
import { getMediaIdOfLineDetail } from '@/api/line';
import { getCorpSignature, getAgentSignature } from '@/api/user';
const wx = window.wx;
export default {
  name: 'DriverFollowDetail',
  components: {
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [Dialog.Component.name]: Dialog.Component
  },
  filters: {
    setClass(key, bg) {
      return (key ? 'success' : 'danger') + (bg || '');
    },
    setType(key) {
      return key ? 'checked' : 'warning';
    },
    isNull(val) {
      return val || '';
    }
  },
  data() {
    return {
      params: null,
      keyList: [
        {
          name: 'driverCarType',
          key: '所需车型'
        },
        {
          name: 'cargoTypes',
          key: '货物类型'
        },
        {
          name: 'warehouses',
          key: '到仓区域'
        },
        {
          name: 'deliveryAreas',
          key: '配送区域'
        },
        {
          name: 'handlingDifficultyDegrees',
          key: '装卸难度'
        },
        {
          name: 'runningDurations',
          key: '出车时段'
        }
      ],
      list: [], // 跟进记录
      show: false,
      showAction: false,
      clickNum: 1,
      actions: [
        { name: '推送线路信息', id: 1 },
        { name: '确认司机看活', id: 2 },
        { name: '确认司机试跑', id: 3 },
        { name: '确认司机上岗', id: 4 },
        { name: '此次撮合失败', id: 5 }
      ],
      // error: false,
      // 提交保存
      dialogForm: {},
      saveForm: {
        // matchRateId: '',
        remark: '',
        state: 0
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true);
    next(true);
  },
  mounted() {
    this.params = this.$route.params;
    this.saveForm.driverId = this.params.driverId;
    this.saveForm.lineId = this.params.lineId;
    this.getDetail();
  },
  methods: {
    getDetail() {
      matchingRecordDetails({
        driverId: this.params.driverId,
        lineId: this.params.lineId
      })
        .then(({ data }) => {
          if (data.success) {
            this.list = data.data;
          } else {
            Toast.fail({
              message: data.errorMsg || '网络错误，请稍后再试',
              duration: 1.5 * 1000
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSelect(item) {
      this.dialogForm = item;
      this.saveForm.remark = '';
      this.saveForm.state = item.id;
      this.saveForm.matchRateId = this.params.id;
      this.showAction = false;
      if (item.id === 1) {
        this.clickNum = this.clickNu + 1
        this.pushSendLink();
      } else {
        this.$nextTick(() => {
          this.show = true;
        });
      }
    },
    submitSave(action, done) {
      if (action === 'confirm') {
        if (!this.saveForm.remark) {
          // this.error = true;
          Toast.fail({
            message: '请输入备注',
            duration: 1.5 * 1000
          });
          done(false);
          return;
        }
        submitSave(this.saveForm)
          .then(({ data }) => {
            if (data.success) {
              this.getDetail();
            } else {
              Toast.fail({
                message: data.errorMsg || '网络错误，请稍后再试',
                duration: 1.5 * 1000
              });
            }
            done(data.success);
          })
          .catch((err) => {
            console.log(err);
            done(false);
          });
      } else {
        done();
      }
    },
    pushSendLink() {
      Toast.loading({
        message: '正在生产二维码...',
        forbidClick: true
      });
      const hostName = window.location.href;
      let that = this;
      that.disable = true;
      getMediaIdOfLineDetail({
        lineId: that.params.lineId,
        busiType: that.params.busiType
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
                        const agentData = res.data.data;
                        wx.agentConfig({
                          corpid: agentData.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                          agentid: agentData.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                          timestamp: '' + agentData.timestamp, // 必填，生成签名的时间戳
                          nonceStr: agentData.nonceStr, // 必填，生成签名的随机串
                          signature: agentData.signature, // 必填，签名，见附录1
                          jsApiList: [
                            'sendChatMessage',
                            'getCurExternalContact'
                          ], // 必填
                          success: function(res) {
                            that.GLOBAL.buryPointFunction(
                              'send_line',
                              '发送线路',
                              {
                                value: '发送线路'
                              }
                            );
                            wx.invoke(
                              'sendChatMessage',
                              {
                                msgtype: 'image', // 消息类型，必填
                                image: {
                                  mediaid: mediaidNew // 图片的素材id
                                }
                              },
                              function(res) {
                                Toast.clear();
                                if (
                                  res.err_msg ===
                                  'sendChatMessage:permission denied'
                                ) {
                                  Toast.fail('暂无功能权限');
                                }
                                that.saveForm.remark = '线路推送至司机';
                                submitSave(that.saveForm)
                                  .then(({ data }) => {
                                    if (data.success) {
                                      this.getDetail();
                                    } else {
                                      Toast.fail({
                                        message: data.errorMsg || '网络错误，请稍后再试',
                                        duration: 1.5 * 1000
                                      });
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }
                            );
                            if (that.clickNum < 3) {
                              var u = navigator.userAgent;
                              if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
                                setTimeout(() => {
                                  wx.invoke(
                                    'sendChatMessage',
                                    {
                                      msgtype: 'image', // 消息类型，必填
                                      image: {
                                        mediaid: mediaidNew // 图片的素材id
                                      }
                                    },
                                    function(res) {
                                      Toast.clear();
                                      if (
                                        res.err_msg ===
                                  'sendChatMessage:permission denied'
                                      ) {
                                        Toast.fail('暂无功能权限');
                                      }
                                      that.saveForm.remark = '线路推送至司机';
                                      submitSave(that.saveForm)
                                        .then(({ data }) => {
                                          if (data.success) {
                                            this.getDetail();
                                          } else {
                                            Toast.fail({
                                              message: data.errorMsg || '网络错误，请稍后再试',
                                              duration: 1.5 * 1000
                                            });
                                          }
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                    }
                                  );
                                }, 100)
                              }
                            }
                          },
                          fail: function(res) {
                            console.log('err', res);
                            if (res.errMsg.indexOf('is not a function') > -1) {
                              alert(
                                '<i class="weui-icon-warn">版本过低请升级</i>'
                              );
                            }
                          }
                        });
                      }
                      that.disable = false;
                      Toast.clear();
                    });
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
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$success: #81ca2a;
$danger: #e75e60;

.DriverFollowDetail {
  padding-bottom: 46px;
  .van-button--primary {
    background-color: $success;
    border-color: $success;
  }
  background-color: #e8ecee;
  box-sizing: border-box;
  // 公用
  .success {
    color: $success;
  }
  .danger {
    color: $danger;
  }
  .success-bg {
    background-color: $success;
  }
  .danger-bg {
    background-color: $danger;
  }
  // list
  .list {
    height: 100%;
  }
  .lineList {
    width: 100%;
    border-radius: 1.2rem;
    box-sizing: border-box;
    p {
      margin-block-start: 0;
      margin-block-end: 0;
    }
    .tag_margin {
      margin: 0 10px 10px 0;
      padding: 0 10px;
      height: 18px;
      line-height: 18px;
    }
    .lineListTop {
      background: #fff;
      box-sizing: border-box;
      // border-radius: 10px 10px 0 0;
      .info {
        color: #333;
        font-size: 14px;
        padding: 0 0.42667rem 0.26rem;
        box-sizing: border-box;
      }
      .name {
        position: relative;
        width: 100%;
        font-weight: 500;
        padding: 18px 17px 0;
        box-sizing: border-box;
        font-size: 17px;
        color: #000000;
        .top-tag {
          position: absolute;
          right: 0;
          top: 0;
          height: 20px;
          line-height: 20px;
          font-size: 13px;
          color: #ffffff;
          border-radius: 5px;
        }
        .line-tit {
          font-size: 16px;
          color: #000;
          line-height: 24px;
        }
        .address {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #000000;
          padding: 4px 0;
          box-sizing: border-box;
          border-bottom: 1px solid #eeebeb;
        }
      }
      .tagBox {
        width: 100%;
        padding-top: 10px;
        box-sizing: border-box;
        font-size: 0;
        border-bottom: 1px solid #eeebeb;
      }
      .matchRate {
        width: 100%;
        padding: 0.26rem 0;
        box-sizing: border-box;
        font-size: 16px;
        color: #000000;
        font-weight: 400;
        border-bottom: 1px solid #eeebeb;
        span {
          font-size: 20px;
          color: #2f7dcd;
          font-weight: bold;
          float: right;
        }
      }
      .needCarBox {
        width: 100%;
        display: flex;
        .needCarList {
          flex: 1;
          padding-top: 10px;
          box-sizing: border-box;
          .top {
            margin-bottom: 8px;
            width: 100%;
            text-align: center;
            font-size: 11px;
            line-height: 1;
            color: #b2b2b2;
          }
          .bottom {
            padding-bottom: 6px;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            line-height: 1;
            font-size: 0;
            .van-icon {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
  .lineListBottom {
    border-top: 1px solid #eeebeb;
    font-size: 14px;
    color: #9b9b9b;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    .van-cell {
      padding: 0 7px 0 19px;
      height: 40px;
      line-height: 40px;
      .van-icon {
        line-height: 40px;
      }
    }
  }
  .list-note {
    padding: 0 17px;
    background: #fff;
    p {
      padding: 12px 0;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
      line-height: 18px;
      text-indent: 2em;
      border-top: 1px solid #eeebeb;
    }
  }
  .list-speed {
    padding: 0.2rem 0.42667rem;
    border-top: 1px solid #eeebeb;
    background-color: #fff;
    .list-speed-lt {
      width: 74px;
      height: 20px;
      line-height: 20px;
      background: #4f77aa;
      border-radius: 10px;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
    .list-speed-rt {
      margin-left: 15px;
      .list-speed-top {
        font-size: 16px;
        color: #000;
        line-height: 24px;
      }
      .list-speed-time {
        font-size: 12px;
        color: #b2b2b2;
      }
    }
  }
  .speed {
    margin-top: 30px;
    .speed-tit {
      padding-left: 16px;
      line-height: 24px;
      color: #b2b2b2;
    }
    .list-speed {
      padding: 10px 16px;
      border-top: 1px solid #eeebeb;
      background-color: #fff;
      &:nth-last-of-type(1) {
        border-bottom: 1px solid #eeebeb;
      }
      .list-speed-lt {
        width: 74px;
        height: 20px;
        line-height: 20px;
        background: #4f77aa;
        border-radius: 10px;
        font-size: 12px;
        color: #fff;
        text-align: center;
      }
      .list-speed-rt {
        margin-left: 15px;
        flex: 1;
        .list-speed-top {
          font-size: 16px;
          color: #000;
          line-height: 24px;
        }
        .list-speed-time {
          font-size: 12px;
          color: #b2b2b2;
        }
      }
    }
  }
  .speed-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 46px;
    line-height: 46px;
    color: #fff;
    font-size: 16px;
    opacity: 1;
    border-radius: 0;
    // background: #2F7DCD;
  }
}
</style>
<style lang="scss">
.driver-dialog .van-dialog__content {
  padding: 0 10px;
}
.driver-dialog .van-field__label {
  width: auto;
  margin-right: 20px;
  flex: none;
}
</style>
