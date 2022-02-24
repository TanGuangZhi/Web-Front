<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-24 13:08:32 Thu
 * @LastEditTime: 2022-02-24 13:13:31 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <el-menu
    class="menu-nav"
    router
    :default-active="currentPath"
    background-color="#20222A"
    text-color="rgba(255,255,255,.8)"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <el-menu-item index="/home">
      <i class="el-icon-location"></i>
      <span slot="title">Home</span>
    </el-menu-item>
    <el-menu-item index="/userView">
      <i class="el-icon-menu"></i>
      <span slot="title">用户</span>
    </el-menu-item>
    <el-menu-item index="/filmView">
      <i class="el-icon-document"></i>
      <span slot="title">电影</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>设置</span>
      </template>
      <el-menu-item index="/profile">基本资料 (空)</el-menu-item>
      <el-menu-item index="/password">修改密码 (空)</el-menu-item>
    </el-submenu>
    <el-menu-item index="/echarts">
      <i class="el-icon-share"></i>
      <span slot="title">图表</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  /* eslint-disable */
  props: ["isCollapse"],
  data() {
    return {
      currentPath: location.pathname,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;
}
.menu-nav:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
