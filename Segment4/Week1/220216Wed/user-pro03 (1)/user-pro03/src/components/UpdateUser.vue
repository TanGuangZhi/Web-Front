<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-16 19:27:08 Wed
 * @LastEditTime: 2022-02-16 20:43:41 Wed
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
                  v-model.number="lookUser._id"
                  readonly
                  class="form-control"
                  placeholder="请输入用户名"
                />
              </p>
              <p
                class="form-inline justify-content-center"
                style="margin-top: 20px"
              >
                用户名:<input
                  type="text"
                  name="userName"
                  v-model.trim="lookUser.userName"
                  class="form-control"
                  placeholder="请输入用户名"
                />
              </p>
              <p class="form-inline justify-content-center">
                密　码:<input
                  type="text"
                  name="userPass"
                  v-model.trim="lookUser.userPass"
                  class="form-control"
                  placeholder="请输入密码"
                />
              </p>
              <p class="form-inline justify-content-center">
                手机号:<input
                  type="text"
                  name="userPhone"
                  v-model.trim="lookUser.userPhone"
                  class="form-control"
                  placeholder="请输入手机号码"
                />
              </p>
              <p class="form-inline justify-content-center">
                积　分:<input
                  type="text"
                  name="userScore"
                  v-model.number="lookUser.userScore"
                  class="form-control"
                  placeholder="请输入用户积分"
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
export default {
  name: "UpdateUser",
  props: {
    lookUser: {
      type: Object,
    },
    oldLookUser: {
      //原数据的
      type: Object,
    },
  },
  methods: {
    updateUser() {
      if (JSON.stringify(this.lookUser) == JSON.stringify(this.oldLookUser)) {
        alert("您要修改的数据与原数据一致，修改失败...");
      } else {
        this.$emit("updateUser", this.lookUser);
      }
    },
  },
};
</script>

<style scoped>
</style>
