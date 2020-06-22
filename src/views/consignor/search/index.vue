<template>
  <div class="consignorSearch">
    <search :form="listQuery" :history-lists="historyLists" @search="handleSearchClick" @clear="handleClearClick" />
    <ul v-if="lists.length > 0">
      <li v-for="(item,idx) in lists" :key="item.id">
        <Item :obj="item" :index="idx" />
      </li>
    </ul>
    <div v-else class="noData">
      抱歉,未找到相关数据!
    </div>
  </div>
</template>

<script>
import Search from './components/search'
import Item from '../lists/components/item'
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
        } else {
          Toast.fail(res.errorMsg || res.msg)
        }
      } catch (err) {
        toast.clear()
        Toast.fail(err)
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
    margin: 50px 0px;
    color:#333333;
    font-size:14px;
    text-align: center;
  }
}

</style>
