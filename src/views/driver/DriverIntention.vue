<template>
  <div class="driverIntention">
    <div>
      <div>
        <van-cell-group title="车型"></van-cell-group>
        <div v-if="dataTypeCar.length != 0" class="types_box">
          <van-tag v-for="(item, index) in dataTypeCar" :key="item.codeVal" round size="medium" :color="typeCar.indexOf(item.codeVal) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'dataTypeCar', 'typeCar')">
            {{ item.code }}
          </van-tag>
        </div>
        <div v-else class="loadingStatus">
          <van-loading size="24px">
            车型加载中...
          </van-loading>
        </div>
      </div>
      <div>
        <van-cell-group title="货物类型"></van-cell-group>
        <div v-if="dataCargoType.length != 0" class="types_box">
          <van-tag v-for="(item, index) in dataCargoType" :key="item.codeVal" round size="medium" :color="cargoType.indexOf(item.codeVal) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'dataCargoType', 'cargoType')">
            {{ item.code }}
          </van-tag>
        </div>
        <div v-else class="loadingStatus">
          <van-loading size="24px">
            货物类型加载中...
          </van-loading>
        </div>
      </div>
      <div>
        <van-cell-group title="到仓区域"></van-cell-group>
        <div v-if="areaArray.length != 0" class="types_box">
          <van-tag v-for="(item, index) in areaArray" :key="item.code" size="medium" round :color="arrivalArea.indexOf(item.code) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'areaArray', 'arrivalArea')">
            {{ item.name }}
          </van-tag>
        </div>
        <div v-else class="loadingStatus">
          <van-loading size="24px">
            到仓区域加载中...
          </van-loading>
        </div>
      </div>
      <div>
        <van-cell-group title="配送区域"></van-cell-group>
        <div v-if="areaArray.length != 0" class="types_box">
          <van-tag v-for="(item, index) in areaArray" :key="item.code" size="medium" round :color="deliveryArea.indexOf(item.code) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'areaArray', 'deliveryArea')">
            {{ item.name }}
          </van-tag>
        </div>
        <div v-else class="loadingStatus">
          <van-loading size="24px">
            配送区域加载中...
          </van-loading>
        </div>
      </div>
      <div>
        <van-cell-group title="装卸难度"></van-cell-group>
        <div v-if="dataHandlingDifficultyDegree.length != 0" class="types_box">
          <van-tag v-for="(item, index) in dataHandlingDifficultyDegree" :key="item.codeVal" size="medium" round :color="handlingDifficultyDegree.indexOf(item.codeVal) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'dataHandlingDifficultyDegree', 'handlingDifficultyDegree')">
            {{ item.code }}
          </van-tag>
        </div>
        <div v-else class="loadingStatus">
          <van-loading size="24px">
            装卸难度加载中...
          </van-loading>
        </div>
      </div>
      <div>
        <van-cell-group title="出车时段"></van-cell-group>
        <div v-if="dataDepartureTime.length != 0" class="types_box">
          <van-tag v-for="(item, index) in dataDepartureTime" :key="item.codeVal" round size="medium" :color="departureTime.indexOf(item.codeVal) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'dataDepartureTime', 'departureTime')">
            {{ item.code }}
          </van-tag>
        </div>
        <div v-else class="loadingStatus">
          <van-loading size="24px">
            出车时段加载中...
          </van-loading>
        </div>
      </div>
    </div>
    <van-button class="save-btn" type="info" block color="#2F7DCD" @click="btnSubmit">
      保存
    </van-button>
  </div>
