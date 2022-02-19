import Vue from 'vue'
import App from './App.vue'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

Vue.config.productionTip = false
//1.设置接口的默认路径
import axios from "axios"
axios.defaults.baseURL="http://localhost:3000/";
//2.全局加载 api.js(封装了 整个项目所有的api接口)
import api from "./http/api.js";
Vue.prototype.$api=api;



new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
