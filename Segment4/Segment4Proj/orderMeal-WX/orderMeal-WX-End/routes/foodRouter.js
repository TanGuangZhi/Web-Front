/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:40 Fri
 * @LastEditTime: 2022-02-26 15:42:26 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
let FoodModel = require("../model/foodModel");
let sendEmail = require('../util/sendMail');

var router = express.Router();
const jwt = require("jsonwebtoken");

let multer = require("multer");
let upload = multer({ dest: "/" });
let commonUtil = require("../util/commonUtil");

let foodModel = new FoodModel();

// the eye of surveillance
// sendEmail("cz_captain@qq.com",);

router.get("/queryFood", async (req, resp) => {
    let foodList = await foodModel.queryFood(req.query);
    resp.send(JSON.stringify(foodList));
});

router.get("/queryFoodType", async (req, resp) => {
    let foodTypeList = await foodModel.queryFoodType();
    resp.send(JSON.stringify(foodTypeList));
});

router.post("/deleteFood", async (req, resp) => {
    let deleteObj = await foodModel.deleteFood(req.body._idArr);
    resp.send(deleteObj.deletedCount > 0 ? "1" : "0");
});

router.post("/insertFood", async (req, resp) => {
    let insertObj = await foodModel.insertFood(req.body.food);
    resp.send(insertObj.length > 0 ? "1" : "0");
});

router.post("/updateFood", async (req, resp) => {
    let judgeIsFoodNameExist = await foodModel.judgeIsFoodNameExist(req.body.food);
    if (judgeIsFoodNameExist.length > 0) {
        resp.send(JSON.stringify("foodNameAlreadyExist"));
        return;
    }
    let updateObj = await foodModel.updateFood(req.body.food);
    resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});

/**
 * @api {get} /food/loginFood 用户登录
 * @apiDescription 用户登录
 * @apiName loginFood
 * @apiGroup food
 * @apiParam {string} foodName 用户名
 * @apiParam {string} foodPass 密码
 *@apiSuccess {json} result  返回登录成功与失败的状态
 * @apiSuccessExample {text} Success-Response:
 *  "1":成功   "0":失败
 * @apiSampleRequest http://localhost:3000/food/loginFood
 * @apiVersion 1.0.0
 */
router.get("/loginFood", async (req, resp) => {
    let foodName = req.query.foodName;
    let foodPass = req.query.foodPass;
    let foodArray = await foodModel.loginFood(foodName);
    if (foodArray.length > 0) {
        let food = foodArray[0];
        if (food.status != 1) {
            resp.send("用户未激活");//用户未激活
        } else if (food.foodType != 3) {
            resp.send("用户权限不够");//用户权限不够无法登录
        } else if (food.foodPass != foodPass) {
            resp.send("密码不正确");//用户密码不正确
        } else {
            //1.th1:token保存的用户信息
            //2. th2:加密的唯一标识
            //3.token的存活时间(单位/s)  支持字符串的写法   "1h" 一小时 "1days" 一天
            // 1296000 = 15day
            const token = jwt.sign({ food }, "food", { expiresIn: 1296000 });
            // console.log(token);
            resp.send(JSON.stringify({ token, food }));
        }
    } else {
        resp.send("用户名不正确");//用户名不正确...
    }
});

router.post("/checkToken", (req, resp) => {
    let token = req.body.token;
    // //解密 会把token生成时传入的用户信息解密出来
    let food = jwt.verify(token, 'food');
    resp.send({
        code: 200,
        ...food
    });
});
module.exports = router;
