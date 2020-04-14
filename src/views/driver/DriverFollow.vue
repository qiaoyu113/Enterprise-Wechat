<template>
  <div class="DriverFollow">
    <div class="header">
      <div class="header-tit" @click="show = true">
        状态筛选<van-icon name="arrow-down" />
      </div>
      <van-popup
        v-model="show"
        class="header-popup"
        closeable
        position="top"
        close-icon-position="bottom-right"
      >
        <div class="header-list">
          <van-button
            :type="form.key === '1' ? 'primary' : 'default'"
            size="small"
            @click="filterForm('1')"
          >
            推送
          </van-button>
          <van-button
            :type="form.key === '2' ? 'primary' : 'default'"
            size="small"
            @click="filterForm('2')"
          >
            看活
          </van-button>
          <van-button
            :type="form.key === '3' ? 'primary' : 'default'"
            size="small"
            @click="filterForm('3')"
          >
            试跑
          </van-button>
          <van-button
            :type="form.key === '4' ? 'primary' : 'default'"
            size="small"
            @click="filterForm('4')"
          >
            上岗
          </van-button>
          <van-button
            :type="form.key === '5' ? 'primary' : 'default'"
            size="small"
            @click="filterForm('5')"
          >
            失败
          </van-button>
        </div>
      </van-popup>
    </div>
    <div class="list">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="getSelectList"
      >
        <div v-for="item in list" :key="item.lineId" :title="item.lineId" class="list-item">
          <div class="list-top">
            <h2>{{ item.customerName }}/{{ item.lineName }}</h2>
            <p>{{ item.provinceAreaName+item.cityAreaName+item.countyAreaName+item.districtArea }}</p>
            <div class="list-tag">
              <van-tag :class="item.carTypeMatch | setClass('-bg')">
                {{ item.carTypeName }}
              </van-tag>
              <van-tag :class="item.cargoTypeMatch | setClass('-bg')">
                {{ item.cargoTypeName }}
              </van-tag>
              <van-tag :class="item.warehouseMatch | setClass('-bg')">
                [仓]{{ item.warehouse }}
              </van-tag>
              <van-tag :class="item.countyAreaMatch | setClass('-bg')">
                [配]{{ item.warehouse }}
              </van-tag>
              <van-tag :class="item.handlingDifficultyDegreeMatch | setClass('-bg')">
                {{ item.handlingDifficultyDegreeName }}
              </van-tag>
              <van-tag :class="item.timeMatch | setClass('-bg')">
                {{ item.handlingDifficultyDegreeName }}
              </van-tag>
            </div>
            <van-tag class="top-tag" type="warning">
              {{ item.lineSaleName }}
            </van-tag>
            <van-row class="tit" type="flex" justify="space-between">
              <van-col class="lt">
                匹配度
              </van-col>
              <van-col class="rt">
                {{ item.suitability }}%
              </van-col>
            </van-row>
            <van-row class="list-type" justify="space-between" type="flex">
              <van-col>
                <h5>所需车型</h5>
                <van-icon
                  :name="item.carTypeMatch | setType"
                  :class="item.carTypeMatch | setClass"
                />
              </van-col>
              <van-col>
                <h5>货物类型</h5>
                <van-icon
                  :name="item.cargoTypeMatch | setType"
                  :class="item.cargoTypeMatch | setClass"
                />
              </van-col>
              <van-col>
                <h5>到仓区域</h5>
                <van-icon
                  :name="item.cargoTypeMatch | setType"
                />
              </van-col>
              <van-col>
                <h5>配送区域</h5>
                <van-icon
                  :name="item.cargoTypeMatch | setType"
                />
              </van-col>
              <van-col>
                <h5>装卸难度</h5>
                <van-icon
                  :name="item.handlingDifficultyDegreeMatch | setType"
                  :class="item.handlingDifficultyDegreeMatch | setClass"
                />
              </van-col>
              <van-col>
                <h5>出车时段</h5>
                <van-icon name="checked" />
              </van-col>
            </van-row>
            <van-row class="list-speed" type="flex" align="center">
              <van-col class="list-speed-lt">
                {{ item.lastHistoryStateName }}
              </van-col>
              <van-col class="list-speed-rt">
                <div class="list-speed-top">
                  {{ item.lastHistoryRemark }}
                </div>
                <div class="list-speed-time">
                  {{ item.lastHistoryDate }}
                </div>
              </van-col>
            </van-row>
          </div>
          <van-cell title="详情" is-link class="list-bm" @click="goDetail(item)" />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Popup, Icon, Button, Tag, Col, Row, Cell, List } from 'vant';
