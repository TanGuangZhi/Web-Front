//1.引入express模板
let express=require("express");
//2.调用express功能
let app=express();
//3.创建一个服务器
let server=app.listen(3000,()=>{
    console.log("服务器成功开启");
});
//加载处理post表单的第三方插件
let bodyParser=require("body-parser");
//配置插件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//4.将静态资源部署到服务器内部
app.use("/",express.static("public"));

//5..创建登录的路由
app.get("/login",(req,resp)=>{
   let userName=req.query.userName;
   let userPass=req.query.userPass;
   console.log(userName,userPass);
});

//6.注册的功能
app.post("/addUser",(req,resp)=>{
    let userName=req.body.userName;
    console.log(userName);
});
