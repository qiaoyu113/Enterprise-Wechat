<template>
  <div class="my">
    <div class="head"></div>
    <div class="header-tit">
      {{ userName }}
    </div>
    <div v-if="cityVal" class="flex">
      <div class="left">
        所属城市
      </div>
      <div class="line"></div>
      <div class="right">
        {{ cityVal }}
      </div>
    </div>
    <div v-if="roleVal" class="flex">
      <div class="left">
        所属角色
      </div>
      <div class="line width"></div>
      <div class="right">
        {{ roleVal }}
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/common'
export default {
  name: 'BssMy',
  data() {
    return {
      userInfo: {},
      cityVal: '',
      roleVal: '',
      userName: ''
    }
  },
  async mounted() {
    const { data: { data }} = await getUserInfo();
    this.userInfo = data;
    this.cityVal = (data.onlineCityList || []).map(item => item.label).join('、');
    this.roleVal = (data.roleNamesCn || []).join('、');
    this.userName = data.userName;
  }
}
</script>

<style lang="scss" scoped>
.my{
  padding-top: 24px;
  width: 100%;
  height: 230px;
  background: url('../../assets/banner.png') center no-repeat;
  background-size: 100% 100%;
  padding-bottom: 0;
  .head{
    margin: 0 auto;
    width: 75px;
    height: 75px;
    background: url('../../assets/head.png') center no-repeat;
    background-size: 100% 100%;
    border-radius: 50%;
  }
  .header-tit{
    margin-bottom: 14px;
    font-size: 18px;
    color: #FFD976;
    text-align: center;
    line-height: 26px;
    font-weight: bold;
  }
  .flex{
    display: flex;
    &:nth-last-of-type(1){
      margin-top: 8px;
    }
    >div{
      display: flex;
      align-self: center;
      justify-content: center;
      font-size: 12px;
      color: #FFD976;
    }
    .left{
      margin-left: 25%;
      height: 19px;
      background: rgba(255,217,118,0.2);
      border: 1px solid #FFD976;
      border-radius: 3px;
    }
    .line{
      margin: 0 5px;
      width: 23px;
      border-top: 1px solid #FFD976;
    }
    .right{
      padding-right: 20px;
      flex: 1;
      justify-content: left
    }
    .width{
      width: 11px;
    }
  }
}
</style>
