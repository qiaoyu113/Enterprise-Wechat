<template>
  <div class="DriverFollow">
    <div class="header">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="form.key"
          :options="option1"
          @change="dropClick"
        />
      </van-dropdown-menu>
    </div>
    <div class="list">
      <vo-pages
        :data="list"
        :loaded-all="loadedAll"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <div class="placeholder"></div>
        <div
          v-for="item in list"
          :key="item.type"
          class="lineList"
          @click="goDetail(item)"
        >
          <div class="lineListTop">
            <div class="name">
              <van-tag v-if="item.lineSaleName" class="top-tag" type="warning">
                {{ item.lineSaleName }}
              </van-tag>
              <p class="line-tit">
                {{ item.lineName }} / {{ item.customerName }}
              </p>
              <p class="address">
                {{ item.warehouse }}
              </p>
              <div class="tagBox">
                <template v-for="key in keyList">
                  <template v-if="Array.isArray(item[key.name]) && item[key.name].length > 0">
                    <van-tag
                      v-for="(value, index) in item[key.name]"
                      :key="index"
                      round
                      size="medium"
                      :class="value.matched | setClass('-bg tag_margin')"
                    >
                      {{ key.name === 'warehouses' ? '[仓] ' : ''
                      }}{{ key.name === 'deliveryAreas' ? '[配] ' : ''
                      }}{{ value.name }}
                    </van-tag>
                  </template>
                </template>
              </div>
              <div class="matchRate">
                匹配度 <span>{{ item.suitability }}%</span>
              </div>
              <div class="needCarBox">
                <template v-for="key in keyList">
                  <template v-if="Array.isArray(item[key.name]) && item[key.name].length > 0">
                    <div :key="key.name" class="needCarList">
                      <div class="top">
                        {{ key.key }}
                      </div>
                      <div class="bottom">
                        <van-icon
                          :name="
                            item[key.name].some((val) => val.matched) | setType
                          "
                          :class="
                            item[key.name].some((val) => val.matched) | setClass
                          "
                          size="20"
                        />
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
          <div v-if="item.remark" class="list-note">
            {{ item.remark }}
          </div>
          <van-row
            v-if="item.followInfo"
            class="list-speed"
            type="flex"
            align="center"
          >
            <van-col class="list-speed-lt">
              {{ item.followInfo.stateName }}
            </van-col>
            <van-col class="list-speed-rt">
              <div class="list-speed-top">
                {{ item.followInfo.remark }}
              </div>
              <div class="list-speed-time">
                {{ item.followInfo.createDate | Timestamp }}
              </div>
            </van-col>
          </van-row>
          <div class="lineListBottom">
            <van-cell title="详情" is-link />
          </div>
        </div>
      </vo-pages>
    </div>
  </div>
</template>

