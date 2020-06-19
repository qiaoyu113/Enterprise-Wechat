<template>
  <div class="lineitem">
    <img class="sale" src="../../../assets/saleover.png" alt="售罄">
    <div class="itembox">
      <div class="item_title" v-text="item.busiTypeName"></div>
      <div class="item_info">
        <div>
          <span>线路名称:</span>
          <span>{{ item.lineName }}</span>
        </div>
        <div>
          <span>仓库位置:</span>
          <span>{{ item.warehouseProvinceName }}{{ item.warehouseCityName }}{{ item.warehouseCountyName }}{{ item.warehouseTownName }}{{ item.warehouseDistrict }}</span>
        </div>
        <div>
          <span>配送区域:</span>
          <span>没找到配送区域</span>
        </div>
        <div>
          <span>到仓时间:</span>
          <span>没找到到仓时间</span>
        </div>
        <div>
          <span>车型:</span>
          <span>{{ item.carTypeName }}</span>
        </div>
        <div>
          <span>用车数量:</span>
          <span>{{ item.deployNum }}/辆</span>
        </div>
        <div>
          <span>已上车:</span>
          <span>{{ item.publishedBidsNum }}/辆</span>
        </div>
      </div>
      <div class="item_title">
        <span>线路状态:</span>
        <span>{{ item.selfState === 0 ? '失效' : item.selfStateName }}</span>
        <span class="statename">({{ item.lineStateName }})</span>
      </div>
      <div class="item_info">
        <div>
          <span>货物类型:</span>
          <span>{{ item.cargoType }}</span>
        </div>
        <div>
          <span>是否搬运:</span>
          <span>没有是否搬运</span>
        </div>
        <div>
          <span>单趟运费:</span>
          <span>{{ item.incomeSettlementMethod === 1 ? item.preLowestQuotations : item.everyTripGuaranteed }}/趟</span>
        </div>
        <div>
          <span>项目收入:</span>
          <span>{{ item.incomeSettlementMethod === 1 ? item.shipperOffer : item.preLowestQuotations }}/月</span>
        </div>
        <div>
          <span>上岗时间:</span>
          <span>{{ item.createDate| Timestamp }}</span>
          <span>~</span>
          <span>{{ item.waitDirveValidity| Timestamp }}</span>
        </div>
        <div>
          <span>创建时间:</span>
          <span>{{ item.createDate| Timestamp }}</span>
        </div>
      </div>
      <div v-if="show" class="item_footer">
        <van-button :disabled="(item.state !== 2 && item.selfState !== 1) || (item.state !== 2 && item.selfState !== 4) || item.selfState !== 2 || item.state !== 1 " size="small" color="#5C9BDD" round type="info" @click="goRouter(0)">
          批量推送
        </van-button>
        <van-button :disabled=" item.selfState === 3 || item.state === 1 " size="small" color="#5C9BDD" round type="info" @click="goRouter(1)">
          匹配撮合
        </van-button>
        <van-button size="small" plain hairline round type="info" @click="goRouter(2)">
          查看详情
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from 'vant'
export default {
  name: 'Lineitem',
  components: {
    [Button.name]: Button
  },
  props: {
    itemdata: {
      type: Object,
      default: () => {}
    },
    showfooter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      item: {},
      show: true
    };
  },
  mounted() {
    console.log('tag', this.itemdata)
    this.item = this.itemdata;
    this.show = this.showfooter;
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true)
    next(true);
  },
  methods: {
    goRouter(val) {
      console.log(this.item)
      switch (val) {
        case 0:
          this.$router.push()
          break;
        case 1:
          this.$router.push({
            name: 'outSide',
            query: {
              item: this.item.toString()
            }
          })
          break;
        case 2:
          this.$router.push()
          break;
      }
    }
  }
};
</script>
<style lang="scss">
.lineitem {
  .sale{
    width: 60px;
    height: 60px;
    position: absolute;
    right: 16px;
    top: 16px;
  }
  background-color: #EEF0F2;
  position: relative;
  margin-bottom: 5px;
  .itembox{
    background-color: white;
    .item_title{
      padding: 8px 20px;
      box-sizing: border-box;
      font-size: 15px;
      color: #595F66;
      border-bottom: 1px solid #EEF0F2;
      .statename{
        font-size: 15px;
        color: #5C9BDD;
        line-height: 21px;
      }
    }
    .item_info{
      padding: 7px 20px;
      box-sizing: border-box;
      font-size: 13px;
      color: rgba(89,95,102,0.72);
      line-height: 22.5px;
      border-bottom: 4px solid #EEF0F2;
    }
      .item_footer {
        width: 100%;
        padding: 6px 22.5px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        .linedetail{
          background: white;
          color:#5C9BDD;
          border: 1px solid #5C9BDD;
        }
      }
  }
  // position: relative;
  // overflow: hidden;
  // .overtag {
  //   z-index: 99;
  //   width: 80px;
  //   height: 15px;
  //   text-align: center;
  //   line-height: 15px;
  //   background-color: #d81e06;
  //   color: white;
  //   font-size: 6px;
  //   position: absolute;
  //   top: -25px;
  //   left: -35px;
  //   transform: rotate(-45deg);
  //   transform-origin: 100% 100%;
  //   -ms-transform: rotate(-45deg); /* IE 9 */
  //   -ms-transform-origin: 100% 100%;/* IE 9 */

  //   -webkit-transform: rotate(-45deg); /* Safari 和 Chrome */
  //   -webkit-transform-origin: 100% 100%; /* Safari 和 Chrome */

  //   -moz-transform: rotate(-45deg); /* Firefox */
  //   -moz-transform-origin: 100% 100%; /* Firefox */

  //   -o-transform: rotate(-45deg); /* Opera */
  //   -o-transform-origin: 100% 100%; /* Opera */
  // }
  // background-color: white;
  // margin-top: 5px;
  // width: 100%;
  // padding: 0 10px;
  // box-sizing: border-box;
  // .item_body {
  //   display: flex;
  // }
  // .item_right{
  //   padding-left: 10px;
  //   box-sizing: border-box;
  // }
  // .item_left,
  // .item_right {
  //   width: 50%;
  //   display: flex;
  //   flex-direction: column;
  //   .label_box {
  //     min-width: 60px;
  //     text-align: right;
  //   }
  //   .box_title {
  //     width: 60px;
  //     display: flex;
  //     font-weight: bold;
  //     justify-content: flex-end;
  //     color: #ffcc66;
  //   }
  //   .left_box > div {
  //     display: flex;
  //     margin: 10px 0;
  //     line-height: 13px;
  //     font-size: 13px;
  //     line-height: 16px;
  //   }
  // }
}
</style>

