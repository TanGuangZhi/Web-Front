<template>
  <div>
    <el-dialog title="添加书籍" :visible.sync="dialogObj.add">
      <div slot="footer" class="dialog-footer">
        <el-form label-width="80px" style="margin: 0px auto; width: 400px">
          <el-form-item label="书籍名称:">
            <el-input
              placeholder="请输入书籍名称"
              clearable
              style="width: 300px"
              v-model.trim="insertBookObj.bookName"
            ></el-input>
          </el-form-item>

          <el-form-item label="书籍价格:">
            <el-input
              placeholder="请输入书籍价格"
              clearable
              style="width: 300px"
              v-model.trim="insertBookObj.bookPrice"
            ></el-input>
          </el-form-item>

          <el-form-item label="书籍类型:">
            <el-select
              style="width: 300px"
              v-model.trim="insertBookObj.bookType"
            >
              <el-option label="请选择书籍类型" value=""></el-option>
              <el-option label="励志" value="励志"></el-option>
              <el-option label="小说" value="小说"></el-option>
              <el-option label="历史" value="历史"></el-option>
              <el-option label="人物" value="人物"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="书籍图片">
            <el-upload
              action="http://localhost:3000/book/uploadImg"
              list-type="picture-card"
              :auto-upload="false"
              name="bookImg"
              :on-success="successUploadImg"
              :on-error="errorUploadImg"
              ref="addImg"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-row style="text-align: center">
            <el-col :span="24">
              <el-button type="primary" @click="insertBookSure">
                确认添加
              </el-button>
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
  name: "AddBook",
  props: {
    dialogObj: { type: Object },
  },
  data() {
    return {
      insertBookObj: {},
    };
  },
  methods: {
    insertBookSure() {
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
    successUploadImg(bookImg) {
      this.insertBookObj.bookImg = bookImg;
      this.insertBookObj.bookCount = 0;
      this.insertBookObj.bookNum = 999;
      this.$emit("insertBook", { ...this.insertBookObj });
      this.insertBookObj = {};
    },
    //2.上传图片失败触发
    errorUploadImg() {
      this.$message({
        type: "error",
        message: "添加书籍失败...",
      });
    },
  },
};
</script>

<style scoped></style>
