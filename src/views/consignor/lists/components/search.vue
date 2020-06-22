<template>
  <div class="consignorSearch">
    <van-search placeholder="请输入货主名称" background="#F2F2F2" @click="handleSearchClick" />
    <div class="add">
      <van-icon name="add" size="51" color="#5C9BDD " @click="handleAddClick" />
      <p @click="handleAddClick">
        新建货主
      </p>
    </div>
  </div>
</template>

<script>
import { Search, Icon } from 'vant';
export default {
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon
  },
  methods: {
    handleSearchClick() {
      this.$router.push({
        path: '/bss/consignorSearch'
      })
    },
    handleAddClick() {
      this.$router.push({
        path: '/bss/consignorAdd'
      })
    }
  }
}

</script>

<style lang='scss' scoped>
.consignorSearch {
  .add {
    margin-top: 8px;
    text-align: center;
    &:after {
      display: block;
      content:'';
      height:10px;
      width: 100%;
      background: #F2F2F2;
    }
    p {
      margin: 0px 0px 6px 0px;
      color:#5C9BDD ;
      font-size:14px;
    }
  }
}

</style>

<style scoped>
  .consignorSearch >>> .van-search__content {
    background: #ffffff;
  }
</style>
