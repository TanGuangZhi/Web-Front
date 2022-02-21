import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

Vue.config.productionTip = false
//1.配置后端接口的基础路径
import axios from "axios";
axios.defaults.baseURL="http://localhost:3000/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
