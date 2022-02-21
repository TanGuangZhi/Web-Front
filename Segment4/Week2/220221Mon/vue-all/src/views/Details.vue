<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 14:51:22 Mon
 * @LastEditTime: 2022-02-21 15:59:52 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div id="details">
    <h1>欢迎进入详情页面</h1>
    {{ $route.meta.title }}
  </div>
</template>

<script>
export default {
  name: "Details",
};
</script>

<style scoped>
</style>
