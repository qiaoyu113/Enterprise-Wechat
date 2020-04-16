<template>
  <div class="DriverFollowDetail">
    <div v-if="params" class="list">
      <div class="list-item">
        <div class="list-top">
          <h2>{{ params.customerName }}/{{ params.lineName }}</h2>
          <p>{{ params.provinceAreaName | isNull }}{{ params.cityAreaName | isNull }}{{ params.countyAreaName | isNull }}{{ params.districtArea | isNull }}</p>
          <div class="list-tag">
            <template v-for="key in keyList">
              <template v-if="Array.isArray(params[key.name])">
                <van-tag v-for="(value,index) in params[key.name]" :key="index" :class="value.matched | setClass('-bg')">
                  {{ key.name==='warehouses' ? '[仓] ' : '' }}{{ key.name==='deliveryAreas' ? '[配] ' : '' }}{{ value.name }}
                </van-tag>
              </template>
            </template>
          </div>
          <van-tag v-if="params.lineSaleName" class="top-tag" type="warning">
            {{ params.lineSaleName }}
          </van-tag>
          <van-row class="tit" type="flex" justify="space-between">
            <van-col class="lt">
              匹配度
            </van-col>
            <van-col class="rt">
              {{ params.suitability }}%
            </van-col>
          </van-row>
          <van-row class="list-type" justify="space-between" type="flex">
            <template v-for="key in keyList">
              <template v-if="Array.isArray(params[key.name])">
                <van-col :key="key.name">
                  <h5>{{ key.key }}</h5>
                  <van-icon
                    :name="params[key.name].some(val => val.matched) | setType"
                    :class="params[key.name].some(val => val.matched) | setClass"
                  />
                </van-col>
              </template>
            </template>
          </van-row>
          <div class="list-note">
            我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试我是测试
          </div>
        </div>
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
      color="#2F7DCD"
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
    <van-dialog v-model="show" :title="dialogForm.name" :before-close="submitSave" show-cancel-button>
      <van-field
        v-model="saveForm.remark"
        required
        :error="error"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="20"
        placeholder="请输入备注"
        show-word-limit
      />
    </van-dialog>
  </div>
</template>

<script>
import { Icon, Button, Tag, Col, Row, Cell, ActionSheet, Dialog, Field } from 'vant';
import { matchingRecordDetails, submitSave } from 'api/driver'
export default {
  name: 'DriverFollowDetail',
  components: {
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
        matchRateId: '',
        remark: '',
        state: 0
      }
    }
  },
  computed: {
    error: {
      get() {
        return !this.saveForm.remark
      },
      set(newValue) {
        if (newValue) {
          return newValue
        }
        return !this.saveForm.remark
      }
    }
  },
  mounted() {
    this.params = this.$route.params;
    this.getDetail();
  },
  methods: {
    getDetail() {
      matchingRecordDetails({
        id: this.params.id
      })
        .then(({ data }) => {
          if (data.success) {
            this.list = data.data;
          } else {
            this.$toast.fail({
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
        debugger
        if (!this.saveForm.remark) {
          this.error = true;
          done(false)
          return;
        }
        submitSave(this.saveForm)
          .then(({ data }) => {
            if (data.success) {
              this.getDetail();
            } else {
              this.$toast.fail({
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

$success: #49CB15;
$danger: #EC5F50;

.DriverFollowDetail{
  padding-bottom: 46px;
  .van-button--primary{
    background-color: $success;
    border-color: $success;
  }
  background-color: #f5f5f5;
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
    // padding: 0 18px;
    .list-item{
      position: relative;
      margin-bottom: 10px;
      background-color: #fff;
      .list-top{
        padding: 12px 16px 0;
        color: #000;
        .list-note{
          padding: 8px 0;
          font-size: 12px;
          color: #B2B2B2;
          line-height: 18px;
          text-indent: 2em;
        }
        h2{
          margin: 0 0 4px 0;
          padding-right: 30px;
          font-size: 18px;
          line-height: 24px;
        }
        p{
          margin: 0;
          padding-bottom: 5px;
          font-size: 14px;
          line-height: 22px;
          border-bottom: 1px solid #EEEBEB;
        }
        .list-tag{
          padding: 8px 0;
          border-bottom: 1px solid #EEEBEB;
          .van-tag{
            margin-right: 8px;
            margin-bottom: 8px;
            padding: 0 12px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            border-radius: 10px;
          }
        }
        .top-tag{
          position: absolute;
          right: 0;
          top: 0;
        }
        .tit{
          height: 42px;
          line-height: 42px;
          border-bottom: 1px solid #EEEBEB;
          .lt{
            font-size: 18px;
            color: #000000;
          }
          .rt{
            font-size: 20px;
            color: #2F7DCD;
            font-weight: bold;
          }
        }
        .list-type{
          padding-bottom: 6px;
          text-align: center;
          h5{
            margin: 0;
            padding: 8px 0;
            font-size: 12px;
            color: #B2B2B2;
            line-height: 12px;
            font-weight: normal;
          }
          .van-icon{
            font-size: 20px;
          }
        }
      }
    }
    .list-speed{
      padding: 10px 0;
      border-top: 1px solid #EEEBEB;
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
    font-size: 18px;
    opacity: 1;
    border-radius: none;
    // background: #2F7DCD;
  }
}
</style>
