<template>
  <div class="header-box">
    <el-row type="flex" justify="space-between" style="line-height: 70px">
      <!-- <el-button type="primary" size="default" @click="test">
        面包屑测试按钮
      </el-button> -->

      <el-col :span="12">
        <!-- <button class="btn-tool" title="折叠" @click="collapse">
          <i class="el-icon-d-arrow-left"></i>
        </button>
        <button class="btn-tool" title="刷新" @click="refresh">
          <i class="el-icon-refresh"></i>
        </button>
        <button class="btn-tool" title="全屏" @click="Utils.fullScreen">
          <i class="el-icon-rank"></i>
        </button> -->
        <router-link to="/home">首页</router-link>
        <span>　>　</span>
        <router-link :to="$route.path">
          <span>{{ $route.meta.title }}</span>
        </router-link>
        <span>{{ $route.meta.subTitle }}</span>
      </el-col>

      <el-col :span="6" align="right">
        <!-- <span>{{ Utils.todayDate() }}</span> -->
        <div class="block">
          <el-avatar shape="square" :size="50" :src="url"></el-avatar>
          <el-dropdown
            trigger="click"
            class="user-name"
            @command="handleCommand"
            style="margin-bottom: 20px"
          >
            <span class="el-dropdown-link" style="margin-bottom: 20px">
              {{ userName }}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile" disabled>
                个人资料
              </el-dropdown-item>
              <el-dropdown-item command="updatepwd" disabled>
                修改密码
              </el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      isCollapse: false,
      dialogVisible: false,
      breadcrumb: [],
      userName: "kunkkaTest",
      url: "/images/user/avatar/Official White House presidential portrait. Head shot of Trump smiling.jpg",
    };
  },
  methods: {
    collapse() {
      this.$store.commit("switchCollapse");
    },
    refresh() {
      this.reload();
    },

    handleCommand(command) {
      switch (command) {
        case "logout":
          this.$router.replace({ path: "/login" });
          // #TODO set token expired
          break;
      }
    },
    setQueryPath(index) {
      // 设置面包屑的query参数
      const tmp = JSON.parse(JSON.stringify(this.breadcrumb));
      if (index === 0) {
        return "/";
      } else {
        return "/" + tmp.slice(1).slice(0, index).join("/");
        // return tmp.slice(0, index + 1).join('/')
      }
    },
    test() {
      let matched = this.$route.matched.find((item) => item.name);
      if (matched.name.toLocaleLowerCase() !== "home") {
        this.breadcrumb.push({ path: matched.path, title: matched.meta.title });
      } else {
      }
      // const first = matched[0];
      // if (first && first.name.trim().toLocaleLowerCase() !== "home") {
      //   matched = [{ path: "/home", meta: { title: "Home" } }].concat(matched);
      // }
      console.log(this.breadcrumb);
    },
  },
  created() {
    // test();
  },
};
</script>

<style lang="scss" scoped>
.btn-tool {
  border: none;
  background: transparent;
  font-size: 18px;
  padding: 5px 10px;
  cursor: pointer;
  outline: none;
  text-align: left;
}
.user-name {
  margin-left: 20px;
}
</style>
