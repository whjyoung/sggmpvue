<script>
//相当于原生小程序中的app.js
export default {
  created(){
    console.log('miniapp created!!!');
    globalData:{}
  }
}
</script>

<style>
/* 相当于原生小程序的app.wxss 全局样式*/
page{
  height: 100%;
  /* background: #8ed145;
  padding-top: 100rpx; */
}
/* .container{
  background-color: #cccccc;
} */
</style>
