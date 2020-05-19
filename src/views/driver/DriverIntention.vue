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
          <div>
            <van-tag v-for="(item, index) in areaArray" :key="item.code" size="medium" round :color="arrivalArea.indexOf(item.code) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'areaArray', 'arrivalArea','arrivalText')">
              {{ item.name }}
            </van-tag>
          </div>
          <div class="across_city">
            <div class="acitybtn">
              <van-button icon="plus" plain round size="small" :color="fullarrival ? '#5376a6' : '#969799'" @click="fullarrival ? acrossAdd('acrossArr') : cantToast()">
                跨城添加
              </van-button>
            </div>
            <div class="across_box">
              <van-tag v-for="(item, index) in acrossArr" :key="item.code" color="#5376a6" size="medium" round class="tag_margin" @click="changeAcross('acrossArr', index)">
                {{ item.name }}
              </van-tag>
            </div>
          </div>
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
          <div>
            <van-tag v-for="(item, index) in areaArray" :key="item.code" size="medium" round :color="deliveryArea.indexOf(item.code) > -1 ? '#5376a6' : '#c8c8cb'" class="tag_margin" @click="getType(index, 'areaArray', 'deliveryArea','deliveryText')">
              {{ item.name }}
            </van-tag>
          </div>
          <div class="across_city">
            <div class="acitybtn">
              <van-button icon="plus" plain round size="small" :color="fulldelivery ? '#5376a6' : '#969799'" @click="fulldelivery ? acrossAdd('acrossDel') : cantToast()">
                跨城添加
              </van-button>
            </div>
            <div class="across_box">
              <van-tag v-for="(item, index) in acrossDel" :key="item.code" color="#5376a6" size="medium" round class="tag_margin" @click="changeAcross('acrossDel', index)">
                {{ item.name }}
              </van-tag>
            </div>
          </div>
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

    <van-popup ref="pppp" v-model="showCity" position="bottom">
      <van-picker ref="pickers" key="pickers" show-toolbar :columns="columns" :loading="loading" @cancel="showCity = false" @confirm="cityConfirm" @change="citychange" />
    </van-popup>
    <van-action-sheet v-model="docity" :actions="actions" :round="false" @select="onSelect" />
  </div>
