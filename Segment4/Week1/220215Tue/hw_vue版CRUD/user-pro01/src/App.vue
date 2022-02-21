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
                用户名1:<input
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
    <!--3.上传文件-->
    <div id="upLoadModal" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">上传用户</h4>
          </div>
          <div class="media-body">
            <form class="text-center" id="upLoadForm">
              <p class="form-inline justify-content-center">
                <input type="file" class="form-control" name="upFile" />
                <button type="button" class="btn btn-info">上传</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

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
            <button type="button" class="btn btn-primary" @click="queryUser">
              搜索
            </button>
          </form>
        </div>
        <div class="col-md-4 text-right">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#upLoadModal"
          >
            上传
          </button>
          <button type="button" class="btn btn-info">下载</button>
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
          <tr v-for="(user, index) in searchResults" :key="index">
            <td>
              选择<input
                type="checkbox"
                class="sel"
                v-model="idArray"
                :value="user._id"
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
    </div>
    <form>
      <ul class="pagination justify-content-center" style="margin-top: 20px">
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
    </form>
  </div>
</template>

<script></script>
<script>
export default {
  name: "App",
  data() {
    return {
      userList: [],
      searchResults: [],
      insertUserArr: {},
      updateUserArr: {},
      searchCondition: {},
      showBack: [],
      idArray: [],
      allSelectedFlag: false,
      totalPageNum: 0,
      nowPageNum: 1,
    };
  },
  methods: {
    queryUser() {
      if (this.userList.length == 0) {
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
      }
      // this.searchResults = [...this.userList];
      this.searchResults = this.queryUserByCondition();
      this.totalPageNum = Math.ceil(this.searchResults.length / 10);
      this.searchResults = this.pagination();
    },
    queryUserByCondition() {
      return [
        ...this.userList.filter(
          (element) =>
            element.userName.includes(this.searchCondition.userName ?? "") &&
            element.userPhone.includes(this.searchCondition.userPhone ?? "")
        ),
      ];
    },
    pagination() {
      return [...this.searchResults.splice((this.nowPageNum - 1) * 10, 10)];
    },
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
    delUserById(_idArr) {
      this.userList = this.userList.filter(
        (element) => !(_idArr ?? this.idArray).includes(element._id)
      );
      this.queryUser();
    },
    insertUser() {
      this.insertUserArr._id = Date.now();
      this.userList.push(this.insertUserArr);
      this.insertUserArr = {};
      // console.log(this.userList);
      this.queryUser();
      // alert(1);
    },
    updateShowBack(_id) {
      let temp = this.userList.filter((element) => element._id == _id)[0];
      this.showBack = { ...temp };
    },
    updateUser() {
      this.userList = this.userList.map((element) => {
        if (element._id == this.showBack._id) {
          return this.showBack;
        }
        return element;
      });
      this.queryUser();
    },
    allSelected() {
      if (this.allSelectedFlag) {
        this.idArray = this.searchResults.map((element) => element._id);
      } else {
        this.idArray = [];
      }
      // console.log(this.idArray);
    },
    selectedBetter() {
      this.allSelectedFlag = this.idArray.length == this.searchResults.length;
    },
  },
  created() {
    this.queryUser();
  },
};
</script>

<style></style>
