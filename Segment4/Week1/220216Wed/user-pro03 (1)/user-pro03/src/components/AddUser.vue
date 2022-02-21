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
                            <p class="form-inline justify-content-center" style="margin-top: 20px">
                                用户名:<input type="text" name="userName" v-model.trim="user.userName" class="form-control" placeholder="请输入用户名">
                            </p>
                            <p class="form-inline justify-content-center">
                                密　码:<input type="text" name="userPass" v-model.trim="user.userPass" class="form-control" placeholder="请输入密码">
                            </p>
                            <p class="form-inline justify-content-center">
                                手机号:<input type="text" name="userPhone" v-model.trim="user.userPhone" class="form-control" placeholder="请输入手机号码">
                            </p>
                            <p class="form-inline justify-content-center">
                                积　分:<input type="text" name="userScore" v-model.number="user.userScore" class="form-control" placeholder="请输入用户积分">
                            </p>
                            <p class="form-inline justify-content-center">
                                <button type="button" class="btn btn-primary" @click="addUser">添加</button>
                                <button style="margin-left:10px" type="button" class="btn btn-info"  data-dismiss="modal">返回</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddUser",
        data(){
            return {
                idCount:21,
                user:{},
            }
        },
        methods:{
            addUser(){
                this.user._id=this.idCount++;
                this.user.userType=1;
                this.user.uuid=Date.now();
                this.user.status=0;
                this.$emit("addUser",{...this.user});
            }
        }
    }
</script>

<style scoped>
</style>