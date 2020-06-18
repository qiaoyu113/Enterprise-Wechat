<template>
  <div class="home">
    <div class="grid">
      <div v-for="(item, index) in list" :key="index" class="grid-item" @click="goRouter(item.url)">
        <div class="flex">
          <div v-if="item.icon" class="icon"></div>
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
          icon: '',
          title: '线索管理',
          url: '/bss/add-line'
        },
        {
          icon: '',
          title: '货主管理',
          url: ''
        },
        {
          icon: '',
          title: '线路管理',
          url: ''
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
      justify-items: center;
      width: 100%;
      height: 100%;
    }
    .icon{

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

