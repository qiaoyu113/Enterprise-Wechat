<template>
  <div class="consignorContent">
    <van-cell-group :border="false">
      <van-cell title="公司简称" :value="obj.customerName | DataIsNull" />
      <van-cell title="货主公司主体" :value="obj.customerNameAll | DataIsNull " />
      <van-cell title="城市" :value="obj.cityName | DataIsNull" />
      <van-cell v-if="false" title="线索编号" :value="obj.lineSaleId" />
      <van-cell title="货主编号" :value="obj.customerId | DataIsNull" />
      <div class="middle">
        <van-cell title="业务对接人姓名" :value="obj.bussinessName | DataIsNull" />
        <van-cell title="业主对接人电话" :value="obj.bussinessPhone | DataIsNull" />
        <van-cell title="详细地址" :value="obj.address | DataIsNull" />
      </div>
      <van-cell title="合同止期" :value="obj.contractEnd | DataIsNull" />
      <van-cell title="一级分类" :value="obj.primaryClassificationName | DataIsNull" />
      <van-cell v-if="obj.secondaryClassificationName" title="二级分类" :value="obj.secondaryClassificationName | DataIsNull" />
      <van-cell v-else-if="obj.customerIdOpposite" title="第三方编号" :value="obj.customerIdOpposite | DataIsNull" />
      <van-cell title="结算周期" :value="'('+obj.billingCycle +'天) ' + obj.month + '个月' + obj.day+'天'" />
      <van-cell title="线路销售" :value="obj.lineSaleName" />
    </van-cell-group>
    <div class="btnGroup">
      <van-button type="info" block class="btn">
        创建线路
      </van-button>
      <van-button type="primary" :to="'/bss/consignorEdit?id='+obj.customerId" block class="btn">
        编辑货主
      </van-button>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Button, Cell, CellGroup } from 'vant';
export default {
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  }
}

</script>

<style lang='scss' scoped>
.consignorContent {
  margin: 10px;
  .middle {
    border-top:3px solid #F2F2F2;
    border-bottom:3px solid #F2F2F2;
  }
  .btn {
    margin:30px auto;
  }
}

</style>

