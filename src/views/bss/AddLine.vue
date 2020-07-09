<template>
  <div class="add-line" ontouchstart>
    <van-form
      class="form"
      @submit="onSubmit"
    >
      <div class="form-container">
        <van-field
          v-model="customerItem.customerName"
          required
          readonly
          is-link
          v-bind="$attrs"
          :disabled="!!(isCopy || isCustomer)"
          label="货主名称:"
          placeholder="请选择货主"
          :rules="[{ required: true, message: '请选择货主' }]"
          @click="showPicker = !(isCopy || isCustomer)"
        />
        <van-field
          v-model="form.lineName"
          maxlength="20"
          minlength="1"
          required
          label="线路名称:"
          placeholder="名称应具有识别度"
          :rules="[{ required: true, message: '请填写线路名称' }]"
        />

        <van-field
          :value="warehouse"
          required
          readonly
          clickable
          is-link
          label="仓库位置:"
          placeholder="请选择仓库位置"
          :rules="[{ required: true, message: '请选择仓库位置' }]"
          @click="showWarehousePicker = true"
        />
        <van-field
          :value="cityTextVal"
          required
          readonly
          clickable
          is-link
          label="配送区域:"
          placeholder="请选择配送区域"
          :rules="[{ required: true, message: '请选择配送区域' }]"
          @click="showCityPicker = true"
        />
        <van-field
          v-model="form.distance"
          required
          label="配送公里:"
          placeholder="请输入配送公里"
          type="digit"
          :rules="[
            { required: true, message: '请输入配送公里' },
          ]"
        />
        <BssPicker
          :data="carList"
          required
          label="车型:"
          placeholder="请选择车型"
          is-link
          :value.sync="form.carType"
          :rules="[{ required: true, message: '请选择车型' }]"
        />
        <van-field
          v-model="form.deployNum"
          required
          label="用车数量:"
          type="digit"
          placeholder="请输入用车数量"
          :rules="[
            { required: true, message: '请输入用车数量' },
            { validator: validatorNumber(0, 99), message: '请输入1至99的整数' }
          ]"
        />
        <van-field
          v-model="form.deliveryNum"
          required
          label="每日平均配送点位数:"
          placeholder="请输入每日平均配送点位数"
          type="digit"
          :rules="[
            { required: true, message: '请输入每日平均配送点位数' },
            { validator: validatorNumber(0, 100), message: '请输入1至100的整数' }
          ]"
        />
        <BssPicker
          :data="cargoList"
          required
          label="货物类型:"
          placeholder="请选择货物类型"
          is-link
          code-val="code"
          :value.sync="form.cargoType"
          :rules="[{ required: true, message: '请选择货物类型' }]"
        />
        <BssPicker
          :data="goodsWeightList"
          required
          label="货物总重量（吨）:"
          placeholder="请选择货物总重量（吨）"
          is-link
          :value.sync="form.goodsWeight"
          :rules="[{ required: true, message: '请选择货物总重量（吨）' }]"
        />

        <van-field
          required
          label="是否搬运:"
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
        <div v-if="form.carry === '1'">
          <BssPicker
            :data="handlingDifficultyList"
            required
            label="装卸难度:"
            placeholder="请选择装卸难度"
            is-link
            :value.sync="form.handlingDifficultyDegree"
            :rules="[{ required: true, message: '请选择装卸难度' }]"
          />
          <van-field
            v-model="form.volume"
            required
            label="预计每日货物总体积(立方米):"
            type="digit"
            placeholder="请输入预计每日货物总体积"
            :rules="[
              { required: true, message: '请输入预计每日货物总体积' },
              { validator: validatorNumber(0, 100), message: '请输入1至99的整数' }
            ]"
          />
        </div>

        <van-field
          v-model="form.month"
          required
          label="月出车天数:"
          placeholder="请输入月出车天数"
          type="digit"
          :rules="[
            { required: true, message: '请输入月出车天数' },
            { validator: validatorNumber(0, 32), message: '请输入1至31的整数' }
          ]"
        />
        <van-field
          required
          label="每日出车趟数:"
          placeholder="请输入每日出车趟数"
        >
          <template #input>
            <van-stepper v-model="form.dayNum" disable-input min="1" max="5" />
          </template>
        </van-field>
        <div v-for="(item, index) in form.lineDeliveryInfoFORMS" :key="index">
          <div>
            <BssTimePicker
              :value.sync="item.workingTimeStart"
              required
              readonly
              clickable
              is-link
              label="到仓时间:"
              placeholder="请输入到仓时间"
              :rules="[{ required: true, message: '请选择到仓时间' }]"
            />
            <BssTimePicker
              :value.sync="item.workingTimeEnd"
              required
              readonly
              clickable
              is-link
              label="结束时间:"
              placeholder="请输入结束时间"
              :rules="[{ required: true, message: '请输入结束时间' }]"
            />
          </div>
        </div>

        <van-field
          required
          label="收入结算方式:"
        >
          <template #input>
            <van-radio-group v-model="form.incomeSettlementMethod" direction="horizontal">
              <van-radio name="1">
                按趟
              </van-radio>
              <van-radio name="2">
                保底提成
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!-- 按趟结算 -->
        <div v-if="form.incomeSettlementMethod === '1'">
          <van-field
            v-model="form.lowestQuotations"
            required
            label="单趟运费:"
            placeholder="请输入单趟运费"
            type="digit"
            :rules="[
              { required: true, message: '请输入单趟运费' },
              { validator: validatorNumber(0, 5001), message: '请输入1至5000的整数' }
            ]"
          />
          <div v-show="false">
            {{ shipper }}
          </div>
        </div>
        <!-- 按底薪结算 -->
        <div v-if="form.incomeSettlementMethod === '2'">
          <van-field
            v-model="form.everyTripGuaranteed"
            required
            label="每趟保底(元):"
            type="digit"
            placeholder="请输入每趟保底"
            :rules="[
              { required: true, message: '请输入每趟保底' },
            ]"
          />
          <van-field
            v-model="form.everyUnitPrice"
            required
            label="每趟提成单价(元):"
            name="每趟提成单价(元)"
            type="digit"
            placeholder="请输入每趟提成单价"
            :rules="[
              { required: true, message: '请输入每趟提成单价' },
            ]"
          />
          <van-field
            v-model="form.lowestQuotations"
            required
            label="预计货主月报价(元):"
            type="digit"
            placeholder="请输入预计货主月报价"
            :rules="[
              { required: true, message: '请输入预计货主月报价' },
            ]"
          />
        </div>
        <van-field
          required
          label="是否返仓:"
        >
          <template #input>
            <van-radio-group v-model="form.returnWarehouse" direction="horizontal">
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
          label="是否回单:"
        >
          <template #input>
            <van-radio-group v-model="form.returnBill" direction="horizontal">
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
          v-model="form.waitDirveValidityDuration"
          required
          label="线路有效期（天）:"
          placeholder="请输入线路有效期"
          :rules="[
            { required: true, message: '请输入线路有效期' },
            { validator: validatorNumber(0, 32), message: '请输入1至31的整数' }
          ]"
        />
        <van-field
          required
          label="线路类型:"
        >
          <template #input>
            <van-radio-group v-model="form.lineType" direction="horizontal">
              <van-radio
                v-for="(item, index) in distinguishedTypeList"
                :key="index"
                :name="item.codeVal"
              >
                {{ item.code }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <BssPicker
          :data="stabilityList"
          required
          label="线路稳定性:"
          placeholder="请输入线路稳定性"
          is-link
          :value.sync="form.stabilityRate"
          :rules="[{ required: true, message: '请输入线路稳定性' }]"
        />
        <van-field
          v-if="form.stabilityRate == '4' || form.stabilityRate == '3'"
          :value="deliveryName"
          required
          is-link
          readonly
          label="配送时间:"
          placeholder="请输入配送时间"
          :rules="[
            { required: true, message: '请输入配送时间' }
          ]"
          @click="showDate = true"
        />
      </div>
      <div class="submit-btn">
        <van-button round block type="info" class="van-button-color" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

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
        title="选择线路区域"
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

    <!-- 配送时间 -->
    <van-popup v-model="showDate" position="bottom">
      <div class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel" @click="showDate = false">
          取消
        </button><button type="button" class="van-picker__confirm" @click="onConfirm">
          确认
        </button>
      </div>
      <div>
        <van-cell-group>
          <van-cell
            clickable
            :title="`全选`"
            @click="toggle(-1)"
          >
            <template #right-icon>
              <van-checkbox v-model="allChecked" />
            </template>
          </van-cell>
          <van-cell
            v-for="(item, index) in dateList"
            :key="index"
            clickable
            :title="item"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox ref="checkboxes" v-model="deliveryTimeArr[index]" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-popup>
    <!-- 遮罩 -->
    <van-overlay :show="loading" z-index="99">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" vertical>
          {{ loadingText }}...
        </van-loading>
      </div>
    </van-overlay>
    <!-- 货主列表 -->
    <van-popup
      v-model="showPicker"
      position="bottom"
      style="height: 100%;"
    >
      <van-sticky>
        <van-search
          v-model="searchVal"
          show-action
          placeholder="请输入货主名称"
          background="#F2F2F2"
          :clearable="false"
          @input="onSearch"
          @search="onSearch"
          @cancel="onCancel"
        >
        </van-search>
      </van-sticky>
      <div v-if="customers.length > 0" class="picker-content">
        <van-cell
          v-for="(item, index) in customers"
          :key="index"
          :title="item.customerName"
          @click="onConfirmSearch(item)"
        >
          <template #right-icon>
            <van-icon v-show="item.customerId === form.customerId" name="success" style="" />
          </template>
        </van-cell>
      </div>
      <div v-else class="noData">
        <img src="../../assets/search.png">
        <div class="text">
          抱歉,未找到相关数据!
        </div>
      </div>
      <div class="picker-bottom"></div>
    </van-popup>
  </div>
