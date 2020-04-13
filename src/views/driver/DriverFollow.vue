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
            :type="form.key === 5 ? 'primary' : 'default'"
            size="small"
            @click="filterForm(5)"
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
        <div v-for="item in list" :key="item" class="list-item">
          <div class="list-top">
            <h2>希杰物流/配送外包承运商</h2>
            <p>广东省佛山市南海区南海区</p>
            <div class="list-tag">
              <van-tag class="success-bg">
                标签
              </van-tag>
              <van-tag class="success-bg">
                标签
              </van-tag>
              <van-tag class="success-bg">
                标签
              </van-tag>
              <van-tag class="success-bg">
                标签
              </van-tag>
              <van-tag class="danger-bg">
                标签
              </van-tag>
            </div>
            <van-tag class="top-tag" type="warning">
              张三
            </van-tag>
            <van-row class="tit" type="flex" justify="space-between">
              <van-col class="lt">
                匹配度
              </van-col>
              <van-col class="rt">
                85%
              </van-col>
            </van-row>
            <van-row class="list-type" justify="space-between" type="flex">
              <van-col>
                <h5>所需类型</h5>
                <van-icon name="warning" class="danger" />
              </van-col>
              <van-col>
                <h5>所需类型</h5>
                <van-icon name="checked" class="success" />
              </van-col>
              <van-col>
                <h5>所需类型</h5>
                <van-icon name="checked" class="success" />
              </van-col>
              <van-col>
                <h5>所需类型</h5>
                <van-icon name="checked" class="success" />
              </van-col>
              <van-col>
                <h5>所需类型</h5>
                <van-icon name="checked" class="success" />
              </van-col>
            </van-row>
            <van-row class="list-speed" type="flex" align="center">
              <van-col class="list-speed-lt">
                看活
              </van-col>
              <van-col class="list-speed-rt">
                <div class="list-speed-top">
                  已确认司机上岗
                </div>
                <div class="list-speed-time">
                  2020-02-20 10:00:00
                </div>
              </van-col>
            </van-row>
          </div>
          <van-cell title="详情" is-link class="list-bm" />
        </div>
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      </van-list>
      <!-- <div class="list-item">
        <div class="list-top">
          <h2>希杰物流/配送外包承运商</h2>
          <p>广东省佛山市南海区南海区</p>
          <div class="list-tag">
            <van-tag class="success-bg">
              标签
            </van-tag>
            <van-tag class="success-bg">
              标签
            </van-tag>
            <van-tag class="success-bg">
              标签
            </van-tag>
            <van-tag class="success-bg">
              标签
            </van-tag>
            <van-tag class="danger-bg">
              标签
            </van-tag>
          </div>
          <van-tag class="top-tag" type="warning">
            张三
          </van-tag>
          <van-row class="tit" type="flex" justify="space-between">
            <van-col class="lt">
              匹配度
            </van-col>
            <van-col class="rt">
              85%
            </van-col>
          </van-row>
          <van-row class="list-type" justify="space-between" type="flex">
            <van-col>
              <h5>所需类型</h5>
              <van-icon name="warning" class="danger" />
            </van-col>
            <van-col>
              <h5>所需类型</h5>
              <van-icon name="checked" class="success" />
            </van-col>
            <van-col>
              <h5>所需类型</h5>
              <van-icon name="checked" class="success" />
            </van-col>
            <van-col>
              <h5>所需类型</h5>
              <van-icon name="checked" class="success" />
            </van-col>
            <van-col>
              <h5>所需类型</h5>
              <van-icon name="checked" class="success" />
            </van-col>
          </van-row>
          <van-row class="list-speed" type="flex" align="center">
            <van-col class="list-speed-lt">
              看活
            </van-col>
            <van-col class="list-speed-rt">
              <div class="list-speed-top">
                已确认司机上岗
              </div>
              <div class="list-speed-time">
                2020-02-20 10:00:00
              </div>
            </van-col>
          </van-row>
        </div>
        <van-cell title="详情" is-link class="list-bm" />
      </div> -->
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
    onLoad() {
      // fetchSomeThing().catch(() => {
      //   this.error = true;
      // })
    },
    getSelectList() {
      getSelectList(this.form)
        .then(({ data }) => {
          console.log(data)
          if (data.success) {
            // 请求成功
            this.list.push(data);
          } else {
            this.error = true;
          }
          this.finished = true;
        }).catch(() => {
          this.error = true;
        }).finally(() => {
          this.loading = false;
        });
    },
    filterForm(val) {
      this.form.value = val;
      this.show = false;
    }
  }
}
</script>

<style lang="scss" scoped>

$success: #49CB15;
$danger: #EC5F50;

.DriverFollow{
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
    margin-bottom: 10px;
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
