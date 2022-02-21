/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 10:33:47 Fri
 * @LastEditTime: 2022-02-18 14:57:20 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import Vue from 'vue';
import Vuex from 'vuex';
import api from "../http/api.js";
import user from "./modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    // film
  }
})
// export default new Vuex.Store({
//   state: {
//     name: "kunkka"
//   },
//   mutations: {
//     UPDATE(state, name) {
//       state.name = "TGZ";
//     }
//   },
//   actions: {
//     testAsync() {
//       return "async success";
//     },
//     async axiosTest() {
//       // let data = await axios({ url: "film/queryType", method: "get" });
//       let data = await api.queryFilm();
//       console.log(data);
//     }
//   },
//   modules: {
//   }
// })
