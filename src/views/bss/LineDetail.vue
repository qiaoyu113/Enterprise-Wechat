<template>
  <div class="line-detail">
    <div class="detail-top">
      线路状态：{{ details.selfStateName }}（{{ details.stateName }}）
    </div>
    <div class="detail-content">
      <van-row type="flex" class="detail-row">
        <van-col>线路编号：</van-col>
        <van-col>{{ details.lineId }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>货主名称：</van-col>
        <van-col>{{ details.customerName }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>线路名称：</van-col>
        <van-col>{{ details.lineName }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>仓库位置：</van-col>
        <van-col>{{ details.warehouse }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>配送区域：</van-col>
        <van-col>{{ details.cityTextVal }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>配送公里：</van-col>
        <van-col>{{ details.distance }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>车型：</van-col>
        <van-col>{{ details.carTypeName }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>用车数量：</van-col>
        <van-col>{{ details.deployNum }}</van-col>
        <van-col>已上车数量：</van-col>
        <van-col>{{ details.publishedBidsNum || 0 }}</van-col>
      </van-row>
      <!-- 分割线 -->
      <div class="detail-divider"></div>
      <van-row type="flex" class="detail-row">
        <van-col>每日平均配送点位数：</van-col>
        <van-col>{{ details.deliveryNum }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>货物类型：</van-col>
        <van-col>{{ details.cargoType }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>货物总重量（吨）：</van-col>
        <van-col>{{ details.handlingDifficultyDegreeName }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>是否搬运：</van-col>
        <van-col>{{ details.carry | yesOrNo }}</van-col>
      </van-row>
      <template v-if="details.carry === '1'">
        <van-row type="flex" class="detail-row">
          <van-col>装卸难度：</van-col>
          <van-col>{{ details.handlingDifficultyDegree }}</van-col>
        </van-row>
        <van-row type="flex" class="detail-row">
          <van-col>预计每日货物总体积（立方米）：</van-col>
          <van-col>{{ details.volume }}</van-col>
        </van-row>
      </template>

      <van-row type="flex" class="detail-row">
        <van-col>月出车天数：</van-col>
        <van-col>{{ details.month }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>每日出车趟数：</van-col>
        <van-col>{{ details.dayNum }}</van-col>
      </van-row>
      <van-row
        v-for="(item, index) in details.lineDeliveryInfoFORMS"
        :key="index"
        type="flex"
        class="detail-row"
      >
        <van-col>到仓时间：</van-col>
        <van-col>{{ item.workingTimeStart }}</van-col>

        <van-col>结束时间：</van-col>
        <van-col>{{ item.workingTimeEnd }}</van-col>
      </van-row>
      <div class="detail-divider"></div>
      <van-row type="flex" class="detail-row">
        <van-col>收入结算方式：</van-col>
        <van-col>{{ details.incomeSettlementMethodName }}</van-col>
      </van-row>
      <template v-if="details.incomeSettlementMethod === 1">
        <van-row type="flex" class="detail-row">
          <van-col>单趟运费：</van-col>
          <van-col>{{ details.preLowestQuotations }}</van-col>
        </van-row>
      </template>
      <template v-if="details.incomeSettlementMethod === 2">
        <van-row type="flex" class="detail-row">
          <van-col>每趟保底(元)：</van-col>
          <van-col>{{ details.everyTripGuaranteed }}</van-col>
        </van-row>
        <van-row type="flex" class="detail-row">
          <van-col>每趟保底(元)：</van-col>
          <van-col>{{ details.everyUnitPrice }}</van-col>
        </van-row>
        <van-row type="flex" class="detail-row">
          <van-col>预计货主月报价(元)：</van-col>
          <van-col>{{ details.preLowestQuotations }}</van-col>
        </van-row>
      </template>
      <van-row type="flex" class="detail-row">
        <van-col>是否返仓：</van-col>
        <van-col>{{ details.returnWarehouse | yesOrNo }}</van-col>

        <van-col>是否回单：</van-col>
        <van-col>{{ details.returnBill | yesOrNo }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>线路有效期（天）：</van-col>
        <van-col>{{ details.waitDirveValidityDuration }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>线路类型：</van-col>
        <van-col>{{ details.lineTypeName }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>线路稳定性：</van-col>
        <van-col>{{ details.stabilityRateName }}</van-col>
      </van-row>
      <van-row
        v-if="details.stabilityRate == '4' || details.stabilityRate == '3'"
        type="flex"
        class="detail-row"
      >
        <van-col>配送时间：</van-col>
        <van-col>{{ deliveryName }}</van-col>
      </van-row>
      <van-row type="flex" class="detail-row">
        <van-col>创建时间：</van-col>
        <van-col>{{ details.createDate }}</van-col>
      </van-row>
    </div>
    <div class="hr-46"></div>
    <van-row
      type="flex"
      class="detail-footer"
      justify="center"
      align="center"
    >
      <van-col
        @click="goCopy"
      >
        复制
      </van-col>
      <van-col
        v-if="(details.selfState === 1 || details.selfState === 2) && (details.stateName === '待审核' || details.stateName === '审核未通过')"
        @click="goEdit"
      >
        编辑
      </van-col>
      <van-col
        v-if="isAudit"
        @click="showPicker = true"
      >
        审核
      </van-col>
    </van-row>
    <van-overlay :show="loading" z-index="99">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" vertical>
          数据加载中...
        </van-loading>
      </div>
    </van-overlay>
    <!-- 审核 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="data"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-dialog
      v-model="dialog"
      class-name="driver-dialog"
      title="备注"
      show-cancel-button
      :before-close="setReason"
    >
      <van-field
        v-model="reason"
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
import { Col, Row, Loading, Toast, Overlay, Picker, Popup, Dialog, Field } from 'vant';
import { getLineDetail, NopassTender, passTender } from '@/api/carline';
import { getUserInfo } from '@/api/common'
export default {
  name: 'LineDetail',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  filters: {
    yesOrNo(value) {
      return value === '1' ? '是' : '否'
    }
  },
  data() {
    return {
      lineId: '',
      loading: false,
      dateList: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      deliveryName: '',
      details: {},
      userInfo: {},
      // 审核功能
      showPicker: false,
      data: [
        { text: '审核通过', value: '1' },
        { text: '拒绝通过', value: '2' }
      ],
      // dialog
      dialog: false,
      reason: ''
    }
  },
  computed: {
    isAudit() {
      const { stateName } = this.details;
      const roleNames = this.userInfo.roleNames;
      return stateName === '待审核' && roleNames && roleNames.includes('wutongwaixianbgl');

      // return stateName === '待审核'
    }
  },
  async mounted() {
    this.lineId = this.$route.query.id;
    const { data: { data }} = await getUserInfo();
    this.userInfo = data;
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loading = true;
      getLineDetail({
        lineId: this.lineId
      }).then((res) => {
        const data = res.data.data;
        if (res.data.success) {
          this.details = data;
          this.details.cityTextVal = String(data.provinceAreaName) + String(data.cityAreaName) + String(data.countyAreaName) + String(data.districtArea);
          if (data.deliveryWeekCycle) {
            this.deliveryName = this.dateList.filter((item, index) => {
              return data.deliveryWeekCycle.includes(String(index + 1))
            }).join(',');
          }
        } else {
          Toast.fail(data.errorMsg)
        }
      }).catch(({ message }) => {
        Toast.fail(message);
      }).finally(() => {
        this.loading = false;
      })
    },
    setReason(action, done) {
      if (action === 'confirm') {
        this.noPassBtn();
      } else {
        this.reason = '';
      }
      done();
    },
    onConfirm({ value }) {
      if (value === '1') {
        // 通过审核
        this.passBtn();
      } else if (value === '2') {
        // 拒绝通过
        this.dialog = true;
      }
      this.showPicker = false;
    },
    passBtn() {
      let { lineId } = this.details;
      this.loading = true;
      passTender({
        lineId,
        'reason': ''
      }).then(res => {
        if (res.data.success) {
          Toast.success('审核已通过')
          setTimeout(() => {
            this.$router.push('/bss/lineList')
          }, 500)
        } else {
          Toast.fail(res.data.errorMsg);
        }
      }).catch(({ message }) => {
        Toast.fail(message);
      }).finally(() => {
        this.loading = false;
      })
    },
    noPassBtn() {
      if (this.reason === '') {
        Toast.fail('请输入拒绝理由')
        return
      }
      const { lineId } = this.details;
      const reason = this.reason;
      NopassTender({
        lineId,
        reason
      }).then(res => {
        if (res.data.success) {
          Toast.success('审核已拒绝')
          setTimeout(() => {
            this.$router.push('/bss/lineList')
          }, 500)
        } else {
          Toast.fail(res.data.errorMsg);
        }
      }).catch(({ message }) => {
        Toast.fail(message);
      }).finally(() => {
        this.loading = false;
      })
    },
    goCopy() {
      const id = this.details.lineId;
      // 进入复制页面
      this.$router.push({ name: 'BssCopyLine', query: { id: id, iscopy: '1' }})
    },
    goEdit() {
      const id = this.details.lineId;
      // 进入编辑页面
      this.$router.push({ name: 'BssEditLine', query: { id: id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.line-detail{
  .detail-top{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 25px;
    line-height: 25px;
    background: #77D2ED;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }
  .detail-content{
    margin-top: 25px;
    padding: 8px 12px 20px;
  }
  .detail-divider{
    border-bottom: 2px solid #EEF0F2;
  }
  .detail-row{
    padding: 0 12px;
    line-height: 35px;
    font-size: 13px;
    color: #595F66;
    .van-col {
      &:nth-of-type(2){
        flex: 1;
      }
    }
  }
  .hr-46{
    height: 46px;
  }
  .detail-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 46px;
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
    background-image: linear-gradient(270deg, #5C9BDD 0%, #80D8F3 100%);
    .van-col{
      position: relative;
      flex: 1;
      text-align: center;
      &:nth-of-type(n+2){
        // flex: 1;
        &::before{
          content:"";
          position: absolute;
          left: 0;
          top: 50%;
          height: 30px;
          margin-top: -15px;
          border-right: 2px solid #FFFFFF;
        }
      }
    }
  }
  .driver-dialog .van-dialog__content {
    padding: 0 10px;
  }
  .driver-dialog .van-field__label {
    width: auto;
    margin-right: 20px;
    flex: none;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
