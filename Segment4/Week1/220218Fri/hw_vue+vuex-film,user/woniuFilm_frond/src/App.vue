<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:27 Fri
 * @LastEditTime: 2022-02-19 11:20:15 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row text-right table-bordered" style="line-height: 80px">
        <div class="col-md-12">
          <button
            type="button"
            style="margin-right: 20px"
            class="btn btn-outline-primary"
            @click="changeView('UserView')"
          >
            用户管理
          </button>
          <button
            type="button"
            style="margin-right: 20px"
            class="btn btn-outline-success"
            @click="changeView('FilmView')"
          >
            电影管理
          </button>
        </div>
      </div>
    </div>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script>
import UserView from "./components/UserView.vue";
import FilmView from "./components/FilmView.vue";
export default {
  name: "App",
  data() {
    return {
      currentView: "FilmView",
    };
  },
  methods: {
    changeView(currentView) {
      this.currentView = currentView;
    },
  },
  components: {
    UserView,
    FilmView,
  },
};
</script>

<style>
</style>
