/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 09:13:31 Thu
 * @LastEditTime: 2022-02-09 21:25:46 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
let multer = require("multer");
let CommentModel = require('../model/commentModel.js');

var router = express.Router();

router.get("/queryComment", async (req, resp) => {
  let filmId = req.query.filmId[0];
  let queryResult = await CommentModel.queryComment(filmId - 0);
  resp.send(JSON.stringify(queryResult));
});

router.get("/insertComment", async (req, resp) => {
  let data = req.query.data;
  let arr = await CommentModel.insertComment(data);
  resp.send(arr.length > 0 ? "1" : "0");
});

module.exports = router;
