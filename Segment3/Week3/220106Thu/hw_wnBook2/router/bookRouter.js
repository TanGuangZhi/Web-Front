let express=require("express");
let bookRouter=express.Router();
let BookModule=require("../module/bookMoudle");
let bookModule=new BookModule();
let multer=require("multer");
let upload=multer({dest:"/log"});
let commonUtil=require("../util/commonUtil");

bookRouter.get("/queryBook",(req,resp)=>{
    resp.send(JSON.stringify(bookModule.queryBook()));
});

bookRouter.post("/insertBook",upload.array("bookImg"),(req,resp)=>{
    let book=req.body;
    book.bookImg=commonUtil.upload01(req,"images/book");
    resp.send(bookModule.insertBook(book)==1?"1":"0");
});
module.exports=bookRouter;