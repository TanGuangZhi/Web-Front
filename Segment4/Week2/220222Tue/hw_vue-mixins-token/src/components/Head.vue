<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 09:55:55 Tue
 * @LastEditTime: 2022-02-22 15:09:15 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <div id="head">
    <div class="container-fluid">
      <div class="row text-right" style="line-height: 60px; background: black">
        <div class="col-md-12">
          <router-link to="/userView" class="btn btn-outline-primary"
            >用户管理</router-link
          >
          <router-link to="/filmView" class="btn btn-outline-info"
            >电影管理</router-link
          >
          <router-link to="/login" class="btn btn-outline-danger"
            >登录</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
};
</script>

<style scoped>
</style>
