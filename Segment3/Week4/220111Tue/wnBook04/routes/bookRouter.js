/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-11 19:06:57 Tue
 * @LastEditTime: 2022-01-11 21:28:43 Tue
 * @LastEditors: TanGuangZhi
 * @Description: user mongoose to connect to the database
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
var router = express.Router();

let multer = require("multer");
let upload = multer({ dest: "/log" });
let commonUtil = require("../util/commonUtil");

let BookModel = require("../model/bookModel");
let bookModel = new BookModel();

/**
 * query --> json array
 * insert --> json array
 * delete -->deletedCount
 * update -->modifiedCount
 */
router.post("/queryBook", async (req, resp) => {
    let bookList = await bookModel.queryBook(req.body);
    resp.send(JSON.stringify(bookList));
});

router.post("/deleteBook", async (req, resp) => {
    let idStr = req.body.idArray;
    let idArray = idStr.split(",");
    let delObj = await bookModel.deleteBook(idArray);
    resp.send(delObj.deletedCount > 0 ? "1" : "0");
});

router.post("/addBook", upload.array("bookImg"), async (req, resp) => {
    let book = req.body;
    book.bookImg = commonUtil.upload01(req, "images/book");
    let arr = await bookModel.addBook(book);
    resp.send(arr.length > 0 ? "1" : "0");
});

router.post("/updateBook", upload.array("bookImg"), async (req, resp) => {
    let bookImg = commonUtil.upload01(req, "images/book");
    let book = req.body;
    //没有选择图片则使用原来的图片
    if (bookImg == null) { book.bookImg = book.oldImg };
    let updateObj = await bookModel.updateBook(book);
    resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});

module.exports = router;
