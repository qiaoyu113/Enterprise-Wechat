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

    <section>
      <vo-pages
        :data="lineData"
        :loaded-all="loadedAll"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <div class="listbox">
          <div
            v-for="(itemdata, itemindex) in lineData"
            :id="itemindex === 0 ? 'listbox' : ''"
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
    </section>
  </div>
</template>
<script>
import VoPages from 'vo-pages';
import 'vo-pages/lib/vo-pages.css';
import lineItem from './components/LineItem';
import { getUserInfo } from '@/api/common';
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
        { name: '已失效', num: 0, type: 'expiredNum' },
        { name: '待审核', num: 0, type: 'waitApplyNum' },
        { name: '可售线路', num: 0, type: 'canSellNum' },
        { name: '售罄线路', num: 0, type: 'isSoldNum' }
      ],
      lineData: [],
      citys: [],
      listQuery: {
        page: 1, // 当前页
        limit: 25 // 每页大小
      }
    };
  },
  async activated() {
    window.vue = this
    await this.getUserCity();
    await this.getTitle();
    this.listQuery.selfState = 3;
    this.listQuery.state = 3;
    await this.getList();
  },
  // async mounted() {
  //   await this.getUserCity();
  //   await this.getTitle();
  //   this.listQuery.selfState = 3;
  //   await this.getList();
  // },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true);
    next(true);
  },
  methods: {
    async getUserCity() {
      let { data: res, data: { data: { onlineCityList }}} = await getUserInfo();
      try {
        if (res.success) {
          onlineCityList.map(ele => this.citys.push(+ele.value))
        } else {
          Toast.fail(res.errorMsg || res.msg);
        }
      } catch (err) {
        Toast.fail(err);
      }
    },
    async getTitle() {
      try {
        let { data: tabarr } = await selectListAll({ ...this.listQuery, citys: this.citys })
        if (tabarr.success) {
          let keyArr = Object.keys(tabarr.title);
          keyArr.forEach(ele => {
            this.tabarr.forEach(item => {
              if (ele === item.type) {
                item.num = tabarr.title[ele];
              }
            });
          });
        } else {
          Toast.fail(tabarr.errorMsg);
        }
      } catch (err) {
        Toast.fail(err.errorMsg);
      }
    },
    handleAddClick() {
      this.$router.push({
        path: '/bss/add-line'
      });
    },
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
      this.listQuery = {
        page: 1, // 当前页
        limit: 25, // 每页大小
        citys: this.citys
      };
      switch (name) {
        case 0:
          this.listQuery.selfState = 3;
          this.listQuery.state = 3;
          break;
        case 1:
          this.listQuery.state = 1;
          this.listQuery.selfState = 1;
          break;
        case 2:
          this.listQuery.state = 2;
          this.listQuery.selfState = 1;
          this.listQuery.soldState = 0;
          break;
        case 3:
          this.listQuery.soldState = 1;
          break;
      }
      this.getList(false);
    },
    async getList(loadMore = true) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      try {
        let { data } = await selectListAll({ ...this.listQuery, citys: this.citys })
        if (data.success) {
          Toast.clear();
          let lists = data.data;
          if (loadMore) {
            this.lineData = this.lineData.concat(lists);
          } else {
            this.lineData = lists;
            // document.querySelector('#listbox').scrollIntoView()
            // if (this.listQuery.page !== 1) {
            // setTimeout(() => {
            //   console.log('tag', this.$refs.listbox[0])
            //   this.$refs.listbox[0].scrollIntoView()
            // }, 20)
            // }
          }
          if (!this.beforePullDown) {
            this.beforePullDown = true;
          }
          if (
            this.lineData.length >= this.tabarr[this.active].num ||
              this.lineData.length < 4
          ) {
            this.loadedAll = true;
          }
        } else {
          Toast.clear();
          this.loadedAll = true;
          Toast.fail(data.errorMsg);
        }
      } catch (err) {
        Toast.clear();
        Toast.fail(err);
        this.loadedAll = true;
      }
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
      height: 8px;
      width: 100%;
      background: #f2f2f2;
    }
    p {
      margin: 0px 0px 6px 0px;
      color: #4cb0e9;
      font-size: 14px;
    }
  }
  .tabnum {
    color: #ffa000;
    font-size: 12px;
  }
  background-color: #f2f2f2;
  min-height: 100vh;
  .van-search {
    padding: 17px 20px;
  }
  .van-tab {
    padding: 0px;
  }
  .van-tabs__line {
    background-color: #5c9bdd;
    width: 40px !important;
  }
  .van-tab--active {
    color: #5c9bdd !important;
  }
  section {
    height:calc(100vh - 254px);
    overflow: hidden;
  }
  .listbox {
    box-sizing: border-box;
    height: 100%;
  }
  .wrapper-child {
    top: -5px;
  }
  .bottom_spance {
    margin-bottom: 5px;
  }
    .bottom_spance:last-child {
    margin-bottom: 5px;
  }
}
</style>>
