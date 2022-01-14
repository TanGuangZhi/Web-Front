/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-13 11:20:44 Thu
 * @LastEditTime: 2022-01-13 15:09:28 Thu
 * @LastEditors: TanGuangZhi
 * @Description: to connect the model and deal data send and response
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
let UserModel = require('../model/userModel');

var router = express.Router();
let userModel = new UserModel();

/* GET users listing. */
router.get('/queryStu', async (req, res, next) => {
  res.send(JSON.stringify(await userModel.queryStu()));
});

router.post('/login', async (req, res, next) => {
  let loginUserInfo = await userModel.login(req.body)
  res.send(JSON.stringify(loginUserInfo));
});

module.exports = router;
