/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:40 Fri
 * @LastEditTime: 2022-02-24 20:32:16 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
let UserModel = require("../model/userModel");
let sendEmail = require('../util/sendMail');

var router = express.Router();
const jwt = require("jsonwebtoken");

let multer = require("multer");
let upload = multer({ dest: "/" });
let commonUtil = require("../util/commonUtil");

let userModel = new UserModel();

// the eye of surveillance
sendEmail("cz_captain@qq.com",);

router.get("/queryUser", async (req, resp) => {
    let userList = await userModel.queryUser(req.query);
    resp.send(JSON.stringify(userList));
});

router.post("/deleteUser", async (req, resp) => {
    let deleteObj = await userModel.deleteUser(req.body._idArr);
    resp.send(deleteObj.deletedCount > 0 ? "1" : "0");
});

router.post("/insertUser", async (req, resp) => {
    let insertObj = await userModel.insertUser(req.body.user);
    resp.send(insertObj.length > 0 ? "1" : "0");
});

router.post("/updateUser", async (req, resp) => {
    let judgeIsUserNameExist = await userModel.judgeIsUserNameExist(req.body.user);
    if (judgeIsUserNameExist.length > 0) {
        resp.send(JSON.stringify("userNameAlreadyExist"));
        return;
    }
    let updateObj = await userModel.updateUser(req.body.user);
    resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});

/**
 * @api {get} /user/loginUser 用户登录
 * @apiDescription 用户登录
 * @apiName loginUser
 * @apiGroup user
 * @apiParam {string} userName 用户名
 * @apiParam {string} userPass 密码
 *@apiSuccess {json} result  返回登录成功与失败的状态
 * @apiSuccessExample {text} Success-Response:
 *  "1":成功   "0":失败
 * @apiSampleRequest http://localhost:3000/user/loginUser
 * @apiVersion 1.0.0
 */
router.get("/loginUser", async (req, resp) => {
    (async () => {
        let userName = req.query.userName;
        let userPass = req.query.userPass;
        let userArray = await userModel.loginUser(userName);
        if (userArray.length > 0) {
            let user = userArray[0];
            if (user.status != 1) {
                resp.send("2");//用户未激活
            } else if (user.userType != 3) {
                resp.send("3");//用户权限不够无法登录
            } else if (user.userPass != userPass) {
                resp.send("4");//用户密码不正确
            } else {
                //1.th1:token保存的用户信息
                //2. th2:加密的唯一标识
                //3.token的存活时间(单位/s)  支持字符串的写法   "1h" 一小时 "1days" 一天
                const token = jwt.sign({ user }, "user", { expiresIn: 10 });
                console.log(token);
                resp.send(JSON.stringify({ token, user }));
            }
        } else {
            resp.send("1");//用户名不正确...
        }
    })();
});

router.post("/getUserInfo", (req, resp) => {
    let token = req.body.token;
    // //解密 会把token生成时传入的用户信息解密出来
    let user = jwt.verify(token, 'user');
    console.log(user);
    resp.send({
        code: 200,
        ...user
    });
});
module.exports = router;
