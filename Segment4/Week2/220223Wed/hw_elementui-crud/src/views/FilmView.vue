<template>
  <div id="filmView">
    <AddFilm :dialogObj="dialogObj" @insertFilm="insertFilm" />
    <UpdateFilm
      :dialogObj="dialogObj"
      :updateShowBackObj="updateShowBackObj"
      :oldUpdateShowBackObj="oldUpdateShowBackObj"
      @updateFilm="updateFilm"
    ></UpdateFilm>
    <h1 style="text-align: center">电影管理</h1>
    <el-row style="line-height: 100px; text-align: center">
      <el-col :span="16">
        电影名: 　
        <el-input
          placeholder="请输入电影名称"
          v-model.trim="searchCondition.filmName"
          style="width: 150px"
        ></el-input>
        　电影类型: 　
        <el-select v-model="searchCondition.filmType">
          <el-option label="请选择" value=""></el-option>
          <el-option
            v-for="(type, index) in typeList"
            :label="type"
            :value="type"
            :key="index"
          ></el-option>
        </el-select>
        　
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="queryFilm"
        >
          搜索
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button
          type="info"
          size="mini"
          icon="el-icon-circle-plus"
          @click="dialogObj.add = true"
        >
          添加
        </el-button>
        <el-button
          size="mini"
          type="warning"
          icon="el-icon-delete"
          @click="delFilmById()"
        >
          批量删除
        </el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="20" :offset="2">
        <el-table
          :data="pageData.showDataList"
          border
          @selection-change="selFilm"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            label="编号"
            prop="_id"
            align="center"
            width="40px"
          ></el-table-column>
          <el-table-column
            label="电影名称"
            prop="filmName"
            align="center"
          ></el-table-column>
          <el-table-column
            label="电影价格"
            prop="filmPrice"
            align="center"
          ></el-table-column>
          <el-table-column
            label="电影评分"
            prop="filmScore"
            align="center"
          ></el-table-column>
          <el-table-column
            label="电影类型"
            prop="filmType"
            align="center"
          ></el-table-column>
          <el-table-column
            label="电影票房"
            prop="boxOffice"
            align="center"
          ></el-table-column>
          <el-table-column label="电影图片" prop="filmImg" align="center">
            <template slot-scope="scope">
              <img
                :src="'http://localhost:7777/' + scope.row.filmImg"
                width="40px"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                type="success"
                @click="updateShowBack(scope.row)"
              >
                修改
              </el-button>
              <el-button
                size="mini"
                icon="el-icon-delete"
                type="danger"
                @click="delFilmById(scope.row._id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
import AddFilm from "./film/AddFilm.vue";
import UpdateFilm from "./film/UpdateFilm.vue";

const { mapState, mapActions } = createNamespacedHelpers("film");
export default {
  mixins: [pageMixin],
  name: "app",
  components: {
    AddFilm,
    UpdateFilm,
  },
  data() {
    return {
      updateShowBackObj: {},
      oldUpdateShowBackObj: {},
      _idArr: [],
      insertFilmArr: {},
      typeList: ["动画", "动漫", "爱情", "动作", "喜剧", "名著", "战争"],
      searchCondition: {},
    };
  },
  methods: {
    ...mapActions([
      "queryFilmAsync",
      "insertFilmAsync",
      "deleteFilmAsync",
      "updateFilmAsync",
    ]),
    // 1. queryFilm
    async queryFilm(nowPageNum) {
      console.log(this.searchCondition);
      await this.queryFilmAsync(this.searchCondition);
      this.pageData.originDataList = [...this.pageInfo.filmList];
      // this.filmList = this.queryFilmByCondition();
      this.pageData.totalPageNum = Math.ceil(
        this.pageData.originDataList.length / this.pageData.pageSize
      );
      this.pageData.showDataList = this.pagination(nowPageNum);
    },

    // 2. del film
    async delFilmById(_idArr) {
      //   console.log(_idArr);
      let status = await this.deleteFilmAsync(_idArr ?? this._idArr);
      if (status == "1") {
        this.queryFilm();
      } else {
        this.$message({
          type: "error",
          message: "删除失败",
        });
      }
    },

    // 3. insert film
    async insertFilm(insertFilmArr) {
      let status = await this.insertFilmAsync(insertFilmArr);
      if (status == "1") {
        this.insertDialog = false;
        this.queryFilm();
      } else {
        this.$message({
          type: "error",
          message: "添加失败",
        });
      }
    },

    // 4. update film
    async updateFilm() {
      let status = await this.updateFilmAsync(this.updateShowBackObj);
      if (status == "1") {
        this.dialogObj.update = false;
        this.queryFilm();
      } else if (status == "filmNameAlreadyExist") {
        this.$message({
          type: "error",
          message: "电影名已存在,请修改",
        });
      } else {
        this.$message({
          type: "error",
          message: "修改失败",
        });
      }
    },

    // 4.1 update modal show back data
    updateShowBack(data) {
      this.dialogObj.update = true;
      data.filmScore /= 2;
      this.updateShowBackObj = { ...data };
      this.oldUpdateShowBackObj = { ...data };
      // this.$store.commit("film/SET_UPDATE_SHOW_BACK", this.updateShowBackObj);
    },

    // ## other
    // 1. select and disSelect
    selFilm(res) {
      this._idArr = res.map((item) => {
        return item._id;
      });
      // console.log(this.idArray);
    },
  },
  created() {
    this.queryFilm();
    // console.log(this.pageData.pageSizeList);
    this.initMixinsData();
  },
  computed: {
    ...mapState(["pageInfo"]),
  },
};
</script>

<style scoped></style>
