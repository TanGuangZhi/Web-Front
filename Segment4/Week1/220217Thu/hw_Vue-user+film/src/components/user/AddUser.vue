<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-17 18:33:32 Thu
 * @LastEditTime: 2022-02-17 19:47:02 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div id="app">
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
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="insertUser"
                >
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
  </div>
</template>

<script>
import bus from "../../bus.js";
export default {
  name: "AddUser",
  data() {
    return {
      insertUserArr: {},
    };
  },
  methods: {
    insertUser() {
      bus.$emit("insertUser", this.insertUserArr);
    },
  },
};
</script>

<style scoped>
</style>
