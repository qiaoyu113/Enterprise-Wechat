<template>
  <div class="driverchoose">
    <div class="operateMenu">
      <div class="list">
        <van-checkbox v-model="checked" shape="square" @click="checkAll">
          全选
        </van-checkbox>
      </div>
      <div class="list">
        <van-dropdown-menu>
          <van-dropdown-item v-model="listQuery.carType" :options="arr" :title="carName" @change="changeCar" />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="list-wrap">
      <vo-pages
        :data="list"
        :loaded-all="loadedAll"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <van-checkbox-group ref="checkboxGroup" v-model="result">
          <div class="placeholder"></div>
          <!-- <div v-for="item in list" :key="item.type" class="lineList" @click="goDetail(item.driverId)"> -->
          <div v-for="item in list" :key="item.type" class="lineList">
            <div :class="result.indexOf(item.driverId) !== -1 ? 'lineItem bg' : 'lineItem'">
              <van-checkbox :name="item.driverId" shape="square">
                <div class="lineListTop">
                  <div class="name">
                    {{ item.name }}/{{ item.phone }}<van-tag v-if="item.corpUserId && item.corpUserId !== ''" plain type="primary" size="small" style="margin-left: 0.3rem;">
                      已激活
                    </van-tag><van-tag v-else plain type="primary" size="small" style="margin-left: 0.3rem;">
                      未激活
                    </van-tag>
                  </div>
                  <div class="info">
                    {{ item.carTypeName }}/{{ item.address }}/{{ item.stateName }}
                  </div>
                </div>
                <div class="lineListBottom" @click="goDetail(item.driverId)">
                  <van-cell title="详情" is-link />
                </div>
              </van-checkbox>
            </div>
          </div>
        </van-checkbox-group>
      </vo-pages>
    </div>
    <van-button class="btn_bottom" @click="sendLineToDriver">
      推送
    </van-button><van-overlay :show="showoverlay" z-index="99">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" vertical>
          正在推送...
        </van-loading>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Tag, DropdownMenu, DropdownItem, Checkbox, CheckboxGroup, Button, Loading, Overlay } from 'vant'
import { selectDriverTask, sendMsgToDriver } from '@/api/driver'
import { dictionary } from '@/api/common'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
export default {
  name: 'Driverchoose',
  components: {
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    VoPages
  },
  data() {
    return {
      listQuery: {
        'carType': '',
        'key': '',
        'limit': '20',
        'page': 1,
        'contractStatus': '',
        'joinManagerId': '',
        'lineSaleId': '',
        'pageNumber': '',
        'temMatchTaskId': ''
      },
      arr: [],
      checked: false,
      showoverlay: false,
      active: 1,
      list: [],
      result: [],
      total: 0,
      page: 1,
      show: false,
      carName: '车型',
      beforePullDown: false,
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
    this.listQuery.temMatchTaskId = this.$route.query.id;
    this.getList()
    this.fetchData()
  },
  methods: {
    fetchData() {
      let that = this;
      // 意向车型
      dictionary({
        dictType: 'Intentional_compartment'
      }).then(res => {
        let arr = res.data.data;
        let newArr = []
        arr.forEach((item) => {
          newArr.push({
            text: item.code,
            value: item.codeVal
          })
        })
        newArr.unshift({
          text: '全部',
          value: ''
        })
        that.arr = newArr;
      }).catch(err => {
        Toast.fail(err);
      })
    },
    pullingDown() {
      this.beforePullDown = false
      this.listQuery.page = 1
      this.getList(false)
    },
    checkAll() {
      if (!this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    changeCar(e) {
      this.arr.forEach((i) => {
        if (i.value === e) {
          this.carName = i.text;
        }
      })
      this.listQuery.carType = e;
      this.listQuery.page = 0
      this.list = [];
      this.pullingDown()
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
      selectDriverTask(this.listQuery).then((res) => {
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
    sendLineToDriver() {
      this.showoverlay = true;
      sendMsgToDriver({
        type: 2,
        driverIds: this.result.toString(),
        lineId: this.listQuery.temMatchTaskId
      }).then((res) => {
        if (res.data.success) {
          Toast.success('推送成功');
          this.showoverlay = false;
        } else {
          Toast.fail(res.data.errorMsg);
          this.showoverlay = false;
        }
      }).catch((err) => {
        Toast.fail(err);
        this.showoverlay = false;
      })
    },
    goDetail(id) {
      this.$router.push({ path: '/driverdetailbatch', query: { driverId: id }})
    }
  }
}
</script>
<style lang="scss" scope>
// @import '../../style/common.scss';
.driverchoose{
    background: #f7f8fa;
    height: 100%;
    width: 100%;
    .btn_bottom{
      width:100%;
      height: 46px;
      line-height: 46px;
      position: fixed;
      bottom: 1px;
      left:0;
      right:0;
      background:#2F7DCD;
      font-size: 16px;
      color:#fff;
      border:none;
      z-index:98;
    }
    .operateMenu{
        position: fixed;
        top:0;
        left:0;
        right:0;
        margin: auto;
        width: 100%;
        display: flex;
        z-index: 99;
        box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
        .list{
            flex: 1;
            text-align: center;
            line-height: 1.4rem;
            font-size: 16px;
            background: #fff;
        }
        .list:nth-child(1){
            padding: 0.4rem 0.2rem 0.4rem 0.8rem;
            box-sizing: border-box;
        }
    }
    .list-wrap{
        height: 100%;
        // overflow-y: hidden;
        // padding:0.5rem 0.3rem;
        // box-sizing: border-box;
    }
    .lineList{
        width:100%;
        padding: 0.3rem;
        box-sizing: border-box;
        div{
            background: none;
        }
        .lineItem{
            width: 100%;
            background:#fff;
            padding-left: 0.6rem;
            border-radius: 0.2rem;
            border:1px solid #fff;
            box-sizing: border-box;
            .van-checkbox{
                width: 100%;
                margin: 0;
                padding: 0;
                .van-checkbox__label{
                    width: 100% !important;
                }
            }
        }
        .bg{
            background: #E9E9E9;
            border:1px solid #999;
        }
        .lineListTop{
            box-sizing: border-box;
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
                overflow: hidden;
            }
        }
    }
    p{
        margin-block-start: 0;
        margin-block-end: 0;
    }
    .batch_type{
        width: 100%;
        display: flex;
        padding:0.08rem 0.42667rem 0.26rem;
        box-sizing: border-box;
        span{
            flex: 1;
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
    .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
