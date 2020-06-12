<template>
  <div class="linebatch">
    <SearchItem @searchData="searchFunction"></SearchItem>
    <div class="list-wrap">
      <vo-pages
        :data="list"
        :loaded-all="loadedAll"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <div class="placeholder"></div>
        <div v-for="item in list" :key="item.createDate" class="lineList" @click="goDetail(item.lineId, item.timeDiff, item.monthlyTransaction, item.driverId)">
          <div class="lineListTop">
            <div class="name">
              {{ item.lineName }}<van-tag plain type="primary" size="small" style="margin-left: 0.3rem;">
                {{ item.lineRankName }}
              </van-tag>
            </div>
            <div class="info">
              仓库位置：{{ item.warehouse }}
            </div>
            <div class="info">
              线路区域：{{ item.provinceAreaName }}{{ item.cityName }}
            </div>
            <div class="batch_type">
              <span v-if="item.carTypeName">{{ item.carTypeName }} /</span>
              <span v-if="item.cargoType">{{ item.cargoType }} /</span>
              <span v-if="item.handlingDifficultyDegreeName">{{ item.handlingDifficultyDegreeName }} /</span>
              <span v-if="item.workingTimeRegin.length">
                <i v-for="(i,index) in item.workingTimeRegin" :key="index">{{ i }}</i>
              </span>
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
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Tag } from 'vant'
import { selectLineTask } from '@/api/line'
import VoPages from 'vo-pages'
import SearchItem from 'components/SearchItem'
import 'vo-pages/lib/vo-pages.css'
export default {
  name: 'Linebatch',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    VoPages,
    SearchItem
  },
  data() {
    return {
      listQuery: {
        'carType': '',
        'cargoType': '',
        'city': '',
        'county': '',
        'key': '',
        'limit': '20',
        'page': 1
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
  beforeRouteEnter(to, from, next) {
    let path = from.path // path为定义的变量，不是vue的data定义的变量，当前生命周期data还未初始化
    if (path !== '/') {
      localStorage.removeItem('lineIdNeedBack')
    }
    next()
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
    searchFunction(data) {
      this.listQuery.carType = data.carVal
      this.listQuery.cargoType = data.cargoVal
      this.listQuery.county = data.lineVal
      this.listQuery.key = data.findVal
      this.listQuery.page = 0
      this.list = [];
      this.pullingDown()
    },
    getList(loadMore = true) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      selectLineTask(this.listQuery).then((res) => {
        if (res.data.success) {
          Toast.clear();
          let lists = res.data.data
          this.total = res.data.page.total
          // const newList = lists.map(item => {
          //   return item
          // })
          if (loadMore) {
            this.list = this.list.concat(lists)
          } else {
            this.list = lists
          }
          if (!this.beforePullDown) {
            this.beforePullDown = true
          }
          if (this.list.length === this.total || this.list.length < 4) {
            this.loadedAll = true
          } else {
            this.loadedAll = false
          }
        } else {
          Toast.clear();
          this.loadedAll = true;
          Toast.fail(res.data.errorMsg);
        }
      }).catch((err) => {
        Toast.clear();
        Toast.fail(err);
        this.loadedAll = true;
      })
    },
    goDetail(id, timeDiff, monthlyTransaction, driverId) {
      this.$router.push({ path: '/linedetailbatch', query: { id: id, timeDiff: timeDiff, monthlyTransaction: monthlyTransaction, driverId: driverId }})
    }
  }
}
</script>
<style lang="scss" scope>
.linebatch{
    background: #f7f8fa;
    height: 100%;
    width: 100%;
    .list-wrap{
        height: 100%;
        // overflow-y: hidden;
        // padding:0.5rem 0.3rem;
        // box-sizing: border-box;
    }
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
    .batch_type{
        width: 100%;
        padding:0.08rem 0.42667rem 0.26rem;
        box-sizing: border-box;
        span{
            color:#666;
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
    .placeholder{
      width:100%;
      height:1.6rem;
    }
}
</style>
