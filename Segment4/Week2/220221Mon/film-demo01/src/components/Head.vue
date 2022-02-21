<template>
    <div id="head">
        <div class="container-fluid">
            <div class="row text-right" style="line-height: 60px;background: black">
                <div class="col-md-12">
                    <router-link to="/userView" class="btn btn-outline-primary">用户管理</router-link>
                    <router-link to="/filmView" class="btn btn-outline-info">电影管理</router-link>
                    <router-link to="/adminLogin" class="btn btn-outline-danger">退出登录</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Head"
    }
</script>

<style scoped>

</style>