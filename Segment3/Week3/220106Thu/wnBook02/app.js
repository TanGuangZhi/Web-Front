let express=require("express");
let bodyParser=require("body-parser");

//1.引入路由模块
let userRouter=require("./router/userRouter");
let bookRouter=require("./router/bookRouter");
let app=express();

//2.设置插件 (在路由加载之前先设置插件)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//3.添加静态资源
app.use("/",express.static("public"));
//4.添加路由
app.use("/",userRouter);
app.use("/",bookRouter);


let server=app.listen(3000,()=>{
    console.log("服务器已经开启，正在监听"+server.address().port+"端口号")
});