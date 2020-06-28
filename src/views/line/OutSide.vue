<template>
  <div class="outside">
    <!-- <van-nav-bar
      title="外线主导"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    /> -->
    <div class="list-wrap">
      <vo-pages
        :data="dirverInfo"
        :loaded-all="loadedAll"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <lineItem
          :itemdata="itemdata"
          :showfooter="false"
        />
        <div v-if="dirverInfo.length !== 0" class="toastquesition">
          <div class="toastquesition_left">
            <van-icon
              name="friends-o"
              size="20"
              color="#5C9BDD"
            />
            <span class="drivernum">
              匹配司机数量:
            </span>
            <span v-text="total+'个'"></span>
          </div>
          <van-icon
            name="question"
            size="20"
            color="#BCCCDE"
            @click="showToast"
          />
        </div>
        <div class="matchlist">
          <div
            v-for="(item, index) in dirverInfo"
            :key="index"
            class="listbox"
          >
            <dirverItem :itemdata="item" />
          </div>
        </div>
      </vo-pages>
    </div>
  </div>
</template>
<script>
import lineItem from './components/LineItem';
import dirverItem from './components/dirverItem';
import { getOutside } from '@/api/line';
import VoPages from 'vo-pages';
import 'vo-pages/lib/vo-pages.css'
import { Toast, NavBar, Icon, Dialog, Button } from 'vant';
export default {
  name: 'Outside',
  components: {
    VoPages,
    lineItem,
    dirverItem,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Button.name]: Button
  },
  data() {
    return {
      beforePullDown: false,
      loadedAll: false,
      total: '',
      itemdata: {},
      dirverInfo: [],
      driverQuery: {
        lineId: '',
        page: 1,
        limit: 25,
        carType: '全部'
      }
    };
  },
  created() {
    let str = this.$route.query.itemdata;
    this.itemdata = JSON.parse(str);
    this.driverQuery.lineId = this.itemdata.lineId
  },

  activated() {
    this.getOutside();
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true);
    next(true);
  },
  methods: {
    pullingDown() {
      this.beforePullDown = false;
      this.driverQuery.page = 1;
      this.getOutside(false);
    },
    pullingUp() {
      this.driverQuery.page += 1;
      this.getOutside();
    },
    showToast() {
      Dialog.alert({
        title: '匹配机制',
        message: '根据司机接活意向与线路属性对比计算打分，100分满分。对打分规则及权重有疑问的，请联系梧桐外线纵线运营'
      }).then(() => {
        // on close
      });
    },
    onClickLeft() {
      this.$router.push('/bss/index');
    },
    async getOutside(loadMore = true) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      try {
        let { data: res } = await getOutside(this.driverQuery);
        if (res.success) {
          Toast.clear();
          let info = res.data;
          let total = res.page.total;
          this.total = total;
          if (loadMore) {
            this.dirverInfo = this.dirverInfo.concat(info);
          } else {
            this.dirverInfo = info;
          }
          if (!this.beforePullDown) {
            this.beforePullDown = true;
          }
          if (
            this.dirverInfo.length === this.total ||
            this.dirverInfo.length < 4
          ) {
            this.loadedAll = true;
          } else {
            this.loadedAll = false;
          }
        } else {
          Toast.fail(res.errorMsg);
        }
      } catch (err) {
        Toast.fail(err.errorMsg);
      }
    }
  }
};
</script>
<style lang="scss">
.outside {
  min-height: 100vh;
  padding-bottom: 50px;
  box-sizing: border-box;
  .list-wrap {
    height: 100%;
    overflow: hidden;
  }
  .lineitem {
    margin: 0;
  }
  .lineitem {
    margin: 0;
    .item_info {
      border-bottom: none;
    }
  }
  .matchlist {
    .listbox {
      margin-bottom: 10px;
    }
    .listbox:last-child {
      margin: 0;
    }
  }
  background-color: #eef0f2;
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
    margin-top: 10px;
    padding: 10px 20px;
    background-color: white;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .toastquesition_left {
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #595f66;
      font-weight: bold;
      .drivernum {
        margin: 0 10px;
      }
    }
  }
}
</style>
