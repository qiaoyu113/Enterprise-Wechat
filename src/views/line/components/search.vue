<template>
  <div class="searchContainer">
    <van-sticky>
      <van-search
        v-model="form.key"
        placeholder="请输入线路名称"
        background="#F2F2F2"
        @input="onSearch"
        @search="onSearch"
        @clear="onClear"
        @focus="onFocus"
        @blur="onBlur"
      >
      </van-search>
    </van-sticky>
    <div v-if="historyLists.length> 0">
      <dl
        v-show="isShow"
        class="history"
      >
        <dt>历史搜索</dt>
        <dd
          v-for="item in historyLists"
          :key="item.lineId"
          @click="handleItemClick(item)"
        >
          {{ item.keys }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { Search, Sticky } from 'vant';
import { debounce } from '@/utils/index';
export default {
  components: {
    [Search.name]: Search,
    [Sticky.name]: Sticky
  },
  props: {
    form: {
      type: Object,
      default: () => {}
    },
    historyLists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    this.$parent.$refs.list.addEventListener('scroll', this.onBlur, false);
  },
  beforeDestroy() {
    this.$parent.$refs.list.removeEventListener('scroll', this.onBlur, false);
  },

  methods: {
    /**
     * 搜索
     */
    onSearch: debounce(function() {
      if (!this.form.key) {
        this.$emit('clear');
        return false;
      }
      this.$emit('getVal', { keys: this.form.key });
    }, 500),

    /**
     * 清除
     */
    onClear() {
      this.form.key = '';
      this.$emit('clear');
    },
    onFocus() {
      this.isShow = true;
    },
    onBlur() {
      this.isShow = false;
    },
    handleItemClick(item) {
      this.$emit('getVal', item);
    }
  }
};
</script>

<style lang='scss' scoped>
.searchContainer {
  position: relative;
  .history {
    margin: 0px 10px;
    position: absolute;
    left: 2px;
    top: 44px;
    width: 351px;
    background: #ffffff;
    box-shadow: 1px 2px 4px 0px #e6e5e5;
    z-index: 10;
    &:before {
      display: block;
      content: "";
      border-top: 1px solid #c2def5;
    }
    dt {
      margin: 10px;
      font-size: 14px;
      color: #686f75;
      font-weight: bold;
    }
    dd {
      margin-left: 0px;
      padding: 0px 20px;
      width: calc(100% - 40px);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      height: 30px;
      line-height: 30px;
      color: #94999d;
      font-size: 14px;
    }
  }
}
</style>

<style scoped>
.searchContainer >>> .van-search__content {
  background: #ffffff;
}
</style>

