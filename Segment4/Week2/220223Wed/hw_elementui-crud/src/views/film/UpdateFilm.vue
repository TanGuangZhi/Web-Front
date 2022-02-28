<template>
  <!--2.修改电影-->
  <div id="updateModal">
    <el-dialog title="修改电影" :visible.sync="dialogObj.update">
      <div slot="footer" class="dialog-footer">
        <el-form label-width="80px" style="margin: 0px auto; width: 400px">
          <el-form-item label="电影编号:">
            <el-input
              clearable
              v-model.trim="updateShowBackObj._id"
              readonly
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="电影名称:">
            <el-input
              placeholder="请输入电影名称"
              clearable
              v-model.trim="updateShowBackObj.filmName"
              style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="电影价格:">
            <el-input
              placeholder="请输入电影价格"
              clearable
              v-model.number="updateShowBackObj.filmPrice"
              style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="电影评分:" justify="center">
            <el-rate
              v-model="updateShowBackObj.filmScore"
              :colors="colors"
              :max="5"
              :low-threshold="2"
              :high-threshold="4"
              justify="center"
            ></el-rate>
          </el-form-item>

          <el-form-item label="电影类型:">
            <el-select
              v-model="updateShowBackObj.filmType"
              style="width: 300px"
            >
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
              ref="updateImg"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-row style="text-align: center">
            <el-col :span="24">
              <el-button type="primary" @click="uploadFilmImg">
                确认修改
              </el-button>
              <el-button type="danger" @click="dialogObj.update = false">
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
  name: "UpdateFilm",
  props: {
    dialogObj: { type: Object },
    updateShowBackObj: { type: Object },
    oldUpdateShowBackObj: { type: Object },
  },
  data() {
    return {
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    };
  },
  methods: {
    updateFilm() {
      // if (JSON.stringify(this.updateShowBackObj) == JSON.stringify(this.oldLookFilm)) {
      //   alert("您要修改的数据与原数据一致，修改失败");
      // } else {
      //   this.$emit("updateFilm", new FormData($("#updateForm")[0]));
      // }
    }, //1.上传图片成功的时候触发
    successUploadImg(filmImg) {
      this.updateShowBackObj.filmImg = filmImg;
      this.$emit("updateFilm", { ...this.updateShowBackObj });
    },
    //2.上传图片失败触发
    errorUploadImg() {
      this.$message({
        type: "error",
        message: "上传图片失败，修改失败",
      });
    },
    //3.点击修改按钮触发
    uploadFilmImg() {
      if (this.$refs.updateImg.uploadFiles.length > 0) {
        this.$refs.updateImg.submit();
      } else if (
        JSON.stringify(this.updateShowBackObj) ==
        JSON.stringify(this.oldUpdateShowBackObj)
      ) {
        this.$message({
          type: "error",
          message: "您要修改的数据与原数据一致，修改失败",
        });
      } else {
        //说明没有修改图片，修改了其他的信息
        this.$emit("updateFilm", { ...this.updateShowBackObj });
      }
    },
  },
};
</script>

<style scoped></style>
