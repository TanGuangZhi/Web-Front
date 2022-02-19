<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-16 12:10:35 Wed
 * @LastEditTime: 2022-02-16 16:24:20 Wed
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
                />
              </p>
              <p class="form-inline justify-content-center">
                密　码:<input
                  type="text"
                  name="userPass"
                  class="form-control"
                  placeholder="请输入密码"
                />
              </p>
              <p class="form-inline justify-content-center">
                手机号:<input
                  type="text"
                  name="userPhone"
                  class="form-control"
                  placeholder="请输入手机号码"
                />
              </p>
              <p class="form-inline justify-content-center">
                积　分:<input
                  type="text"
                  name="userScore"
                  class="form-control"
                  placeholder="请输入用户积分"
                />
              </p>
              <p class="form-inline justify-content-center">
                <button type="button" class="btn btn-primary">添加</button>
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
    <hr />
    <button type="button" @click="insertUser">insertUserTest</button>
    <p>{{ addUser }}</p>
  </div>
</template>

<script>
export default {
  props: {
    addUser: { Object },
  },
  name: "AddUser",
  data() {
    return {
      id: 11111,
    };
  },
  methods: {
    insertUser() {
      this.$emit("insertUser", this.id);
      this.$emit("insertUser", { name: 1111, id: 222, password: 333 });
    },
  },
};
</script>

<style scoped>
</style>
