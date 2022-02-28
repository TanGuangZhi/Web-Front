<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-23 18:40:52 Wed
 * @LastEditTime: 2022-02-26 16:27:22 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <div id="app">
    <el-row style="line-height: 150px" justify="space-around">
      <el-col :span="20">
        用户名:　
        <el-input
          placeholder="请输入用户名"
          v-model="searchCondition.userName"
          style="width: 120px"
        ></el-input>
        　手机号:　
        <el-input
          placeholder="请输入手机号"
          v-model="searchCondition.userPhone"
          style="width: 200px"
        ></el-input>
        　用户类型:　
        <el-select v-model="searchCondition.userType" style="width: 150px">
          <el-option label="请选择" value=""></el-option>
          <el-option label="普通用户" value="1"></el-option>
          <el-option label="影院管理员" value="2"></el-option>
          <el-option label="超级管理员" value="3"></el-option>
        </el-select>

        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="queryUser"
        >
          搜索
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="success" size="mini" @click="insertDialog = true">
          添加
        </el-button>
        <el-button type="danger" size="mini" @click="delUserById()">
          批量删除
        </el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end"></el-row>
    <el-table
      :data="pageData.showDataList"
      border
      style="width: 90%; margin: 0px auto"
      @selection-change="selApp"
    >
      <!--1.设置一个全选全消，可以实现批量删除操作-->
      <el-table-column type="selection" align="center"></el-table-column>

      <el-table-column
        align="center"
        prop="_id"
        width="50px"
        label="编号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userName"
        label="userName"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userPass"
        label="userPass"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userPhone"
        label="userPhone"
      ></el-table-column>
      <el-table-column align="center" prop="userType" label="类型">
        <template slot-scope="scope">
          {{ scope.row.userType | userTypeFilter }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="info"
            plain
            size="mini"
            @click="updateShowBack(scope.row._id)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            plain
            size="mini"
            @click="delUserById([scope.row._id])"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- insert user modal -->
    <el-row>
      <el-col :span="24">
        <el-dialog
          title="添加用户"
          :visible.sync="insertDialog"
          :close-on-click-modal="false"
        >
          <el-form label-width="80px" style="width: 400px; margin: 0px auto">
            <el-form-item label="用户名:">
              <el-input
                placeholder="请输入用户名:"
                clearable
                v-model="insertUserArr.userName"
                style="width: 300px"
                prefix-icon="el-icon-s-custom"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码:">
              <el-input
                placeholder="请输入密码:"
                v-model="insertUserArr.userPass"
                clearable
                style="width: 300px"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="24" style="text-align: center">
                <el-button type="primary" @click="insertUser">添加</el-button>
                <el-button type="danger" @click="insertDialog = false">
                  取消
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>

    <!-- update user modal -->
    <el-row>
      <el-col :span="24">
        <el-dialog
          title="修改用户"
          :visible.sync="changeDialog"
          :close-on-click-modal="false"
        >
          <el-form label-width="80px" style="width: 400px; margin: 0px auto">
            <el-form-item label="用户名:">
              <el-input
                v-model="updateShowBackObj._id"
                readonly
                style="width: 300px"
              ></el-input>
            </el-form-item>

            <el-form-item label="用户名:">
              <el-input
                placeholder="请输入用户名:"
                v-model="updateShowBackObj.userName"
                clearable
                style="width: 300px"
                prefix-icon="el-icon-s-custom"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码:">
              <el-input
                placeholder="请输入密码:"
                v-model="updateShowBackObj.userPass"
                clearable
                style="width: 300px"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="24" style="text-align: center">
                <el-button type="primary" @click="updateUser">修改</el-button>
                <el-button type="danger" @click="changeDialog = false">
                  取消
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
    <!--
        @size-change:当改变一页显示的数据量pageSize的时候  调用该函数 并且将改变之后pageSize作为函数的参数传入
        @current-change: 当页码改变的时候 调用该函数 并且将改变之后的nowPage作为函数的参数传入
        :current-page: 绑定的是 当前的页码值
        :page-sizes: 绑定一个数组 用来记录 改变pageSize下拉列表中的数据的
        :page-size:记录当前 一页显示的最大数据量
        :total:记录当前数据的总数
         layout：布局 total 总数, sizes 改变一页数据量的下拉列表, prev 上一页, pager 数字页码, next下一页, jumper 当前页码
      -->
    <el-pagination
      @size-change="changePageSize"
      @current-change="changeNowPage"
      :current-page="pageData.nowPageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageData.pageSize"
      :total="pageData.originDataList.length"
      layout="total, sizes, prev, pager, next, jumper"
      style="text-align: center"
      class="border"
    ></el-pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import pageMixin from "../mixins/pageMixins.js";

const { mapState, mapActions } = createNamespacedHelpers("user");
export default {
  mixins: [pageMixin],
  name: "app",
  data() {
    return {
      insertDialog: false,
      changeDialog: false,
      updateShowBackObj: {},
      idArray: [],
      insertUserArr: {},
      searchCondition: {},
    };
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
      await this.queryUserAsync(this.searchCondition);
      this.pageData.originDataList = [...this.pageInfo.userList];
      // this.userList = this.queryUserByCondition();
      this.pageData.totalPageNum = Math.ceil(
        this.pageData.originDataList.length / this.pageData.pageSize
      );
      this.pageData.showDataList = this.pagination(nowPageNum);
    },

    // 2. del user
    async delUserById(_idArr) {
      //   console.log(_idArr);
      let status = await this.deleteUserAsync(_idArr ?? this.idArray);
      if (status == "1") {
        this.queryUser();
      } else {
        this.$message({
          type: "error",
          message: "删除失败",
        });
      }
    },

    // 3. insert user
    async insertUser() {
      let status = await this.insertUserAsync(this.insertUserArr);
      if (status == "1") {
        this.insertDialog = false;
        this.queryUser();
      } else {
        this.$message({
          type: "error",
          message: "添加失败",
        });
      }
    },

    // 4. update user
    async updateUser() {
      let status = await this.updateUserAsync(this.updateShowBackObj);
      if (status == "1") {
        this.changeDialog = false;
        this.queryUser();
      } else if (status == "userNameAlreadyExist") {
        this.$message({
          type: "error",
          message: "用户名已存在,请修改",
        });
      } else {
        this.$message({
          type: "error",
          message: "修改失败",
        });
      }
    },

    // 4.1 update modal show back data
    updateShowBack(_id) {
      this.changeDialog = true;
      this.updateShowBackObj = {
        ...this.pageData.showDataList.filter(
          (element) => element._id == _id
        )[0],
      };
      this.$store.commit("user/SET_UPDATE_SHOW_BACK", this.updateShowBackObj);
    },

    // ## other
    // 1. select and disSelect
    selApp(res) {
      this.idArray = res.map((item) => {
        return item._id;
      });
      // console.log(this.idArray);
    },
  },
  created() {
    this.queryUser();
    // console.log(this.pageData.pageSizeList);
    this.initMixinsData();
  },
  computed: {
    ...mapState(["pageInfo"]),
  },
};
</script>

<style scoped></style>
