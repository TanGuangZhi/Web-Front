/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-07 19:55:36 Fri
 * @LastEditTime: 2022-01-08 09:48:47 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
var express = require('express');
var router = express.Router();
let multer = require("multer");
let upload = multer({ dest: "/log" });
let commonUtil = require("../util/commonUtil");
let BookModule = require("../module/bookMoudle");
let bookModule = new BookModule();

router.get("/queryBook", (req, resp) => {
    resp.send(JSON.stringify(bookModule.queryBook()));
});

router.post("/addBook", upload.array("bookImg"), (req, resp) => {
    let book = req.body;
    book.bookImg = commonUtil.upload01(req, "images/book");
    resp.send(bookModule.insertBook(book) == 1 ? "1" : "0");
})

router.post("/delBook", (req, resp) => {
    let idStr = req.body.idArray;//1,2,3
    let idArray = idStr.split(",");//["1","2","3"]
    return resp.send(bookModule.delBook(idArray));
})

router.post("/updateBook", upload.array("bookImg"), (req, resp) => {
    let data = req.body;
    data.bookImg = commonUtil.upload01(req, "images/book");
    return resp.send(bookModule.updateBook(data));
})

module.exports = router;
