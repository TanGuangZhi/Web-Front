<template>
  <div>
    <div class="container">
      <div class="row text-right" style="line-height: 60px">
        <div class="col-md-12">
          <button
            type="button"
            data-toggle="modal"
            data-target="#addModal"
            class="btn btn-info"
          >
            <span class="glyphicon glyphicon-plus"></span>添加电影
          </button>
          <button
            type="button"
            class="btn btn-danger"
            id="deleteManyId"
            @click="delFilmById()"
          >
            <span class="glyphicon glyphicon-remove-circle"></span>批量删除
          </button>
        </div>
      </div>
      <div class="row">
        <table class="col-md-12 table-bordered text-center table-hover">
          <tr style="line-height: 50px; background: aqua">
            <td>
              <input
                type="checkbox"
                id="allId"
                v-model="allSelectedFlag"
                @change="allSelected"
              />全选/全消
            </td>
            <td>编号</td>
            <td>电影名</td>
            <td>电影价格</td>
            <td>电影类型</td>
            <td>电影图片</td>
            <td colspan="2">操作</td>
          </tr>
          <tr v-for="(film, index) in searchResults" :key="index">
            <td>
              选项<input
                type="checkbox"
                class="sel"
                v-model="idArray"
                :value="film.id"
                @change="selectedBetter"
              />
            </td>
            <td>{{ film.id }}</td>
            <td>{{ film.filmName }}</td>
            <td>{{ film.filmPrice }}元</td>
            <td>{{ film.filmType }}</td>
            <td>
              <img
                :src="'./' + film.filmImg"
                width="50px"
                class="img-thumbnail"
              />
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="delFilmById([film.id])"
              >
                <span class="glyphicon glyphicon-remove"></span> 删除
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#updateModal"
                @click="updateShowBack(film.id)"
              >
                <span class="glyphicon glyphicon-edit"></span> 修改
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <ul class="pagination justify-content-center" style="margin-top: 20px">
      <li class="page-item active">
        <a class="page-link" href="javascript:void(0)">&laquo;</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)">1</a>
      </li>
      <li class="page-item active">
        <a class="page-link" href="javascript:void(0)">&raquo;</a>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from "../../bus.js";
export default {
  name: "QueryFilm",
  data() {
    return {
      filmList: [],
      searchResults: [],
      allSelectedFlag: false,
      idArray: [],
    };
  },
  methods: {
    queryFilm() {
      if (this.filmList.length == 0) {
        this.filmList = [
          {
            filmImg: "images/film/7.jpg",
            filmName: "烈日灼心",
            filmPrice: 88.88,
            filmType: "动漫",
            id: 1,
          },
          {
            filmImg: "images/film/8.jpg",
            filmName: "长津湖",
            filmPrice: 89.88,
            filmType: "战争",
            id: 2,
          },
          {
            filmImg: "images/film/9.jpg",
            filmName: "我和我的父辈",
            filmPrice: 89.88,
            filmType: "喜剧",
            id: 3,
          },
          {
            filmImg: "images/film/10.jpg",
            filmName: "熊出没",
            filmPrice: 89.88,
            filmType: "动画",
            id: 4,
          },
          {
            filmImg: "images/film/13.jpg",
            filmName: "狂野大陆",
            filmPrice: 89.88,
            filmType: "动画",
            id: 7,
          },
          {
            filmImg: "images/film/14.jpg",
            filmName: "夏洛特烦恼",
            filmPrice: 89.88,
            filmType: "喜剧",
            id: 8,
          },
          {
            filmImg: "images/film/15.jpg",
            filmName: "战狼",
            filmPrice: 89.88,
            filmType: "战争",
            id: 9,
          },
          {
            filmImg: "images/film/6.jpg",
            filmName: "黑猫警长",
            filmPrice: 89.88,
            filmType: "动画",
            id: 10,
          },
          {
            filmImg: "images/film/5.jpg",
            filmName: "后会无期",
            filmPrice: 89.88,
            filmType: "喜剧",
            id: 11,
          },
          {
            filmImg: "images/film/2.jpg",
            filmName: "年兽大作战",
            filmPrice: 89.88,
            filmType: "动画",
            id: 14,
          },
          {
            filmImg: "images/film/4.jpg",
            filmName: "葫芦娃1",
            filmPrice: 89.88,
            filmType: "动画",
            id: 23,
          },
          {
            filmImg: "images/film/6.jpg",
            filmName: "三国演义",
            filmPrice: 89.88,
            filmType: "名著",
            id: 25,
          },
        ];
      }
      this.searchResults = [...this.filmList];
    },
    delFilmById(_idArr) {
      this.filmList = this.filmList.filter(
        (element) => !(_idArr ?? this.idArray).includes(element.id)
      );
      this.queryFilm();
      this.allSelectedFlag = false;
    },
    insertFilm(film) {
      // console.log(this.insertFilmArr);
      film.id = Date.now();
      let isFilmNameExit = this.filmList.some(
        (element) => element.filmName == film.filmName
      );
      if (isFilmNameExit) {
        alert("filmName already exists");
        return;
      }
      this.filmList.push(film);
      this.film = {};
      // console.log(this.filmList);
      this.queryFilm();
      // alert(1);
    },
    updateShowBack(_id) {
      this.showBack = {
        ...this.filmList.filter((element) => element.id == _id)[0],
      };
      bus.$emit("updateShowBack", this.showBack);
      this.nowName = this.showBack.filmName;
    },
    updateFilm(film) {
      this.filmList = this.filmList.map((element) => {
        if (element.id == film.id) {
          // 1. judge is data equal
          //   let isObjEqual = myUtils.compare(this.showBack, element);
          //   if (isObjEqual) {
          //     alert("数据一样,不可修改");
          //     return element;
          //   }

          // judge is filmName exist
          //   let isFilmNameExit = this.filmList.some(
          //     (element) => element.filmName == this.showBack.filmName
          //   );

          //   // judge filmName exist and not equal 原来的那个filmname,防止只改密码或其他,不改filmname从而出现bug的情况.
          //   if (isFilmNameExit && this.showBack.filmName != this.nowName) {
          //     alert("filmName already exists");
          //     return;
          //   }
          return { ...film };
        }
        return element;
      });
      this.queryFilm();
    },
    allSelected() {
      if (this.allSelectedFlag) {
        this.idArray = this.searchResults.map((element) => element.id);
      } else {
        this.idArray = [];
      }
      //   console.log(this.idArray);
    },
    selectedBetter() {
      this.allSelectedFlag = this.idArray.length == this.searchResults.length;
    },
  },
  created() {
    this.queryFilm();
    bus.$on("insertFilm", (data) => {
      this.insertFilm(data);
    });
    bus.$on("updateFilm", (data) => {
      this.updateFilm(data);
    });
  },
};
</script>

<style scoped>
</style>
