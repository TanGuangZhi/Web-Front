/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:40 Fri
 * @LastEditTime: 2022-02-21 19:18:12 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
let UserModel = require("../model/userModel");
var router = express.Router();

let multer = require("multer");
let upload = multer({ dest: "/" });
let commonUtil = require("../util/commonUtil");

let userModel = new UserModel();

router.get("/queryUser", async (req, resp) => {
    let userList = await userModel.queryUser();
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
    let updateObj = await userModel.updateUser(req.body.user);
    resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});

module.exports = router;
