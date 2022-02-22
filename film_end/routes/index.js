/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 09:13:31 Thu
 * @LastEditTime: 2022-02-21 21:07:04 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
var express = require('express');
var app = express();
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config() // dotenv提供了 config 函数，用于加载配置，别名 load

router.get('/', function (req, res, next) {
  console.log('MY_VARIABLE', process.env.NODE_ENV)
  res.send("1111");
  // res.render('index', { title: 'Express' });
});

module.exports = router;
