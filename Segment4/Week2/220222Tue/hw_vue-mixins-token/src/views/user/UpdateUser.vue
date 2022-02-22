<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:27 Fri
 * @LastEditTime: 2022-02-21 19:21:20 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
-->
<template>
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
                v-model="pageInfo.updateShowBackObj._id"
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
                v-model="pageInfo.updateShowBackObj.userName"
              />
            </p>
            <p class="form-inline justify-content-center">
              密　码:<input
                type="text"
                name="userPass"
                class="form-control"
                placeholder="请输入密码"
                v-model="pageInfo.updateShowBackObj.userPass"
              />
            </p>
            <p class="form-inline justify-content-center">
              手机号:<input
                type="text"
                name="userPhone"
                class="form-control"
                placeholder="请输入手机号码"
                v-model="pageInfo.updateShowBackObj.userPhone"
              />
            </p>
            <p class="form-inline justify-content-center">
              积　分:<input
                type="text"
                name="userScore"
                class="form-control"
                placeholder="请输入用户积分"
                v-model="pageInfo.updateShowBackObj.userScore"
              />
            </p>
            <p class="form-inline justify-content-center">
              <button type="button" class="btn btn-primary" @click="updateUser">
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
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");

export default {
  name: "UpdateUser",
  data() {
    return {};
  },
  methods: {
    updateUser() {
      this.$emit("updateUser", this.pageInfo.updateShowBackObj);
    },
  },
  created() {},
  computed: {
    ...mapState(["pageInfo"]),
  },
};
</script>

<style scoped>
</style>