<script>
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
import {
  Toast,
  Icon,
  Button,
  Tag,
  Col,
  Row,
  Cell,
  DropdownMenu,
  DropdownItem
} from 'vant';
import { getSelectList } from 'api/driver';
export default {
  name: 'DriverFollow',
  components: {
    [Toast.name]: Icon,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    VoPages
  },
  filters: {
    setClass(key, bg) {
      return (key ? 'success' : 'danger') + (bg || '');
    },
    setType(key) {
      return key ? 'checked' : 'warning';
    },
    isNull(val) {
      return val || '';
    }
  },
  data() {
    return {
      show: false,
      form: {
        key: '-1',
        limit: 10,
        page: 1,
        driverId: ''
      },
      value1: 0,
      option1: [
        { text: '全部', value: '-1' },
        { text: '推送', value: '1' },
        { text: '看活', value: '2' },
        { text: '试跑', value: '3' },
        { text: '上岗', value: '4' },
        { text: '失败', value: '5' }
      ],
      // 列表
      list: [],
      keyList: [
        {
          name: 'driverCarType',
          key: '所需车型'
        },
        {
          name: 'cargoTypes',
          key: '货物类型'
        },
        {
          name: 'warehouses',
          key: '到仓区域'
        },
        {
          name: 'deliveryAreas',
          key: '配送区域'
        },
        {
          name: 'handlingDifficultyDegrees',
          key: '装卸难度'
        },
        {
          name: 'runningDurations',
          key: '出车时段'
        }
      ],
      total: 0,
      loadedAll: false,
      beforePullDown: false
    };
  },
  mounted() {
    this.form.driverId = this.$route.query.driverId;
    this.getList();
  },
  methods: {
    // 下拉刷新
    pullingUp() {
      this.form.page += 1
      this.getList()
    },
    pullingDown() {
      this.beforePullDown = false
      this.form.page = 1
      this.getList(false)
    },
    getList(loadMore = true) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      getSelectList(this.form)
        .then((res) => {
          if (res.data.success) {
            res.data.data.map((item) => {
              item.driverCarType = item.driverCarType ? [item.driverCarType] : [];
              return item;
            });
            Toast.clear();
            let lists = res.data.data
            this.total = res.data.page.total
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

    goDetail(item) {
      this.$router.push({ name: 'DriverFollowDetail', params: item });
    },
    dropClick() {
      this.show = false;
      this.list = [];
      this.form.page = 1;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
$success: #81CA2A;
$danger: #E75E60;
.DriverFollow {
  .van-button--primary {
    background-color: $success;
    border-color: $success;
  }
  .placeholder{
    width:100%;
    padding-top: 1.6rem;
  }
  background-color: #E8ECEE;
  box-sizing: border-box;
  // 公用
  .success {
    color: $success;
  }
  .danger {
    color: $danger;
  }
  .success-bg {
    background-color: $success;
  }
  .danger-bg {
    background-color: $danger;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin-bottom: 10px;
    z-index: 100;
  }
  // list
  .list{
    height: 100%;
  }
  .lineList {
    width: 100%;
    padding: 8px 17px;
    box-sizing: border-box;
    p{
      margin-block-start: 0;
      margin-block-end: 0;
    }
    .tag_margin{
      margin: 0 10px 10px 0;
      padding: 0 10px;
      height: 18px;
      line-height: 18px;
    }
    .lineListTop {
      background: #fff;
      box-sizing: border-box;
      border-radius: 10px 10px 0 0;
      .info {
        color: #333;
        font-size: 14px;
        padding: 0 0.42667rem 0.26rem;
        box-sizing: border-box;
      }
      .name {
        position: relative;
        width: 100%;
        font-weight: 500;
        padding: 18px 17px 0;
        box-sizing: border-box;
        font-size: 17px;
        color: #000000;
        .top-tag {
          position: absolute;
          right: 0;
          top: 0;
        }
        .line-tit{
          font-size: 16px;
          color: #000;
          line-height: 24px;
        }
        .address {
          font-weight: 400;
          font-size: 14px;
          line-height:22px;
          color: #000000;
          padding: 4px 0;
          box-sizing: border-box;
          border-bottom: 1px solid #eeebeb;
        }
      }
      .tagBox {
        width: 100%;
        padding: 7px 0;
        box-sizing: border-box;
        font-size: 0;
        border-bottom: 1px solid #eeebeb;
      }
      .matchRate {
        width: 100%;
        padding: 0.26rem 0;
        box-sizing: border-box;
        font-size: 16px;
        color: #000000;
        font-weight: 400;
        border-bottom: 1px solid #eeebeb;
        span {
          font-size: 20px;
          color: #2f7dcd;
          font-weight: bold;
          float: right;
        }
      }
      .needCarBox {
        width: 100%;
        display: flex;
        .needCarList {
          flex: 1;
          padding-top: 10px;
          box-sizing: border-box;
          .top {
            margin-bottom: 8px;
            width: 100%;
            text-align: center;
            font-size: 11px;
            line-height:1;
            color: #b2b2b2;
          }
          .bottom {
            padding-bottom: 6px;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            line-height: 1;
            font-size: 0;
            .van-icon{
              font-size: 20px
            }
          }
        }
      }
    }
  }
  .lineListBottom{
    border-top: 1px solid #EEEBEB;
    font-size: 14px;
    color: #9B9B9B;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    .van-cell{
      padding: 0 7px 0 19px;
      height: 40px;
      line-height: 40px;
      .van-icon{
        line-height: 40px
      }
    }
  }
  .list-note {
    padding: 8px 0.42667rem;
    font-size: 12px;
    color: #b2b2b2;
    line-height: 18px;
    text-indent: 2em;
    background: #fff;
  }
  .list-speed {
    padding: 0.2rem 0.42667rem;
    border-top: 1px solid #eeebeb;
    background-color: #fff;
    .list-speed-lt {
      width: 74px;
      height: 20px;
      line-height: 20px;
      background: #4f77aa;
      border-radius: 10px;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
    .list-speed-rt {
      margin-left: 15px;
      .list-speed-top {
        font-size: 16px;
        color: #000;
        line-height: 24px;
      }
      .list-speed-time {
        font-size: 12px;
        color: #b2b2b2;
      }
    }
  }
}
</style>
