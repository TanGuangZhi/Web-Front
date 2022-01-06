/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-06 19:13:00 Thu
 * @LastEditTime: 2022-01-06 22:00:24 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
let GoodsDao = require("../module/GoodsDao");
let express = require("express")
let multer = require("multer");
let commonUtil = require("../util/commonUtil");
let fs = require("fs");

let goodsDao = new GoodsDao();
let goodsRouter = express.Router();
let upload = multer({ dest: "/log" });

goodsRouter.get('/queryBook', (req, res) => {
    return res.send(JSON.stringify(goodsDao.queryBook()));
})

goodsRouter.post("/insertBook", upload.array("bookImg"), (req, resp) => {
    let data = req.body;
    data.bookImg = commonUtil.upload01(req, "images/book");
    resp.send(goodsDao.insertBook(data) == 1 ? "1" : "0");
})

goodsRouter.post("/delBook", (req, resp) => {
    let idStr = req.body.idArray;//1,2,3
    let idArray = idStr.split(",");//["1","2","3"]
    return resp.send(goodsDao.delBook(idArray));
})

goodsRouter.post("/updateBook", upload.array("bookImg"), (req, resp) => {
    let data = req.body;
    data.bookImg = commonUtil.upload01(req, "images/book");
    return resp.send(goodsDao.updateBook(data));
})
module.exports = goodsRouter;