</template>

<script>

import { dictionary, GetReginByCityCode, getTownByCountryCode } from '@/api/common';
import { getLineUser, postCreatLine, getLineDetail, putCreatLine } from '@/api/carline';
import { getClientDetail } from '@/api/consignor'
import BssPicker from 'components/BssPicker';
import BssTimePicker from 'components/BssTimePicker';
import { Form, Field, Toast, CellGroup, Cell, Button, Dialog, Loading, Picker, Popup, RadioGroup, Radio, Stepper, DatetimePicker, Checkbox, CheckboxGroup, Overlay, Search, Sticky, Icon } from 'vant';
import { debounce } from '@/utils/index';

const defaultForm = {
  customerId: '', // 货主
  lineName: '',
  city: '', // 城市
  // 仓位置
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
  month: '', // 月出车天数
  dayNum: '', // 每日出车躺数
  lineDeliveryInfoFORMS: [ // 配送时间List
    {
      workingTimeStart: '',
      workingTimeEnd: ''
    }
  ],
  firstNeededFollow: '1',
  monthlyFuelConsumption: 0,
  incomeSettlementMethod: '', // 结算方式
  lowestQuotations: '',
  everyTripGuaranteed: '',
  everyUnitPrice: '',
  returnWarehouse: '', // 是否返仓
  returnBill: '', // 是否回单
  waitDirveValidityDuration: '', // 线路有效期
  stabilityRate: '', // 线路稳定性
  shipperOffer: '',
  lineType: '', // 线路类型
  carType: '', // 车型
  volume: '',
  handlingDifficultyDegree: '',
  deliveryWeekCycle: '' // 配送时间
}
export default {
  name: 'BssAddLine',
  components: {
    BssPicker,
    BssTimePicker,
    [Form.name]: Form,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Dialog.Component.name]: Dialog.Component,
    [Loading.name]: Loading,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Stepper.name]: Stepper,
    [DatetimePicker.name]: DatetimePicker,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Overlay.name]: Overlay,
    [Search.name]: Search,
    [Sticky.name]: Sticky,
    [Icon.name]: Icon
  },
  data() {
    return {
      // 货主进入创建线路锁定货主名称
      isCustomer: false,

      lineId: '',
      isCopy: '',
      // 货主
      searchVal: '',
      customerItem: {},
      customers: [], // 货主列表
      showPicker: false,
      // 仓位置
      warehouseList: [], // 仓列表
      warehouse: '', // 仓位置整体
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
      // 货物类型
      cargoList: [],
      // 货物重量
      goodsWeightList: [],
      // 装卸难度
      handlingDifficultyList: [],
      // 线路类型
      distinguishedTypeList: [],
      // 线路稳定性
      stabilityList: [],
      // 星期
      showDate: false,
      deliveryName: '',
      deliveryTimeArr: new Array(7).fill(false), // 星期
      dateList: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      allChecked: false,

      loading: false,
      loadingText: '正在提交',
      form: Object.assign({}, defaultForm)
    }
  },
  computed: {
    shipper() {
      return this.form.lowestQuotations * this.form.dayNum * this.form.month
    }
  },
  watch: {
    'form.dayNum'(val) {
      const len = this.form.lineDeliveryInfoFORMS.length;
      if (len > val) {
        this.form.lineDeliveryInfoFORMS.pop()
      } else if (len < val) {
        this.form.lineDeliveryInfoFORMS.push({
          workingTimeStart: '',
          workingTimeEnd: ''
        })
      }
    },
    'deliveryTimeArr'(val) {
      let str = [];
      val.filter((item, index) => {
        item ? str.push(index + 1) : ''
      });
      this.allChecked = str.length === 7;
      // this.form.deliveryWeekCycle = str.join(',');
    }
  },
  mounted() {
    this.lineId = this.$route.query.id;
    this.isCopy = !!this.$route.query.iscopy;
    const { customerId, city } = this.$route.query;
    this.isCustomer = !!(customerId && city);
    if (this.isCustomer) {
      this.form.customerId = customerId;
      this.form.city = city;
    }
    if (this.lineId) {
      // 请求详情
      this.getDetail();
    }
    this.fetchData();
  },
  beforeRouteLeave(to, from, next) {
    if (!this.leave && !this.isComplete()) {
      return this.onClickLeft(next)
    } else {
      next()
    }
  },
  methods: {
    toggle(index) {
      if (index === -1) {
        this.allChecked = !this.allChecked;
        this.deliveryTimeArr = new Array(7).fill(this.allChecked);
      } else {
        this.$refs.checkboxes[index].toggle();
      }
    },
    isComplete() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          const item = this.form[key];
          if (item !== '') {
            return false;
          }
        }
      }
      return true
    },
    onClickLeft(next) {
      Dialog.confirm({
        title: '提示',
        message: '请确认不在填写信息,返回上一个页面!',
        confirmButtonColor: '#5C9BDD'
      }).then(() => {
        this.leave = true; // 用户点击确认，为了离开当前页面，随便赋值
        next();
      }).catch(() => {
        next(false)
      });
    },
    onConfirm() {
      const val = this.deliveryTimeArr;
      let str = [];
      val.filter((item, index) => {
        item ? str.push(index + 1) : ''
      });
      this.form.deliveryWeekCycle = str.join(',');
      this.deliveryName = this.dateList.filter((item, index) => {
        return str.includes(index + 1)
      }).join(',')
      this.showDate = false
    },
    fetchData() {
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
      }).catch(({ message }) => {
        Toast.fail(message)
      });
      // 车型
      dictionary({
        dictType: 'Intentional_compartment'
      }).then(res => {
        this.carList = res.data.data;
      }).catch(({ message }) => {
        Toast.fail(message)
      });
      // 货物类型
      dictionary({
        dictType: 'type_of_goods'
      }).then(res => {
        this.cargoList = res.data.data;
      }).catch(({ message }) => {
        Toast.fail(message)
      });
      // 货物总重量
      dictionary({
        dictType: 'goods_weight'
      }).then(res => {
        this.goodsWeightList = res.data.data;
      }).catch(({ message }) => {
        Toast.fail(message)
      });
      // 每日配送趟数
      dictionary({
        dictType: 'line_task_daynum'
      }).then(res => {
        this.lapNumList = res.data.data;
      }).catch(({ message }) => {
        Toast.fail(message)
      })
      // 装卸难度
      dictionary({
        dictType: 'handling_difficulty_degree'
      }).then(res => {
        this.handlingDifficultyList = res.data.data;
      }).catch(({ message }) => {
        Toast.fail(message)
      });
      // 线路类型
      dictionary({
        dictType: 'line_type'
      }).then(res => {
        this.distinguishedTypeList = res.data.data;
      }).catch(({ message }) => {
        Toast.fail(message)
      });
      // 稳定性
      dictionary({
        dictType: 'linetask_stability_rate'
      }).then(res => {
        this.stabilityList = res.data.data;
      }).catch(({ message }) => {
        Toast.fail(message)
      });
      // 如果有货主
      if (this.isCustomer) {
        getClientDetail({
          customerId: this.form.customerId
        })
          .then((result) => {
            const data = result.data.data;
            this.onConfirmSearch(data);
          }).catch(({ message }) => {
            Toast.fail(message)
          })
      }
    },
    onSubmit() {
      if (this.form.incomeSettlementMethod === '1' && this.form.lowestQuotations - this.form.monthlyFuelConsumption <= 0) {
        Toast.fail('单趟去油净收入必须大于0');
        this.btnPass = true
        return false;
      }
      if (this.form.incomeSettlementMethod === '1') {
        // 按趟结算
        this.form.shipperOffer = this.shipper;
      }
      if (this.lineId && !this.isCopy) {
        // 编辑
        this.editForm();
        return;
      }
      this.loading = true;
      this.loadingText = '正在提交';
      const postData = {
        ...this.form
      }
      if (this.isCopy) {
        delete postData.lineId;
      }
      postCreatLine(postData)
        .then(({ data }) => {
          this.loading = false;
          if (data.success) {
            this.leave = true;
            Toast.success('创建成功');
            setTimeout(() => {
              this.$router.push('/bss/lineList')
            }, 800)
          } else {
            Toast.fail(data.errorMsg || '网络错误请稍后再试')
          }
        }).catch(({ message }) => {
          this.loading = false;
          Toast.fail(message)
        }).finally(() => {
          this.loading = false;
        });
    },
    // 货主
    onSearch: debounce(function() {
      if (!this.searchVal) {
        return
      }
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      getLineUser({
        q: this.searchVal
      })
        .then((result) => {
          toast.clear()
          this.customers = result.data.data;
        }).catch(({ message }) => {
          toast.clear()
          Toast.fail(message)
        }).finally(() => {
          toast.clear()
        })
    }, 500),
    onConfirmSearch(item) {
      this.customerItem = item;
      this.form.customerId = item.customerId;
      this.form.city = item.city;
      this.showPicker = false;
    },
    onCancel() {
      this.showPicker = false;
    },
    // 仓位置
    onWarehouseConfirm(value) {
      const list = value.filter(item => item && item.code)
      if (list.length === 4) {
        this.warehouse = list.map(item => item.name).join(''); // 仓位置整体
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
    // 城市
    onCityConfirm(value) {
      const list = value.filter(item => item && item.code)
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
    setWarehouseDistrict(action, done) {
      if (action === 'confirm') {
        this.warehouse = this.warehouse + this.form.warehouseDistrict;
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
            this.warehouseLoading = false;
            const list = data.data.map(item => {
              return {
                ...item
              };
            });
            this.setCityData(codeList, list);// 存数据
            picker.setColumnValues(index + 1, list);
          }).catch(({ message }) => {
            this.warehouseLoading = false;
            Toast.fail(message)
          }).finally(() => {
            this.warehouseLoading = false;
          });
        return;
      }
      GetReginByCityCode(codeList)
        .then(({ data }) => {
          this.warehouseLoading = false;
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
        }).catch(({ message }) => {
          this.warehouseLoading = false;
          Toast.fail(message);
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
          this.cityLoading = false;
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
        }).catch(({ message }) => {
          this.cityLoading = false;
          Toast.fail(message);
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
    },
    getDetail() {
      this.loading = true;
      this.loadingText = '数据加载中'
      getLineDetail({
        lineId: this.lineId
      }).then((res) => {
        this.loading = false;
        const data = res.data.data;
        if (res.data.success) {
          this.customerItem = {
            customerId: Number(data.customerId),
            customerName: data.customerName
          }
          this.form.lineId = data.lineId;
          this.form.warehouseProvince = data.warehouseProvince;
          this.form.warehouseCity = data.warehouseCity;
          this.form.warehouseCounty = data.warehouseCounty;
          this.form.warehouseDistrict = data.warehouseDistrict;
          this.form.warehouseTown = data.warehouseTown;
          this.form.wareAreaName = data.warehouseCountyName;
          this.form.everyTripGuaranteed = Number(data.everyTripGuaranteed);
          this.form.everyUnitPrice = Number(data.everyUnitPrice);
          this.form.goodsWeight = String(data.goodsWeight);

          this.form.customerId = Number(data.customerId);
          this.form.lineName = data.lineName;
          this.form.deliveryWeekCycle = data.deliveryWeekCycle;

          if (data.deliveryWeekCycle && data.deliveryWeekCycle.split(',').length > 0) {
            const arr = data.deliveryWeekCycle.split(',')
            this.deliveryTimeArr = this.deliveryTimeArr.map((item, index) => {
              return arr.includes(String(index + 1));
            })
          }

          this.form.city = String(data.city);
          this.form.carType = String(data.carType);
          this.form.cargoType = data.cargoType;
          this.warehouse = data.warehouse;
          this.form.carry = String(data.carry);
          this.form.returnWarehouse = String(data.returnWarehouse);
          this.form.lowestQuotations = data.preLowestQuotations;
          this.form.deliveryNum = data.deliveryNum;
          this.form.distance = data.distance;
          this.form.month = data.month;
          this.form.lineDeliveryInfoFORMS = data.lineDeliveryInfoFORMS;
          // this.form.endTime = data.workingTimeEnd;
          this.form.volume = data.volume;
          this.form.dayNum = String(data.dayNum);
          this.form.districtArea = data.districtArea;
          this.form.remark = data.remark;
          this.form.returnBill = String(data.returnBill);
          this.form.cityArea = data.cityArea;
          this.form.provinceArea = data.provinceArea;
          this.form.countyArea = data.countyArea;
          this.form.deployNum = data.deployNum;
          this.form.firstNeededFollow = data.firstNeededFollow.toString();
          this.form.lineType = String(data.lineType);
          this.form.incomeSettlementMethod = String(data.incomeSettlementMethod);
          this.form.monthlyFuelConsumption = data.monthlyFuelConsumption;
          this.form.waitDirveValidityDuration = data.waitDirveValidityDuration;
          this.form.stabilityRate = String(data.stabilityRate);
          this.form.handlingDifficultyDegree = String(data.handlingDifficultyDegree);
          this.cityTextVal = String(data.provinceAreaName) + String(data.cityAreaName) + String(data.countyAreaName) + String(data.districtArea);
          this.form.singleCargoWeight = String(data.singleCargoWeight);

          this.$nextTick(() => {
            this.onConfirm()
          })
        } else {
          Toast.fail(data.errorMsg)
        }
      }).catch(({ message }) => {
        this.loading = false;
        Toast.fail(message);
      }).finally(() => {
        this.loading = false;
      })
    },
    editForm() {
      this.loading = true;
      this.loadingText = '正在提交';
      putCreatLine(this.form)
        .then(({ data }) => {
          this.loading = false;
          if (data.success) {
            this.leave = true;
            Toast.success('提交成功');
            setTimeout(() => {
              this.$router.push('/bss/lineList')
            }, 800)
          } else {
            Toast.fail(data.errorMsg || '网络错误请稍后再试')
          }
        }).catch(({ message }) => {
          this.loading = false;
          Toast.fail(message)
        }).finally(() => {
          this.loading = false;
        });
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
  // 扩大输入框点击范围
  .van-field__body{
    position: relative;
    // height: 100%;
    &::before{
      content:"";
      display: block;
      height: 24px;
    }
    >input{
      position: absolute;
      top: -10px;
      bottom: -10px;
      right: 0;
      left: 0;
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
  .noData {
    height:calc(100vh - 54px);
    padding-top: 41.5px;
    box-sizing: border-box;
    background-color: white;
    text-align: center;
    .text {
      margin-top: 15px;
      font-size: 15px;
      color: #656565;
      text-align: center;
    }
    img {
      width: 83px;
      height:74px;
    }
  }
}
</style>
