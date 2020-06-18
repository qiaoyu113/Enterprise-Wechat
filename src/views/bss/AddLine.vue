<template>
  <div class="add-line" ontouchstart>
    <van-form
      class="form"
      :show-error="false"
      :show-error-message="false"
      @submit="onSubmit"
    >
      <div class="form-container">
        <van-field
          :value="customerName"
          required
          readonly
          clickable
          label="货主名称"
          name="货主名称"
          placeholder="请选择货主"
          :rules="[{ required: true, message: '请选择货主' }]"
          @click="showCustomerPicker = true"
        />
        <van-field
          v-model="form.name"
          maxlength="20"
          minlength="1"
          required
          label="线路名称"
          name="线路名称"
          placeholder="名称应具有识别度"
          :rules="[{ required: true, message: '请填写线路名称' }]"
        />

        <van-field
          :value="form.warehouse"
          required
          readonly
          clickable
          label="仓库位置"
          name="仓库位置"
          placeholder="请选择仓库位置"
          :rules="[{ required: true, message: '请选择仓库位置' }]"
          @click="showWarehousePicker = true"
        />
        <van-field
          :value="cityTextVal"
          required
          readonly
          clickable
          label="配送区域"
          name="配送区域"
          placeholder="请选择配送区域"
          :rules="[{ required: true, message: '请选择配送区域' }]"
          @click="showCityPicker = true"
        />
        <van-field
          v-model="form.distance"
          required
          label="配送公里"
          name="配送公里"
          placeholder="请输入配送公里"
          type="digit"
          :rules="[
            { required: true, message: '请输入配送公里' },
          ]"
        />
        <van-field
          :value="carTypeName"
          required
          readonly
          clickable
          label="车型"
          name="车型"
          placeholder="请选择车型"
          :rules="[{ required: true, message: '请选择车型' }]"
          @click="showCar = true"
        />
        <van-field
          v-model="form.deployNum"
          required
          label="用车数量"
          name="用车数量"
          type="digit"
          placeholder="请输入用车数量"
          :rules="[
            { required: true, message: '请输入用车数量' },
            { validator: validatorNumber(0, 99), message: '请输入0至99的整数' }
          ]"
        />
        <van-field
          v-model="form.deliveryNum"
          required
          label="每日平均配送点位数"
          name="每日平均配送点位数"
          placeholder="请输入每日平均配送点位数"
          :rules="[
            { required: true, message: '请输入每日平均配送点位数' },
            { validator: validatorNumber(0, 100), message: '请输入0至100的整数' }
          ]"
        />
        <van-field
          :value="form.cargoType"
          required
          readonly
          clickable
          label="货物类型"
          name="货物类型"
          placeholder="请选择货物类型"
          :rules="[{ required: true, message: '请选择货物类型' }]"
          @click="showCargo = true"
        />
        <van-field
          :value="goodsWeightName"
          required
          readonly
          clickable
          label="货物总重量（吨）"
          name="货物总重量（吨）"
          placeholder="请选择货物总重量"
          :rules="[{ required: true, message: '请选择货物总重量' }]"
          @click="showGoodsWeight = true"
        />

        <van-field
          required
          name="radio"
          label="是否搬运"
        >
          <template #input>
            <van-radio-group v-model="form.carry" direction="horizontal">
              <van-radio name="1">
                是
              </van-radio>
              <van-radio name="2">
                否
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <!-- 需要搬运显示 -->
        <template v-if="form.carry === '1'">
          <van-field
            :value="handlingDifficultyName"
            required
            readonly
            clickable
            label="装卸难度"
            name="装卸难度"
            placeholder="请选择装卸难度"
            :rules="[{ required: true, message: '请选择装卸难度' }]"
            @click="showHandlingDifficulty = true"
          />
          <van-field
            v-model="form.volume"
            required
            label="预计每日货物总体积(立方米)"
            name="预计每日货物总体积(立方米)"
            type="digit"
            placeholder="请输入预计每日货物总体积"
            :rules="[
              { required: true, message: '请输入预计每日货物总体积' },
              { validator: validatorNumber(0, 100), message: '请输入0至99的整数' }
            ]"
          />
        </template>

        <van-field
          v-model="form.username"
          required
          label="月出车天数"
          name="月出车天数"
          placeholder="请输入月出车天数"
          :rules="[{ required: true, message: '请输入月出车天数' }]"
        />
        <van-field
          v-model="form.username"
          required
          label="每日出车趟数"
          name="每日出车趟数"
          placeholder="请输入每日出车趟数"
          :rules="[{ required: true, message: '请输入每日出车趟数' }]"
        />
        <van-field
          v-model="form.username"
          required
          label="每日出车趟数"
          name="每日出车趟数"
          placeholder="请输入每日出车趟数"
          :rules="[{ required: true, message: '请输入每日出车趟数' }]"
        />
        <van-field
          v-model="form.username"
          required
          label="到仓时间"
          name="到仓时间"
          placeholder="请输入到仓时间"
          :rules="[{ required: true, message: '请输入到仓时间' }]"
        />
        <van-field
          v-model="form.username"
          required
          label="结束时间"
          name="结束时间"
          placeholder="请输入结束时间"
          :rules="[{ required: true, message: '请输入结束时间' }]"
        />
        <van-field
          required
          name="radio"
          label="收入结算方式"
        >
          <template #input>
            <van-radio-group v-model="form.username" direction="horizontal">
              <van-radio name="1">
                按趟
              </van-radio>
              <van-radio name="2">
                保底提成
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="form.username"
          required
          label="单趟运费"
          name="单趟运费"
          placeholder="请输入单趟运费"
          :rules="[{ required: true, message: '请输入单趟运费' }]"
        />
        <van-field
          required
          name="radio"
          label="是否返仓"
        >
          <template #input>
            <van-radio-group v-model="form.username" direction="horizontal">
              <van-radio name="1">
                是
              </van-radio>
              <van-radio name="2">
                否
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          required
          name="radio"
          label="是否回单"
        >
          <template #input>
            <van-radio-group v-model="form.username" direction="horizontal">
              <van-radio name="1">
                是
              </van-radio>
              <van-radio name="2">
                否
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="form.username"
          required
          label="线路有效期（天）"
          name="线路有效期（天）"
          placeholder="请输入线路有效期"
          :rules="[{ required: true, message: '请输入线路有效期' }]"
        />
        <van-field
          v-model="form.username"
          required
          label="线路稳定性"
          name="线路稳定性"
          placeholder="请输入线路稳定性"
          :rules="[{ required: true, message: '请输入线路稳定性' }]"
        />
        <!-- <van-popup ref="pppp" v-model="showCity" position="bottom">
          <van-picker ref="pickers" key="pickers" show-toolbar :columns="columns" :loading="loading" @cancel="showCity = false" @confirm="cityConfirm" @change="citychange" />
        </van-popup> -->
      </div>
      <div class="submit-btn">
        <van-button round block type="info" class="van-button-color" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <!-- 货主列表 -->
    <van-popup v-model="showCustomerPicker" position="bottom">
      <van-picker
        show-toolbar
        value-key="customerName"
        :columns="customers"
        @cancel="showCustomerPicker = false"
        @confirm="onCustomerConfirm"
      />
    </van-popup>
    <!-- 仓库位置 -->
    <van-popup v-model="showWarehousePicker" position="bottom">
      <van-picker
        show-toolbar
        title="选择仓位置"
        value-key="name"
        :loading="warehouseLoading"
        :columns="warehouseList"
        @cancel="showWarehousePicker = false"
        @confirm="onWarehouseConfirm"
        @change="cityChange"
      />
    </van-popup>
    <van-dialog
      v-model="dialogWareHouse"
      class-name="driver-dialog"
      title="详细地址"
      show-cancel-button
      :before-close="setWarehouseDistrict"
    >
      <van-field
        v-model="form.warehouseDistrict"
        rows="2"
        autosize
        label="详细地址"
        type="textarea"
        maxlength="100"
        placeholder="请输入详细地址"
        show-word-limit
      />
    </van-dialog>
    <!-- 线路区域 -->
    <van-popup v-model="showCityPicker" position="bottom">
      <van-picker
        show-toolbar
        title="选择仓位置"
        value-key="name"
        :loading="cityLoading"
        :columns="cityList"
        @cancel="showCityPicker = false"
        @confirm="onCityConfirm"
        @change="cityChange2"
      />
    </van-popup>
    <van-dialog
      v-model="dialogCity"
      class-name="driver-dialog"
      title="详细地址"
      show-cancel-button
      :before-close="setCityDistrict"
    >
      <van-field
        v-model="form.districtArea"
        rows="2"
        autosize
        label="详细地址"
        type="textarea"
        maxlength="100"
        placeholder="请输入详细地址"
        show-word-limit
      />
    </van-dialog>
    <!-- 车型 -->
    <van-popup v-model="showCar" position="bottom">
      <van-picker
        show-toolbar
        value-key="code"
        :columns="carList"
        @cancel="showCar = false"
        @confirm="onCarConfirm"
      />
    </van-popup>

    <!-- 货物类型 -->
    <van-popup v-model="showCargo" position="bottom">
      <van-picker
        show-toolbar
        value-key="code"
        :columns="cargoList"
        @cancel="showCargo = false"
        @confirm="onCargoConfirm"
      />
    </van-popup>
    <!-- 货物重量 -->
    <van-popup v-model="showGoodsWeight" position="bottom">
      <van-picker
        show-toolbar
        value-key="code"
        :columns="goodsWeightList"
        @cancel="showGoodsWeight = false"
        @confirm="onGoodsWeightConfirm"
      />
    </van-popup>
    <!-- 装卸难度 -->
    <van-popup v-model="showHandlingDifficulty" position="bottom">
      <van-picker
        show-toolbar
        value-key="code"
        :columns="handlingDifficultyList"
        @cancel="showHandlingDifficulty = false"
        @confirm="onHandlingDifficultyConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Form } from 'vant';
