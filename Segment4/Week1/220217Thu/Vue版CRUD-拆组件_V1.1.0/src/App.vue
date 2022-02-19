<template>
  <div id="app">
    <InsertUser :insertUserArr="insertUserArr" @insertUser="insertUser" />
    <UpdateUser :showBack="showBack" />
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
    </div>
    <Pagination @pageNumChange="pageNumChange" />
    <QueryUser @delUserById="delUserById" @updateShowBack="updateShowBack" />
  </div>
</template>

<script>
import InsertUser from "../src/components/InsertUser.vue";
import UpdateUser from "./components/UpdateUser.vue";
import Pagination from "./components/Pagination.vue";
import QueryUser from "./components/QueryUser.vue";
import myUtils from "./assets/js/utils/myUtils.js";
export default {
  name: "App",
  components: {
    InsertUser,
    UpdateUser,
    Pagination,
    QueryUser,
  },
  data() {
    return {
      userList: [],
      searchResults: [],
      insertUserArr: {},
      updateUserArr: {},
      searchCondition: {},
      showBack: [],
      idArray: [],
      totalPageNum: 0,
      nowPageNum: 1,
      nowName: "",
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
          (element, index) =>
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
      // console.log(this.insertUserArr);
      this.insertUserArr._id = Date.now();
      let isUserNameExit = this.userList.some(
        (element) => element.userName == this.insertUserArr.userName
      );
      if (isUserNameExit) {
        alert("userName already exists");
        return;
      }
      this.userList.push(this.insertUserArr);
      this.insertUserArr = {};
      // console.log(this.userList);
      this.queryUser();
      // alert(1);
    },
    updateShowBack(_id) {
      this.showBack = {
        ...this.userList.filter((element) => element._id == _id)[0],
      };
      this.nowName = this.showBack.userName;
    },
    updateUser() {
      this.userList = this.userList.map((element) => {
        if (element._id == this.showBack._id) {
          // 1. judge is data equal
          let isObjEqual = myUtils.compare(this.showBack, element);
          if (isObjEqual) {
            alert("数据一样,不可修改");
            return element;
          }

          // judge is userName exist
          let isUserNameExit = this.userList.some(
            (element) => element.userName == this.showBack.userName
          );

          // judge userName exist and not equal 原来的那个username,防止只改密码或其他,不改username从而出现bug的情况.
          if (isUserNameExit && this.showBack.userName != this.nowName) {
            alert("userName already exists");
            return;
          }
          return { ...this.showBack };
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
  // beforeCreate() {
  //   console.log("beforeCreated");
  // },
  // created() {
  //   console.log("created");
  //   // this.queryUser();
  // },
};
</script>

<style></style>
