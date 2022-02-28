/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-28 09:24:29 Mon
 * @LastEditTime: 2022-02-28 09:44:05 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import Vue from 'vue'
import Vuex from 'vuex'
import bookStore from './book/bookStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bookStore
  }
});