import { dictionary, GetReginByCityCode, getTownByCountryCode } from '@/api/common';
import { getLineUser } from '@/api/carline';
import { Field, Toast, CellGroup, Cell, Button, Dialog, Loading, Picker, Popup, ActionSheet, RadioGroup, Radio } from 'vant'
const defaultForm = {
  customer: '', // 货主
  city: '', // 城市
  // 仓位置
  warehouse: '', // 仓位置整体
  wareAreaName: '', // 区中文
  warehouseProvince: '', // 省code
  warehouseCity: '', // 市code
  warehouseCounty: '', // 区code
  warehouseTown: '', // 县code
  warehouseDistrict: '', // 具体位置
  // 线路区域
  provinceArea: '', // 省市区
  cityArea: '',
  countyArea: '',
  districtArea: '', // 详细地址

  distance: '', // 配送公里 整数无小数点
  deployNum: '', // 用车数
  deliveryNum: '', // 每日平均配送点位数
  cargoType: '', // 货物类型
  goodsWeight: '', // 货物重量
  carry: '', // 是否搬运

  username: ''
}
export default {
  name: 'BssAddLine',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Dialog.Component.name]: Dialog.Component,
    [Loading.name]: Loading,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data() {
    return {
      // 货主
      showCustomerPicker: false,
      customers: [], // 货主列表
      customerName: '',
      // 仓位置
      warehouseList: [], // 仓列表
      showWarehousePicker: false,
      warehouseLoading: false,
      dialogWareHouse: false,
      // 线路区域
      cityTextVal: '',
      cityList: [], // 线路
      cityLoading: false,
      dialogCity: false,
      showCityPicker: false,
      // 缓存城市信息
      allCityList: [],
      // 车型
      carList: [],
      showCar: false,
      carTypeName: '',
      // 货物类型
      cargoList: [],
      showCargo: false,
      // 货物重量
      goodsWeightList: [],
      showGoodsWeight: false,
      goodsWeightName: '',
      // 装卸难度
      handlingDifficultyList: [],
      showHandlingDifficulty: false,
      handlingDifficultyName: '',

      form: Object.assign({}, defaultForm)
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // 货主列表
      getLineUser()
        .then((result) => {
          this.customers = result.data.data;
        }).catch((err) => {
          Toast.fail(err);
        });
      // 城市
      GetReginByCityCode([]).then(res => {
        const data = res.data.data;
        this.allCityList = data.map(item => {
          return {
            ...item,
            children: []
          };
        });
        data.unshift({
          code: '',
          name: '请选择'
        });
        this.warehouseList = [{ values: data }, { values: [] }, { values: [] }, { values: [] }];
        this.cityList = [{ values: data }, { values: [] }, { values: [] }];
      }).catch(err => {
        Toast.fail(err);
      });
      // 车型
      dictionary({
        dictType: 'Intentional_compartment'
      }).then(res => {
        this.carList = res.data.data;
      }).catch(err => {
        Toast.fail(err);
      });
      // 货物类型
      dictionary({
        dictType: 'type_of_goods'
      }).then(res => {
        this.cargoList = res.data.data;
      }).catch(err => {
        Toast.fail(err);
      });
      // 货物总重量
      dictionary({
        dictType: 'goods_weight'
      }).then(res => {
        this.goodsWeightList = res.data.data;
      }).catch(err => {
        Toast.fail(err);
      });
      // 每日配送趟数
      dictionary({
        dictType: 'line_task_daynum'
      }).then(res => {
        this.lapNumList = res.data.data;
      }).catch(err => {
        Toast.fail(err);
      })
      // 装卸难度
      dictionary({
        dictType: 'handling_difficulty_degree'
      }).then(res => {
        this.handlingDifficultyList = res.data.data;
      }).catch(err => {
        Toast.fail(err);
      })
    },
    onSubmit(values) {
      console.log('submit', values);
    },
    // 货主
    onCustomerConfirm(value) {
      const { city, customerId, customerName } = value;
      this.form.city = city;
      this.form.customer = customerId;
      this.customerName = customerName;
      this.showCustomerPicker = false;
    },
    // 仓位置
    onWarehouseConfirm(value) {
      const list = value.filter(item => item.code)
      if (list.length === 4) {
        this.form.warehouse = list.map(item => item.name).join(''); // 仓位置整体
        this.form.wareAreaName = list[2].name; // 区中文
        this.form.warehouseProvince = list[0].code; // 省code
        this.form.warehouseCity = list[1].code; // 市code
        this.form.warehouseCounty = list[2].code; // 区code
        this.form.warehouseTown = list[3].code; // 县code
        this.form.warehouseDistrict = '';
      } else {
        Toast('请选择仓位置');
        return;
      }
      this.showWarehousePicker = false;
      this.dialogWareHouse = true;
    },
    // 车型
    onCarConfirm(value) {
      this.form.carType = value.codeVal;
      this.carTypeName = value.code;
      this.showCar = false;
    },
    // 城市
    onCityConfirm(value) {
      const list = value.filter(item => item.code)
      if (list.length === 3) {
        this.cityTextVal = list.map(item => item.name).join(''); // 仓位置整体
        this.form.provinceArea = Number(list[0].code); // 省code
        this.form.cityArea = Number(list[1].code); // 市code
        this.form.countyArea = Number(list[2].code); // 区code
        this.form.districtArea = '';
      } else {
        Toast('请选择配送区域');
        return;
      }
      this.showCityPicker = false;
      this.dialogCity = true;
    },
    onCargoConfirm(value) {
      this.form.cargoType = value.code;
      this.showCargo = false;
    },
    onGoodsWeightConfirm(value) {
      this.form.goodsWeight = value.codeVal;
      this.goodsWeightName = value.code;
      this.showGoodsWeight = false;
    },
    onHandlingDifficultyConfirm(value) {
      this.form.handlingDifficultyDegree = value.codeVal;
      this.handlingDifficultyName = value.code;
      this.showHandlingDifficulty = false;
    },
    setWarehouseDistrict(action, done) {
      if (action === 'confirm') {
        this.form.warehouse = this.form.warehouse + this.form.warehouseDistrict;
      }
      done();
    },
    setCityDistrict(action, done) {
      if (action === 'confirm') {
        this.cityTextVal = this.cityTextVal + this.form.districtArea;
      }
      done();
    },
    cityChange(picker, value, index) {
      const codeList = value.filter((item, i) => {
        return item && item.code && i <= index;
      }).map(item => item.code);
      const len = this.warehouseList.length;
      if (index === 3) return;// 最后一级变化无需请求接口
      if (!value[index].code) {
        for (let i = index + 1; i < len; i++) {
          picker.setColumnValues(i, []);
        }
        return;
      }
      // 判断缓存内有值
      for (let i = index + 2; i < len; i++) {
        picker.setColumnValues(i, []);
      }
      // console.log(index)
      let flag = false;
      codeList.reduce((pre, cur, i, arr) => {
        const item = pre.find(item => item.code === cur);
        if (i === arr.length - 1) {
          if (item.children && item.children.length > 0) {
            picker.setColumnValues(index + 1, item.children);
            flag = true;
          }
        }
        return item.children || [];
      }, this.allCityList);
      if (flag) {
        return;
      }
      this.warehouseLoading = true;

      if (codeList.length === 3) {
        // 选择乡道
        getTownByCountryCode({ countryCode: codeList[2] })
          .then(({ data }) => {
            const list = data.data.map(item => {
              return {
                ...item
              };
            });
            this.setCityData(codeList, list);// 存数据
            picker.setColumnValues(index + 1, list);
          }).catch((err) => {
            Toast.fail(err);
          }).finally(() => {
            this.warehouseLoading = false;
          });
        return;
      }
      GetReginByCityCode(codeList)
        .then(({ data }) => {
          if (data.success) {
            const list = data.data.map(item => {
              return {
                ...item
              };
            });
            list.unshift({
              code: '',
              name: '请选择'
            });
            picker.setColumnValues(index + 1, list);
            // 存数据
            this.setCityData(codeList, list);// 缓存数据
          } else {
            Toast.fail(data.errorMsg);
          }
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          this.warehouseLoading = false;
        })
    },
    cityChange2(picker, value, index) {
      const codeList = value.filter((item, i) => {
        return item && item.code && i <= index;
      }).map(item => item.code);
      const len = this.cityList.length;
      if (index === 2) return;// 最后一级变化无需请求接口
      if (!value[index].code) {
        for (let i = index + 1; i < len; i++) {
          picker.setColumnValues(i, []);
        }
        return;
      }
      // 判断缓存内有值
      for (let i = index + 2; i < len; i++) {
        picker.setColumnValues(i, []);
      }
      // console.log(index)
      let flag = false;
      codeList.reduce((pre, cur, i, arr) => {
        const item = pre.find(item => item.code === cur);
        if (i === arr.length - 1) {
          if (item.children && item.children.length > 0) {
            picker.setColumnValues(index + 1, item.children);
            flag = true;
          }
        }
        return item.children || [];
      }, this.allCityList);
      if (flag) {
        return;
      }
      this.cityLoading = true;

      GetReginByCityCode(codeList)
        .then(({ data }) => {
          if (data.success) {
            const list = data.data.map(item => {
              return {
                ...item
              };
            });
            list.unshift({
              code: '',
              name: '请选择'
            });
            picker.setColumnValues(index + 1, list);
            // 存数据
            this.setCityData(codeList, list);// 缓存数据
          } else {
            Toast.fail(data.errorMsg);
          }
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          this.cityLoading = false;
        })
    },
    setCityData(value, list) {
      value.reduce((pre, cur, index, arr) => {
        const item = pre.find(item => item.code === cur);
        if (index === arr.length - 1) {
          item.children = list;
        }
        return item.children || [];
      }, this.allCityList);
    },
    // 函数验证
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validatorNumber(min, max) {
      return (val) => {
        let value = Number(val);
        return value > min && value < max;
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.add-line{
  background: #EEF0F2;
  .submit-btn{
    padding: 0 15px 35px;
  }
  .form-container{
    margin-bottom: 28px;
    padding: 0 12px;
    background: #fff;
  }
}
</style>
<style lang="scss" >
.add-line{
  .driver-dialog .van-dialog__content {
    padding: 0 10px;
  }
  .driver-dialog .van-field__label {
    width: auto;
    margin-right: 20px;
    flex: none;
  }
}
</style>
