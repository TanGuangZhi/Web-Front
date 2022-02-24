<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-23 21:29:56 Wed
 * @LastEditTime: 2022-02-23 21:43:37 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <div id="main">
    <UserView />
    <!-- <router-link to="/userView" class="btn btn-outline-primary"
      >用户管理</router-link
    > -->

    <!-- <router-link to="/filmView" class="btn btn-outline-info"
            >电影管理</router-link
          >
          <router-link to="/login" class="btn btn-outline-danger"
            >登录</router-link
          > -->
  </div>
</template>

<script>
import UserView from "../views/UserView.vue";
export default {
  name: "Main",
  components: { UserView },
};
</script>
