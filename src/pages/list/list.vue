<template>
    <div class="list">
        <!-- 轮播图 -->
        <swiper indicator-dots="true" circular="true" indicator-color="#fff" indicator-active-color="green" autoplay="true">
            <div v-for="item in listImg" :key="item.id">
                <swiper-item>
                    <image :src="item"></image>
                </swiper-item>
            </div>
        </swiper>
        <!-- 引用list模板组件,将数据传给子组件 -->
        <listTemplate :listTmp = 'listTmp'></listTemplate>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
// import {mapState} from 'vuex'
import listTemplate from '../../components/list_template/list_template'
export default {
    components:{
        listTemplate
    },
    beforeMount(){
        this.$store.dispatch("getList");//触发actions
    },
    computed:{
        ...mapGetters({listTmp:'getList'})
        // ...mapState(['listTmp'])
    },
    data(){
        return{
            listImg:[
                "/static/images/detail/carousel/01.jpg",
                "/static/images/detail/carousel/02.jpg",
                "/static/images/detail/carousel/03.jpg",
                "/static/images/detail/carousel/04.jpg"
            ]
        }
    }
}
</script>
<style scoped>
.list{
    height: 100%;
    background: #fff;
}
.list swiper{
    width: 100%;
    height: 400rpx;
}
.list swiper image{
    width: 100%;
    height: 100%;
}
</style>


