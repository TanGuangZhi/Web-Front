<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-23 14:53:29 Wed
 * @LastEditTime: 2022-02-23 16:24:41 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->


<template>
  <div id="app">
    <el-row style="text-align: center">
      <el-col :span="24" class="border">111</el-col>
      <el-col :span="12" class="border">222</el-col>
      <el-col :span="12" class="border">333</el-col>
      <el-col :span="6" class="border">333</el-col>
      <el-col :span="6" class="border">333</el-col>
      <el-col :span="6" class="border">333</el-col>
      <el-col :span="6" class="border">333</el-col>
      <el-col :span="4" class="border">333</el-col>
      <el-col :span="4" class="border">333</el-col>
      <el-col :span="4" class="border">333</el-col>
      <el-col :span="4" class="border">333</el-col>
      <el-col :span="4" class="border">333</el-col>
      <el-col :span="4" class="border">333</el-col>
    </el-row>
    <!--<hr>-->
    <!--<el-container>
          <el-header>
              <el-button type="primary" plain>用户管理</el-button>
              <el-button type="danger" plain>用户管理</el-button>
              <el-button type="warning" plain>返回首页</el-button>
          </el-header>
          <el-main>
              <el-row>
                  <el-col :span="4" class="border">333</el-col>
                  <el-col :span="4" class="border">333</el-col>
                  <el-col :span="4" class="border">333</el-col>
                  <el-col :span="4" class="border">333</el-col>
                  <el-col :span="4" class="border">333</el-col>
                  <el-col :span="4" class="border">333</el-col>
              </el-row>
          </el-main>
      </el-container>-->
    <!--<el-container>
          <el-aside width="20%">
              <p>用户管理</p>
              <p>电影管理</p>
          </el-aside>
          <el-container>
              <el-header>Header</el-header>
              <el-main>
                    <el-row>
                        <el-col :span="4" class="border">333</el-col>
                        <el-col :span="4" class="border">333</el-col>
                        <el-col :span="4" class="border">333</el-col>
                        <el-col :span="4" class="border">333</el-col>
                        <el-col :span="4" class="border">333</el-col>
                        <el-col :span="4" class="border">333</el-col>
                    </el-row>
              </el-main>
              <el-footer>Footer</el-footer>
          </el-container>
      </el-container>-->
    <hr />
    <h2>elementUI的常规按钮一</h2>
    <el-row>
      <el-col :span="24" class="border">
        <el-button>普通按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="success">成功按钮</el-button>
      </el-col>
    </el-row>
    <h2>elementUI的镂空的按钮</h2>
    <el-row>
      <el-col :span="24" class="border">
        <el-button plain>信息按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
      </el-col>
    </el-row>
    <h2>elementUI的圆角按钮</h2>
    <el-row>
      <el-col :span="24" class="border">
        <el-button plain round>信息按钮</el-button>
        <el-button type="info" plain round>信息按钮</el-button>
        <el-button type="primary" plain round>主要按钮</el-button>
        <el-button type="danger" plain round>危险按钮</el-button>
        <el-button type="warning" plain round>警告按钮</el-button>
        <el-button type="success" plain round>成功按钮</el-button>
      </el-col>
    </el-row>
    <h2>elementUI的图标按钮</h2>
    <el-row>
      <el-col :span="24" class="border">
        <el-button icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-lock" circle></el-button>
        <el-button type="primary" icon="el-icon-user" circle></el-button>
        <el-button type="warning" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-close" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
      </el-col>
    </el-row>
    <h2>ElementUI带小图标的按钮</h2>
    <el-row>
      <el-col :span="24" class="border">
        <el-button icon="el-icon-info">普通按钮</el-button>
        <el-button type="info" icon="el-icon-phone">信息按钮</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline"
          >主要按钮</el-button
        >
        <el-button type="danger" icon="el-icon-delete" :loading="loading"
          >危险按钮</el-button
        >
        <el-button type="warning" icon="el-icon-warning">警告按钮</el-button>
        <el-button type="success" icon="el-icon-circle-check"
          >成功按钮</el-button
        >
        <el-button type="primary" icon="el-icon-s-custom">个人中心</el-button>
        <el-button type="danger" icon="el-icon-s-home">首页</el-button>
        <el-button
          type="success"
          size="mini"
          icon="el-icon-s-custom"
          @click="clickTest01"
          >解除危险按钮</el-button
        >
      </el-col>
    </el-row>
    <h2 align="center">用户信息填写</h2>
    <el-row>
      <el-col :span="24">
        <el-form
          label-width="80px"
          style="width: 400px; margin: 0px auto; padding-bottom: 50px"
        >
          <el-form-item label="用户名:">
            <el-input
              placeholder="请输入用户名:"
              prefix-icon="el-icon-s-custom"
              clearable
              v-model.trim="user.userName"
              style="width: 300px"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="密码:">
            <el-input
              placeholder="请输入密码:"
              prefix-icon="el-icon-lock"
              clearable
              show-password
              v-model.trim="user.userPass"
              style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="手机号:">
            <el-input
              placeholder="请输入手机号:"
              prefix-icon="el-icon-phone"
              clearable
              v-model.trim="user.userPhone"
              style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱:">
            <el-input
              placeholder="请输入邮箱"
              prefix-icon="el-icon-message"
              clearable
              v-model.trim="user.email"
              style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="性别:">
            <el-radio v-model="user.sex" label="男"></el-radio>
            <el-radio v-model="user.sex" label="女"></el-radio>
          </el-form-item>
          <el-form-item label="爱好:">
            <el-checkbox v-model="user.hobby" label="篮球"></el-checkbox>
            <el-checkbox v-model="user.hobby" label="足球"></el-checkbox>
            <el-checkbox v-model="user.hobby" label="羽毛球"></el-checkbox>
            <el-checkbox v-model="user.hobby" label="乒乓球"></el-checkbox>
            <el-checkbox
              v-model="user.hobby"
              label="web"
              disabled
            ></el-checkbox>
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="user.city" style="width: 300px">
              <el-option label="北京" value="北京"></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="广州" value="广州"></el-option>
              <el-option label="深圳" value="深圳"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="24" style="text-align: center">
              <el-button type="primary" @click="getFormData">提交</el-button>
              <el-button type="warning" @click="clearFormData">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="text-align: center; line-height: 150px">
      <el-col :span="16">
        用户名:<el-input
          placeholder="请输入用户名"
          style="width: 200px"
        ></el-input>
        手机号:<el-input
          placeholder="请输入用户名"
          style="width: 200px"
        ></el-input>
        用户类型:
        <el-select v-model="user.userType">
          <el-option label="普通用户" value="1"></el-option>
          <el-option label="影院管理员" value="2"></el-option>
          <el-option label="超级管理员" value="3"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="8">
        <el-button
          type="info"
          icon="el-icon-circle-plus"
          @click="addDialog = true"
          >添加</el-button
        >
        <el-button type="danger" icon="el-icon-delete" @click="deleteManyUser"
          >批量删除</el-button
        >
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-dialog title="添加用户" :visible.sync="addDialog">
          <el-form label-width="80px" style="width: 400px; margin: 0px auto">
            <el-form-item label="用户名:">
              <el-input
                placeholder="请输入用户名:"
                v-model="loginUser.userName"
                clearable
                style="width: 300px"
                prefix-icon="el-icon-s-custom"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码:">
              <el-input
                placeholder="请输入密码:"
                v-model="loginUser.userPass"
                show-password
                clearable
                style="width: 300px"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="24" style="text-align: center">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="danger" @click="addDialog = false"
                  >取消</el-button
                >
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      addDialog: false,
      loading: true,
      user: {
        userName: "",
        userPass: "",
        userPhone: "",
        email: "",
        sex: "男",
        hobby: [],
      },
      loginUser: {},
    };
  },
  methods: {
    clickTest01() {
      this.loading = false;
    },
    getFormData() {
      //得到数据
      console.log(this.user);
    },
    clearFormData() {
      //重置
      this.user = {};
    },
    login() {
      console.log(this.loginUser);
      if (!this.loginUser.userName || !this.loginUser.userPass) {
        /* this.$message({
                    message:"不允许提交空数据",
                    type:"warning"
                });*/
        this.$notify({
          title: "警告",
          message: "不允许提交空数据",
          type: "warning",
        });
      } else {
        if (
          this.loginUser.userName == "admin" &&
          this.loginUser.userPass == "admin"
        ) {
          /* this.$message({
                        message:"登录成功",
                        type:"success"
                    });*/
          this.$notify({
            title: "成功",
            message: "登录成功",
            type: "success",
          });
        } else {
          /*this.$message({
                        message:"登录失败",
                        type:"error"
                    });*/
          this.$notify({
            title: "错误",
            message: "用户名或者密码错误",
            type: "error",
          });
        }
      }
    },
    deleteManyUser() {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          /* this.$notify({
                   title:"成功",
                   message:"批量删除成功",
                   type:"success"
                });*/
          this.$message({
            type: "success",
            message: "批量删除成功",
          });
        })
        .catch(() => {
          /* this.$notify({
                    title:"取消",
                    message:"已取消批量删除",
                    type:"error"
                });*/
          this.$message({
            type: "error",
            message: "已取消批量删除",
          });
        });
    },
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}
.border {
  border: 1px solid gray;
  line-height: 120px;
}
/*.el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: right;
        line-height: 60px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        height: 800px;
    }*/
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 800px;
  padding-top: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
