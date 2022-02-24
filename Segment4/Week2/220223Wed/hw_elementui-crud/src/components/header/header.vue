<template>
  <div class="header-box">
    <el-row type="flex" align="middle" justify="space-between">
      <el-button type="primary" size="default" @click="test">
        面包屑测试按钮
      </el-button>

      <el-col :span="6">
        <!-- <button class="btn-tool" title="折叠" @click="collapse">
          <i class="el-icon-d-arrow-left"></i>
        </button>
        <button class="btn-tool" title="刷新" @click="refresh">
          <i class="el-icon-refresh"></i>
        </button>
        <button class="btn-tool" title="全屏" @click="Utils.fullScreen">
          <i class="el-icon-rank"></i>
        </button>
        <button class="btn-tool" title="便签" @click="dialogVisible = true">
          <i class="el-icon-edit"></i>
        </button> -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <template v-for="(item, index) in breadcrumb">
            <el-breadcrumb-item
              v-if="index < breadcrumb.length - 1"
              :key="index"
              :to="item.path"
            >
              {{ item.title }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-else :key="index" :to="item.path">
              {{ item.title }}
            </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </el-col>

      <el-col :span="6" align="right">
        <span>{{ Utils.todayDate() }}</span>
        <el-dropdown trigger="click" class="user-name" @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- {{ username }}<i class="el-icon-caret-bottom el-icon--right"></i> -->
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
      </el-col>
    </el-row>
    <el-dialog
      title="便签"
      width="400px"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      @closed="saveNotes"
    >
      <el-input
        type="textarea"
        :rows="7"
        placeholder="请输入内容"
        v-model="notes"
      ></el-input>
    </el-dialog>
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
      notes:
        localStorage.getItem("notes") ||
        "便签中的内容会存储在本地，这样即便你关掉了浏览器，在下次打开时，依然会读取到上一次的记录。是个非常小巧实用的本地备忘录",
    };
  },
  methods: {
    collapse() {
      this.$store.commit("switchCollapse");
    },
    refresh() {
      this.reload();
    },
    saveNotes() {
      localStorage.setItem("notes", this.notes);
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.$router.replace({ path: "/login" });
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
