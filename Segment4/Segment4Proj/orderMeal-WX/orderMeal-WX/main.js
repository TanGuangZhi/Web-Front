/*
 * @Author: TanGuangZhi
 * @Date: 2022-03-04 11:42:13 Fri
 * @LastEditTime: 2022-03-04 17:28:15 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import App from './App'
//1.全局引入api.js(专门用于调用后端接口的)
import api from "./apis/api.js";
// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";

Vue.use(uView);
Vue.prototype.$api = api;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
