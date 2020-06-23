<template>
  <div class="lineSearch">
    <search
      :form="listQuery"
      :history-lists="historyLists"
      @clear="handleClearClick"
      @getVal="search"
    />
    <div ref="list" class="list">
      <ul v-if="lists.length > 0">
        <li
          v-for="(item,index) in lists"
          :key="index"
          class="bottom_spance"
        >
          <lineItem
            class="lineitem"
            :itemdata="item"
            @clickItem="handleItemClick(item)"
          />
        </li>
      </ul>
      <div v-else class="noData">
        <img src="../../assets/search.png">
        <div class="text">
          抱歉,未找到相关数据!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from './components/search';
import lineItem from './components/LineItem';
import { getUserInfo } from '@/api/common';
import { searchList } from '@/api/line';
import { Toast } from 'vant';
export default {
  components: {
    Search,
    lineItem,
    [Toast.name]: Toast
  },
  data() {
    return {
      scroll: '',
      lists: [],
      citys: [],
      listQuery: {
        key: '',
        page: 1,
        limit: 9999
      },
      historyLists: []
    };
  },
  activated() {
    this.getUserCity();
    let str = localStorage.getItem('historyKeyWordLine');
    if (str) {
      this.historyLists = JSON.parse(str)
    }
  },
  beforeRouteLeave(to, from, next) {
    this.listQuery.key = ''
    this.lists = []
    this.citys = []
    next()
  },
  mounted() {
    this.getUserCity();
    let str = localStorage.getItem('historyKeyWordLine');
    if (str) {
      this.historyLists = JSON.parse(str)
    }
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
    search(val) {
      this.listQuery.key = val.keys;
      this.lists = [];
      this.getUser()
    },
    async getUser() {
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      try {
        let { data: res } = await searchList({ ...this.listQuery, citys: this.citys })
        if (res.success) {
          toast.clear();
          this.lists = res.data
          this.addKeyWordToHistory();
        } else {
          Toast.fail(res.errorMsg || res.msg);
        }
      } catch (err) {
        Toast.fail(err);
        toast.clear();
      }
    },
    handleClearClick() {
      this.lists = [];
      this.listQuery.key = '';
    },
    /**
     * 往历史记录添加关键字
     */
    handleItemClick(obj) {
      let index = this.historyLists.findIndex(item => item.lineId === obj.lineId)
      if (index > -1) {
        this.historyLists.splice(index, 1)
      }
      this.historyLists.unshift({
        lineId: obj.lineId,
        keys: this.listQuery.key
      })

      if (this.historyLists.length > 5) {
        this.historyLists = this.historyLists.slice(0, 5)
      }
      localStorage.setItem('historyKeyWordLine', JSON.stringify(this.historyLists))
    }
  }
};
</script>

<style lang='scss' scoped>
.lineSearch {
  overflow: hidden;
  .list {
    height:calc(100vh - 54px);
    overflow-y: auto;
  }
   background-color: #f2f2f2;
    .bottom_spance {
    margin-bottom: 5px;
  }
    .bottom_spance:last-child {
    margin-bottom: 5px;
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
