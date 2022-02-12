/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 09:13:31 Thu
 * @LastEditTime: 2022-02-11 11:06:38 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
let UserModel = require('../model/userModel');
let uuid = require("uuid");//用来产生一个唯一的字符串
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

router.get('/getUserIdByName', async (req, res, next) => {
  let loginUserInfo = await userModel.login(req.body)
  let userId = await userModel.getUserIdByName(req.query.name);
  res.send(JSON.stringify(userId));
});

router.get("/loginUser", async (req, resp) => {
  let name = req.query.name;
  let password = req.query.password;
  let userArray = await userModel.loginUser(name);
  if (userArray.length > 0) {
    let user = JSON.parse(JSON.stringify(userArray[0]));
    if (user.state != 1) {
      resp.jsonp("2");//用户未激活
    } else if (user.type != 1) {
      resp.jsonp("3");//用户权限不够无法登录
    } else if (user.password != password) {
      resp.jsonp("4");//用户密码不正确
    } else {
      //1.能够登录 并且缓存用户名以及密码
      let days = 7;
      resp.cookie("userName", name, { maxAge: 3600 * 1000 * 24 * days, path: "/", domain: "localhost" });
      resp.cookie("userPass", password, { maxAge: 3600 * 1000 * 24 * days, path: "/", domain: "localhost" });
      // resp.redirect("./success.html");
      resp.jsonp("200");//可以登录
    }
  } else {
    resp.jsonp("1");//用户名不正确...
  }
});

router.get("/getCookie", (req, resp) => {
  console.log(req.cookies.userName);
  resp.jsonp("1");
})

router.get("/clearCookie", (req, resp) => {
  let days = 0;
  resp.cookie("userName", "", { maxAge: 3600 * 1000 * 24 * days, path: "/", domain: "localhost" });
  resp.cookie("userPass", "", { maxAge: 3600 * 1000 * 24 * days, path: "/", domain: "localhost" });
  // resp.redirect("./success.html");
  resp.jsonp("200");//可以登录
})

router.get('/register', async (req, resp, next) => {
  let user = req.query;
  user.uuid = uuid.v1();//唯一字符串
  user.state = 0;//默认是未激活的状态
  user.type = 1;
  user.avatar = `images/user/avatar${parseInt(Math.random() * 10)}.jpg`;
  user.score = 0;
  // console.log(user);
  let addObj = await userModel.register(user);
  sendEmail(user.email, `http://localhost:3000/user/updateStatus?uuid=${user.uuid}`);
  resp.send(addObj.length > 0 ? "1" : "0");
})

router.get("/updateStatus", (req, resp) => {
  (async () => {
    let uuid = req.query.uuid;
    let updateObj = await userModel.updateStatus(uuid);
    if (updateObj.modifiedCount > 0) {
      resp.send(`<h2>邮箱已经成功激活;<a href="http://localhost:8000">返回首页</a></h2>`);
    } else {
      resp.send(`<h2>邮箱已经成功,不能重复激活;<a href="http://localhost:8000">返回首页</a></h2>`);
    }
  })();
});

router.get('/queryUserById', async (req, res, next) => {
  let userId = req.query.userId;
  let queryResult = await userModel.queryUserById(userId);
  res.send(JSON.stringify(queryResult));
})

router.get('/queryUserOrder', async (req, res, next) => {
  let userId = req.query.userId;
  let queryResult = await userModel.queryUserOrder(userId);
  res.send(JSON.stringify(queryResult));
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

router.post("/insertUser", upload.array("img"), async (req, resp) => {
  let user = req.body;
  user.avatar = commonUtil.upload01(req, "images/user");
  let arr = await userModel.insert([user], uuid.v1());
  resp.send(arr.length > 0 ? "1" : "0");
});

router.post("/deleteUser", async (req, resp) => {
  let idStr = req.body.idArray;
  let idArray = idStr.split(",");
  let delObj = await userModel.deleteUser(idArray);
  resp.send(delObj.deletedCount > 0 ? "1" : "0");
});

router.get("/downloadFile", async (req, resp) => {
  let queryResult = await userModel.queryUser(nowPage, 6, {});
  let csvData = commonUtil.jsonToCSV(JSON.parse(JSON.stringify(queryResult)));
  let path = "./public/file/app.csv";
  fs.writeFileSync(path, csvData);
  resp.download(path);
});

router.post("/uploadFile", upload.array("uploadFile"), async (req, resp) => {
  // 1. get temp path
  // 2. read file
  let data = fs.readFileSync(req.files[0].path);

  // 3. data to json
  let cinemaList = commonUtil.csvParse(data.toString());

  // 4. write data to db
  let arr = await userModel.insert(cinemaList);
  resp.send(arr.length > 0 ? "1" : "0");
})

router.post("/updateUser", upload.array("img"), async (req, resp) => {
  let user = req.body;
  user.avatar = commonUtil.upload01(req, "images/user");
  //没有选择图片则使用原来的图片
  if (!user.avatar) { user.avatar = user.oldImg }
  delete user.oldImg;

  let updateObj = await userModel.updateUser(user);
  resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});

let common = require('../util/alipay/common.js');
router.get('/pay', async (req, res, next) => {
  let temp = req.query.temp
  let url = await common.createOrder({
    orderNumber: temp.orderId,
    allTotal: temp.totalPrice,
    orderName: "wo niu film",
    temp
  });
  res.send(JSON.stringify(url));
})

let randomCode;
router.get('/sendCheckCode', async (req, res, next) => {
  let temp = req.query
  let sendSms = require('../util/sendCheckMessage.js');
  randomCode = sendSms.sendSms(temp);
  // console.log(randomCode);
  res.send(JSON.stringify(randomCode));
})

module.exports = router;
