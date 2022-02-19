/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 10:33:47 Fri
 * @LastEditTime: 2022-02-18 14:31:13 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 *  220218: add axios default url
 * @KeyWords: NodeJs, Express, MongoDB
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from 'axios';
import api from "./http/api.js";

// 1. add default api url
axios.defaults.baseURL = 'http://localhost:3000/';

// 2. global load api.js
Vue.prototype.$api = api;

Vue.config.productionTip = false;
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
