<template>
  <div class="linecommend">
    <div class="list-wrap">
      <vo-pages
        :data="[]"
        :loaded-all="loadedAll"
        :no-data-hint="false"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <div v-for="item in list" :key="item.type" class="lineList" @click="goDetail(item.id)">
          <div class="lineListTop">
            <div class="name">
              123123
            </div>
            <div class="info">
              123
            </div>
          </div>
          <div class="lineListBottom">
            <van-cell title="详情" is-link />
          </div>
        </div>
      </vo-pages>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup } from 'vant'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
export default {
  name: 'Linecommend',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    VoPages
  },
  data() {
    return {
      listQuery: {
        state: 0,
        page: 1
      },
      active: 1,
      list: [],
      total: 0,
      page: 1,
      show: false,
      beforePullDown: false,
      actions: [
        { name: '产品介绍', color: '#3F8AF2' },
        { name: '推荐线路', color: '#3F8AF2' }
      ],
      loadedAll: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    pullingDown() {
      this.beforePullDown = false
      this.listQuery.page = 1
      this.getList(false)
    },
    pullingUp() {
      this.listQuery.page += 1
      this.getList()
    },
    async getList(loadMore = true) {
    //   customerDetail({
    //     custClueId: 201910231017
    //   }).then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.data)
    //       this.detail = res.data.data
    //     }
    //   })
      let lists = [
        {
          fieldEn: 'field_2',
          fieldName: '外线销售姓名',
          type: 'single_line_text',
          notes: '',
          value: '石晓光'
        }
      ]
      this.total = lists.length
      const newList = lists.map(item => {
        return item
      })
      if (loadMore) {
        this.list = this.list.concat(newList)
      } else {
        this.list = newList
      }
      if (!this.beforePullDown) {
        this.beforePullDown = true
      }
      this.loadedAll = this.total <= this.list.length
    },
    goDetail(id) {
      this.$router.push({ path: '/linedetail', query: { id: id }})
    //   customerDetail({
    //     custClueId: 201910231017
    //   }).then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.data)
    //       this.detail = res.data.data
    //     }
    //   })
    }
  }
}
</script>
<style lang="scss" scope>
.linecommend{
    background: #f7f8fa;
    .lineList{
        width:100%;
        border-radius: 1.2rem;
        padding: 0.3rem;
        box-sizing: border-box;
        overflow: hidden;
        .lineListTop{
            background:#fff;
            .info{
                color:#333;
                font-size:14px;
                padding:0 0.42667rem 0.26rem;
                box-sizing: border-box;
            }
            .name{
                width:100%;
                height:1.2rem;
                line-height: 1.2rem;
                font-size: 16px;
                font-weight: 500;
                padding:0 0.42667rem;
                box-sizing: border-box;
            }
        }
    }
    p{
        margin-block-start: 0;
        margin-block-end: 0;
    }
    .container{
        height: 100%;
        width: 100%;
        background: #f5f5f5;
        .list-wrap{
            height: calc(100% - 50px);
            overflow-y: hidden;
            padding:0.5rem 0.3rem;
            box-sizing: border-box;
        }
    }

    .article-list {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 15px 15px 0;
        .article {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 10px 15px;
            box-sizing: border-box;
            background: #FFF;
            border-radius: 5px;
            box-shadow: 0 0 6px #e3e3e3;
            .left {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }
            .right {
                padding-left: 15px;
                box-sizing: border-box;
                display: flex;
                width: 235px;
                height: 80px;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-around;
                p {
                    width: 100%;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 16px;
                }
                .more-info{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    color: #666;
                }
            }
        }
    }
    .focus{
        width:100%;
        text-align: center;
        padding-top: 1rem;
        box-sizing: border-box;
        img{
            width: 60%;
        }
        p{
            color:#666;
            font-size: 14px;
        }
    }
}
</style>