</template>
<script>
// GetReginByCityCode
import { dictionary, getCityAreaByCode } from '@/api/common'
import { Toast, CellGroup, Cell, Button, Tag, loading, Picker, Popup, ActionSheet } from 'vant'
import { saveIntentionOfReceiving, judgingIntentionOfReceiving } from '@/api/driver'
import { driverDetail } from '@/api/user'
export default {
  name: 'DriverIntention',
  components: {
    [Toast.name]: Toast,
    [Tag.name]: Tag,
    [loading.name]: loading,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell
  },
  data() {
    return {
      driverId: '',
      workCity: null,
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
      departureText: '全选',
      showCity: false,
      docity: false,
      loading: true,
      checkedCity: [],
      actions: [
        { name: '重选' },
        { name: '删除', color: '#EE0A24' }
      ],
      fullarrival: true,
      fulldelivery: true,
      cityArr: '',
      acrossArr: [],
      acrossDel: [],
      cityitem1: null,
      cityitem2: null,
      pickhistory1: [0, 0],
      pickhistory2: [0, 0],
      columns: [],
      citylist: [],
      district: [],
      toastNum: 0,
      cityMoreCity1: [],
      cityMoreCity2: []
    }
  },
  watch: {
    acrossArr(val) {
      let cityMoreCity1 = []
      val.forEach(ele => {
        cityMoreCity1.push(ele.city);
        cityMoreCity1 = [... new Set(cityMoreCity1)];
        if (cityMoreCity1.length >= 2) {
          this.fullarrival = false;
          // if (this.toastNum === 1) {
          //   Toast('最多可选两个城市，区县不限')
          // }
          // this.toastNum++;
        } else {
          this.fullarrival = true;
        }
      })
    },
    acrossDel(val) {
      let cityMoreCity2 = []
      val.forEach(ele => {
        cityMoreCity2.push(ele.city);
        cityMoreCity2 = [... new Set(cityMoreCity2)];
        if (cityMoreCity2.length >= 2) {
          this.fulldelivery = false;
          // if (this.toastNum === 1) {
          //   Toast('最多可选两个城市，区县不限')
          // }
          // this.toastNum++;
        } else {
          this.fulldelivery = true;
        }
      })
    },
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
    this.driverId = this.$route.query.driverId;
    this.getWorkId();
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true)
    next(true);
  },
  methods: {
    // 获取司机城市ID
    getWorkId() {
      let that = this
      driverDetail({
        driverId: that.driverId
      }).then((res) => {
        if (res.data.success) {
          that.workCity = res.data.data.workCity;
          that.intentionaInfo();
        }
      })
    },
    // 基本数据获取
    async intentionaInfo() {
      let that = this
      await this.getDictionary('Intentional_compartment', 'dataTypeCar');
      await this.getDictionary('type_of_goods', 'dataCargoType');
      await this.getDictionary('handling_difficulty_degree', 'dataHandlingDifficultyDegree');
      await this.getDictionary('departure_time_interval', 'dataDepartureTime');
      // await this.getGetRegin(['370000']);
      await this.getcity('online_city', 'citylist');
      await getCityAreaByCode({
        cityCode: that.workCity
      }).then(res => {
        let arr = res.data.data;
        let unlimited = { code: '-2', name: '不限' };
        arr.unshift(unlimited)
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
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      this.judgingDriver();
    },
    async getcity(type) {
      await dictionary({
        dictType: type
      }).then(res => {
        let arr = res.data.data;
        let citylist = [];
        arr.forEach(ele => {
          let name = ele.code;
          let code = ele.codeVal;
          let item = { name: name, code: code }
          if (String(code) !== String(this.workCity)) {
            citylist.push(item)
          }
        })
        this.citylist = citylist;
        citylist.forEach(ele => {
          this.columns.push({ text: ele.name, children: [{ text: '加载中...' }] });
        })
        this.getcounty(citylist[0].code);
      }).catch(err => {
        Toast.fail(err);
      });
    },
    async getcounty(code) {
      await getCityAreaByCode({
        cityCode: code
      }).then(res => {
        this.loading = false;
        let district = res.data.data;
        this.district = district;
        let children = [];
        if (district.length !== 0) {
          district.forEach(ele => {
            if (ele.name !== '全区域') {
              let text = ele.name;
              children.push({ text: text, code: ele.code })
            }
          })
          this.citylist.forEach((ele, index) => {
            if (ele.code === code) {
              this.$set(this.columns[index], 'children', children)
              this.checkedCity.push(ele.name);
            }
          })
        }
      }).catch(err => {
        Toast.fail(err);
      });
    },
    // 获取市区
    // async getGetRegin(code) {
    //   let that = this;
    //   await GetReginByCityCode(code).then(res => {
    //     if (res.data.success) {
    //       if (code.length === 2) {
    //         this.loading = false;
    //         let district = res.data.data;
    //         this.district = district;
    //         let children = [];
    //         district.forEach(ele => {
    //           let text = ele.name;
    //           children.push({ text: text, code: ele.code })
    //         })
    //         this.citylist.forEach((ele, index) => {
    //           if (ele.code === code[1]) {
    //             that.$set(this.columns[index], 'children', children)
    //             this.checkedCity.push(ele.name);
    //           }
    //         })
    //       } else if (code.length === 1) {
    //         let citylist = res.data.data;
    //         this.citylist = citylist;
    //         citylist.forEach(ele => {
    //           this.columns.push({ text: ele.name });
    //         })
    //         this.getGetRegin(['370000', citylist[0].code])
    //       }
    //     } else {
    //       Toast.fail(res.data.errorMsg);
    //     }
    //   })
    // },
    // 选中上拉菜单操作；
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (this.cityArr === 'acrossArr') {
        if (item.name === '重选') {
          this.docity = false;
          this.acrossAdd('acrossArr');
        } else {
          this.docity = false;
          this.delcity('acrossArr');
        }
      } else {
        if (item.name === '重选') {
          this.docity = false;
          this.acrossAdd('acrossDel');
        } else {
          this.docity = false;
          this.delcity('acrossDel');
        }
      }
    },
    cantToast() {
      Toast('最多可选两个城市，区县不限')
    },
    // 打开城市选择
    acrossAdd(val) {
      this.cityArr = val;
      // if (val === 'acrossArr') {
      //   this.$refs.pickers.setIndexes(this.pickhistory1);
      // } else {
      //   this.$refs.pickers.setIndexes(this.pickhistory2);
      // }
      this.showCity = true;
    },
    // 选择市区按钮
    changeAcross(cityArr, index) {
      if (cityArr === 'acrossArr') {
        this.cityitem1 = index;
        this.cityArr = 'acrossArr';
      } else {
        this.cityitem2 = index;
        this.cityArr = 'acrossDel'
      }
      this.docity = true;
    },
    // 更换市区或选择市区
    cityConfirm(value) {
      let city = value[0];
      let area = value[1];
      let name = city + '-' + area;
      let code, cityCode;
      this.citylist.forEach(ele => {
        if (ele.name === city) {
          cityCode = ele.code
        }
      })
      this.columns.forEach((eles, indexs) => {
        if (eles.text === city) {
          if (eles.children.length !== 0) {
            eles.children.forEach(ele2 => {
              if (ele2.text === area && ele2.code !== undefined) {
                code = ele2.code;
              }
            })
          }
        }
      })
      let item = { name: name, code: code, city: city, cityCode: cityCode };
      if (this.cityArr === 'acrossArr') {
        this.changeOtherCity('cityitem1', 'acrossArr', code, city, item)
      } else {
        this.changeOtherCity('cityitem2', 'acrossDel', code, city, item)
      }
      this.showCity = false;
    },
    changeOtherCity(cityitem, cityArrs, code, city, item) {
      if (this[cityitem] !== null) {
        this[cityArrs].splice(this[cityitem], 1, item);
        this[cityitem] = null;
      } else {
        let has1
        if (this[cityArrs].length !== 0) {
          this[cityArrs].forEach(ele => {
            if (ele.code === code && ele.city === city) {
              has1 = true
            }
          })
        }
        if (has1 === undefined) {
          this[cityArrs].push(item);
          this.$refs.pickers.setIndexes(this.pickhistory1);
        } else {
          Toast('该区域已选择');
        }
      }
    },
    // 删除区市
    delcity(type) {
      if (type === 'acrossArr') {
        // this.acrossArr.splice(this.cityitem1, 1);
        this.acrossArr = this.acrossArr.filter((ele, index) => {
          return index !== this.cityitem1
        })
        this.cityitem1 = null;
      } else {
        // this.acrossDel.splice(this.cityitem2, 1);
        this.acrossDel = this.acrossDel.filter((ele, index) => {
          return index !== this.cityitem2
        })
        this.cityitem2 = null;
      }
    },
    // 滚动pickerloading请求数据
    // async citychange(picker, value, index) {
    //   let names = picker.getValues()[0];
    //   let has = this.checkedCity.some(ele => {
    //     return ele === names
    //   })
    //   if (!has) {
    //     let codes
    //     let indexCity
    //     this.citylist.forEach((ele, index) => {
    //       if (names === ele.name) {
    //         codes = ele.code;
    //         indexCity = index
    //       }
    //     })
    //     this.loading = true;
    //     await this.getGetRegin(['370000', codes]);
    //     let arr = [];
    //     this.columns[indexCity].children.forEach(ele => {
    //       arr.push(ele.text)
    //     })
    //     picker.setColumnValues(1, arr);
    //   }
    // },
    async citychange(picker, value, index) {
      let names = value[0];
      let has = this.checkedCity.some(ele => {
        return ele === names
      })
      if (!has) {
        this.$nextTick(() => {
          this.loading = true;
        })
        let codes
        let indexCity
        this.citylist.forEach((ele, index) => {
          if (names === ele.name) {
            codes = ele.code;
            indexCity = index
          }
        })
        // await this.getGetRegin(['370000', codes]);
        await this.getcounty(codes)
        this.$nextTick(function() {
          let arr = [];
          if (this.columns[indexCity].children.length !== 0) {
            this.columns[indexCity].children.forEach(ele => {
              arr.push(ele.text)
            })
          }
          setTimeout(() => {
            picker.setColumnValue(1, arr[0].text)
            picker.setColumnValues(1, arr);
          }, 500);
          // picker.setColumnValue(1, arr[0].text)
          // picker.setColumnValues(1, arr);
        })
      }
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
      let arrivalArea1 = [];
      let arrivalArea2 = [];
      this.arrivalArea.forEach(ele => {
        let item = { across: false, city: this.workCity, county: ele };
        arrivalArea1.push(item)
      })
      this.acrossArr.forEach(ele => {
        let item = { across: true, city: ele.cityCode, county: ele.code };
        arrivalArea2.push(item)
      })
      json.arrivalArea = [...arrivalArea1, ...arrivalArea2];

      let deliveryArea1 = [];
      let deliveryArea2 = [];
      this.deliveryArea.forEach(ele => {
        let item = { across: false, city: this.workCity, county: ele };
        deliveryArea1.push(item)
      })
      this.acrossDel.forEach(ele => {
        let item = { across: true, city: ele.cityCode, county: ele.code };
        deliveryArea2.push(item)
      })
      json.deliveryArea = [...deliveryArea1, ...deliveryArea2];
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
          // this.$router.back()
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
        that.flag = res.data.data.flag;
        let { flag, carType, cargoType, arrivalArea, deliveryArea, handlingDifficultyDegree, departureTime } = res.data.data
        Toast.clear();
        if (flag) {
          that.typeCar = [...carType];
          that.cargoType = [...cargoType];
          that.handlingDifficultyDegree = [...handlingDifficultyDegree];
          that.departureTime = [...departureTime];
          arrivalArea.forEach(ele => {
            if (ele.across) {
              that.acrossArr.push({ cityCode: ele.city, code: ele.county, name: ele.cityName + '-' + ele.countyName, city: ele.cityName })
            } else {
              that.arrivalArea.push(ele.county)
            }
          })
          deliveryArea.forEach(ele => {
            if (ele.across) {
              that.acrossDel.push({ cityCode: ele.city, code: ele.county, name: ele.cityName + '-' + ele.countyName, city: ele.cityName })
            } else {
              that.deliveryArea.push(ele.county)
            }
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
  .across_city{
    width: 100%;
    .cancheck{

    }
    .acitybtn{
      text-align: center;
      width: 100%;
      .van-button{
      width: 80%;
      height: 0.6rem;
      line-height: 0.6rem;
      }
      .tag_margin{
      margin: 2px 11px 12px 0;
      height: 12px;
      min-width: 1.4rem;
      }
    }
    .across_box{
      margin-top: 12px;
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
