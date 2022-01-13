var express = require('express');
var router = express.Router();
let UserModel=require("../model/userModel");
let userModel=new UserModel();

router.get("/queryUser",(req,resp)=>{
    (async ()=>{
        let userList=await userModel.queryUser();
        resp.send(JSON.stringify(userList));
    })();
});

router.post("/addUser",(req,resp)=>{
    (async ()=>{
        let userArr=await userModel.addUser(req.body);
        resp.send(userArr.length>0?"1":"0");
    })();
});
module.exports = router;
