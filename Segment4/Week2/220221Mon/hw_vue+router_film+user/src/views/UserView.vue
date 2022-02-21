<template>
  <div id="app">
    <!--1.添加的模态框-->
    <AddUser @insertUser="insertUser" />
    <!--2.修改的模态框-->
    <UpdateUser @updateUser="updateUser" />
    <h3 class="text-center" style="line-height: 100px">用户管理</h3>
    <div class="container">
      <div class="row">
        <div class="col-md-8" style="line-height: 60px">
          <form class="form-inline">
            用户名:<input
              type="text"
              placeholder="请输入用户名"
              name="userName"
              class="form-control"
              v-model="searchCondition.userName"
            />
            手机号:<input
              type="text"
              placeholder="请输入手机号"
              name="userPhone"
              class="form-control"
              v-model="searchCondition.userPhone"
            />
            <button type="button" class="btn btn-primary" @click="queryUser(1)">
              搜索
            </button>
          </form>
        </div>
        <div class="col-md-4 text-right">
          <button
            type="button"
            class="btn btn-warning"
            data-toggle="modal"
            data-target="#addModal"
          >
            添加
          </button>
          <button type="button" class="btn btn-danger" @click="delUserById()">
            批量删除
          </button>
        </div>
      </div>
      <div class="row">
        <table class="col-md-12 table-bordered text-center">
          <tr style="line-height: 60px; background: lightblue">
            <td>
              <input
                type="checkbox"
                id="allId"
                v-model="allSelectedFlag"
                @change="allSelected"
              />全选/全消
            </td>
            <td>编号</td>
            <td>用户名</td>
            <td>用户密码</td>
            <td>手机号码</td>
            <td>用户积分</td>
            <td>时间戳</td>
            <td>状态</td>
            <td>用户类型</td>
            <td colspan="2">操作</td>
          </tr>
          <tr v-for="(user, index) in userList" :key="index">
            <td>
              选择<input
                type="checkbox"
                class="sel"
                :value="user._id"
                v-model="idArray"
                @change="selectedBetter"
              />
            </td>
            <td>{{ user._id }}</td>
            <td>{{ user.userName }}</td>
            <td>{{ user.userPass }}</td>
            <td>{{ user.userPhone }}</td>
            <td>{{ user.userScore }}</td>
            <td>{{ user.uuid }}</td>
            <td>
              <span v-if="user.status == 0">未激活</span>
              <span v-else>已激活</span>
            </td>
            <td>
              <span v-if="user.userType == 1">普通用户</span>
              <span v-else-if="user.userType == 2">影院管理员</span>
              <!-- <span v-else="user.userType==3">管理员</span> -->
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="delUserById([user._id])"
              >
                <span class="glyphicon glyphicon-remove"></span>删除
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#updateModal"
                @click="updateShowBack(user._id)"
              >
                <span class="glyphicon glyphicon-pencil"></span>修改
              </button>
            </td>
          </tr>
        </table>
      </div>
      <ul class="pagination justify-content-center" style="margin-top: 20px">
        <li style="line-height: 40px" class="form-inline">
          每页　
          <select
            class="form-control"
            v-model.number="pageSize"
            @change="queryUser"
          >
            <option
              v-for="(size, index) in [10, 20, 50]"
              :key="index"
              :value="size"
            >
              {{ size }}
            </option>
          </select>
          　条记录　
        </li>

        <li class="page-item active" @click="pageNumChange(-1)">
          <a class="page-link" href="javascript:void(0)">&laquo;</a>
        </li>
        <li
          class="page-item"
          v-for="(pageNum, index) in totalPageNum"
          :key="index"
          @click="pageNumChange(pageNum)"
        >
          <a class="page-link" href="javascript:void(0)">{{ pageNum }}</a>
        </li>

        <li class="page-item active" @click="pageNumChange(-2)">
          <a class="page-link" href="javascript:void(0)">&raquo;</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AddUser from "./user/AddUser.vue";
import UpdateUser from "./user/UpdateUser.vue";
import { createNamespacedHelpers } from "vuex";
import $ from "jquery";

const { mapState, mapActions } = createNamespacedHelpers("user");
export default {
  name: "UserView",
  data() {
    return {
      allSelectedFlag: false,
      idArray: [],
      userList: [],
      updateShowBackObj: {},
      searchCondition: {},
      totalPageNum: 1,
      nowPageNum: 1,
      pageSize: 10,
    };
  },
  components: {
    AddUser,
    UpdateUser,
  },
  methods: {
    ...mapActions([
      "queryUserAsync",
      "insertUserAsync",
      "deleteUserAsync",
      "updateUserAsync",
    ]),
    // 1. queryUser
    async queryUser(nowPageNum) {
      await this.queryUserAsync();
      this.userList = [...this.pageInfo.userList];
      this.userList = this.queryUserByCondition();
      this.totalPageNum = Math.ceil(this.userList.length / this.pageSize);
      this.userList = this.pagination(nowPageNum);
    },

    // 1.1 multi condition query
    queryUserByCondition() {
      return this.userList.filter(
        (element) =>
          element.userName.includes(this.searchCondition.userName ?? "") &&
          element.userPhone.includes(this.searchCondition.userPhone ?? "")
      );
    },

    // 1.2 get pagination data
    /**
     * @description:
     * @param {*} nowPageNum: 用于重置nowPageNum为1,防止点击第二页后,再点击多条件搜索,受到nowPageNum变为2产生的影响
     * @return {*}
     */
    pagination(nowPageNum) {
      return this.userList.splice(
        ((nowPageNum ?? this.nowPageNum) - 1) * this.pageSize,
        this.pageSize
      );
    },

    // 1.3 pageNumChange
    pageNumChange(pageNum) {
      if (pageNum < 0) {
        if (pageNum == -1 && this.nowPageNum > 1) {
          this.nowPageNum -= 1;
        } else if (pageNum == -2 && this.nowPageNum < this.totalPageNum) {
          this.nowPageNum += 1;
        }
      } else {
        this.nowPageNum = pageNum;
      }
      this.queryUser();
    },

    // 2. del user
    async delUserById(_idArr) {
      //   console.log(_idArr);
      let status = await this.deleteUserAsync(_idArr ?? this.idArray);
      if (status == "1") {
        this.queryUser();
      } else {
        alert("删除失败...");
      }
    },

    // 3. insert user
    async insertUser(user) {
      let status = await this.insertUserAsync(user);
      if (status == "1") {
        $("#addModal").modal("hide");
        this.queryUser();
      } else {
        alert("添加失败...");
      }
    },

    // 4. update user
    async updateUser(user) {
      let status = await this.updateUserAsync(user);
      if (status == "1") {
        $("#updateModal").modal("hide");
        this.queryUser();
      } else {
        alert("修改失败...");
      }
    },

    // 4.1 update modal show back data
    updateShowBack(_id) {
      this.updateShowBackObj = {
        ...this.userList.filter((element) => element._id == _id)[0],
      };
      this.$store.commit("user/SET_UPDATE_SHOW_BACK", this.updateShowBackObj);
    },

    // ## other
    // 1. all select
    allSelected() {
      if (this.allSelectedFlag) {
        this.idArray = this.userList.map((element) => element._id);
      } else {
        this.idArray = [];
      }
    },

    // 1.1 selected better
    selectedBetter() {
      this.allSelectedFlag = this.idArray.length == this.userList.length;
    },
  },
  created() {
    this.queryUser();
  },
  computed: {
    ...mapState(["pageInfo"]),
  },
};
</script>

<style scoped>
</style>
