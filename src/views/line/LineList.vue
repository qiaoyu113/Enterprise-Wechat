<template>
  <div class="linelist">
    <!-- <van-nav-bar
      title="线路管理"
      left-text="返回"
      right-text="+新建"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    /> -->

    <van-search
      disabled
      placeholder="请输入搜索线路名称"
      @click="goSearch"
    />
    <div class="add">
      <van-icon
        name="add"
        size="40"
        color="#4CB0E9"
        @click="handleAddClick"
      />
      <p @click="handleAddClick">
        新建线路
      </p>
    </div>
    <van-tabs
      v-model="active"
      sticky
      class="tab"
      animated
      @change="changelist"
    >
      <van-tab
        v-for="(item, index) in tabarr"
        :key="index"
      >
        <template #title>
          <span v-text="item.name"></span>
          <span
            class="tabnum"
            v-text="`(${item.num})`"
          ></span>
        </template>
      </van-tab>
    </van-tabs>
    <vo-pages
      :data="lineData"
      :loaded-all="loadedAll"
      @pullingUp="pullingUp"
      @pullingDown="pullingDown"
    >
      <div class="listbox">
        <div
          v-for="(itemdata, itemindex) in lineData"
          :key="itemindex"
          class="bottom_spance"
        >
          <lineItem
            class="lineitem"
            :itemdata="itemdata"
          />
        </div>
      </div>
    </vo-pages>
  </div>
</template>
<script>
import VoPages from 'vo-pages';
import 'vo-pages/lib/vo-pages.css';
import lineItem from './components/LineItem';
import { selectListAll } from '@/api/line.js';
import { Toast, NavBar, Icon, Search, Tab, Tabs } from 'vant';
export default {
  name: 'Linelist',
  components: {
    lineItem,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    VoPages
  },
  data() {
    return {
      loadedAll: false,
      beforePullDown: false,
      active: 0,
      tabarr: [
        { name: '已失效', num: 100 },
        { name: '待审核', num: 0 },
        { name: '可售线路', num: 0 },
        { name: '售罄线路', num: 0 }
      ],
      lineData: [],
      listQuery: {
        selfState: 3, // 线路状态
        state: '',
        disableState: 0, // 停用状态
        page: 1, // 当前页
        limit: 25 // 每页大小
      }
    };
  },
  mounted() {
    this.getList();
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true);
    next(true);
  },
  methods: {
    handleAddClick() {
      this.$router.push({
        path: '/bss/add-line'
      });
    },
    // onClickLeft() {
    //   this.$router.push('/bss/index')
    // },
    // onClickRight() {
    //   // this.$router.push('/bss/index')
    //   Toast('按钮');
    // },
    goSearch() {
      this.$router.push('lineSearch');
    },
    pullingDown() {
      this.beforePullDown = false;
      this.listQuery.page = 1;
      this.getList(false);
    },
    pullingUp() {
      this.listQuery.page += 1;
      this.getList();
    },
    changelist(name) {
      this.lineData = [];
      this.listQuery = {
        selfState: '', // 线路状态
        state: '',
        disableState: 0, // 停用状态
        page: 1, // 当前页
        limit: 25 // 每页大小
      };
      switch (name) {
        case 0:
          this.listQuery.selfState = 3;
          break;
        case 1:
          this.listQuery.selfState = 1;
          break;
        case 2:
          this.listQuery.state = 2;
          this.listQuery.selfState = 1;
          break;
        case 3:
          this.listQuery.soldSate = 1;
          break;
      }
      this.lineData = [];
      this.getList();
    },
    getList(loadMore = true) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      selectListAll(this.listQuery)
        .then(({ data }) => {
          if (data.success) {
            Toast.clear();
            let lists = data.data;
            if (loadMore) {
              this.lineData = this.lineData.concat(lists);
            } else {
              this.lineData = lists;
            }
            if (!this.beforePullDown) {
              this.beforePullDown = true;
            }
            if (
              this.lineData.length === data.page.total ||
              this.lineData.length < 4
            ) {
              this.loadedAll = true;
            } else {
              this.loadedAll = false;
            }
            // this.lineData = data.data;
          } else {
            Toast.clear();
            this.loadedAll = true;
            Toast.fail(data.errorMsg);
          }
        })
        .catch(err => {
          Toast.clear();
          Toast.fail(err);
          this.loadedAll = true;
        });
    }
  }
};
</script>
<style lang="scss">
.linelist {
  .add {
    background: white;
    padding-top: 8px;
    margin-top: 8px;
    text-align: center;
    overflow: hidden;
    &:after {
      display: block;
      content: "";
      height: 10px;
      width: 100%;
      background: #f2f2f2;
    }
    p {
      margin: 0px 0px 6px 0px;
      color: #4cb0e9;
      font-size: 14px;
    }
  }
  padding-bottom: 60px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #f2f2f2;
  height: 100vh;
  .van-search {
    padding: 17px 20px;
  }
  .van-tabs__line {
    background-color: #5c9bdd;
    width: 40px !important;
  }
  .van-tab--active {
    color: #5c9bdd !important;
  }
  .listbox {
    // height: 100vh;
    .bottom_spance {
      margin-bottom: 5px;
    }
    .bottom_spance:last-child {
      margin-bottom: 0px;
    }
  }
  .wrapper-child{
    top: -5px;
  }
  .lineitem:last-child {
    margin: 0;
    .item_info {
      border-bottom: none;
    }
  }
}
</style>>
