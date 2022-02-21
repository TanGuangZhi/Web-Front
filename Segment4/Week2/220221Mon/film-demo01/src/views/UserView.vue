<template>
    <div id="app">
        <!--1.添加的模态框-->
        <AddUser/>
        <!--2.修改的模态框-->
        <UpdateUser/>
        <h3 class="text-center" style="line-height: 100px">用户管理</h3>
        <div class="container">
            <div class="row">
                <div class="col-md-8" style="line-height: 60px">
                    <form class="form-inline">
                        用户名:<input type="text" placeholder="请输入用户名"   name="userName" class="form-control">
                        手机号:<input type="text" placeholder="请输入手机号"  name="userPhone" class="form-control">
                        <button type="button" class="btn btn-primary">搜索</button>
                    </form>
                </div>
                <div class="col-md-4 text-right">
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#addModal">添加</button>
                    <button type="button" class="btn btn-danger">批量删除</button>
                </div>
            </div>
            <div class="row">
                <table class="col-md-12 table-bordered text-center">
                    <tr style="line-height:60px;background: lightblue">
                        <td><input type="checkbox" id="allId">全选/全消</td>
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
                    <tr>
                        <td>选择<input type="checkbox" class="sel"></td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>
                            <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span>删除</button>
                            <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#updateModal"><span class="glyphicon glyphicon-pencil"></span>修改</button>
                        </td>
                    </tr>
                </table>
            </div>
            <ul class="pagination justify-content-center" style="margin-top: 20px">
                <li class="page-item active"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>
                <li class="page-item"><a class="page-link" href="javascript:void(0)">1</a></li>
                <li class="page-item active" ><a class="page-link" href="javascript:void(0)">&raquo;</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import AddUser from "./user/AddUser.vue";
    import UpdateUser from "./user/UpdateUser.vue";
    export default {
        name: "UserView",
        components:{
            AddUser,
            UpdateUser,
        }
    }
</script>

<style scoped>

</style>