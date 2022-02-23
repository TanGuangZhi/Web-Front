<template>
  <div id="app">
    <UpdateFilm
      :lookFilm="lookFilm"
      :oldLookFilm="oldLookFilm"
      @updateFilm="updateFilm1"
    />
    <AddFilm @insertFilm="insertFilm" />
    <h3 class="text-center" style="line-height: 100px">电影管理</h3>
    <div class="container">
      <div class="row">
        <div class="col-md-8" style="line-height: 60px">
          <form class="form-inline">
            电影名称:<input
              type="text"
              placeholder="请输入电影名称"
              name="filmName"
              class="form-control"
              v-model="searchCondition.filmName"
              v-focus
            />
            电影类型:
            <select
              name="filmType"
              v-model="searchCondition.filmType"
              class="form-control"
              @change="queryFilm"
            >
              <option value="">请选择电影类型</option>
              <option value="动画">动画</option>
              <option value="动漫">动漫</option>
              <option value="动作">动作</option>
              <option value="武侠">武侠</option>
              <option value="犯罪">犯罪</option>
              <option value="名著">名著</option>
              <option value="喜剧">喜剧</option>
            </select>
            <button type="button" class="btn btn-info" @click="queryFilm(1)">
              搜索
            </button>
          </form>
        </div>
        <div class="col-md-4 text-right">
          <button
            type="button"
            class="btn btn-warning"
            data-toggle="modal"
            data-target="#addModal"
          >
            添加
          </button>
          <button type="button" class="btn btn-danger">批量删除</button>
        </div>
      </div>
      <div class="row">
        <table class="col-md-12 table-bordered text-center">
          <tr style="line-height: 60px; background: lightblue">
            <td>
              <input
                type="checkbox"
                id="allId"
                v-model="allSelectedFlag"
                @change="allSelected"
              />全选/全消
            </td>
            <td>编号</td>
            <td>电影名称</td>
            <td>电影价格</td>
            <td>电影类型</td>
            <td>电影图片</td>
            <td>电影评分</td>
            <td colspan="2">操作</td>
          </tr>
          <tr v-for="(film, index) in pageData.showDataList" :key="index">
            <td>
              选择<input
                type="checkbox"
                class="sel"
                :value="film._id"
                v-model="idArray"
                @change="selectedBetter"
              />
            </td>
            <td>{{ film._id }}</td>
            <td>{{ film.filmName }}</td>
            <td>{{ film.filmPrice }}元</td>
            <td>{{ film.filmType }}</td>
            <td>
              <img
                :src="'http://localhost:3000/' + film.filmImg"
                width="50px"
                class="img-thumbnail"
              />
            </td>
            <td>{{ film.filmScore }}分</td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteFilm(film._id)"
              >
                <span class="glyphicon glyphicon-remove"></span>删除
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="showFilm(film)"
                data-toggle="modal"
                data-target="#updateModal"
              >
                <span class="glyphicon glyphicon-pencil"></span>修改
              </button>
            </td>
          </tr>
        </table>
      </div>
      <ul class="pagination justify-content-center" style="margin-top: 20px">
        <li style="line-height: 40px" class="form-inline">
          每页　
          <select
            class="form-control"
            v-model.number="pageData.pageSize"
            @change="queryFilm"
          >
            <option
              v-for="(size, index) in [10, 20, 50]"
              :key="index"
              :value="size"
            >
              {{ size }}
            </option>
          </select>
          　条记录　
        </li>
        <li class="page-item active" @click="pageNumChange(-1)">
          <a class="page-link" href="javascript:void(0)">&laquo;</a>
        </li>
        <li
          class="page-item"
          v-for="(pageNum, index) in pageData.totalPageNum"
          :key="index"
          @click="pageNumChange(pageNum)"
        >
          <a class="page-link" href="javascript:void(0)">{{ pageNum }}</a>
        </li>

        <li class="page-item active" @click="pageNumChange(-2)">
          <a class="page-link" href="javascript:void(0)">&raquo;</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AddFilm from "./film/AddFilm.vue";
