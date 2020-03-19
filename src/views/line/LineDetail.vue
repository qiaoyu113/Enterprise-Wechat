<template>
  <div class="linedetail">
    <div class="list-wrap">
      <vo-pages
        :data="[]"
        :loaded-all="loadedAll"
        :no-data-hint="false"
      >
        <van-tabs v-model="listQuery.state" color="#3986CB" sticky>
          <van-tab title="基本">
            <van-cell-group>
              <van-cell v-for="item in detail" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
          </van-tab>
          <van-tab title="配送">
            <van-cell-group>
              <van-cell v-for="item in follow" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
          </van-tab>
          <van-tab title="关键">
            <van-cell-group>
              <van-cell v-for="item in action" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
          </van-tab>
          <van-tab title="标书">
            <van-cell-group>
              <van-cell v-for="item in action" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
          </van-tab>
          <van-tab title="记录">
            <van-cell-group>
              <van-cell v-for="item in action" :key="item.type" :title="item.fieldName" :value="item.value" />
            </van-cell-group>
          </van-tab>
        </van-tabs>
        <van-button type="info" block class="btn" @click="pushSendLink">
          发送此连接
        </van-button>
      </vo-pages>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs, Cell, CellGroup, Button } from 'vant'
// import { customerDetail } from '@/api/user'
import { getCorpSignature, getAgentSignature } from '@/api/user'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
const wx = window.wx;
export default {
  name: 'LineDetail',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    VoPages
  },
  data() {
    return {
      listQuery: {
        state: 0
      },
      active: 1,
      detail: [],
      follow: [],
      action: [],
      total: 0,
      page: 1,
      show: false,
      actions: [
        { name: '产品介绍', color: '#3F8AF2' },
        { name: '推荐线路', color: '#3F8AF2' }
      ],
      loadedAll: false
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
    //   customerDetail({
    //     custClueId: 201910231017
    //   }).then((res) => {
    //     if (res.data.success) {
    //       console.log(res.data.data)
    //       this.detail = res.data.data
    //     }
    //   })
      this.detail = [
        {
          fieldEn: 'field_2',
          fieldName: '外线销售姓名',
          type: 'single_line_text',
          notes: '',
          value: '石晓光'
        }
      ]
    },
    pushSendLink() {
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
                getAgentSignature({
                  agentId: '1000013',
                  url: hostName
                }).then((res) => {
                  if (res.data.success) {
                    const agentData = res.data.data
                    wx.agentConfig({
                      corpid: agentData.corpId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                      agentid: agentData.agentId, // 必填，企业微信的应用id （e.g. 1000247）
                      timestamp: '' + agentData.timestamp, // 必填，生成签名的时间戳
                      nonceStr: agentData.nonceStr, // 必填，生成签名的随机串
                      signature: agentData.signature, // 必填，签名，见附录1
                      jsApiList: ['sendChatMessage', 'getCurExternalContact'], // 必填
                      success: function(res) {
                        wx.invoke('sendChatMessage', {
                          msgtype: 'text', // 消息类型，必填
                          text: {
                            content: '测试' // 文本内容
                          },
                          image:
                          {
                            mediaid: '2TLVdgtYCwWc3BXOlAErsdp93e7IKfqA__9OYWVOtNEA_ex0lGEK3cxC1yze78X09' // 图片的素材id
                          },
                          video:
                          {
                            mediaid: '' // 视频的素材id
                          },
                          file:
                          {
                            mediaid: '' // 文件的素材id
                          },
                          news:
                          {
                            link: 'www.baidu.com', // H5消息页面url 必填
                            title: '百度', // H5消息标题
                            desc: '百度', // H5消息摘要
                            imgUrl: 'https://upload.jianshu.io/users/upload_avatars/10311999/16dbb33b-6d2d-47c9-9d6a-fbadccc67e85.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' // H5消息封面图片URL
                          }
                        }, function(res) {
                          console.log('测试1通过', res)
                          wx.invoke('sendChatMessage', {
                            msgtype: 'text', // 消息类型，必填
                            text: {
                              content: '测试22222' // 文本内容
                            },
                            image:
                            {
                              mediaid: '2TLVdgtYCwWc3BXOlAErsdp93e7IKfqA__9OYWVOtNEA_ex0lGEK3cxC1yze78X09' // 图片的素材id
                            },
                            video:
                            {
                              mediaid: '' // 视频的素材id
                            },
                            file:
                            {
                              mediaid: '' // 文件的素材id
                            },
                            news:
                            {
                              link: 'www.baidu.com', // H5消息页面url 必填
                              title: '百度', // H5消息标题
                              desc: '百度', // H5消息摘要
                              imgUrl: 'https://upload.jianshu.io/users/upload_avatars/10311999/16dbb33b-6d2d-47c9-9d6a-fbadccc67e85.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' // H5消息封面图片URL
                            }
                          }, function(res) {
                            console.log('测试2通过', res)
                          })
                        })
                      },
                      fail: function(res) {
                        console.log('err', res)
                        if (res.errMsg.indexOf('is not a function') > -1) {
                          alert('<i class="weui-icon-warn">版本过低请升级</i>')
                        }
                      }
                    });
                  }
                })
              },
              fail: function(res) {
                alert('版本过低请升级');
              }
            });
          });
          wx.error(function(res) {
            console.log(res);
          });
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.linedetail{
p{
  margin-block-start: 0;
  margin-block-end: 0;
}
.container{
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  .list-wrap{
    height: calc(100% - 50px);
    overflow-y: hidden;
  }
}

.btn{
    width:100%;
    transform: translate3d(0,0,0);
    position: fixed;
    bottom: 0;
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
}
</style>
