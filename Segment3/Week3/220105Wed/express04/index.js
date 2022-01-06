/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-05 12:57:53 Wed
 * @LastEditTime: 2022-01-05 17:13:52 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
//1.引入express模板
let express = require('express');
let fs = require("fs");
//2.调用express功能
let app = express();
//3.创建一个服务器
let server = app.listen(3001, () => {
    console.log("服务器成功开启");
});
//加载处理post表单的第三方插件
let bodyParser = require("body-parser");
//配置插件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let multer = require("multer");
// set upload file store in 指定的路径 
app.use(multer({ dest: "/" }).array("userImg"));

//4.将静态资源部署到服务器内部
app.use("/", express.static("public"));

//5..创建登录的路由
app.get("/login", (req, resp) => {
    let userName = req.query.userName;
    let userPass = req.query.userPass;
});

//6.注册的功能
//req.files[0].path:获取到上传文件的路径
//req.files[0].originalname 获得上传文件的名字
app.post("/addUser", (req, resp) => {
    fs.readFile(req.files[0].path, function (error, data) {
        if (error) {
            return console.error(error);
        }
        let fileName = Date.now() + req.files[0].originalname;//防止上传文件重复
        let upPath = __dirname + "/public/images/" + fileName;
        fs.writeFile(upPath, data, function (error) {
            if (error) {
                return console.error(error);
            }
            console.log("上传成功");
        })
    });
    let userName = req.body.userName;
    let userPass = req.body.userPass;
    let sex = req.body.sex;
    let hobby = req.body.hobby;

    console.log(userName, userPass, sex, hobby);
});
