<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-15 14:15:15 Tue
 * @LastEditTime: 2022-02-15 15:44:00 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    {{ title }}
    <button type="button" @click="alert">alert</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data() {
    return {
      title: "Welcome to your Vue1111",
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    alert() {
      alert("Hello1");
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
