var express = require('express');
var router = express.Router();
let BookModel=require("../model/bookModel");
let bookModel=new BookModel();
let commonUtil=require("../util/commonUtil");
let multer=require("multer");
let upload=multer({dest:"/log"});
let fs=require("fs");

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
        let bookList=await bookModel.queryBook(nowPage,pageCount);
        let bookListLength=await bookModel.getBookListLength();
        lastPage=Math.ceil(bookListLength/pageCount);
        resp.send(JSON.stringify({lastPage,bookList}));
    })()
});

router.get("/deleteBook",(req,resp)=>{
    (async ()=>{
        let _id=parseInt(req.query._id);
        let objDel=await bookModel.deleteBook(_id);
        resp.send(objDel.deletedCount>0?"1":"0");
    })();
});

router.get("/deleteManyBook",(req,resp)=>{
    (async ()=>{
        let idArr=commonUtil.toIdArr(req.query.idArr);
        let objDel=await bookModel.deleteManyBook(idArr);
        resp.send(objDel.deletedCount>0?"1":"0");
    })();
});
router.post("/addBook",upload.array("bookImg"),(req,resp)=>{
    (async ()=>{
        let book=req.body;
        book.bookImg=commonUtil.upload01(req,"images/book");
        let addObj=await bookModel.addBook(book);
        resp.send(addObj.length>0?"1":"0");
    })();
});

router.get("/downLoad",(req,resp)=>{
    (async ()=>{
        let bookList= await bookModel.queryBook(nowPage,pageCount);
        let csvStr= commonUtil.jsonToCSV(JSON.parse(JSON.stringify(bookList)));
        let path="./public/file/book.csv";
        fs.writeFileSync(path,csvStr);
        resp.download(path);
    })();
});

router.post("/uploadBook",upload.array("bookFile"),(req,resp)=>{
    (async ()=>{
        let data=fs.readFileSync(req.files[0].path);
        let bookList=commonUtil.csvParse(data.toString());
        console.log(bookList);
        let addObj=await bookModel.addManyBook(bookList);
        resp.send(addObj.length>0?"1":"0");
    })();

})
module.exports = router;
