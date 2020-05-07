<template>
  <div class="driverIntention">
    <div>
      <div>
        <van-cell title="车型" />
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
        <van-cell title="货物类型">
          <template>
            <span class="check_right" @click="doCheck('dataCargoType','cargoType','cargoText')" v-text="cargoText"></span>
          </template>
        </van-cell>
        <div v-if="dataCargoType.length != 0" class="types_box">
          <van-tag v-for="(item, index) in dataCargoType" :key="item.codeVal" round size="medium" :color="cargoType.indexOf(item.codeVal) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'dataCargoType', 'cargoType','cargoText')">
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
        <van-cell title="到仓区域">
          <template>
            <span class="check_right" @click="doCheck('areaArray','arrivalArea','arrivalText')" v-text="arrivalText"></span>
          </template>
        </van-cell>
        <div v-if="areaArray.length != 0" class="types_box">
          <van-tag v-for="(item, index) in areaArray" :key="item.code" size="medium" round :color="arrivalArea.indexOf(item.code) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'areaArray', 'arrivalArea','arrivalText')">
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
        <van-cell title="配送区域">
          <template>
            <span class="check_right" @click="doCheck('areaArray','deliveryArea','deliveryText')" v-text="deliveryText"></span>
          </template>
        </van-cell>
        <div v-if="areaArray.length != 0" class="types_box">
          <van-tag v-for="(item, index) in areaArray" :key="item.code" size="medium" round :color="deliveryArea.indexOf(item.code) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'areaArray', 'deliveryArea','deliveryText')">
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
        <van-cell title="装卸难度">
          <template>
            <span class="check_right" @click="doCheck('dataHandlingDifficultyDegree','handlingDifficultyDegree','handlingDifficultyText')" v-text="handlingDifficultyText"></span>
          </template>
        </van-cell>
        <div v-if="dataHandlingDifficultyDegree.length != 0" class="types_box">
          <van-tag v-for="(item, index) in dataHandlingDifficultyDegree" :key="item.codeVal" size="medium" round :color="handlingDifficultyDegree.indexOf(item.codeVal) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'dataHandlingDifficultyDegree', 'handlingDifficultyDegree','handlingDifficultyText')">
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
        <van-cell title="出车时段">
          <template>
            <span class="check_right" @click="doCheck('dataDepartureTime','departureTime','departureText')" v-text="departureText"></span>
          </template>
        </van-cell>
        <div v-if="dataDepartureTime.length != 0" class="types_box">
          <van-tag v-for="(item, index) in dataDepartureTime" :key="item.codeVal" round size="medium" :color="departureTime.indexOf(item.codeVal) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'dataDepartureTime', 'departureTime','departureText')">
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
    <van-button class="btn_bottom" type="info" block color="#2F7DCD" @click="btnSubmit">
      保存
    </van-button>
  </div>
