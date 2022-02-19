<template>
  <div id="app">
    <!--1.添加的模态框-->
    <AddUser @addUser="addUser" />
    <!--2.修改的模态框-->
    <UpdateUser
      :lookUser="lookUser"
      :oldLookUser="oldLookUser"
      @updateUser="updateUser"
    />
    <!--3.查询功能-->
    <h3 class="text-center" style="line-height: 100px">用户管理</h3>
    <div class="container">
      <div class="row">
        <div class="col-md-8" style="line-height: 60px">
          <form class="form-inline">
            用户名:<input
              type="text"
              placeholder="请输入用户名"
              v-model.trim="whereUser.userName"
              name="userName"
              class="form-control"
            />
            手机号:<input
              type="text"
              placeholder="请输入手机号"
              v-model.trim="whereUser.userPhone"
              name="userPhone"
              class="form-control"
            />
            <button type="button" class="btn btn-primary" @click="searchUser">
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
          <button type="button" class="btn btn-danger">批量删除</button>
        </div>
      </div>
      <div class="row">
        <table class="col-md-12 table-bordered text-center">
          <tr style="line-height: 60px; background: lightblue">
            <td>
              <input
                type="checkbox"
                id="allId"
                v-model="allChecked"
                @change="allSel"
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
          <tr v-for="(user, index) in pageInfo.pageUserList" :key="index">
            <td>
              选择<input
                type="checkbox"
                class="sel"
                v-model.number="idArray"
                :value="user._id"
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
              <span v-else>管理员</span>
            </td>
            <td>
              <button type="button" class="btn btn-danger">
                <span class="glyphicon glyphicon-remove"></span>删除
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="showUser(user._id)"
                data-toggle="modal"
                data-target="#updateModal"
              >
                <span class="glyphicon glyphicon-pencil"></span>修改
              </button>
            </td>
          </tr>
        </table>
      </div>
      <ul class="pagination justify-content-center" style="margin-top: 20px">
        <li class="page-item active" @click="changePage(-1)">
          <a class="page-link" href="javascript:void(0)">&laquo;</a>
        </li>
        <!-- <li class="page-item" v-for="page in pageInfo.pageList" @click="changePage(page)"><a class="page-link" href="javascript:void(0)">{{page}}</a></li> -->
        <li class="page-item active" @click="changePage(-2)">
          <a class="page-link" href="javascript:void(0)">&raquo;</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//1.引入组件
