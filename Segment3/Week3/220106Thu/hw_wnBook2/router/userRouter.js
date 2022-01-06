/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-06 17:57:54 Thu
 * @LastEditTime: 2022-01-06 20:12:22 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
let express = require("express")
let userRouter = express.Router();
let UserModule = require("../module/userModule");
let userModule = new UserModule();

let multer = require("multer");
let upload = multer({ dest: "/log" });
let commonUtil = require("../util/commonUtil");
let fs = require("fs");

userRouter.get("/queryUser", (req, resp) => {
    resp.send(JSON.stringify(userModule.queryUser()));
});

userRouter.post("/insertUser", (req, resp) => {
    let user = req.body;
    resp.send(userModule.insertUser(user) == 1 ? "1" : "0");
});

userRouter.get("/deleteManyUser", (req, resp) => {
    let idStr = req.query.idArray;//1,2,3
    let idArray = idStr.split(",");//["1","2","3"]
    resp.send(userModule.deleteManyUser(idArray) == 1 ? "1" : "0");
});

userRouter.post("/insertManyUser", upload.array("userFile"), (req, resp) => {
    let status = "0";
    //1.必须选择了文件，并且 必须是.csv文件
    if (req.files.length > 0 && req.files[0].originalname.endsWith(".csv")) {
        let data = fs.readFileSync(req.files[0].path);
        let userArr = commonUtil.csvParse(data.toString());//将csv文件中读取到的内容转成json对象数组
        if (userModule.insertManyUser(userArr) == 1) {
            status = "1";
        }
    }
    resp.send(status);
});

userRouter.get("/downUser", (req, resp) => {
    let userList = userModule.queryUser();
    //1.将json对象数组转成csv格式的数据
    let dataCSV = commonUtil.jsonToCSV(userList);
    //2.定义服务器的文件路径
    let serverPath = "./public/file/user.csv";
    fs.writeFileSync(serverPath, dataCSV);

    resp.download(serverPath);//响应至客户端下载
});
module.exports = userRouter;
