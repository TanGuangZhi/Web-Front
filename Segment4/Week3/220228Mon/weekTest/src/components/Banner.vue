<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-28 09:24:29 Mon
 * @LastEditTime: 2022-02-28 11:00:49 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <div id="banner">
    <el-container>
      <el-header style="text-align: right">
        <el-button
          type="primary"
          icon="el-icon-s-custom"
          @click="toRoute('/bookView')"
        >
          书籍管理
        </el-button>
        <el-button
          type="success"
          icon="el-icon-film"
          plain
          @click="toRoute('/bookCount')"
        >
          书籍统计
        </el-button>
      </el-header>
    </el-container>
    <!--配置路由出口-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods: {
    toRoute(uri) {
      this.$router.push(uri);
    },
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
