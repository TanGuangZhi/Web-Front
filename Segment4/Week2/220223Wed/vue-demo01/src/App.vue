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
      <hr>
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
              <el-button  plain>信息按钮</el-button>
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
              <el-button  plain round>信息按钮</el-button>
              <el-button type="info"  plain round>信息按钮</el-button>
              <el-button type="primary" plain round>主要按钮</el-button>
              <el-button type="danger" plain round>危险按钮</el-button>
              <el-button type="warning" plain round>警告按钮</el-button>
              <el-button type="success" plain round>成功按钮</el-button>
          </el-col>
      </el-row>
      <h2>elementUI的图标按钮</h2>
      <el-row>
          <el-col :span="24" class="border">
              <el-button   icon="el-icon-check" circle></el-button>
              <el-button type="info" icon="el-icon-lock" circle></el-button>
              <el-button type="primary" icon="el-icon-user" circle></el-button>
              <el-button type="warning" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-close" circle></el-button>
              <el-button type="success"  icon="el-icon-check" circle></el-button>
          </el-col>
      </el-row>
      <h2>ElementUI带小图标的按钮</h2>
      <el-row>
          <el-col :span="24" class="border">
              <el-button icon="el-icon-info">普通按钮</el-button>
              <el-button type="info" icon="el-icon-phone">信息按钮</el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline">主要按钮</el-button>
              <el-button type="danger" icon="el-icon-delete" :loading="loading">危险按钮</el-button>
              <el-button type="warning" icon="el-icon-warning">警告按钮</el-button>
              <el-button type="success" icon="el-icon-circle-check">成功按钮</el-button>
              <el-button type="primary" icon="el-icon-s-custom">个人中心</el-button>
              <el-button type="danger" icon="el-icon-s-home">首页</el-button>
              <el-button type="success" size="mini"  icon="el-icon-s-custom" @click="clickTest01">解除危险按钮</el-button>
          </el-col>
      </el-row>
        <h2 align="center">用户信息填写</h2>
      <el-row>
            <el-col :span="24">
                <el-form label-width="80px" style="width:400px;margin:0px auto;padding-bottom: 50px">
                    <el-form-item label="用户名:">
                        <el-input placeholder="请输入用户名:" prefix-icon="el-icon-s-custom" clearable v-model.trim="user.userName" style="width:300px">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="密码:">
                        <el-input placeholder="请输入密码:" prefix-icon="el-icon-lock" clearable show-password v-model.trim="user.userPass" style="width:300px"></el-input>
                    </el-form-item>

                    <el-form-item label="手机号:">
                        <el-input placeholder="请输入手机号:"  prefix-icon="el-icon-phone" clearable  v-model.trim="user.userPhone" style="width:300px"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱:">
                        <el-input placeholder="请输入邮箱"  prefix-icon="el-icon-message" clearable v-model.trim="user.email"  style="width:300px"></el-input>
                    </el-form-item>

                    <el-form-item label="性别:">
                        <el-radio v-model="user.sex" label="男" ></el-radio>
                        <el-radio v-model="user.sex" label="女"></el-radio>
                    </el-form-item>
                    <el-form-item label="爱好:">
                        <el-checkbox v-model="user.hobby" label="篮球"></el-checkbox>
                        <el-checkbox v-model="user.hobby" label="足球"></el-checkbox>
                        <el-checkbox v-model="user.hobby" label="羽毛球"></el-checkbox>
                        <el-checkbox v-model="user.hobby" label="乒乓球"></el-checkbox>
                        <el-checkbox v-model="user.hobby" label="web" disabled></el-checkbox>
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
        <el-row style="text-align: center;line-height:150px">
            <el-col :span="16" >
                用户名:<el-input placeholder="请输入用户名"  style="width: 200px;"></el-input>
                手机号:<el-input placeholder="请输入用户名" style="width: 200px"></el-input>
                用户类型:
               <el-select v-model="user.userType">
                   <el-option label="普通用户" value="1"></el-option>
                   <el-option label="影院管理员" value="2"></el-option>
                   <el-option label="超级管理员" value="3"></el-option>
               </el-select>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
            <el-col :span="8">
                <el-button type="info" icon="el-icon-circle-plus" @click="addDialog=true">添加</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteManyUser">批量删除</el-button>
            </el-col>
        </el-row>

      <el-row>
          <el-col :span="24">
              <el-dialog title="添加用户" :visible.sync="addDialog" :close-on-click-modal="false">
                  <el-form label-width="80px" style="width: 400px;margin: 0px auto;">
                      <el-form-item label="用户名:">
                          <el-input placeholder="请输入用户名:" v-model="loginUser.userName" clearable style="width: 300px" prefix-icon="el-icon-s-custom"></el-input>
                      </el-form-item>

                      <el-form-item label="密码:">
                          <el-input placeholder="请输入密码:" v-model="loginUser.userPass" show-password clearable style="width: 300px" prefix-icon="el-icon-lock"></el-input>
                      </el-form-item>

                      <el-row>
                          <el-col :span="24" style="text-align: center">
                              <el-button type="primary" @click="login">登录</el-button>
                              <el-button type="danger" @click="addDialog=false">取消</el-button>
                          </el-col>
                      </el-row>
                  </el-form>
              </el-dialog>
          </el-col>
      </el-row>
        <hr>
      <h1>ElementUI表格数据回显</h1>
      <!--
        el-table中 :data 对应后端数据
        el-table-column  prop:对应属性名字     label 字段标题
        template:
        一般表格列中不是直接放数据，而需要生成标签的时候，或者需要运算,过滤的时候一般使用template
         slot-scope="scope" : 其中scope.row 代表当前一行数据对应一个json对象

         el-table:@selection-change 当复选按钮状态改变的时候 触发绑定的函数
      -->

      <el-button type="danger" icon="el-icon-delete" @click="deleteManyApp">批量删除</el-button>
      <el-table :data="appPageInfo.appList" border style="width: 90%;margin: 0px auto" @selection-change="selApp">
          <!--1.设置一个全选全消，可以实现批量删除操作-->
          <el-table-column type="selection"  align="center"></el-table-column>

          <el-table-column  align="center" prop="_id" label="编号"></el-table-column>
          <el-table-column  align="center" prop="appName" label="app名称"></el-table-column>
          <el-table-column  align="center" prop="appTypeId" label="类型">
              <template slot-scope="scope">
                  {{scope.row.appTypeId|appTypeFilter}}
              </template>
          </el-table-column>
          <el-table-column  align="center" prop="appPlatformId" label="平台">
              <template slot-scope="scope">
                  {{scope.row.appPlatformId|appPlatformFilter}}
              </template>
          </el-table-column>
          <el-table-column  align="center" prop="appDownLoadCount" label="下载次数"></el-table-column>
          <el-table-column  align="center" prop="appSize" label="app大小"></el-table-column>
          <el-table-column  align="center" prop="appImg" label="app图片">
              <template slot-scope="scope"><!--scope.row  整个对象-->
                  <img :src="'./'+scope.row.appImg" width="40px">
              </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                  <el-button type="info" plain  size="mini" @click="editApp(scope.row)">修改</el-button>
                  <el-button type="danger" plain  size="mini" @click="deleteApp(scope.row._id)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>

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
              :current-page="appPageInfo.nowPage"
              :page-sizes="pageSizeList"
              :page-size="pageData.pageSize"
              :total="appPageInfo.pageCount"
              layout="total, sizes, prev, pager, next, jumper"
              style="text-align: center" class="border"
      ></el-pagination>
  </div>
