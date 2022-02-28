/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-28 09:24:29 Mon
 * @LastEditTime: 2022-02-28 11:08:46 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import './plugins/element.js'

Vue.config.productionTip = false
import axios from "axios";
Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://localhost:3000/"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
