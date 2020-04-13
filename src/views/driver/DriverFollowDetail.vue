<template>
  <div class="DriverFollowDetail">
    <div class="list">
      <div class="list-item">
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
        </div>
      </div>
    </div>
    <div class="speed">
      <div class="speed-tit">
        跟进记录
      </div>
      <div class="list-ct">
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
    </div>
    <van-button color="#2F7DCD" class="speed-btn" @click="showAction = true">
      撮合跟进
    </van-button>
    <van-action-sheet
      v-model="showAction"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { Icon, Button, Tag, Col, Row, Cell, ActionSheet } from 'vant';
export default {
  name: 'DriverFollowDetail',
  components: {
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      show: false,
      showAction: false,
      actions: [
        { name: '选项1', id: 1 },
        { name: '选项2', id: 2 },
        { name: '选项3', id: 3 }
      ]
    }
  },
  methods: {
    onSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>

$success: #49CB15;
$danger: #EC5F50;

.DriverFollowDetail{
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
  // list
  .list{
    .list-item{
      position: relative;
      background-color: #fff;
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
    }
  }
  .speed{
    margin-top: 30px;
    .speed-tit{
      padding-left: 16px;
      line-height: 24px;
      color: #B2B2B2;
    }
    .list-speed{
      padding: 10px 16px;
      border-top: 1px solid #EEEBEB;
      background-color: #fff;
      &:nth-last-of-type(1){
        border-bottom: 1px solid #EEEBEB;
      }
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
  .speed-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 46px;
    line-height: 46px;
    color: #fff;
    font-size: 18px;
    // background: #2F7DCD;
  }
}
</style>
