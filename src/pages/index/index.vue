<!-- index页面是用于实现页面主体功能 -->
<template>
  <div class="index">
    <div class="userInfo" v-if="isShow">
      <img class="userAvatar" :src="userInfo.avatarUrl" alt>
      <p class="userName">{{userInfo.nickName}}</p>
      <div class="start" @click="startMpvue">开启小程序之旅</div>
    </div>
    <!-- 没有登录的时候-->
    <div class="start" v-else @click="startMpvue">开启小程序之旅</div>
    <!-- 弹出是否授权模态框 -->
    <div class="model" v-show="isAuthorize">
      <div class="mask"></div>
      <div class="body">
        <div class='title'>开启微信授权</div>  
        <div class='content'>您暂未获取微信授权，将无法正常使用小程序的功能</div>
        <div class='btn'>
            <div class='cancel dialog__btn' @click='cancelSetting'>取消</div>
            <label class='confirm dialog__btn'>
                <div>授权登录</div>
                <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" hidden='1' @click = "isAuthorize = !isAuthorize"></button>
            </label>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      isShow: false, //初始化时用户未登录
      isAuthorize:false//是否授权
    };
  },
  beforeMount() {
    this.handleUserInfo(); //判断用户是否授权
  },
  methods: {
    handleUserInfo() {
      //获取用户登录信息
       wx.getSetting({
        success: (res) => {
          if (res.authSetting["scope.userInfo"]) {
            //已授权,获取用户信息
            wx.getUserInfo({
              success: (res) => {
                getApp().globalData.userInfo = res.userInfo;//将微信用户信息保存于全局变量中
                this.userInfo = res.userInfo;
                this.isShow = true;
              }
            });
          } else {
            //未授权，弹框
            console.log("666");
            this.isAuthorize = true;
          }
        }
      });
    },
    //点击按钮登录
    bindGetUserInfo(e) {
      console.log(e);
      //判断用户是否授权
      if (e.mp.detail.rawData) {
        getApp().globalData.userInfo = e.mp.detail.userInfo;
        this.userInfo = e.mp.detail.userInfo;
        this.isShow = true;
      }
    },
    cancelSetting() {//授权取消
      this.isAuthorize = false;
    },
    //点击跳转
    startMpvue(){
      if(JSON.stringify(this.userInfo) != "{}"){
        wx.navigateTo({
          url:"../list/main"
        })
      }else{
        this.handleUserInfo();
      }
    }
  }
};
</script>

<style scoped>
.index{
  height: 100%;
  background: #8ed145;
}
.index,
.userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top:10%;
}
.userAvatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  margin-top: 100rpx;
}
.userName {
  font-size: 40rpx;
  margin-top: 10rpx;
}
.start {
  text-align: center;
  border: 1rpx solid #eee;
  margin: 0 auto;
  margin-top: 50rpx;
  padding: 20rpx 40rpx;
  border-radius: 10rpx;
}
.mask {
  position: absolute;
  bottom: 0;
  top: 0;
  height: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
}
.body {
  width: 80%;
  max-width: 300px;
  border-radius: 6rpx;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  text-align: center;
  overflow: hidden;
  padding-top: 40rpx;
}
.title {
  padding: 14rpx 26rpx 24rpx;
  font-size: 36rpx;
  color: #333;
  line-height: 1;
  font-weight: bold;
}
.content {
  padding-bottom: 34rpx;
  min-height: 80rpx;
  font-size: 30rpx;
  line-height: 1.3;
  word-wrap: break-word;
  word-break: break-all;
  color: #999;
  width: 75%;
  margin: auto;
}
.btn {
  position: relative;
  line-height: 96rpx;
  font-size: 36rpx;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.btn::after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d5d5d6;
  color: #d5d5d6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.dialog__btn {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #22ba66;
  font-size: 36rpx;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
}
.btn .cancel {
  color: #333;
  position: relative;
}
.cancel::after {
  content: " ";
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 1px solid #d5d5d6;
  color: #d5d5d6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.confirm {
  background: none;
  border: none;
  outline: none;
}
</style>
