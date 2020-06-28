<template>
  <div class="lineSearch">
    <search
      :form="listQuery"
      :history-lists="historyLists"
      @clear="handleClearClick"
      @getVal="search"
    />
    <div
      v-show="showlist"
      ref="list"
      class="list"
    >
      <vo-pages
        :data="lists"
        :loaded-all="loadedAll"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <div
          v-for="(item,index) in lists"
          :key="index"
          class="bottom_spance"
        >
          <lineItem
            class="lineitem"
            :itemdata="item"
            @clickItem="handleItemClick(item)"
          />
        </div>
      </vo-pages>
    </div>
    <div
      v-show="!showlist"
      class="noData"
    >
      <img src="../../assets/search.png">
      <div class="text">
        抱歉,未找到相关数据!
      </div>
    </div>
  </div>
</template>

<script>
import VoPages from 'vo-pages';
import 'vo-pages/lib/vo-pages.css';
import Search from './components/search';
import lineItem from './components/LineItem';
import { getUserInfo } from '@/api/common';
import { searchList } from '@/api/line';
import { Toast } from 'vant';
export default {
  components: {
    VoPages,
    Search,
    lineItem,
    [Toast.name]: Toast
  },
  data() {
    return {
      showlist: false,
      lists: [],
      citys: [],
      beforePullDown: false,
      loadedAll: false,
      listQuery: {
        key: '',
        page: 1,
        limit: 50
      },
      historyLists: []
    };
  },
  watch: {
    lists(val) {
      if (val.length === 0) {
        this.showlist = false
      } else {
        this.showlist = true
      }
    }
  },
  activated() {
    this.getUserCity();
    let str = localStorage.getItem('historyKeyWordLine');
    if (str) {
      this.historyLists = JSON.parse(str);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.listQuery.page = 1;
    this.listQuery.key = '';
    this.lists = [];
    this.citys = [];
    next();
  },
  // mounted() {
  //   this.getUserCity();
  //   let str = localStorage.getItem('historyKeyWordLine');
  //   if (str) {
  //     this.historyLists = JSON.parse(str);
  //   }
  // },
  methods: {
    pullingDown() {
      this.beforePullDown = false;
      this.listQuery.page = 1;
      this.getUser(false);
    },
    pullingUp() {
      this.listQuery.page += 1;
      this.getUser();
    },
    async getUserCity() {
      let {
        data: res,
        data: {
          data: { onlineCityList }
        }
      } = await getUserInfo();
      try {
        if (res.success) {
          onlineCityList.map(ele => this.citys.push(+ele.value));
        } else {
          Toast.fail(res.errorMsg || res.msg);
        }
      } catch (err) {
        Toast.fail(err);
      }
    },
    search(val) {
      this.listQuery.page = 1;
      this.listQuery.key = val.keys;
      this.lists = [];
      this.getUser(false);
    },
    async getUser(loadMore = true) {
      if (this.listQuery.key === '') {
        return
      }
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      try {
        let { data: res } = await searchList({
          ...this.listQuery,
          citys: this.citys
        });
        if (res.success) {
          toast.clear();
          let info = res.data;
          let total = res.page.total;
          // this.lists = res.data
          if (loadMore) {
            this.lists = this.lists.concat(info);
          } else {
            this.lists = info;
          }
          if (!this.beforePullDown) {
            this.beforePullDown = true;
          }
          if (this.lists.length === total || this.lists.length < 4) {
            this.loadedAll = true;
          } else {
            this.loadedAll = false;
          }
        } else {
          Toast.fail(res.errorMsg || res.msg);
        }
      } catch (err) {
        toast.clear();
        Toast.fail(err);
      }
    },
    handleClearClick() {
      this.lists = [];
      this.listQuery.key = '';
      this.listQuery.page = 1;
    },
    /**
     * 往历史记录添加关键字
     */
    handleItemClick(obj) {
      let index = this.historyLists.findIndex(
        item => item.lineId === obj.lineId
      );
      if (index > -1) {
        this.historyLists.splice(index, 1);
      }
      this.historyLists.unshift({
        lineId: obj.lineId,
        keys: this.listQuery.key
      });

      if (this.historyLists.length > 5) {
        this.historyLists = this.historyLists.slice(0, 5);
      }
      localStorage.setItem(
        'historyKeyWordLine',
        JSON.stringify(this.historyLists)
      );
    }
  }
};
</script>

<style lang='scss' scoped>
.lineSearch {
  height: 100vh;
  overflow: hidden;
  .list {
    height: calc(100vh - 99.76px);
    overflow: hidden;
  }
  background-color: #f2f2f2;
  .bottom_spance {
    margin-bottom: 5px;
  }
  .bottom_spance:last-child {
    margin-bottom: 5px;
  }
  .noData {
    // position: absolute;
    // width: 100%;
    // top: 54px;
    // left: 0;
    height: calc(100vh - 99.76px);
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
      height: 74px;
    }
  }
}
</style>
