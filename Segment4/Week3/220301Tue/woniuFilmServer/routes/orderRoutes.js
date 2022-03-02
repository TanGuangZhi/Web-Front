/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 09:13:31 Thu
 * @LastEditTime: 2022-02-10 20:21:32 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
let OrderModel = require('../model/orderModel');
let multer = require("multer");
let commonUtil = require("../util/commonUtil");
let fs = require('fs');
let sendEmail = require('../util/sendMail');

var router = express.Router();
let upload = multer({ dest: "/log" });

router.post("/insertOrder", async (req, resp) => {
  let data = req.body;
  let arr = await OrderModel.insertOrder(data);
  resp.send(arr.length > 0 ? "1" : "0");
});

router.get("/updateOrder", async (req, resp) => {
  let data = req.query;
  let arr = await OrderModel.updateOrder(data.temp);
  let addViews = await OrderModel.addViews(data.temp);
  console.log(addViews);
  resp.send(arr.length > 0 ? "1" : "0");
});

router.get("/queryALLSaledSeat", async (req, resp) => {
  let queryResult = await OrderModel.queryAllSaledSeat(req.query.temp);
  resp.send(JSON.stringify(queryResult));
})

router.get("/queryTodayBoxOffice", async (req, resp) => {
  let queryResult = await OrderModel.queryTodayBoxOffice();
  resp.send(JSON.stringify(queryResult));
})

module.exports = router;