</template>

<script>

export default {
    name: 'app',
    data(){
        return {
            addDialog:false,
            loading:true,
            user:{userName:"",userPass:"",userPhone:"",email:"",sex:"男",hobby:[]},
            loginUser:{},
            idArray:[],
            appPageInfo:{appList:[
                    // 1
                    {
                        "_id": 2,
                        "appName": "Susan Jackson",
                        "appTypeId": 3,
                        "appPlatformId": 3,
                        "appDownLoadCount": 914,
                        "appSize": 2414,
                        "appImg": "images/app/10.png"
                    }
                    ,
                    {
                        "_id": 5,
                        "appName": "Angela Thompson",
                        "appTypeId": 1,
                        "appPlatformId": 1,
                        "appDownLoadCount": 161,
                        "appSize": 1429,
                        "appImg": "images/app/11.png"
                    }
                    ,
                    {
                        "_id": 6,
                        "appName": "Kimberly Thompson",
                        "appTypeId": 1,
                        "appPlatformId": 2,
                        "appDownLoadCount": 332,
                        "appSize": 1735,
                        "appImg": "images/app/6.png"
                    }
                    ,
                    {
                        "_id": 7,
                        "appName": "Margaret Hernandez",
                        "appTypeId": 3,
                        "appPlatformId": 2,
                        "appDownLoadCount": 313,
                        "appSize": 423,
                        "appImg": "images/app/5.png"
                    }
                    ,
                    {
                        "_id": 8,
                        "appName": "George Walker",
                        "appTypeId": 3,
                        "appPlatformId": 3,
                        "appDownLoadCount": 720,
                        "appSize": 1362,
                        "appImg": "images/app/11.png"
                    }
                    ,
                    {
                        "_id": 9,
                        "appName": "Jennifer Brown",
                        "appTypeId": 3,
                        "appPlatformId": 3,
                        "appDownLoadCount": 716,
                        "appSize": 2820,
                        "appImg": "images/app/2.png"
                    }
                    ,
                    {
                        "_id": 10,
                        "appName": "Frank Clark",
                        "appTypeId": 1,
                        "appPlatformId": 2,
                        "appDownLoadCount": 487,
                        "appSize": 3008,
                        "appImg": "images/app/3.png"
                    }
                    ,
                    {
                        "_id": 11,
                        "appName": "Donna Hernandez",
                        "appTypeId": 4,
                        "appPlatformId": 1,
                        "appDownLoadCount": 146,
                        "appSize": 589,
                        "appImg": "images/app/11.png"
                    }
                    ,
                    {
                        "_id": 12,
                        "appName": "Nancy Martinez",
                        "appTypeId": 2,
                        "appPlatformId": 3,
                        "appDownLoadCount": 886,
                        "appSize": 1245,
                        "appImg": "images/app/11.png"
                    }
                    ,
                    {
                        "_id": 13,
                        "appName": "Steven Brown",
                        "appTypeId": 1,
                        "appPlatformId": 3,
                        "appDownLoadCount": 278,
                        "appSize": 1656,
                        "appImg": "images/app/7.png"
                    }
                    ,
                    {
                        "_id": 14,
                        "appName": "Gary Young",
                        "appTypeId": 1,
                        "appPlatformId": 4,
                        "appDownLoadCount": 804,
                        "appSize": 1178,
                        "appImg": "images/app/5.png"
                    }
                    ,
                    {
                        "_id": 15,
                        "appName": "Angela Hernandez",
                        "appTypeId": 3,
                        "appPlatformId": 4,
                        "appDownLoadCount": 328,
                        "appSize": 2526,
                        "appImg": "images/app/8.png"
                    }
                    ,
                    {
                        "_id": 16,
                        "appName": "Brian Miller",
                        "appTypeId": 2,
                        "appPlatformId": 4,
                        "appDownLoadCount": 898,
                        "appSize": 4947,
                        "appImg": "images/app/3.png"
                    }
                    ,
                    {
                        "_id": 17,
                        "appName": "Robert Perez",
                        "appTypeId": 2,
                        "appPlatformId": 3,
                        "appDownLoadCount": 166,
                        "appSize": 4276,
                        "appImg": "images/app/10.png"
                    }
                    ,
                    {
                        "_id": 18,
                        "appName": "Linda Young",
                        "appTypeId": 2,
                        "appPlatformId": 2,
                        "appDownLoadCount": 272,
                        "appSize": 458,
                        "appImg": "images/app/11.png"
                    }
                    ,
                    {
                        "_id": 19,
                        "appName": "Helen Hernandez",
                        "appTypeId": 2,
                        "appPlatformId": 2,
                        "appDownLoadCount": 270,
                        "appSize": 247,
                        "appImg": "images/app/11.png"
                    }
                    ,
                    {
                        "_id": 20,
                        "appName": "Margaret Taylor",
                        "appTypeId": 3,
                        "appPlatformId": 2,
                        "appDownLoadCount": 221,
                        "appSize": 939,
                        "appImg": "images/app/2.png"
                    }
                    ,
                    {
                        "_id": 21,
                        "appName": "Michael Hernandez",
                        "appTypeId": 1,
                        "appPlatformId": 2,
                        "appDownLoadCount": 688,
                        "appSize": 3750,
                        "appImg": "images/app/10.png"
                    }
                    ,
                    {
                        "_id": 22,
                        "appName": "Daniel Davis",
                        "appTypeId": 1,
                        "appPlatformId": 3,
                        "appDownLoadCount": 925,
                        "appSize": 1771,
                        "appImg": "images/app/11.png"
                    }
                ],pageCount:19,nowPage:1,pageSize:5},
            pageData:{nowPage:1,pageSize:5},
            pageSizeList:[5,10,15,20,25,30]
        }
    },methods:{
        clickTest01(){
            this.loading=false;
        },
        getFormData(){//得到数据
            console.log(this.user);
        },
        clearFormData(){//重置
            this.user={};
        },
        login(){
            console.log(this.loginUser);
            if(!this.loginUser.userName||!this.loginUser.userPass){
               /* this.$message({
                    message:"不允许提交空数据",
                    type:"warning"
                });*/
               this.$notify({
                   title:"警告",
                   message:"不允许提交空数据",
                   type:"warning"
               });

            }else{
                if(this.loginUser.userName=="admin"&&this.loginUser.userPass=="admin"){
                   /* this.$message({
                        message:"登录成功",
                        type:"success"
                    });*/
                    this.$notify({
                        title:"成功",
                        message:"登录成功",
                        type:"success"
                    });
                }else{
                    /*this.$message({
                        message:"登录失败",
                        type:"error"
                    });*/
                    this.$notify({
                        title:"错误",
                        message:"用户名或者密码错误",
                        type:"error"
                    });
                }
            }

        },
        deleteManyUser(){
            this.$confirm("您确定要删除吗?","提示",{
               confirmButtonText:"确定",
               cancelButtonText:"取消",
               type:"warning"
            }).then(()=>{
               /* this.$notify({
                   title:"成功",
                   message:"批量删除成功",
                   type:"success"
                });*/
               this.$message({
                   type:"success",
                   message:"批量删除成功"
               });
            }).catch(()=>{
               /* this.$notify({
                    title:"取消",
                    message:"已取消批量删除",
                    type:"error"
                });*/
                this.$message({
                    type:"error",
                    message:"已取消批量删除"
                });
            });
        },
        editApp(app){
            console.log(app);
        },
        deleteApp(_id){
            console.log(_id);
        },
        selApp(res){
           this.idArray=res.map(item=>{
               return item._id;
           });
        },
        deleteManyApp(){
            this.$confirm("您确定要删除吗?","提示",{
                confirmButtonText:"删除",
                cancelButtonText:"取消",
                type:"warning",
            }).then(()=>{
                if(this.idArray.length>0){
                    this.$notify({
                        type:"success",
                        title:"成功",
                        message:"删除成功"
                    });
                }else{
                    this.$notify({
                        type:"warning",
                        title:"警告",
                        message:"请先选择"
                    });
                }
            }).catch(()=>{
                this.$message({
                    type:"error",
                    message:"成功取消删除..."
                });
            });

        },
        changePageSize(pageSize){
            this.pageData.pageSize=pageSize;
        },
        changeNowPage(nowPage){
            this.pageData.nowPage=nowPage;
        }
    }
}
</script>

<style>

    body{
        margin: 0px;
        padding: 0px;
    }
    .border{
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
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        height:800px;
        padding-top: 200px;
    }
    .el-main {
        background-color: #E9EEF3;
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
