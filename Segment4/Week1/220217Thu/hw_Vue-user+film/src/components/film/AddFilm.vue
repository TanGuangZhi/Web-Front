<template>
  <!--1.添加电影的模态框-->
  <div
    class="modal fade"
    id="addModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-hidden="true"
          >
            &times;
          </button>
          <h4 class="modal-title">添加电影</h4>
        </div>
        <div class="modal-body text-center">
          <form id="addForm">
            <!-- <p>
              <img
                src="../../assets/images/film/1.jpg"
                class="img-thumbnail"
                alt=""
                width="100px"
              />
            </p> -->
            <p class="form-inline justify-content-center">
              电影名称:<input
                type="text"
                name="filmName"
                class="form-control"
                placeholder="请输入电影名"
                style="width: 251px"
                v-model="insertFilmArr.filmName"
              />
            </p>
            <p class="form-inline justify-content-center">
              电影价格:<input
                type="text"
                name="filmPrice"
                class="form-control"
                placeholder="请输入电影价格"
                style="width: 251px"
                v-model="insertFilmArr.filmPrice"
              />
            </p>
            <p class="form-inline justify-content-center">
              电影类型:
              <select
                name="filmType"
                v-model="insertFilmArr.filmType"
                class="form-control"
                style="width: 251px"
              >
                <option value="">请选择电影类型</option>
                <option value="武侠">武侠</option>
                <option value="喜剧">喜剧</option>
                <option value="动画">动画</option>
                <option value="动漫">动漫</option>
                <option value="战争">战争</option>
                <option value="名著">名著</option>
              </select>
            </p>
            <p class="form-inline justify-content-center">
              电影图片:<input
                type="text"
                name="filmImg"
                readonly
                class="form-control"
                placeholder="请选择图片"
              />
              <button type="button" class="btn btn-outline-danger">上传</button>
            </p>
            <p class="form-inline justify-content-center">
              <button type="button" class="btn btn-primary" @click="insertFilm">
                添加
              </button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                返回
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../bus.js";
export default {
  name: "AddFilm",
  data() {
    return {
      insertFilmArr: {},
    };
  },
  methods: {
    insertFilm() {
      bus.$emit("insertFilm", this.insertFilmArr);
    },
  },
};
</script>

<style scoped>
</style>
