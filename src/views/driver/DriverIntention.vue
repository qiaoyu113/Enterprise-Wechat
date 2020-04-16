<template>
  <div class="driverIntention">
    <div class="car-size" @click="showPicker = true">
      <span class="size-font">车型</span>
      <div class="car-size-right">
        <span v-text="carTypeText === '' ? '请选择' : carTypeText"></span>
        <van-icon name="arrow" />
      </div>
    </div>
    <van-form @submit="btnSave">
      <van-cell-group title="货物类型">
      </van-cell-group>
      <van-field name="cargoType">
        <template #input>
          <div class="check-box">
            <van-checkbox-group v-model="cargoType">
              <van-checkbox v-for="item in dataCargoType" :key="item.codeVal" :name="item.codeVal" icon-size="22px" checked-color="#6085b7">
                {{ item.code }}
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </template>
      </van-field>
      <van-cell-group title="到仓区域">
      </van-cell-group>
      <van-field name="arrivalArea">
        <template #input>
          <div class="check-box">
            <van-checkbox-group v-model="arrivalArea">
              <van-checkbox v-for="item in areaArray" :key="item.code" :name="item.code" icon-size="22px" checked-color="#6085b7">
                {{ item.name }}
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </template>
      </van-field>
      <van-cell-group title="配送区域">
      </van-cell-group>
      <van-field name="deliveryArea">
        <template #input>
          <div class="check-box">
            <van-checkbox-group v-model="deliveryArea">
              <van-checkbox v-for="item in areaArray" :key="item.code" :name="item.code" icon-size="22px" checked-color="#6085b7">
                {{ item.name }}
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </template>
      </van-field>
      <van-cell-group title="装卸难度">
      </van-cell-group>
      <van-field name="handlingDifficultyDegree">
        <template #input>
          <div class="check-box">
            <van-checkbox-group v-model="handlingDifficultyDegree">
              <van-checkbox v-for=" item in dataHandlingDifficultyDegree" :key="item.codeVal" :name="item.codeVal" icon-size="22px" checked-color="#6085b7">
                {{ item.code }}
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </template>
      </van-field>
      <van-cell-group title="出车时段">
      </van-cell-group>
      <van-field name="departureTime">
        <template #input>
          <div class="check-box">
            <van-checkbox-group v-model="departureTime">
              <van-checkbox v-for="item in dataDepartureTime" :key="item.codeVal" :name="item.codeVal" icon-size="22px" checked-color="#6085b7">
                {{ item.code }}
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </template>
      </van-field>
      <van-button class="save-btn" type="primary" block color="#2F7DCD" native-type="submit">
        保存
      </van-button>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="carTypeArray"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import { Loading, Toast, Cell, CellGroup, Button, Picker, Popup, Icon, Checkbox, CheckboxGroup, Form, Field } from 'vant';
