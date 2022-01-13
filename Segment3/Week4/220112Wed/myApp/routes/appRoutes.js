/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-12 15:37:07 Wed
 * @LastEditTime: 2022-01-12 16:09:09 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
var router = express.Router();

let AppModel = require('../model/appModel');
let appModel = new AppModel();

router.get('/queryApp', async (req, res) => {
  let queryResult = await appModel.queryApp();
  res.send(JSON.stringify(queryResult));
})

router.get('/queryAppType', async (req, res) => {
  let queryResult = await appModel.queryAppType();
  res.send(JSON.stringify(queryResult));
})

router.get('/queryAppPlatform', async (req, res) => {
  let queryResult = await appModel.queryAppPlatform();
  console.log(queryResult);
  res.send(JSON.stringify(queryResult));
})



module.exports = router;