</template>
<script>
import { dictionary, getCityAreaByCode } from '@/api/common'
import { Toast, CellGroup, Button, Tag, loading } from 'vant'
import { judgingIntentionOfReceiving, saveIntentionOfReceiving } from '@/api/driver'
export default {
  name: 'DriverIntention',
  components: {
    [Toast.name]: Toast,
    [Tag.name]: Tag,
    [loading.name]: loading,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      driverId: '',
      typeCar: [],
      cargoType: [],
      arrivalArea: [],
      deliveryArea: [],
      handlingDifficultyDegree: [],
      departureTime: [],
      dataTypeCar: [],
      dataCargoType: [],
      areaArray: [],
      dataHandlingDifficultyDegree: [],
      dataDepartureTime: [],
      flag: false
    }
  },
  mounted() {
    this.intentionaInfo();
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true)
    next(true);
  },
  methods: {
    // 基本数据获取
    async intentionaInfo() {
      let that = this
      let cityCode = localStorage.getItem('city');
      await this.getDictionary('Intentional_compartment', 'dataTypeCar');
      await this.getDictionary('type_of_goods', 'dataCargoType');
      await this.getDictionary('handling_difficulty_degree', 'dataHandlingDifficultyDegree');
      await this.getDictionary('departure_time_interval', 'dataDepartureTime');
      await getCityAreaByCode({
        cityCode: cityCode
      }).then(res => {
        let arr = res.data.data;
        that.areaArray = arr;
      }).catch(err => {
        Toast.fail(err);
      });
      this.getJudging();
    },
    // 字典查询
    async getDictionary(type, array) {
      let that = this;
      await dictionary({
        dictType: type
      }).then(res => {
        let arr = res.data.data;
        that[array] = arr;
      }).catch(err => {
        Toast.fail(err);
      });
    },
    getJudging() {
      this.driverId = this.$route.query.driverId;
      // this.driverId = 'BJS202003101000'
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      this.judgingDriver();
    },
    // 选中改变
    getType(index, dataArray, array) {
      let that = this;
      this[dataArray].forEach((ele, idx, arr) => {
        if (index === idx) {
          if (dataArray === 'areaArray') {
            if (that[array].indexOf(ele.code) === -1) {
              that[array].push(ele.code)
            } else {
              that[array].forEach((element, i) => {
                if (element === ele.code) {
                  let a = that[array].splice(i, 1)
                  a.length = 0;
                }
              })
            }
          } else if (dataArray === 'dataTypeCar') {
            that[array].splice(0, 1, ele.codeVal)
          } else {
            if (that[array].indexOf(ele.codeVal) === -1) {
              that[array].push(ele.codeVal)
            } else {
              that[array].forEach((element, i) => {
                if (element === ele.codeVal) {
                  let a = that[array].splice(i, 1)
                  a.length = 0;
                }
              })
            }
          }
        }
      })
    },
    btnSubmit() {
      let carType = '';
      let json = {}
      if (this.typeCar.length === 0) {
        Toast('请选择车型');
        return;
      }
      carType = this.typeCar[0];
      json.carType = carType;
      json.cargoType = this.cargoType;
      json.arrivalArea = this.arrivalArea;
      json.deliveryArea = this.deliveryArea;
      json.handlingDifficultyDegree = this.handlingDifficultyDegree;
      json.departureTime = this.departureTime;
      json.driverId = this.driverId;
      if (json.cargoType.length === 0) {
        Toast('请选择货物类型');
        return;
      }
      if (json.arrivalArea.length === 0) {
        Toast('请选择到仓区域');
        return;
      }
      if (json.deliveryArea.length === 0) {
        Toast('请选择配送区域');
        return;
      }
      if (json.handlingDifficultyDegree.length === 0) {
        Toast('请选择装卸难度');
        return;
      }
      if (json.departureTime.length === 0) {
        Toast('请选择出车时段');
        return;
      }
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '提交中...'
      });
      saveIntentionOfReceiving(json).then(res => {
        if (res.data.data.errorMsg != null) {
          Toast.clear();
          Toast.fail(res.data.errorMsg);
        }
        if (res.data.data.flag) {
          Toast.clear();
          this.$router.back()
        }
      }).catch(err => {
        Toast.clear();
        Toast.fail(err);
      })
    },
    judgingDriver() {
      let that = this
      judgingIntentionOfReceiving({
        driverId: this.driverId
      }).then(res => {
        Toast.clear();
        let flag = res.data.data.flag;
        that.flag = res.data.data.flag;
        let carType = res.data.data.carType;
        let cargoType = res.data.data.cargoType;
        let arrivalArea = res.data.data.arrivalArea;
        let deliveryArea = res.data.data.deliveryArea;
        let handlingDifficultyDegree = res.data.data.handlingDifficultyDegree;
        let departureTime = res.data.data.departureTime;
        Toast.clear();
        if (flag) {
          that.dataTypeCar.forEach(ele => {
            if (carType === ele.code) {
              that.typeCar.push(ele.codeVal)
            }
          });
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
        Toast.fail(err);
      })
    }
  }
}
</script>
<style lang="scss">
.driverIntention {
  width: 100%;
  padding-bottom: 1.1rem;
  box-sizing: border-box;
  .van-cell-group__title{
    background-color: #f5f5f5;
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
    padding: 3px 0 5px 10px;
    box-sizing: border-box;
    font-size: 12px;
    color: #B2B2B2;
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border: none;
  }
  .types_box {
    width: 100%;
    min-height: 2.18rem;
    padding:.36rem .52rem;
    box-sizing: border-box;
    display: flex;
    // justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;
    .tag_margin{
      margin: 2px 11px 12px 0;
      height: 12px;
      min-width: 1.4rem;
    }
    .van-tag{
      justify-content: center;
      font-size: 13px;
    }
  }
  .loadingStatus{
     display: flex;
     min-height: 2.18rem;
     justify-content: center;
     align-items: center;
  }
  // .types_box:after {
  //   content: "";
  //   flex: auto;
  // }
  .save-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1.1rem;
    line-height: 1.1rem;
    color: #fff;
    font-size: 16px;
  }
}
</style>
