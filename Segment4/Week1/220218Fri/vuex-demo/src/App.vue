<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 10:33:47 Fri
 * @LastEditTime: 2022-02-18 15:05:18 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ this.$store.state.name }}</h1>
    <button type="button" @click="updateData">update</button>
    <button type="button" @click="asyncTest">asyncTest</button>
    <button type="button" @click="axiosTest1">axiosTest</button>
    <button type="button" @click="queryUser1">queryUser</button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import store from "./store/index.js";
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapActions, mapState } = createNamespacedHelpers("user");
export default {
  name: "App",
  store,
  components: {
    HelloWorld,
  },
  methods: {
    // 辅助函数
    // ...mapActions(["testAsync", "axiosTest"]),
    ...mapActions(["queryUser"]),
    updateData() {
      this.$store.commit("UPDATE");
    },
    asyncTest() {
      this.testAsync();
    },
    async axiosTest1() {
      this.axiosTest();
      // let data = await this.$api.queryFilm();
      // console.log(data);
    },
    async queryUser1() {
      // let data = await this.$api.queryUser();
      let data = await this.queryUser();
      console.log(data);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
