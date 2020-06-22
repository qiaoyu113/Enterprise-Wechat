<template>
  <div class="outside">
    <!-- <van-nav-bar
      title="外线主导"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    /> -->
    <lineItem v-if="six" :itemdata="itemdata" :showfooter="false" />
    <div class="toastquesition">
      <div class="bordertoast">
        <span>
          <span>
            匹配司机数量
          </span>
          <span>5个</span>
        </span>
        <van-icon
          name="question"
          size="20"
          @click="showToast"
        />
      </div>
    </div>
    <div class="matchlist">
      <div class="matchbox">
        <div class="matchnum">
          <div class="matchtitle">
            <span>张司机</span>
            <span>/</span>
            <span>共享司机</span>
          </div>
          <div class="numbox">
            <span class="PPtext">
              匹配度:
            </span>
            <span class="num">75%</span>
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
                  name="checked"
                  size="20"
                  color="#1d8a09"
                />
              </div>
              <div class="match_item">
                <span>货物类型</span>
                <van-icon
                  name="checked"
                  size="20"
                  color="#1d8a09"
                />
              </div>
              <div class="match_item">
                <span>到仓区域</span>
                <van-icon
                  name="checked"
                  size="20"
                  color="#1d8a09"
                />
              </div>
            </div>
            <div class="type_match">
              <div class="match_item">
                <span>配送区域</span>
                <van-icon
                  name="warning"
                  size="20"
                  color="#d81e06"
                />
              </div>
              <div class="match_item">
                <span>装卸难度</span>
                <van-icon
                  name="warning"
                  size="20"
                  color="#d81e06"
                />
              </div>
              <div class="match_item">
                <span>出车时段</span>
                <van-icon
                  name="warning"
                  size="20"
                  color="#d81e06"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lineItem from './components/LineItem';
import { getOutside } from '@/api/line'
import { Toast, NavBar, Icon, Dialog } from 'vant';
export default {
  name: 'Outside',
  components: {
    lineItem,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      six: true,
      itemdata: {},
      driverQuery: {
        joinMgr: '',
        query: '',
        lineId: '',
        page: 1,
        limit: 100,
        carType: '全部'
      }
    };
  },
  activated() {
    this.itemdata = this.$route.params.item;
    this.six = true
  },
  mounted() {
    console.log(this.$route.query.item, 'outside')
    this.itemdata = this.$route.params.item;
    // this.six = true
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true)
    next(true);
  },
  methods: {
    showToast() {
      Dialog.alert({
        title: '匹配机制',
        message: '弹窗内容'
      }).then(() => {
        // on close
      });
    },
    onClickLeft() {
      this.$router.push('/bss/index');
    },
    getOutside() {
      getOutside(this).then()
    }
  }
};
</script>
<style lang="scss">
.outside {
  .lineitem {
    margin: 0;
  }
  background-color: #e4e4e4;
  min-height: 100vh;
  // .van-nav-bar .van-icon,
  // .van-nav-bar__text,
  // .van-tab--active {
  //   color: #333333 !important;
  // }
  // .van-nav-bar__title {
  //   font-weight: bold;
  // }
  // .van-nav-bar__right {
  //   top: 8px;
  //   font-size: 12px;
  // }
  .toastquesition {
    padding: 0 10px;
    box-sizing: border-box;
    height: 25px;
    .bordertoast {
      height: 100%;
      line-height: 25px;
      font-weight: bold;
      border-top: 1px solid black;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .matchbox {
    display: flex;
    background-color: white;
    padding: 10px;
    box-sizing: border-box;
    .matchtitle {
      height: 40px;
    }
    .matchnum {
      width: 120px;
      .numbox {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .PPtext {
          -webkit-writing-mode: vertical-rl;
          writing-mode: vertical-rl;
          letter-spacing: 2px;
        }
        .num {
          font-weight: bold;
        }
      }
    }
    .matchinfo {
      flex: 1;
      padding-left: 20px;
      box-sizing: border-box;
    }
    .matchtype {
      .type_match {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .match_item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
