/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 09:13:31 Thu
 * @LastEditTime: 2022-01-22 15:18:44 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
let UserModel = require('../model/userModel');
let multer = require("multer");
let commonUtil = require("../util/commonUtil");
let fs = require('fs');
let sendEmail = require('../util/sendMail');

var router = express.Router();
let userModel = new UserModel();
let upload = multer({ dest: "/log" });

router.post('/login', async (req, res, next) => {
  let loginUserInfo = await userModel.login(req.body)
  res.send(JSON.stringify(loginUserInfo));
});

router.get("/loginUser", async (req, resp) => {
  let name = req.query.name;
  let password = req.query.password;
  let userArray = await userModel.loginUser(name);
  if (userArray.length > 0) {
    let user = JSON.parse(JSON.stringify(userArray[0]));
    if (user.state != 1) {
      resp.send("2");//用户未激活
    } else if (user.type != 1) {
      resp.send("3");//用户权限不够无法登录
    } else if (user.password != password) {
      resp.send("4");//用户密码不正确
    } else {
      //1.能够登录 并且缓存用户名以及密码
      let days = 7;
      resp.cookie("userName", name, { maxAge: 3600 * 1000 * 24 * days, path: "/", domain: "localhost" });
      resp.cookie("userPass", password, { maxAge: 3600 * 1000 * 24 * days, path: "/", domain: "localhost" });
      // resp.redirect("./success.html");
      resp.send("200");//可以登录
    }
  } else {
    resp.send("1");//用户名不正确...
  }
});

router.get('/register', async (req, res, next) => {
  res.send(sendEmail(req.query.email, "111"));
})

let nowPage = 1;
let lastPage = -1;

router.post('/queryUser', async (req, res, next) => {
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
  let queryResult = await userModel.queryUser(nowPage, req.body.pageCount, req.body);
  let userCount = await userModel.getUserCount(req.body);
  lastPage = Math.ceil(userCount / req.body.pageCount);
  res.send(JSON.stringify({ queryResult, lastPage }));
});

router.post("/insertUser", upload.array("userImg"), async (req, resp) => {
  let user = req.body;
  user.userImg = commonUtil.upload01(req, "images/user");
  let arr = await userModel.insert([user]);
  resp.send(arr.length > 0 ? "1" : "0");
});

router.post("/deleteUser", async (req, resp) => {
  let idStr = req.body.idArray;
  let idArray = idStr.split(",");
  let delObj = await userModel.deleteUser(idArray);
  resp.send(delObj.deletedCount > 0 ? "1" : "0");
});

router.post("/updateUser", upload.array("userImg"), async (req, resp) => {
  let user = req.body;
  user.userImg = commonUtil.upload01(req, "images/user");
  //没有选择图片则使用原来的图片
  if (!user.userImg) { user.userImg = user.oldImg }
  delete user.oldImg;

  let updateObj = await userModel.updateUser(user);
  resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});


module.exports = router;
