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
              <template v-if="Array.isArray(params[key.name]) && params[key.name].length > 0">
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
              <template v-if="Array.isArray(params[key.name]) && params[key.name].length > 0">
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
        <van-row v-for="(item, index) in list" :key="index" class="list-speed" type="flex" align="center">
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
      :color="list.some(item => item.state ==5 || item.state == 4) ? '#A6C5E5' : '#2F7DCD'"
      class="speed-btn"
      :disabled="list.some(item => item.state ==5 || item.state == 4)"
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
import { Icon, Button, Tag, Col, Row, Cell, ActionSheet, Dialog, Field, Toast } from 'vant';
import { matchingRecordDetails, submitSave } from 'api/driver'
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
      return (key ? 'success' : 'danger') + (bg || '')
    },
    setType(key) {
      return key ? 'checked' : 'warning'
    },
    isNull(val) {
      return val || ''
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
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true)
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
            })
          }
        }).catch((err) => {
          console.log(err)
        });
    },
    onSelect(item) {
      this.dialogForm = item;
      this.saveForm.remark = '';
      this.saveForm.state = item.id;
      this.saveForm.matchRateId = this.params.id;
      this.showAction = false;
      this.$nextTick(() => {
        this.show = true;
      })
    },
    submitSave(action, done) {
      if (action === 'confirm') {
        if (!this.saveForm.remark) {
          // this.error = true;
          Toast.fail({
            message: '请输入备注',
            duration: 1.5 * 1000
          })
          done(false)
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
              })
            }
            done(data.success)
          }).catch((err) => {
            console.log(err)
            done(false)
          })
      } else {
        done();
      }
    }
  }
}
</script>

<style lang="scss" scoped>

$success: #81CA2A;
$danger: #E75E60;

.DriverFollowDetail{
  padding-bottom: 46px;
  .van-button--primary{
    background-color: $success;
    border-color: $success;
  }
  background-color: #E8ECEE;
  box-sizing: border-box;
  // 公用
  .success{
    color: $success;
  }
  .danger {
    color: $danger;
  }
  .success-bg{
    background-color: $success;
  }
  .danger-bg {
    background-color: $danger;
  }
  // list
  .list{
    height: 100%;
  }
  .lineList {
    width: 100%;
    border-radius: 1.2rem;
    box-sizing: border-box;
    p{
      margin-block-start: 0;
      margin-block-end: 0;
    }
    .tag_margin{
      margin: 0 10px 10px 0;
      padding: 0 10px;
      height: 18px;
      line-height: 18px;
    }
    .lineListTop {
      background: #fff;
      box-sizing: border-box;
      border-radius: 10px 10px 0 0;
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
          color: #FFFFFF;
          border-radius: 5px;
        }
        .line-tit{
          font-size: 16px;
          color: #000;
          line-height: 24px;
        }
        .address {
          font-weight: 400;
          font-size: 14px;
          line-height:22px;
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
            line-height:1;
            color: #b2b2b2;
          }
          .bottom {
            padding-bottom: 6px;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            line-height: 1;
            font-size: 0;
            .van-icon{
              font-size: 20px
            }
          }
        }
      }
    }
  }
  .lineListBottom{
    border-top: 1px solid #EEEBEB;
    font-size: 14px;
    color: #9B9B9B;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    .van-cell{
      padding: 0 7px 0 19px;
      height: 40px;
      line-height: 40px;
      .van-icon{
        line-height: 40px
      }
    }
  }
  .list-note {
    padding: 0 17px;
    background: #fff;
    p{
      padding: 12px 0;
      font-size: 12px;
      color: rgba(0,0,0,0.40);
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
  .speed{
    margin-top: 30px;
    .speed-tit{
      padding-left: 16px;
      line-height: 24px;
      color: #B2B2B2;
    }
    .list-speed{
      padding: 10px 16px;
      border-top: 1px solid #EEEBEB;
      background-color: #fff;
      &:nth-last-of-type(1){
        border-bottom: 1px solid #EEEBEB;
      }
      .list-speed-lt{
        width: 74px;
        height: 20px;
        line-height: 20px;
        background: #4F77AA;
        border-radius: 10px;
        font-size: 12px;
        color: #FFF;
        text-align: center;
      }
      .list-speed-rt{
        margin-left: 15px;
        .list-speed-top{
          font-size: 16px;
          color: #000;
          line-height:24px;
        }
        .list-speed-time{
          font-size: 12px;
          color: #B2B2B2;
        }
      }
    }
  }
  .speed-btn{
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
.driver-dialog .van-dialog__content{
  padding: 0 10px;
}
.driver-dialog .van-field__label{
  width: auto;
  margin-right: 20px;
  flex: none;
}
</style>
