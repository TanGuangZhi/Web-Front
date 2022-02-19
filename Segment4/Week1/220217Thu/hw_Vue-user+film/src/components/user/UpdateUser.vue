<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-17 18:33:32 Thu
 * @LastEditTime: 2022-02-17 19:40:49 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
  <div id="app">
    <!--2.修改用户-->
    <div id="updateModal" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">修改用户</h4>
          </div>
          <div class="media-body">
            <form class="text-center" id="updateForm">
              <p
                class="form-inline justify-content-center"
                style="margin-top: 20px"
              >
                编　号:<input
                  type="text"
                  name="id"
                  readonly
                  class="form-control"
                  placeholder="请输入id"
                  v-model="showBack._id"
                />
              </p>
              <p
                class="form-inline justify-content-center"
                style="margin-top: 20px"
              >
                用户名:<input
                  type="text"
                  name="userName"
                  class="form-control"
                  placeholder="请输入用户名"
                  v-model="showBack.userName"
                />
              </p>
              <p class="form-inline justify-content-center">
                密　码:<input
                  type="text"
                  name="userPass"
                  class="form-control"
                  placeholder="请输入密码"
                  v-model="showBack.userPass"
                />
              </p>
              <p class="form-inline justify-content-center">
                手机号:<input
                  type="text"
                  name="userPhone"
                  class="form-control"
                  placeholder="请输入手机号码"
                  v-model="showBack.userPhone"
                />
              </p>
              <p class="form-inline justify-content-center">
                积　分:<input
                  type="text"
                  name="userScore"
                  class="form-control"
                  placeholder="请输入用户积分"
                  v-model="showBack.userScore"
                />
              </p>
              <p class="form-inline justify-content-center">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="updateUser"
                >
                  修改
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
  name: "UpdateUser",
  data() {
    return {
      showBack: {},
    };
  },
  methods: {
    updateUser() {
      bus.$emit("updateUser", this.showBack);
    },
  },
  created() {
    bus.$on("updateShowBack", (data) => {
      this.showBack = { ...data.showBack };
    });
  },
};
</script>

<style scoped>
</style>
