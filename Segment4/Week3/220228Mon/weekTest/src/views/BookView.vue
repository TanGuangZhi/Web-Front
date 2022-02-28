<template>
  <div id="bookView">
    <AddBook :dialogObj="dialogObj" @insertBook="insertBook" />
    <UpdateBook
      :dialogObj="dialogObj"
      :updateShowBackObj="updateShowBackObj"
      :oldUpdateShowBackObj="oldUpdateShowBackObj"
      @updateBook="updateBook"
    />
    <h1 style="text-align: center">书籍管理</h1>
    <el-row style="line-height: 100px; text-align: center">
      <el-col :span="16">
        书籍名: 　
        <el-input
          placeholder="请输入书籍名称"
          style="width: 200px"
          v-model="searchCondition.bookName"
        ></el-input>
        　书籍类型: 　
        <el-select v-model="searchCondition.bookType">
          <el-option label="请选择书籍类型" value=""></el-option>
          <el-option label="励志" value="励志"></el-option>
          <el-option label="小说" value="小说"></el-option>
          <el-option label="历史" value="历史"></el-option>
          <el-option label="人物" value="人物"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="queryBook()">
          搜索
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button
          type="info"
          icon="el-icon-circle-plus"
          @click="dialogObj.add = true"
        >
          添加
        </el-button>
        <el-button type="warning" icon="el-icon-delete" @click="delBookById()">
          批量删除
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-table
          :data="pageData.showDataList"
          border
          @selection-change="selBook"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            label="编号"
            prop="_id"
            align="center"
            width="40px"
          ></el-table-column>
          <el-table-column
            label="书籍名称"
            prop="bookName"
            align="center"
          ></el-table-column>
          <el-table-column
            label="书籍价格"
            prop="bookPrice"
            align="center"
          ></el-table-column>
          <el-table-column
            label="书籍类型"
            prop="bookType"
            align="center"
          ></el-table-column>
          <el-table-column
            label="书籍销量"
            prop="bookCount"
            align="center"
          ></el-table-column>
          <el-table-column
            label="书籍数量"
            prop="bookNum"
            align="center"
          ></el-table-column>
          <el-table-column label="书籍图片" prop="bookImg" align="center">
            <template slot-scope="scope">
              <img
                :src="'http://localhost:3000/' + scope.row.bookImg"
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
                @click="delBookById(scope.row._id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

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
import AddBook from "./book/AddBook.vue";
import pageMixin from "../mixins/pageMixins.js";
import UpdateBook from "./book/UpdateBook.vue";
const { mapState, mapActions } = createNamespacedHelpers("bookStore");

export default {
  mixins: [pageMixin],
  name: "BookView",
  components: {
    AddBook,
    UpdateBook,
  },
  data() {
    return {
      dialogObj: {
        add: false,
        update: false,
      },
      bookList: [],
      updateShowBackObj: {},
      oldUpdateShowBackObj: {},
      _idArr: [],
      insertBookArr: {},
      searchCondition: {},
    };
  },
  methods: {
    ...mapActions([
      "queryBookAsync",
      "insertBookAsync",
      "deleteBookAsync",
      "updateBookAsync",
    ]),
    // 1. queryBook
    async queryBook(nowPageNum) {
      //   console.log(this.searchCondition);
      await this.queryBookAsync(this.searchCondition);
      this.pageData.originDataList = [...this.pageInfo.bookList];
      //   console.log(this.pageData.originDataList);
      // this.bookList = this.queryBookByCondition();
      this.pageData.totalPageNum = Math.ceil(
        this.pageData.originDataList.length / this.pageData.pageSize
      );
      this.pageData.showDataList = this.pagination(nowPageNum);
    },

    // 2. del book
    async delBookById(_idArr) {
      //   console.log(_idArr);
      let status = await this.deleteBookAsync(_idArr ?? this._idArr);
      if (status == "1") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.queryBook();
      } else {
        this.$message({
          type: "error",
          message: "删除失败",
        });
      }
    },

    // 3. insert book
    async insertBook(insertBookArr) {
      let status = await this.insertBookAsync(insertBookArr);
      if (status == "1") {
        this.dialogObj.add = false;
        this.queryBook();
      } else if (status == "bookNameAlreadyExist") {
        this.$message({
          type: "error",
          message: "书籍名已存在,请修改",
        });
      } else {
        this.$message({
          type: "error",
          message: "添加失败",
        });
      }
    },

    // 4. update book
    async updateBook() {
      let status = await this.updateBookAsync(this.updateShowBackObj);
      if (status == "1") {
        this.dialogObj.update = false;
        this.queryBook();
      } else if (status == "bookNameAlreadyExist") {
        this.$message({
          type: "error",
          message: "书籍名已存在,请修改",
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
      data.bookScore /= 2;
      this.updateShowBackObj = { ...data };
      this.oldUpdateShowBackObj = { ...data };
      // this.$store.commit("book/SET_UPDATE_SHOW_BACK", this.updateShowBackObj);
    },

    // ## other
    // 1. select and disSelect
    selBook(res) {
      this._idArr = res.map((item) => {
        return item._id;
      });
      // console.log(this.idArray);
    },
  },
  created() {
    this.queryBook();
    // console.log(this.pageData.pageSizeList);
    this.initMixinsData();
  },
  computed: {
    ...mapState(["pageInfo"]),
  },
};
</script>

<style scoped></style>
