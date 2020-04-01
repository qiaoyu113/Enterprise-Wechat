<script>
let agentId = '1000016';
let url = window.location.host
if (url !== 'http://firmiana-wechat.yunniao.cn/') {
  if (location.host !== 'http://firmiana-open-api.d2.ynimg.cn/') {
    // url = 'http://firmiana-wechat.m1.yunniao.cn/'
    agentId = '1000013'
  } else {
    agentId = '1000015'
    // url = 'http://firmiana-open-api-d2.yunniao.cn/'
  }
}
export default
{
  agentId // agentId
}
</script>
