/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 18:57:11 Tue
 * @LastEditTime: 2022-02-24 14:14:00 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import Utils from './common/utils'
import "./filters/filter.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

//1.将过滤器引入到全局
import "./filters/filter.js";

//2.将自定义指令引入到全局
import "./directives/directive.js";

import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.Utils = Utils
//1.配置后端接口的基础路径
axios.defaults.baseURL = "http://localhost:3000/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
