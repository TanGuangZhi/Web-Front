let express=require("express");
let userRouter=express.Router();
let UserModule=require("../module/userMoudle");
let userModule=new UserModule();


module.exports=userRouter;