import { dictionary, getCityAreaByCode } from '@/api/common'
import { judgingIntentionOfReceiving, saveIntentionOfReceiving } from '@/api/driver'
export default {
  name: 'DriverIntention',
  components: {
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Form.name]: Form,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      driverId: '',
      cargoType: [],
      dataCargoType: [],
      arrivalArea: [],
      deliveryArea: [],
      areaArray: [],
      handlingDifficultyDegree: [],
      dataHandlingDifficultyDegree: [],
      departureTime: [],
      dataDepartureTime: [],
      carTypeText: '',
      showPicker: false,
      carTypeArray: [],
      dataTypeCar: [],
      flags: ''
    };
  },
  mounted() {
    this.getCityId();
  },
  methods: {
    // 字典方法
    async getDictionary(type, arrays) {
      await dictionary({
        dictType: type
      }).then(res => {
        let arr = res.data.data;
        this[arrays] = arr;
      }).catch(err => {
        Toast.fail(err.data.errorMsg);
      })
      return arrays
    },
    // 获取基本数据
    async getCityId() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      let that = this;
      let cityCode = localStorage.getItem('city');
      // 区域参数
      await getCityAreaByCode({
        cityCode: cityCode
      }).then(res => {
        let arr = res.data.data;
        that.areaArray = arr;
      }).catch(err => {
        Toast.fail(err.data.errorMsg);
      });
      await this.getDictionary('Intentional_compartment', 'dataTypeCar');
      await this.getDictionary('type_of_goods', 'dataCargoType');
      await this.getDictionary('handling_difficulty_degree', 'dataHandlingDifficultyDegree');
      await this.getDictionary('departure_time_interval', 'dataDepartureTime');
      this.getDriverId();
    },
    // 意向保存
    btnSave(values) {
      values.driverId = this.driverId;
      if (this.carTypeText === '') {
        Toast('请选择车型');
        return;
      }
      if (values.cargoType.length === 0) {
        Toast('请选择货物类型');
        return;
      }
      if (values.arrivalArea.length === 0) {
        Toast('请选择到仓区域');
        return;
      }
      if (values.deliveryArea.length === 0) {
        Toast('请选择配送区域');
        return;
      }
      if (values.handlingDifficultyDegree.length === 0) {
        Toast('请选择装卸难度');
        return;
      }
      if (values.departureTime.length === 0) {
        Toast('请选择出车时段');
        return;
      }
      // console.log('carType', this.carTypeText, this.dataTypeCar)
      this.dataTypeCar.forEach(ele => {
        if (ele.code === this.carTypeText) {
          values.carType = ele.codeVal;
        }
      })
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '提交中...'
      });
      saveIntentionOfReceiving(values).then(res => {
        if (res.data.data.flag) {
          Toast.clear();
          this.$router.back()
        }
      }).catch(err => {
        Toast.clear();
        Toast.fail(err.data.errorMsg);
      })
    },
    onConfirm(value) {
      this.carTypeText = value;
      this.showPicker = false;
    },
    judgingDriver() {
      let that = this
      judgingIntentionOfReceiving({
        driverId: this.driverId
      }).then(res => {
        that.flags = res.data.data;
        let carType = res.data.data.carType
        let cargoType = res.data.data.cargoType
        let arrivalArea = res.data.data.arrivalArea
        let deliveryArea = res.data.data.deliveryArea
        let handlingDifficultyDegree = res.data.data.handlingDifficultyDegree
        let departureTime = res.data.data.departureTime
        Toast.clear();
        if (res.data.data.flag) {
          that.carTypeText = carType
          that.dataCargoType.forEach(ele => {
            cargoType.forEach(item => {
              if (ele.code === item) {
                that.cargoType.push(ele.codeVal)
              }
            })
          })
          that.areaArray.forEach(ele => {
            arrivalArea.forEach(item => {
              if (ele.name === item) {
                that.arrivalArea.push(ele.code)
              }
            })
            deliveryArea.forEach(item => {
              if (ele.name === item) {
                that.deliveryArea.push(ele.code)
              }
            })
          })
          that.dataHandlingDifficultyDegree.forEach(ele => {
            handlingDifficultyDegree.forEach(item => {
              if (ele.code === item) {
                that.handlingDifficultyDegree.push(ele.codeVal)
              }
            })
          })
          that.dataDepartureTime.forEach(ele => {
            departureTime.forEach(item => {
              if (ele.code === item) {
                that.departureTime.push(ele.codeVal)
              }
            })
          })
        }
      }).catch(err => {
        Toast.fail(err.data.errorMsg);
      })
    },
    getDriverId() {
      this.driverId = this.$route.query.driverId;
      this.judgingDriver()
    }
  }
};
</script>
<style lang="scss">
.driverIntention {
    min-height: 100vh;
    padding-bottom: 1.1rem;
    box-sizing: border-box;
    .van-cell:not(:last-child)::after{
      border: none!important;
    }
    .van-cell-group__title{
        background-color: #F5F5F5;
        font-size: 14px;
        color: #B2B2B2;
        line-height: 12px;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        padding: .4rem 0 .3rem .4rem;
        box-sizing: border-box;
    }
    .car-size{
        padding:0 .4rem;
        height: 1.1rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .size-font{
            font-size: 17px;
            color: #000000;
            line-height: 24px;
        }
        .car-size-right{
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #9B9B9B;
            text-align: right;
            line-height: 22px;
            span{
                margin-right: 8px;
            }
        }
    }
  .check-box{
      width: 100%;
      .van-checkbox{
          padding: 12px 0;
          border-bottom: 1px solid #d9d9d9;
          .van-checkbox__label{
              font-size: 17px;
              color: #000000;
              line-height: 24px;
              margin-left: 10px;
          }
      }
      .van-checkbox-group .van-checkbox:last-child{
          border: none!important;
      }
  }
  .save-btn{
      position: fixed;
      bottom: 0;
      left: 0;
      font-size: 18px;
      color: #FFFFFF;
      text-align: center;
      line-height: 24px;
      height: 1.1rem;
  }
}
</style>
