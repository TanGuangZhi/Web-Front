<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-23 18:40:52 Wed
 * @LastEditTime: 2022-02-24 19:29:22 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <!--1.添加电影-->
  <div id="addModal">
    <el-dialog title="添加电影" :visible.sync="dialogObj.add">
      <div slot="footer" class="dialog-footer">
        <el-form label-width="80px" style="margin: 0px auto; width: 400px">
          <el-form-item label="电影名称:">
            <el-input
              placeholder="请输入电影名称"
              clearable
              v-model.trim="film.filmName"
              style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="电影价格:">
            <el-input
              placeholder="请输入电影价格"
              clearable
              v-model.number="film.filmPrice"
              style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="电影评分:">
            <el-rate
              v-model.number="film.filmScore"
              :colors="colors"
              :max="5"
              :low-threshold="2"
              :high-threshold="4"
              :allow-half="true"
            ></el-rate>
          </el-form-item>

          <el-form-item label="电影类型:">
            <el-select v-model="film.filmType" style="width: 300px">
              <el-option label="喜剧" value="喜剧"></el-option>
              <el-option label="动画" value="动画"></el-option>
              <el-option label="爱情" value="爱情"></el-option>
              <el-option label="韩剧" value="韩剧"></el-option>
              <el-option label="动漫" value="动漫"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电影图片">
            <el-upload
              action="http://localhost:3000/film/upLoadImg"
              list-type="picture-card"
              :auto-upload="false"
              name="filmImg"
              :on-success="successUploadImg"
              :on-error="errorUploadImg"
              ref="addImg"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-row style="text-align: center">
            <el-col :span="24">
              <el-button type="primary" @click="insertFilm">确认添加</el-button>
              <el-button type="danger" @click="dialogObj.add = false">
                返回
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddFilm",
  props: {
    dialogObj: { type: Object },
  },
  data() {
    return { colors: ["#99A9BF", "#F7BA2A", "#FF9900"], film: {} };
  },
  methods: {
    insertFilm() {
      if (this.$refs.addImg.uploadFiles.length <= 0) {
        this.$message({
          type: "warning",
          message: "请先选择图片",
        });
      } else {
        //选了图片
        this.$refs.addImg.submit(); //上传图片至服务器
      }
    },
    //1.上传图片成功的时候触发，并且返回上传图片的文件路径
    successUploadImg(filmImg) {
      this.film.filmImg = filmImg;
      this.film.filmScore *= 2;
      this.$emit("insertFilm", { ...this.film });
      this.film = {};
    },
    //2.上传图片失败触发
    errorUploadImg() {
      this.$message({
        type: "error",
        message: "添加电影失败...",
      });
    },
  },
  beforeDestroy() {
    // $("#addForm")[0].reset();
  },
};
</script>

<style scoped></style>