</template>
<script>
import { dictionary, getCityAreaByCode } from '@/api/common'
import { Toast, CellGroup, Cell, Button, Tag, loading } from 'vant'
import { judgingIntentionOfReceiving, saveIntentionOfReceiving } from '@/api/driver'
export default {
  name: 'DriverIntention',
  components: {
    [Toast.name]: Toast,
    [Tag.name]: Tag,
    [loading.name]: loading,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
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
      flag: false,
      cargoText: '全选',
      deliveryText: '全选',
      arrivalText: '全选',
      handlingDifficultyText: '全选',
      departureText: '全选'
    }
  },
  watch: {
    cargoType(newarr, oldarr) {
      if (newarr.length === 0) {
        this.cargoType.push('-2')
      }
      if (newarr.length < this.dataCargoType.length - 1) {
        this.cargoText = '全选'
      } else {
        this.cargoText = '不选'
      }
    },
    arrivalArea: function(newarr, oldarr) {
      if (newarr.length === 0) {
        this.arrivalArea.push('-2')
      }
      if (newarr.length < this.areaArray.length - 1) {
        this.arrivalText = '全选'
      } else {
        this.arrivalText = '不选'
      }
    },
    deliveryArea(newarr, oldarr) {
      if (newarr.length === 0) {
        this.deliveryArea.push('-2')
      }
      if (newarr.length < this.areaArray.length - 1) {
        this.deliveryText = '全选'
      } else {
        this.deliveryText = '不选'
      }
    },
    departureTime(newarr, oldarr) {
      if (newarr.length === 0) {
        this.departureTime.push('-2')
      }
      if (newarr.length < this.dataDepartureTime.length - 1) {
        this.departureText = '全选'
      } else {
        this.departureText = '不选'
      }
    },
    handlingDifficultyDegree(newarr, oldarr) {
      if (newarr.length === 0) {
        this.handlingDifficultyDegree.push('-2')
      }
      if (newarr.length < this.dataHandlingDifficultyDegree.length - 1) {
        this.handlingDifficultyText = '全选'
      } else {
        this.handlingDifficultyText = '不选'
      }
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
        let unlimited = { code: '-2', name: '不限' };
        arr.unshift(unlimited)
        // that.areaArray = arr;
        that.areaArray = arr.filter((item, index, arr) => {
          return item.code !== '-99'
        });
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
        if (type !== 'Intentional_compartment') {
          let unlimited = { codeVal: '-2', code: '不限' };
          arr.unshift(unlimited);
        }
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
    checkUnlimited(eleItem, array, check_status) {
      let that = this
      if (eleItem === '-2') {
        that[array] = [];
        that[array].push(eleItem);
        that[check_status] = '全选'
      } else {
        let newArr = that[array].filter((item, index, arr) => {
          return item !== '-2'
        });
        that[array] = newArr;
        that[check_status] = '全选'
        that[array].push(eleItem);
      }
    },
    isArea(array, eleItem, check_status) {
      if (this[array].indexOf(eleItem) === -1) {
        this.checkUnlimited(eleItem, array, check_status)
      } else {
        this.checkUnlimited(eleItem, array, check_status)
        let newArr = this[array].filter((item, index, arr) => {
          return eleItem !== item
        });
        this[array] = newArr;
      }
    },
    // 选中改变
    getType(index, dataArray, array, check_status) {
      this[dataArray].forEach((ele, idx, arr) => {
        if (index === idx) {
          // 区域表
          if (dataArray === 'areaArray') {
            this.isArea(array, ele.code, check_status)
          // 车型
          } else {
            this.isArea(array, ele.codeVal, check_status)
          }
        }
      })
    },
    btnSubmit() {
      let json = {}
      if (this.typeCar.length === 0) {
        Toast('请选择车型');
        return;
      }
      json.carType = this.typeCar;
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
            carType.forEach(item => {
              if (item === ele.code) {
                that.typeCar.push(ele.codeVal)
              }
            })
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
    },
    // 全选与反选
    doCheck(dataArray, array, check_status) {
      // 全选
      if (this[check_status] === '全选') {
        this[dataArray].forEach(data_ele => {
          if (dataArray === 'areaArray') {
            if (data_ele.code !== '-2') {
              this[array].push(data_ele.code)
              this[array] = [...new Set(this[array])];
            }
          } else {
            if (data_ele.codeVal !== '-2') {
              this[array].push(data_ele.codeVal)
              this[array] = [...new Set(this[array])];
            }
          }
        })
        let newArr = this[array].filter((item, index, arr) => {
          return item !== '-2'
        });
        this[array] = newArr;
        this[check_status] = '不选';
      } else {
        // 反选
        this[array] = [];
        this[check_status] = '全选';
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../style/common';
.driverIntention {
  width: 100%;
  padding-bottom: 1.1rem;
  box-sizing: border-box;
  .van-cell{
    background-color: #f5f5f5;
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
    padding: 3px 10px 5px 10px;
    box-sizing: border-box;
    font-size: 12px;
    color: #B2B2B2;
  }
  .check_right{
    color: rgb(70,125,185);
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
}
</style>
