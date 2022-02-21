<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-21 19:23:08 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <!--1.添加用户-->
  <div id="addModal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">添加用户</h4>
        </div>
        <div class="media-body">
          <form class="text-center" id="addForm">
            <p
              class="form-inline justify-content-center"
              style="margin-top: 20px"
            >
              用户名:<input
                type="text"
                name="userName"
                class="form-control"
                placeholder="请输入用户名"
                v-model="insertUserArr.userName"
              />
            </p>
            <p class="form-inline justify-content-center">
              密　码:<input
                type="text"
                name="userPass"
                class="form-control"
                placeholder="请输入密码"
                v-model="insertUserArr.userPass"
              />
            </p>
            <p class="form-inline justify-content-center">
              手机号:<input
                type="text"
                name="userPhone"
                class="form-control"
                placeholder="请输入手机号码"
                v-model="insertUserArr.userPhone"
              />
            </p>
            <p class="form-inline justify-content-center">
              积　分:<input
                type="text"
                name="userScore"
                class="form-control"
                placeholder="请输入用户积分"
                v-model="insertUserArr.userScore"
              />
            </p>
            <p class="form-inline justify-content-center">
              <button type="button" class="btn btn-primary" @click="insertUser">
                添加
              </button>
              <button
                style="margin-left: 10px"
                type="button"
                class="btn btn-info"
                data-dismiss="modal"
              >
                返回
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "AddUser",
  data() {
    return {
      insertUserArr: {},
    };
  },
  methods: {
    insertUser() {
      $("#addForm")[0].reset();
      // document.getElementById("#addForm").reset();
      this.$emit("insertUser", this.insertUserArr);
    },
  },
  created() {
    // $("#addForm")[0].reset();
  },
};
</script>

<style scoped>
</style>
