/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-13 11:20:44 Thu
 * @LastEditTime: 2022-01-13 16:58:09 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
let multer = require("multer");
let AdminModel = require('../model/adminModel');
let commonUtil = require("../util/commonUtil");

let upload = multer({ dest: "/log" });
var router = express.Router();
let adminModel = new AdminModel();

let nowPage = 1;
let pageCount = 6;
let lastPage = -1;

router.post('/queryStu', async (req, res, next) => {
  let temp = parseInt(req.body.nowPage);
  if (temp < 0) {
    if (temp == -1 && nowPage > 1) {
      nowPage--;
    }
    if (temp == -2 && nowPage < lastPage) {
      nowPage++;
    }
  } else {
    nowPage = temp;
  }
  let queryResult = await adminModel.queryStu(nowPage, req.body.pageCount, req.body);
  let stuCount = await adminModel.getStuCount(req.body);
  lastPage = Math.ceil(stuCount / req.body.pageCount);
  res.send(JSON.stringify({ queryResult, lastPage }));
});

router.post("/deleteStu", async (req, resp) => {
  let idStr = req.body.idArray;
  let idArray = idStr.split(",");
  let delObj = await adminModel.deleteStu(idArray);
  resp.send(delObj.deletedCount > 0 ? "1" : "0");
});

router.post("/addStu", upload.array("stuImg"), async (req, resp) => {
  let stu = req.body;
  stu.stuImg = commonUtil.upload01(req, "images/stu");
  let arr = await adminModel.addStu(stu);
  resp.send(arr.length > 0 ? "1" : "0");
});

router.post("/updateStu", upload.array("stuImg"), async (req, resp) => {
  let stu = req.body;
  stu.stuImg = commonUtil.upload01(req, "images/stu");
  //没有选择图片则使用原来的图片
  if (!stu.stuImg) { stu.stuImg = stu.oldImg }
  delete stu.oldImg;

  let updateObj = await adminModel.updateStu(stu);
  resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});
module.exports = router;
