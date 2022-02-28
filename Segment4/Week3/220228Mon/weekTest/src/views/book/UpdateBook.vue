<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-28 09:24:29 Mon
 * @LastEditTime: 2022-02-28 10:53:06 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <div>
    <el-dialog title="修改书籍" :visible.sync="dialogObj.update">
      <div slot="footer" class="dialog-footer">
        <el-form label-width="80px" style="margin: 0px auto; width: 400px">
          <el-form-item label="书籍编号:">
            <el-input
              clearable
              readonly
              style="width: 300px"
              v-model.trim="updateShowBackObj._id"
            ></el-input>
          </el-form-item>
          <el-form-item label="书籍名称:">
            <el-input
              placeholder="请输入书籍名称"
              clearable
              style="width: 300px"
              v-model.trim="updateShowBackObj.bookName"
            ></el-input>
          </el-form-item>

          <el-form-item label="书籍价格:">
            <el-input
              placeholder="请输入书籍价格"
              clearable
              style="width: 300px"
              v-model.trim="updateShowBackObj.bookPrice"
            ></el-input>
          </el-form-item>

          <el-form-item label="书籍类型:">
            <el-select
              style="width: 300px"
              v-model.trim="updateShowBackObj.bookType"
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
              ref="updateImg"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-row style="text-align: center">
            <el-col :span="24">
              <el-button type="primary" @click="uploadBookSure">
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
  name: "UpdateBook",
  props: {
    dialogObj: { type: Object },
    updateShowBackObj: { type: Object },
    oldUpdateShowBackObj: { type: Object },
  },
  methods: {
    //1.上传图片成功的时候触发
    successUploadImg(bookImg) {
      this.updateShowBackObj.bookImg = bookImg;
      this.$emit("updateBook", { ...this.updateShowBackObj });
    },
    //2.上传图片失败触发
    errorUploadImg() {
      this.$message({
        type: "error",
        message: "上传图片失败，修改失败",
      });
    },
    //3.点击修改按钮触发
    uploadBookSure() {
      // 1. upload img and auto to use successUploadImg or errorUploadImg
      if (this.$refs.updateImg.uploadFiles.length > 0) {
        this.$refs.updateImg.submit();
      }
      // 1-BC. judge is equal
      else if (
        JSON.stringify(this.updateShowBackObj) ==
        JSON.stringify(this.oldUpdateShowBackObj)
      ) {
        this.$message({
          type: "error",
          message: "您要修改的数据与原数据一致，修改失败",
        });
      }
      // 1-BC2. don't need to upload img
      else {
        //说明没有修改图片，修改了其他的信息
        this.$emit("updateBook", { ...this.updateShowBackObj });
      }
    },
  },
};
</script>

<style scoped></style>
