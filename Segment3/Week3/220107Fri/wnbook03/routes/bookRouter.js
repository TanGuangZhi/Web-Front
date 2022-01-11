/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-07 19:55:36 Fri
 * @LastEditTime: 2022-01-11 17:19:36 Tue
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

router.get("/queryBook", async (req, resp) => {
    resp.send(JSON.stringify(await bookModule.queryBook()));
});

router.post("/addBook", upload.array("bookImg"), async (req, resp) => {
    let book = req.body;
    book.bookImg = commonUtil.upload01(req, "images/book");
    resp.send(await bookModule.insertBook(book));
})

router.post("/delBook", async (req, resp) => {
    let idStr = req.body.idArray;//1,2,3
    let idArray = idStr.split(",");//["1","2","3"]
    return resp.send(await bookModule.delBook(idArray));
})

router.post("/updateBook", upload.array("bookImg"), async (req, resp) => {
    let data = req.body;
    data.bookImg = commonUtil.upload01(req, "images/book");
    return resp.send(await bookModule.updateBook(data));
})

module.exports = router;
