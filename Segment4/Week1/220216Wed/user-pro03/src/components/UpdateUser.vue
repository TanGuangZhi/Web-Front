<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-16 12:10:35 Wed
 * @LastEditTime: 2022-02-16 15:05:39 Wed
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
                <button type="button" class="btn btn-primary">修改</button>
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
    <p>{{ updateUser }}</p>
  </div>
</template>
<script>
export default {
  props: {
    updateUser: { Object },
  },
  name: "UpdateUser",
};
</script>

<style scoped>
</style>
