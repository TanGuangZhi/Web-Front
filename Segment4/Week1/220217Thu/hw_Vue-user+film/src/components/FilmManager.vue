<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-17 18:33:32 Thu
 * @LastEditTime: 2022-02-17 20:11:14 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div>
    <h2 class="text-center">电影管理</h2>
    <AddFilm />
    <UpdateFilm />
    <QueryFilm />
  </div>
</template>

<script>
import QueryFilm from "./film/QueryFilm.vue";
import AddFilm from "./film/AddFilm.vue";
import UpdateFilm from "./film/UpdateFilm.vue";

export default {
  name: "FilmManager",
  components: {
    QueryFilm,
    AddFilm,
    UpdateFilm,
  },
  // beforeCreate(){
  //     console.log("1.FilmManager 初始化阶段(未加载data,methods)...");
  // },
  // created(){
  //     console.log("2.FilmManager 初始化阶段(已经加载data,methods)...");
  // },
  // beforeMount(){
  //     console.log("3.FilmManager 渲染页面之前...");
  // },
  // mounted(){
  //     console.log("4.FilmManager 渲染页面之后")
  // },
  // beforeUpdate(){
  //     console.log("5.FilmManager 修改data数据 之前执行...")
  // },
  // updated(){
  //     console.log("6.FilmManager 修改data数据 之后执行...")
  // },
  // beforeDestroy(){
  //     console.log("7.FilmManager 组件销毁之前执行...")
  // },
  // destroyed(){
  //     console.log("8.FilmManager 组件销毁之后执行...")
  // },activated(){
  //     console.log("FilmManager 组件被激活了...");
  // },deactivated(){
  //     console.log("FilmManager 组件被停用了...");
  // }
};
</script>

<style scoped>
</style>
