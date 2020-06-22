<template>
  <div class="driverItem">
    <div v-if="Object.keys(driver).length !== 0" class="matchbox">
      <div class="matchnum">
        <div class="matchdirver">
          <span v-text="driver.title"></span>
        </div>
        <div class="numbox">
          <div class="PPtext">
            <span class="num">{{ driver.match.score }}%</span>
            <span class="numtext">匹配度</span>
          </div>
          <van-button
            class="btnsend"
            color="linear-gradient(to right, #F76B1C, #FCA43C)"
            @click="pushDriver()"
          >
            推荐
          </van-button>
        </div>
      </div>
      <div class="matchinfo">
        <div class="matchtitle">
          司机信息...
        </div>
        <div class="matchtype">
          <div class="type_match">
            <div class="match_item">
              <span>所需车型</span>
              <van-icon
                :name="driver.match.carType ? 'checked' : 'warning'"
                size="21"
                :color="driver.match.carType ? '#3ACB8D' : '#DA525E'"
              />
            </div>
            <div class="match_item">
              <span>货物类型</span>
              <van-icon
                :name="driver.match.proType ? 'checked' : 'warning'"
                size="21"
                :color="driver.match.proType ? '#3ACB8D' : '#DA525E'"
              />
            </div>
            <div class="match_item">
              <span>到仓区域</span>
              <van-icon
                :name="driver.match.arriveArea ? 'checked' : 'warning'"
                size="21"
                :color="driver.match.arriveArea ? '#3ACB8D' : '#DA525E'"
              />
            </div>
          </div>
          <div class="type_match">
            <div class="match_item">
              <span>配送区域</span>
              <van-icon
                :name="driver.match.disArea ? 'checked' : 'warning'"
                size="21"
                :color="driver.match.disArea ? '#3ACB8D' : '#DA525E'"
              />
            </div>
            <div class="match_item">
              <span>装卸难度</span>
              <van-icon
                :name="driver.match.handleDiff ? 'checked' : 'warning'"
                size="21"
                :color="driver.match.handleDiff ? '#3ACB8D' : '#DA525E'"
              />
            </div>
            <div class="match_item">
              <span>出车时段</span>
              <van-icon
                :name="driver.match.driveTime ? 'checked' : 'warning'"
                size="21"
                :color="driver.match.driveTime ? '#3ACB8D' : '#DA525E'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Icon, Button, Dialog } from 'vant';
export default {
  name: 'Dirveritem',
  components: {
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },
  props: {
    itemdata: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      driver: {}
    }
  },
  mounted() {
    this.driver = this.itemdata
  },
  methods: {
    pushDriver() {
      Dialog.alert({
        title: '推荐',
        message: '推荐功能暂未开放'
      }).then(() => {
        // on close
      });
    }
  }
};
</script>
<style lang="scss">
.driverItem {
  .matchbox {
    display: flex;
    background-color: white;
    padding: 15px 20px;
    box-sizing: border-box;
    .matchdirver {
      margin-bottom: 16px;
      text-align: center;
      font-size: 14px;
      color: #595f66;
    }
    .matchtitle {
      padding: 4px 11px;
      box-sizing: border-box;
      font-size: 12px;
      color: #595f66;
      margin-bottom: 22.5px;
      background: #eef0f2;
      border-radius: 20px;
    }
    .matchnum {
      width: 120px;
      .numbox {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .PPtext {
          width: 93px;
          height: 93px;
          border-radius: 50%;
          border: 4px solid #ffd976;
          text-align: center;
          padding-top: 15%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          margin-bottom: 8px;
          .num {
            font-weight: bold;
            color: #595f66;
            font-size: 30px;
          }
          .numtext {
            color: rgba(89, 95, 102, 0.72);
            margin-top: 4px;
          }
        }
        .btnsend {
          width: 96px;
          height: 25px;
          line-height: 25px;
          border-radius: 50px;
        }
      }
    }
    .matchinfo {
      flex: 1;
      padding-left: 20px;
      box-sizing: border-box;
    }
    .matchtype {
      .type_match:last-child {
        margin-top: 18px;
      }
      .type_match {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 12px;
        color: #595f66;
        .match_item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
