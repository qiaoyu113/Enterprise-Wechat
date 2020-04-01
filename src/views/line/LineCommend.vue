<template>
  <div class="linecommend">
    <SearchItem @searchData="searchFunction"></SearchItem>
    <div class="list-wrap">
      <vo-pages
        :data="list"
        :loaded-all="loadedAll"
        @pullingUp="pullingUp"
        @pullingDown="pullingDown"
      >
        <div class="placeholder"></div>
        <div v-for="item in list" :key="item.type" class="lineList" @click="goDetail(item.lineId, item.timeDiff, item.monthlyTransaction)">
          <div class="lineListTop">
            <div class="name">
              {{ item.lineName }}<van-tag plain type="primary" size="small" style="margin-left: 0.3rem;">
                {{ item.lineRankName }}
              </van-tag>
            </div>
            <div class="info">
              {{ item.cargoType }}/{{ item.carTypeName }}
            </div>
          </div>
          <div class="lineListBottom">
            <van-cell title="详情" is-link />
          </div>
        </div>
      </vo-pages>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Tag } from 'vant'
import { selectLineTask } from '@/api/line'
import { getCorpSignature, getAgentSignature } from '@/api/user'
import VoPages from 'vo-pages'
import SearchItem from 'components/SearchItem'
import 'vo-pages/lib/vo-pages.css'
const wx = window.wx;
export default {
  name: 'Linecommend',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    VoPages,
    SearchItem
  },
  data() {
    return {
      listQuery: {
        'carType': '',
        'cargoType': '',
        'city': '',
        'key': '',
        'limit': '20',
        'page': 1
      },
      active: 1,
      list: [],
      total: 0,
      page: 1,
      show: false,
      beforePullDown: false,
      actions: [
        { name: '产品介绍', color: '#3F8AF2' },
        { name: '推荐线路', color: '#3F8AF2' }
      ],
      loadedAll: false
    }
  },
  mounted() {
    let externalUserIdOld = localStorage.getItem('externalUserId')
    if (externalUserIdOld) {
      this.getUserConfig(true, externalUserIdOld);
    } else {
      this.getUserConfig(false, externalUserIdOld);
      this.getList()
    }
  },
  methods: {
    getUserConfig(type, externalUserIdOld) {
      let that = this;
      const hostName = window.location.href
      getCorpSignature({
        url: hostName
      }).then((res) => {
        if (res.data.success) {
          let data = res.data.data;
          wx.config({
            beta: true,
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.corpId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: Number(data.timestamp), // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['agentConfig'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function() {
            // 开启企业微信debug模式wx.config里的debug为true
            wx.checkJsApi({
              jsApiList: [
                'agentConfig',
                'sendChatMessage',
                'getCurExternalContact'
              ],
              success: function(res) {
                console.log('checkJsApi', res)
                getAgentSignature({
                  agentId: this.GLOBAL.agentId,
                  url: hostName
                }).then((res) => {
                  if (res.data.success) {
                    const agentData = res.data.data
                    console.log('agentData', agentData)
                    wx.agentConfig({
                      corpid: agentData.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                      agentid: agentData.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                      timestamp: '' + agentData.timestamp, // 必填，生成签名的时间戳
                      nonceStr: agentData.nonceStr, // 必填，生成签名的随机串
                      signature: agentData.signature, // 必填，签名，见附录1
                      jsApiList: ['sendChatMessage', 'getCurExternalContact'], // 必填
                      success: function(res) {
                        console.log('success', res)
                        wx.invoke('getCurExternalContact', {
                        }, function(res) {
                          if (res.err_msg === 'getCurExternalContact:ok') {
                            // console.log('userId', res.userId) // 返回当前外部联系人userId
                            localStorage.setItem('externalUserId', res.userId)
                            let externalUserId = res.userId
                            if (type) {
                              if (externalUserId === externalUserIdOld) {
                                let lineIdNeedBack = localStorage.getItem('lineIdNeedBack')
                                if (lineIdNeedBack) {
                                  lineIdNeedBack = JSON.parse(lineIdNeedBack)
                                  if (lineIdNeedBack.lineId) {
                                    localStorage.removeItem('lineIdNeedBack')
                                    that.$destroy(true)
                                    that.$router.push({ path: '/linedetail', query: { id: lineIdNeedBack.lineId, timeDiff: lineIdNeedBack.timeDiff, monthlyTransaction: lineIdNeedBack.monthlyTransaction, backBtn: 1 }})
                                  }
                                } else {
                                  that.getList()
                                }
                              } else {
                                localStorage.removeItem('lineIdNeedBack')
                                that.getList()
                              }
                            } else {
                              localStorage.removeItem('lineIdNeedBack')
                            }
                          } else {
                            // 错误处理
                            this.btnShow = true;
                          }
                        });
                      },
                      fail: function(res) {
                        console.log('err', res)
                        if (res.errMsg.indexOf('is not a function') > -1) {
                          alert('<i class="weui-icon-warn">版本过低请升级333</i>')
                        }
                      }
                    });
                  }
                })
              },
              fail: function(res) {
                alert('版本过低请升级2');
              }
            });
          });
          wx.error(function(res) {
            console.log(res);
          });
        }
      })
    },
    pullingDown() {
      this.beforePullDown = false
      this.listQuery.page = 1
      this.getList(false)
    },
    pullingUp() {
      this.listQuery.page += 1
      this.getList()
    },
    searchFunction(data) {
      this.listQuery.carType = data.carVal
      this.listQuery.cargoType = data.cargoVal
      this.listQuery.city = data.lineVal
      this.listQuery.key = data.findVal
      this.listQuery.page = 1
      this.list = [];
      this.pullingDown()
    },
    getList(loadMore = true) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      selectLineTask(this.listQuery).then((res) => {
        if (res.data.success) {
          Toast.clear();
          console.log(res.data.data)
          let lists = res.data.data
          this.total = res.data.page.total
          // const newList = lists.map(item => {
          //   return item
          // })
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
    goDetail(id, timeDiff, monthlyTransaction) {
      this.$router.push({ path: '/linedetail', query: { id: id, timeDiff: timeDiff, monthlyTransaction: monthlyTransaction }})
    }
  }
}
</script>
<style lang="scss" scope>
.linecommend{
    background: #f7f8fa;
    height: 100%;
    width: 100%;
    .list-wrap{
        height: 100%;
        // overflow-y: hidden;
        // padding:0.5rem 0.3rem;
        // box-sizing: border-box;
    }
    .lineList{
        width:100%;
        border-radius: 1.2rem;
        padding: 0.3rem;
        box-sizing: border-box;
        overflow: hidden;
        .lineListTop{
            background:#fff;
            .info{
                color:#333;
                font-size:14px;
                padding:0 0.42667rem 0.26rem;
                box-sizing: border-box;
            }
            .name{
                width:100%;
                height:1.2rem;
                line-height: 1.2rem;
                font-size: 16px;
                font-weight: 500;
                padding:0 0.42667rem;
                box-sizing: border-box;
            }
        }
    }
    p{
        margin-block-start: 0;
        margin-block-end: 0;
    }

    .article-list {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 15px 15px 0;
        .article {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 10px 15px;
            box-sizing: border-box;
            background: #FFF;
            border-radius: 5px;
            box-shadow: 0 0 6px #e3e3e3;
            .left {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }
            .right {
                padding-left: 15px;
                box-sizing: border-box;
                display: flex;
                width: 235px;
                height: 80px;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-around;
                p {
                    width: 100%;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 16px;
                }
                .more-info{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    color: #666;
                }
            }
        }
    }
    .focus{
        width:100%;
        text-align: center;
        padding-top: 1rem;
        box-sizing: border-box;
        img{
            width: 60%;
        }
        p{
            color:#666;
            font-size: 14px;
        }
    }
    .placeholder{
      width:100%;
      height:1.6rem;
    }
}
</style>
