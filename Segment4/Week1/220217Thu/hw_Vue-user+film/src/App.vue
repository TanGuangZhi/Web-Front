<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-17 18:33:32 Thu
 * @LastEditTime: 2022-02-17 19:57:07 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row text-right" style="line-height: 60px; background: black">
        <div class="col-md-12">
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="changeManager('UserManager')"
          >
            用户管理
          </button>
          <button
            type="button"
            class="btn btn-outline-warning"
            @click="changeManager('FilmManager')"
          >
            电影管理
          </button>
        </div>
      </div>
    </div>
    <!--currentPage==UserManager  <===>  <UserManager>-->
    <!--currentPage==FilmManager  <===>  <FilmManager>-->
    <!--放置组件的频繁 创建以及销毁...-->
    <keep-alive>
      <component :is="currentPage"></component>
    </keep-alive>
  </div>
</template>

<script>
import UserManager from "./components/UseManager.vue";
import FilmManager from "./components/FilmManager.vue";
//1.引入组件
export default {
  name: "App",
  //2.注册子组件
  components: {
    UserManager,
    FilmManager,
  },
  data() {
    return {
      currentPage: "FilmManager",
    };
  },
  methods: {
    changeManager(currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>

<style>
</style>
