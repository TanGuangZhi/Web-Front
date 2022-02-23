<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 15:08:27 Tue
 * @LastEditTime: 2022-02-22 19:18:36 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <div id="app">
    <form action="">
      userName:<input type="text" name="userName" v-model="user.userName" />
      userPass:<input type="text" name="userPass" v-model="user.userPass" />
      <button @click="login" type="button">login</button>
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("user");
export default {
  name: "Login",
  data() {
    return { user: {} };
  },
  methods: {
    ...mapActions(["loginAsync"]),
    async login() {
      let data = await this.loginAsync(this.user);
      if (data.user) {
        alert("login success");
      } else {
        alert("login failed");
      }
      // console.log("data:", data);
    },
  },
};
</script>

<style scoped>
</style>
