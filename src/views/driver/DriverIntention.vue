<template>
  <div class="driverIntention">
    <div class="car-size">
      <span class="size-font">车型</span>
      <div class="car-size-right" @click="showSheet">
        <span v-text="carType"></span>
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
              <van-checkbox name="a" icon-size="20px" checked-color="#6085b7">
                方便食品
              </van-checkbox>
              <van-checkbox name="b" icon-size="20px" checked-color="#6085b7">
                食品
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
              <van-checkbox name="a" icon-size="20px" checked-color="#6085b7">
                朝阳
              </van-checkbox>
              <van-checkbox name="b" icon-size="20px" checked-color="#6085b7">
                海淀
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
              <van-checkbox name="a" icon-size="20px" checked-color="#6085b7">
                朝阳
              </van-checkbox>
              <van-checkbox name="b" icon-size="20px" checked-color="#6085b7">
                海淀
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
              <van-checkbox name="a" icon-size="20px" checked-color="#6085b7">
                无装卸
              </van-checkbox>
              <van-checkbox name="b" icon-size="20px" checked-color="#6085b7">
                装卸1-3吨
              </van-checkbox>
              <van-checkbox name="c" icon-size="20px" checked-color="#6085b7">
                装卸3吨以上
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
              <van-checkbox name="a" icon-size="20px" checked-color="#6085b7">
                00:00 - 03:00
              </van-checkbox>
              <van-checkbox name="b" icon-size="20px" checked-color="#6085b7">
                03:00 - 06:00
              </van-checkbox>
              <van-checkbox name="c" icon-size="20px" checked-color="#6085b7">
                06:00 - 09:00
              </van-checkbox>
              <van-checkbox name="d" icon-size="20px" checked-color="#6085b7">
                09:00 - 12:00
              </van-checkbox>
              <van-checkbox name="e" icon-size="20px" checked-color="#6085b7">
                12:00 - 15:00
              </van-checkbox>
              <van-checkbox name="f" icon-size="20px" checked-color="#6085b7">
                15:00 - 18:00
              </van-checkbox>
              <van-checkbox name="g" icon-size="20px" checked-color="#6085b7">
                18:00 - 21:00
              </van-checkbox>
              <van-checkbox name="h" icon-size="20px" checked-color="#6085b7">
                21:00 - 00:00
              </van-checkbox>
            </van-checkbox-group>
          </div>
        </template>
      </van-field>
      <van-button class="save-btn" type="primary" block color="#447dc7" native-type="submit">
        保存
      </van-button>
    </van-form>
    <van-action-sheet
      v-model="showAction"
      :actions="actions"
      :description="carText"
      @select="carSelect"
    />
  </div>
</template>
<script>
import { Cell, CellGroup, Button, ActionSheet, Icon, Checkbox, CheckboxGroup, Form, Field } from 'vant';
// import  dictionary  from '@/api/common.js'
export default {
  name: 'DriverIntention',
  components: {
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Form.name]: Form,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      driverId: '',
      cargoType: ['a'],
      arrivalArea: ['a'],
      deliveryArea: ['a'],
      handlingDifficultyDegree: ['a'],
      departureTime: ['a'],
      showAction: false,
      carText: '请选择您的车型',
      actions: [
        { name: '4.2 箱货', color: '#07c160' },
        { name: '4.8 箱货', color: '#07c160' },
        { name: '5.4 箱货', color: '#07c160' }
      ],
      carType: '4.2箱货'
    };
  },
  created() {
    this.getDriverId()
  },
  methods: {
    getCityId() {

    },
    carSelect(item) {
      this.carType = item.name
      this.showAction = false;
    },
    showSheet() {
      this.showAction = true;
    },
    btnSave(values) {
      values.driverId = this.driverId;
      values.carType = this.carType;
      console.log('submit', values);
    },
    getDriverId() {
      this.driverId = '111';
      // this.$route.query.driverId
    },
    getDictionary() {

    }
  }
};
</script>
<style lang="scss">
.driverIntention {
    min-height: 100vh;
    padding-bottom: 50px;
    box-sizing: border-box;
    .van-cell:not(:last-child)::after{
      border: none!important;
    }
    .van-cell-group__title{
        background-color: #f5f5f5;
        color: #b2b2b2;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
    }
    .car-size{
        padding: 8px 16px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .size-font{
            font-weight: bold;
            font-size: 16px;
        }
        .car-size-right{
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #969799;
            span{
                margin-right: 6px;
            }
        }
    }
  .check-box{
      width: 100%;
      .van-checkbox{
          padding: 8px 0;
          border-bottom: 1px solid #d9d9d9;
          .van-checkbox__label{
              font-size: 14px;
              font-weight: bold;
              color: black;
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
  }
}
</style>
