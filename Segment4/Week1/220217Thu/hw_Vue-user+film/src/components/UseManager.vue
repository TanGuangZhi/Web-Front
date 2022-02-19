<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-17 18:33:32 Thu
 * @LastEditTime: 2022-02-17 20:37:16 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div id="app">
    <AddUser />
    <UpdateUser />
    <Pagination />
    <QueryUser />
  </div>
</template>

<script>
import QueryUser from "./user/QueryUser.vue";
import AddUser from "./user/AddUser.vue";
import UpdateUser from "./user/UpdateUser.vue";
import Pagination from "./user/Pagination.vue";

export default {
  name: "UseManager",
  components: {
    QueryUser,
    AddUser,
    UpdateUser,
    Pagination,
  },
  // beforeCreate(){
  //     console.log("1.UserManager 初始化阶段(未加载data,methods)...");
  // },
  // created(){
  //     console.log("2.UserManager 初始化阶段(已经加载data,methods)...");
  // },
  // beforeMount(){
  //     console.log("3.UserManager 渲染页面之前...");
  // },
  // mounted(){
  //   console.log("4.UserManager渲染页面之后")
  // },
  // beforeUpdate(){
  //     console.log("5.UserManager修改data数据 之前执行...")
  // },
  // updated(){
  //     console.log("6.UserManager修改data数据 之后执行...")
  // },
  // beforeDestroy(){
  //     console.log("7.UserManager组件销毁之前执行...")
  // },
  // destroyed(){
  //     console.log("8.UserManager组件销毁之后执行...")
  // },activated(){
  //     console.log("UserManager组件被激活了...");
  // },deactivated(){
  //     console.log("UserManager组件被停用了...");
  // }
};
</script>

<style scoped>
</style>
