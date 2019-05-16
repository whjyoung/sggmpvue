// main.js页面的功能是将这个页面组件生成 vue实例并加载的main.js
// 这段代码的功能是引入index.vue并创建Vue实例
import Vue from 'vue'
import listDetail from './listDetail'

const app = new Vue(listDetail)
app.$mount()//挂载当前的页面
