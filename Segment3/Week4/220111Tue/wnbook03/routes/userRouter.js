var express = require('express');
var router = express.Router();
let UserModule=require("../module/userModule");
let userModule=new UserModule();

//1.登录功能
router.get("/login",(req,resp)=>{
    let userName=req.query.userName;
    let userPass=req.query.userPass;
    let days=parseInt(req.query.days);
    let user=userModule.loginUser(userName);
    if(user!=null&&user.userPass==userPass){//说明用户名存在  密码也存在
        resp.cookie("userName",userName,{maxAge:1000*3600*24*days,path:"/",domain:"localhost"});
        resp.cookie("userPass",userPass,{maxAge:1000*3600*24*days,path:"/",domain:"localhost"});
        resp.cookie("days",days,{maxAge:1000*3600*24*days,path:"/",domain:"localhost"});
    }
    resp.redirect("/index.html");
});
router.get("/logout",(req,resp)=>{
   if(req.cookies.userName){
       resp.cookie("userName","",{maxAge:0,path:"/",domain:"localhost"});
       resp.cookie("userPass","",{maxAge:0,path:"/",domain:"localhost"});
       resp.cookie("days","",{maxAge:0,path:"/",domain:"localhost"});
   }
    resp.redirect("/index.html");
});
module.exports = router;