import { getSelectList } from 'api/driver'
export default {
  name: 'DriverFollow',
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [List.name]: List
  },
  filters: {
    setClass(key, bg) {
      return (key === '1' ? 'success' : 'danger') + (bg || '')
    },
    setType(key) {
      return key === '1' ? 'checked' : 'warning'
    }
  },
  data() {
    return {
      show: false,
      form: {
        'key': '1',
        'limit': 10,
        'page': 1,
        'driverId': '100'
      },
      // 列表
      list: [],
      error: false,
      loading: false,
      finished: false
    }
  },
  mounted() {
    // this.getSelectList()
  },
  methods: {
    goDetail(item) {
      this.$router.push(`/driverfollowdetail/${item.lineId}`);
    },
    getSelectList() {
      getSelectList(this.form)
        .then(({ data }) => {
          if (data.success) {
            // 请求成功
            this.list.push(...data.data);
          } else {
            this.error = true;
          }
          if (data.data.length < this.form.limit) {
            this.finished = true;
          } else {
            this.form.page++
          }
        }).catch(() => {
          this.error = true;
        }).finally(() => {
          this.loading = false;
        });
    },
    filterForm(val) {
      this.form.key = val;
      this.show = false;
      this.list = [];
      this.form.page = 1;
      this.loading = true;
      this.finished = false;
      this.getSelectList();
    }
  }
}
</script>

<style lang="scss" scoped>

$success: #49CB15;
$danger: #EC5F50;

.DriverFollow{
  padding-top: 42px;
  .van-button--primary{
    background-color: $success;
    border-color: $success;
  }
  background-color: #f5f5f5;
  box-sizing: border-box;
  // 公用
  .success{
    color: $success;
  }
  .danger {
    color: $danger;
  }
  .success-bg{
    background-color: $success;
  }
  .danger-bg {
    background-color: $danger;
  }
  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin-bottom: 10px;
    z-index: 100;
  }
  .header-tit{
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #000;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .header-popup{
    padding: 20px 0 40px;
    .header-list{
      padding: 0 20px;
    }
  }
  // list
  .list{
    padding: 0 18px;
    .list-item{
      position: relative;
      margin-bottom: 10px;
      background-color: #fff;
      border: 1px solid #D9D9D9;
      border-radius: 5px;
      .list-top{
        padding: 12px 16px 0;
        color: #000;
        h2{
          margin: 0 0 4px 0;
          padding-right: 30px;
          font-size: 18px;
          line-height: 24px;
        }
        p{
          margin: 0;
          padding-bottom: 5px;
          font-size: 14px;
          line-height: 22px;
          border-bottom: 1px solid #EEEBEB;
        }
        .list-tag{
          padding: 8px 0;
          border-bottom: 1px solid #EEEBEB;
          .van-tag{
            margin-right: 8px;
            margin-bottom: 8px;
            padding: 0 12px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            border-radius: 10px;
          }
        }
        .top-tag{
          position: absolute;
          right: 0;
          top: 0;
        }
        .tit{
          height: 42px;
          line-height: 42px;
          border-bottom: 1px solid #EEEBEB;
          .lt{
            font-size: 18px;
            color: #000000;
          }
          .rt{
            font-size: 20px;
            color: #2F7DCD;
            font-weight: bold;
          }
        }
        .list-type{
          padding-bottom: 6px;
          text-align: center;
          h5{
            margin: 0;
            padding: 8px 0;
            font-size: 12px;
            color: #B2B2B2;
            line-height: 12px;
            font-weight: normal;
          }
          .van-icon{
            font-size: 20px;
          }
        }
      }
      .list-bm{
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #EEEBEB;
        border-radius: 0 0 5px 5px;
        font-size: 14px;
        color: #9B9B9B;
        .van-icon{
          color: #9B9B9B;
          line-height: 40px;
        }
      }
    }
    .list-speed{
      padding: 10px 0;
      border-top: 1px solid #EEEBEB;
      .list-speed-lt{
        width: 74px;
        height: 20px;
        line-height: 20px;
        background: #4F77AA;
        border-radius: 10px;
        font-size: 12px;
        color: #FFF;
        text-align: center;
      }
      .list-speed-rt{
        margin-left: 15px;
        .list-speed-top{
          font-size: 16px;
          color: #000;
          line-height:24px;
        }
        .list-speed-time{
          font-size: 12px;
          color: #B2B2B2;
        }
      }
    }
  }
}
</style>
