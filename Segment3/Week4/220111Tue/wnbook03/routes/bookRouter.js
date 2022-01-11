var express = require('express');
var router = express.Router();
let multer=require("multer");
let upload=multer({dest:"/log"});
let commonUtil=require("../util/commonUtil");
let BookModule=require("../module/bookMoudle");
let bookModule=new BookModule();

router.get("/queryBook",(req,resp)=>{
    resp.send(JSON.stringify(bookModule.queryBook()));
});

router.post("/addBook",upload.array("bookImg"),(req,resp)=>{
    let book=req.body;
    book.bookImg=commonUtil.upload01(req,"images/book");
    resp.send(bookModule.insertBook(book)==1?"1":"0");
});

router.get("/delBook",function (req,resp) {
    let id=parseInt(req.query.id);
    resp.send(bookModule.deleteBook(id)==1?"1":"0");
});
router.post("/updateBook",upload.array("bookImg"),(req,resp)=>{
    let book=req.body;
    book.bookImg=commonUtil.upload01(req,"images/book");
    resp.send(bookModule.updateBook(book)==1?"1":"0");
});
router.get("/deleteManyBook",(req,resp)=>{
    let idArr=req.query.idArr.split(",");
    resp.send(bookModule.deleteManyBook(idArr)==1?"1":"0");
})
module.exports = router;
