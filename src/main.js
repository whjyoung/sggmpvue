import Vue from 'vue'
import App from './App'
import store from './store/store'
//设置vue的提示功能关闭
Vue.config.productionTip = false
//声明当前组件的类型为应用
App.mpType = 'app'
//生成app应用实例

//将store原型放在vue原型上，为每个实例都能使用
Vue.prototype.$store  = store

//引入request请求封装
// import request from './util/request'
// Vue.prototype.$request = request

const app = new Vue(App)
//挂载整个应用
app.$mount()