import UpdateFilm from "./film/UpdateFilm.vue";
import { createNamespacedHelpers } from "vuex";
import pageMixin from "../mixins/pageMixins.js";
import $ from "jquery";
const { mapState, mapActions } = createNamespacedHelpers("film");
export default {
  mixins: [pageMixin],
  name: "FilmView",
  components: {
    AddFilm,
    UpdateFilm,
  },
  data() {
    return {
      allSelectedFlag: false,
      idArray: [],
      lookFilm: {},
      oldLookFilm: {},
      filmList: [],
      searchCondition: { filmType: "" },
      totalPageNum: 1,
      nowPageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    ...mapActions([
      "queryFilmAsync",
      "insertFilmAsync",
      "deleteFilmAsync",
      "updateFilmAsync",
    ]),

    // 1. query
    async queryFilm(nowPageNum) {
      await this.queryFilmAsync(this.searchCondition);
      this.pageData.originDataList = [...this.pageInfo.filmList];
      // this.filmList = this.queryFilmByCondition();
      this.pageData.totalPageNum = Math.ceil(
        this.pageData.originDataList.length / this.pageData.pageSize
      );
      this.pageData.showDataList = this.pagination(nowPageNum);
    },

    // // 1.1 multi condition query
    // queryFilmByCondition() {
    //   return this.filmList.filter(
    //     (element) =>
    //       element.filmName.includes(this.searchCondition.filmName ?? "") &&
    //       element.filmType.includes(this.searchCondition.filmType ?? "")
    //   );
    // },

    // // 1.2 get pagination data
    // /**
    //  * @description:
    //  * @param {*} nowPageNum: 用于重置nowPageNum为1,防止点击第二页后,再点击多条件搜索,受到nowPageNum变为2产生的影响
    //  * @return {*}
    //  */
    // pagination(nowPageNum) {
    //   return this.filmList.splice(
    //     ((nowPageNum ?? this.nowPageNum) - 1) * this.pageSize,
    //     this.pageSize
    //   );
    // },

    // // 1.3 pageNumChange
    // pageNumChange(pageNum) {
    //   if (pageNum < 0) {
    //     if (pageNum == -1 && this.nowPageNum > 1) {
    //       this.nowPageNum -= 1;
    //     } else if (pageNum == -2 && this.nowPageNum < this.totalPageNum) {
    //       this.nowPageNum += 1;
    //     }
    //   } else {
    //     this.nowPageNum = pageNum;
    //   }
    //   this.queryFilm();
    // },

    async insertFilm(_id) {
      let status = await this.insertFilmAsync(_id);
      if (status == "1") {
        $("#addModal").modal("hide");
        this.queryFilm();
      } else {
        alert("添加失败...");
      }
    },
    async deleteFilm(_id) {
      let status = await this.deleteFilmAsync(_id);
      if (status == "1") {
        this.queryFilm();
      } else {
        alert("删除失败...");
      }
    },
    showFilm(film) {
      this.lookFilm = { ...film };
      this.oldLookFilm = { ...this.lookFilm };
    },
    async updateFilm1(film) {
      let status = await this.updateFilmAsync(film);

      if (status == "1") {
        $("#updateModal").modal("hide");
        this.queryFilm();
      } else {
        alert("修改失败...");
      }
    },

    // ## other
    // 1. all select
    allSelected() {
      if (this.allSelectedFlag) {
        this.idArray = this.filmList.map((element) => element._id);
      } else {
        this.idArray = [];
      }
    },

    // 1.1 selected better
    selectedBetter() {
      this.allSelectedFlag = this.idArray.length == this.filmList.length;
    },
  },
  computed: {
    ...mapState(["pageInfo"]),
  },
  created() {
    this.queryFilm();
    this.initMixinsData();
  },
};
</script>

<style scoped>
</style>
