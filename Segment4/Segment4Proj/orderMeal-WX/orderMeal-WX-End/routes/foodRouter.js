/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:40 Fri
 * @LastEditTime: 2022-03-06 21:43:35 Sun
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

module.exports = router;
