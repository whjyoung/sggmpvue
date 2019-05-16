<template>
    <div class="listDetail">
        <img class="backgd" :src="detailData.detail_img" alt="">
        <img @click="playMusic" class="music_img" :src="isPlaying ? '/static/images/music/music-start.png' : '/static/images/music/music-stop.png'" alt="">
        <div class="detailCon">
            <img class="detailAvatar" :src="detailData.avatar" alt="">
            <div>
                <span>{{detailData.author}}</span>
                <span>发表于</span>
                <span>{{detailData.date}}</span>
            </div>
        </div>
        <div class="detailAuthor">
            <div>{{detailData.title}}</div>
            <div class="right">
                <span class="collect" @click="collect">
                    <img :src="isCollected ? '/static/images/icon/collection.png' : '/static/images/icon/collection-anti.png'" alt="">
                </span>
                <span class="share" @click="share">
                    <img src="/static/images/icon/share-anti.png" alt="">
                </span>
            </div>
        </div>
        <div class="detailIntro">
            {{detailData.detail_content}}
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import isPlayObj from '../../datas/isPlay'
export default {
    data(){
        return{
            detailData:{},//详情数据
            isCollected:false,//是否收藏  false未，true是
            isPlaying:false //音乐是否播放
        }
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
        }
        return {
        title: '自定义转发标题',
        path: '/page/user?id=123'
        }
    },
    methods:{
        collect(){//收藏
            this.isCollected = !this.isCollected;
            let title = this.isCollected ? '收藏成功' : '取消收藏'
            wx.showToast({
                title: title,
                icon: 'success',
                duration: 2000
            })
            //先获取状态
            let oldStorage = wx.getStorageSync('isCollected')||{};
            //先保存状态
            oldStorage[this.index] = this.isCollected;
            wx.setStorage({
                key:'isCollected',
                data:oldStorage//对象
            })
        },
        playMusic(){
            this.isPlaying = !this.isPlaying;
            if(this.isPlaying){//播放
                wx.playBackgroundAudio({
                    dataUrl: this.detailData.music.dataUrl,
                    title: this.detailData.music.title,
                    coverImgUrl: ''
                })
            }else{//暂停
                wx.pauseBackgroundAudio();
            }
        },
        share(){
            wx.showActionSheet({
                itemList: ['A', 'B', 'C'],
                success(res) {
                    console.log(res.tapIndex)
                },
                fail(res) {
                    console.log(res.errMsg)
                }
            })
        }
    },
    computed:{
        ...mapGetters({listTmp:'getList'})
    },
    // onLoad(option){//获取前页面传过来的参数
    //     console.log(option.index)
    // }
    beforeMount(){//获取前页面传过来的参数,也可以实现
        console.log(this.$mp.query.index)
        this.index  = this.$mp.query.index;
        //查看本地收藏状态
        // 预处理工作： 本地是否收藏的缓存
        let oldStorage = wx.getStorageSync('isCollected')
        if(!oldStorage){ // 为空
            wx.setStorage({
            key: 'isCollected',
            data: {}
            })
        }else {
            // 用户缓存过
            this.isCollected = (oldStorage[this.index]?true: false)
        }

        //判断当前页面是否是播放音乐的状态
        isPlayObj.pageIndex == this.index && isPlayObj.isPlay ? this.isPlaying = true : this.isPlaying = false;
        //监听窗口音乐的播放暂停状态
        wx.onBackgroundAudioPlay(()=>{//播放
            this.isPlaying = true;
            isPlayObj.pageIndex = this.index;
            isPlayObj.isPlay = true;
        })
        wx.onBackgroundAudioPause(()=>{
            this.isPlaying = false;
            // isPlayObj.pageIndex = this.index;
            isPlayObj.isPlay = false;
        })
    },
    mounted(){//更新数据
        this.detailData = this.listTmp[this.index]
        
    }
}
</script>
<style scoped>
.listDetail{
    display: flex;
    flex-direction: column;
}
.listDetail .backgd{
    width: 100%;
    height: 400rpx;
}
.music_img{
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    margin-top: 160rpx;
    left: 50%;
    margin-left: -40rpx;
}
.detailCon{
    margin: 20rpx 0;
    display: flex;
    align-items: center;
}
.detailCon .detailAvatar{
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
}
.detailAuthor{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20rpx;
}
.collect img,.share img{
    width: 80rpx;
    height: 80rpx;
    margin: 0 20rpx;
}
.detailIntro{
    text-indent: 50rpx;
    padding: 0 20rpx;
}
</style>


