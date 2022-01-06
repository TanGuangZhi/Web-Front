let express=require("express");
let bookRouter=express.Router();
let BookModule=require("../module/bookMoudle");
let bookModule=new BookModule();



module.exports=bookRouter;