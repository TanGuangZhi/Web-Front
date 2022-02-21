<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 14:51:14 Mon
 * @LastEditTime: 2022-02-21 15:15:22 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div id="head">
    <div class="container-fluid">
      <div class="row text-right" style="line-height: 60px; background: black">
        <div class="col-md-12">
          <router-link to="/" class="btn btn-outline-danger">首页</router-link>
          <router-link to="/login" class="btn btn-outline-info"
            >登录</router-link
          >
          <router-link to="/register" class="btn btn-outline-primary"
            >注册</router-link
          >
          <button type="button" class="btn btn-outline-danger">注销</button>
          <button
            type="button"
            class="btn btn-outline-warning"
            @click="changePage('/shoppingCar')"
          >
            购物车
          </button>
          <button
            type="button"
            class="btn btn-outline-success"
            @click="changePage('/userCenter')"
          >
            个人中心
          </button>
          <button
            type="button"
            class="btn btn-outline-light"
            @click="changePage('/index/details')"
          >
            商品详情
          </button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Head",
  methods: {
    changePage(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
</style>
