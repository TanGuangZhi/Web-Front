var express = require('express');
var router = express.Router();
let multer=require("multer");
let upload=multer({dest:"/log"});
let commonUtil=require("../util/commonUtil");

let BookModule=require("../model/bookModel");
let bookModule=new BookModule();

//增json数组  删 json对象(deletedCount) 改(modifiedCount)查 (json对象数组)
//1.查询操作
let nowPage=1;
let pageCount=6;
let lastPage=-1;
router.get("/queryBook",(req,resp)=>{
    (async ()=>{
        let temp=parseInt(req.query.nowPage);
        if(temp<0){
            if(temp==-1&&nowPage>1){
                nowPage--;
            }
            if(temp==-2&&nowPage<lastPage){
                nowPage++;
            }
        }else{
            nowPage=temp;
        }
        //1.获取分页数据的结果集
        let bookList=await bookModule.queryBook(nowPage,pageCount,req.query);
        //2.获得总的数据条数
        let bookLength=await bookModule.getBookLength(req.query);
        //3.计算页码总数
        lastPage=Math.ceil(bookLength/pageCount);
        resp.send(JSON.stringify({bookList,lastPage}));
    })();
});

router.get("/deleteBook",(req,resp)=>{
    (async ()=>{
        let delObj=await bookModule.deleteBook(req.query._id);
        resp.send(delObj.deletedCount>0?"1":"0");
    })();
});
router.post("/addBook",upload.array("bookImg"),(req,resp)=>{
    (async ()=>{
        let book=req.body;
        book.bookImg=commonUtil.upload01(req,"images/book");
        let arr=await bookModule.addBook(book);
        resp.send(arr.length>0?"1":"0");
    })();
});
router.post("/updateBook",upload.array("bookImg"),(req,resp)=>{
    (async ()=>{
        let bookImg =commonUtil.upload01(req,"images/book");
        let book=req.body;
        if(bookImg==null){//没有选择图片则使用原来的图片
            book.bookImg=book.oldImg;
        }
        let updateObj=await bookModule.updateBook(book);
        resp.send(updateObj.modifiedCount>0?"1":"0");
    })();
});

module.exports = router;
