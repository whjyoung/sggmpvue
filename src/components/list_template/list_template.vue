<template>
    <div class="list_template">
        <div class="list_container" v-for="(item,index) in listTmp" :key="index" @click='toDetail(index)'>
            <div class="avatar_date">
                <img :src="item.avatar" alt="">
                <span>{{item.date}}</span>
            </div>
            <div class="company">{{item.title}}</div>
            <div class="container_img">
                <img :src="item.detail_img" alt="">
            </div>
            <div class="container_desc">
                {{item.detail_content}}
            </div>
            <div class="container_watch">
                <img src="../../../static/images/icon/star.png" alt="">
                <span>{{item.love_count}}</span>
                <img src="../../../static/images/icon/view.png" alt="">
                <span>{{item.attention_count}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        listTmp:Array
    },
    data(){
        return{

        }
    },
    methods:{
        toDetail(index){//去详情
            // console.log(index);
            wx.navigateTo({
                url:"/pages/listDetail/main?index="+index
            })
        }
    }
    
}
</script>
<style scoped>
.list_template{
    display:flex;
    flex-direction: column;
    padding:20rpx 10rpx;
}
.list_container{
    margin: 40rpx 0;
}
.avatar_date{
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}
.avatar_date img{
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
}
.company{
    font-size: 36rpx;
    margin-bottom: 20rpx;
}
.container_img{
    width: 100%;
    height: 400rpx;
    margin-bottom: 20rpx;
}
.container_img img{
    width: 100%;
    height: 100%;
}
.container_desc{
    display: -webkit-box !important;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
    margin-bottom: 20rpx;
}
.container_watch{
    display:flex;
    align-items: center;
}
.container_watch img{
    width: 40rpx;
    height: 40rpx;
}
.container_watch span{
   margin: 0 40rpx;
}
</style>


