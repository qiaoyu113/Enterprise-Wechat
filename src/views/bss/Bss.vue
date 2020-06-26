<template>
  <div class="home">
    <div class="grid">
      <div v-for="(item, index) in list" :key="index" class="grid-item" @click="goRouter(item.url)">
        <div class="flex">
          <svg-icon v-if="item.icon" :icon-class="item.icon" :style="{color: item.color}" />
          <h3 class="title">
            {{ item.title }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'BssIndex',
  data() {
    return {
      list: [
        {
          icon: 'bss_icon3',
          title: '线索管理',
          url: ''
        },
        {
          icon: 'bss_icon1',
          title: '货主管理',
          url: '/bss/consignorList'
        },
        {
          icon: 'bss_icon2',
          title: '线路管理',
          url: '/bss/lineList',
          color: '#fff'
        },
        {
          icon: '',
          title: '通讯录',
          url: ''
        },
        {
          icon: '',
          title: '数据分析',
          url: ''
        },
        {
          icon: '',
          title: '月度绩效',
          url: ''
        },
        {
          icon: '',
          title: '案例分享',
          url: ''
        },
        {
          icon: '',
          title: 'FQ&A',
          url: ''
        },
        {
          icon: '',
          title: '...',
          url: ''
        }
      ]
    }
  },
  methods: {
    goRouter(url) {
      if (url) {
        this.$router.push({ path: url });
      } else {
        Toast.fail('该功能暂未开放！');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: auto;
  padding-bottom: 100%;
  position: relative;
  margin-bottom: 50px;
  .grid{
    position: absolute;
    top: 15px;
    left: 15px;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .svg-icon{
    margin-bottom: 14px;
    display: block;
    font-size: 28px;
    color: rgba(0,0,0,0);
  }
  .grid-item{
    width: calc((100% - 30px) / 3);
    height: calc((100% - 30px) / 3);
    background-image: linear-gradient(-39deg, #5C9BDD 0%, #80D8F3 100%);
    box-shadow: 4px 5px 7px 0 rgba(92,155,221,0.45);
    border-radius: 10px;
    &:nth-of-type(3n){
      margin-right: 0;
    }
    .flex{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .title{
      margin: 0;
      font-weight: normal;
      text-align: center;
      font-size: 14px;
      color: #fff;
      width: 100%;
    }
  }
}
</style>

