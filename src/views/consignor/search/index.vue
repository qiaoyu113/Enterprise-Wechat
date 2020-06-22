<template>
  <div class="consignorSearch">
    <search :form="listQuery" :history-lists="historyLists" @search="handleSearchClick" @clear="handleClearClick" />
    <ul v-if="lists.length > 0">
      <li v-for="(item,idx) in lists" :key="item.id">
        <Item :obj="item" :index="idx" />
      </li>
    </ul>
    <div v-else class="noData">
      <img src="./imgs/search.png">
      <div class="text">
        抱歉,未找到相关数据!
      </div>
    </div>
  </div>
</template>

<script>
import Search from './components/search'
import Item from '../components/item'
import { fetchList } from '@/api/consignor'
import { Toast } from 'vant'
export default {
  components: {
    Search,
    Item,
    [Toast.name]: Toast
  },
  data() {
    return {
      lists: [],
      listQuery: {
        key: '',
        page: 1,
        limit: 9999
      },
      historyLists: []
    }
  },
  mounted() {
    let str = localStorage.getItem('historyKeyWord')
    if (str) {
      this.historyLists = str.split(',').filter(item => item)
    }
  },
  methods: {
    /**
     * 根据关键字获取列表
     */
    async handleSearchClick() {
      const toast = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      try {
        let params = { ...this.listQuery, customerNameOrcustomerId: this.listQuery.key }
        delete params.key
        let { data: res } = await fetchList(params)
        toast.clear()
        if (res.success) {
          this.lists = res.data
          this.addKeyWordToHistory()
          this.listQuery.key = ''
        } else {
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        toast.clear()
        if (err) {
          Toast.fail(err)
        }
      }
    },
    handleClearClick() {
      this.lists = []
      this.listQuery.key = ''
    },
    /**
     * 往历史记录添加关键字
     */
    addKeyWordToHistory() {
      let index = this.historyLists.findIndex(item => item === this.listQuery.key)
      if (index > -1) {
        this.historyLists.splice(index, 1)
      }
      this.historyLists.unshift(this.listQuery.key)

      if (this.historyLists.length > 5) {
        this.historyLists = this.historyLists.slice(0, 5)
      }
      localStorage.setItem('historyKeyWord', this.historyLists.join(','))
    }
  }
}

</script>

<style lang='scss' scoped>
.consignorSearch {
  .noData {
    margin-top:41.5px;
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