import AddUser from "./components/AddUser.vue";
import UpdateUser from "./components/UpdateUser.vue";
import $ from "jquery";
export default {
  name: "App",
  //2.注册子组件
  components: {
    AddUser,
    UpdateUser,
  },
  data() {
    return {
      nowPage: 1,
      pageCount: 8,
      searchUserList: [],
      pageInfo: { pageUserList: [], pageList: 0 },
      whereUser: {},
      allChecked: false,
      idArray: [],
      lookUser: {},
      oldLookUser: {},
    };
  },
  methods: {
    queryUser() {
      this.userList = [
        // 1
        {
          _id: 1,
          userName: "mdv",
          userPass: 971524,
          userPhone: "17871722058",
          userType: "1",
          status: "1",
          email: "423976@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },

        {
          _id: 2,
          userName: "gcv",
          userPass: 833036,
          userPhone: "17327748440",
          userType: "1",
          status: "1",
          email: "4624222@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 3,
          userName: "kdi",
          userPass: 228529,
          userPhone: "17128036547",
          userType: "1",
          status: "1",
          email: "66453105@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 4,
          userName: "reoq",
          userPass: 848046,
          userPhone: "18427634233",
          userType: "1",
          status: "1",
          email: "717368857@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 5,
          userName: "sww",
          userPass: 411875,
          userPhone: "17073424451",
          userType: "1",
          status: "1",
          email: "7672897581@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 6,
          userName: "sjuj",
          userPass: 749001,
          userPhone: "13424389337",
          userType: "1",
          status: "1",
          email: "25875366@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 7,
          userName: "oqfbq",
          userPass: 325333,
          userPhone: "18098832445",
          userType: "1",
          status: "1",
          email: "6768211368@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 8,
          userName: "fnn",
          userPass: 489677,
          userPhone: "17362468459",
          userType: "1",
          status: "1",
          email: "71270353840@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 9,
          userName: "oub",
          userPass: 432390,
          userPhone: "18256120478",
          userType: "1",
          status: "1",
          email: "2571744@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 10,
          userName: "gqmzy",
          userPass: 809777,
          userPhone: "17927179371",
          userType: "1",
          status: "1",
          email: "56853623364@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 11,
          userName: "aiuw",
          userPass: 968280,
          userPhone: "13352557154",
          userType: "1",
          status: "1",
          email: "88454706@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 12,
          userName: "jnbew",
          userPass: 114445,
          userPhone: "19220977157",
          userType: "1",
          status: "1",
          email: "22413@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 13,
          userName: "rwtrz",
          userPass: 550854,
          userPhone: "18208725882",
          userType: "1",
          status: "1",
          email: "93023169364@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 14,
          userName: "yta",
          userPass: 159329,
          userPhone: "18386861932",
          userType: "1",
          status: "1",
          email: "76286512@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 15,
          userName: "xxuxf",
          userPass: 184825,
          userPhone: "17569227641",
          userType: "1",
          status: "1",
          email: "27832968387@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 16,
          userName: "nybs",
          userPass: 364191,
          userPhone: "17248523068",
          userType: "1",
          status: "1",
          email: "723796434@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 17,
          userName: "aib",
          userPass: 345830,
          userPhone: "18533368381",
          userType: "1",
          status: "1",
          email: "476253648@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 18,
          userName: "nujx",
          userPass: 569266,
          userPhone: "16881655663",
          userType: "1",
          status: "1",
          email: "48518526@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 19,
          userName: "nhjpm",
          userPass: 482029,
          userPhone: "18653487251",
          userType: "1",
          status: "1",
          email: "583142632@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
        {
          _id: 20,
          userName: "fcep",
          userPass: 242751,
          userPhone: "18356783952",
          userType: "1",
          status: "1",
          email: "478698@qq.com",
          uuid: "1642919976232",
          userScore: 0,
        },
      ];
    },
    queryPageUser(nowPage = 1) {
      let flag = false;
      //优化...
      if (nowPage > 0 && this.nowPage != nowPage) {
        flag = true;
      }
      this.searchUserList = [...this.userList]; //
      //1.多条件搜索    searchUserList 进行filter
      if (this.whereUser.userName) {
        this.searchUserList = this.searchUserList.filter((item) => {
          return item.userName.indexOf(this.whereUser.userName) != -1;
        });
      }
      if (this.whereUser.userPhone) {
        this.searchUserList = this.searchUserList.filter((item) => {
          return item.userPhone == this.whereUser.userPhone;
        });
      }
      //2.进行分页处理
      if (nowPage < 0) {
        if (nowPage == -1 && this.nowPage > 1) {
          this.nowPage--;
          flag = true;
        }
        if (nowPage == -2 && this.nowPage < this.getLastPage) {
          this.nowPage++;
          flag = true;
        }
      } else {
        this.nowPage = nowPage;
      }
      //3.情况下进行优化...
      if (flag) {
        this.allChecked = false;
        this.idArray = [];
      }
      this.pageInfo.pageUserList = this.searchUserList.filter((item, index) => {
        return index >= this.getStartPage && index < this.getEndPage;
      });
      //3.得到分页数据
      this.pageInfo.pageList = this.getLastPage;
    },
    changePage(nowPage) {
      this.queryPageUser(nowPage);
    },
    searchUser() {
      this.queryPageUser();
    },
    allSel() {
      if (this.allChecked) {
        this.idArray = this.pageInfo.pageUserList.map((item) => {
          return item._id;
        });
      } else {
        this.idArray = [];
      }
    },
    showUser(_id) {
      this.lookUser = {
        ...this.userList.filter((item) => {
          return item._id == _id;
        })[0],
      };
      this.oldLookUser = { ...this.lookUser }; //记录原数据
    },
    updateUser(user) {
      let flag = this.userList.some((item) => {
        if (user.userName == this.oldLookUser.userName) {
          return false; //没有修改名字这个字段，不存在重复名字
        } else {
          //说明你修改了名字
          return item.userName == user.userName;
        }
      }); //说明存在重复名字
      if (flag) {
        alert("用户名已经存在，修改失败...");
      } else {
        this.userList = this.userList.map((item) => {
          if (item._id == user._id) {
            return user;
          }
          return item;
        });
        alert("修改成功...");
        $("#updateModal").modal("hide");
        this.queryPageUser(this.nowPage);
      }
    },
    addUser(user) {
      let flag = this.userList.some((item) => {
        return item.userName == user.userName;
      });
      if (flag) {
        alert("用户名已经存在，添加失败...");
      } else {
        this.userList.push(user);
        alert("添加成功...");
        $("#addModal").modal("hide");

        document.querySelector("#addForm").reset(); //清空表单数据
        this.queryPageUser(this.getLastPage); //跳到最后一页
      }
    },
  },
  created() {
    this.queryUser();
    this.queryPageUser();
  },
  computed: {
    getStartPage() {
      return (this.nowPage - 1) * this.pageCount;
    },
    getEndPage() {
      return this.nowPage * this.pageCount;
    },
    getLastPage() {
      return Math.ceil(this.searchUserList.length / this.pageCount);
    },
  },
  watch: {
    idArray() {
      this.allChecked =
        this.idArray.length == this.pageInfo.pageUserList.length;
    },
  },
};
</script>

<style>
</style>
