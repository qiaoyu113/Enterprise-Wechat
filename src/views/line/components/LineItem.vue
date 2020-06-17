<template>
  <div class="lineitem">
    <div class="overtag">
      已售罄
    </div>
    <div class="item_body">
      <div class="item_left">
        <div class="left_box">
          <div class="box_title">
            <span>梧桐专车&#160;</span>
          </div>
          <div>
            <div class="label_box">
              <span>线路名称:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span> 仓库位置:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span> 配送区域:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span> 到仓时间:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span> 车型:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span> 用车数量:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span> 以上车:</span>
            </div>
            <span>hhha1</span>
          </div>
        </div>
      </div>
      <div class="item_right">
        <div class="left_box">
          <div>
            <div
              class="label_box"
              style="color: #ffcc66;font-weight: bold"
            >
              <span>线路状态:</span>
            </div>
            <span style="color: #ffcc66;font-weight: bold">失效</span>
            <span>(审核未通过)</span>
          </div>
          <div>
            <div class="label_box">
              <span>货物类型:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span>是否搬运:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span>单趟运费:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span>项目收入:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span>上岗时间:</span>
            </div>
            <span>hhha1</span>
          </div>
          <div>
            <div class="label_box">
              <span>创建时间:</span>
            </div>
            <span>hhha1</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item_footer">
      <span style="color: #ffcc66;text-decoration: none;">查看详情</span>
      <span>批量推送</span>
      <span>匹配撮合</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Lineitem',
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.lineitem {
  position: relative;
  overflow: hidden;
  .overtag {
    z-index: 99;
    width: 80px;
    height: 15px;
    text-align: center;
    line-height: 15px;
    background-color: #d81e06;
    color: white;
    font-size: 6px;
    position: absolute;
    top: -25px;
    left: -35px;
    transform: rotate(-45deg);
    transform-origin: 100% 100%;
    -ms-transform: rotate(-45deg); /* IE 9 */
    -ms-transform-origin: 100% 100%;/* IE 9 */

    -webkit-transform: rotate(-45deg); /* Safari 和 Chrome */
    -webkit-transform-origin: 100% 100%; /* Safari 和 Chrome */

    -moz-transform: rotate(-45deg); /* Firefox */
    -moz-transform-origin: 100% 100%; /* Firefox */

    -o-transform: rotate(-45deg); /* Opera */
    -o-transform-origin: 100% 100%; /* Opera */
  }
  background-color: white;
  margin-top: 5px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .item_body {
    display: flex;
  }
  .item_left,
  .item_right {
    width: 50%;
    display: flex;
    flex-direction: column;
    .label_box {
      min-width: 60px;
      text-align: right;
    }
    .box_title {
      width: 60px;
      display: flex;
      font-weight: bold;
      justify-content: flex-end;
      color: #ffcc66;
    }
    .left_box > div {
      display: flex;
      margin: 5px 0;
      font-size: 13px;
      line-height: 13px;
    }
  }
  .item_footer {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    span {
      font-weight: bold;
      color: #cccccc;
      text-decoration: line-through;
    }
  }
}
</style>

