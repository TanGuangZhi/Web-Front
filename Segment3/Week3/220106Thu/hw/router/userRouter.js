/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-06 19:12:49 Thu
 * @LastEditTime: 2022-01-06 21:17:11 Thu
 * @LastEditors: TanGuangZhi
 * @Description: deal request and response 
 * @KeyWords: Kw
 */
let UserDao = require("../module/userDao");
let express = require("express")
let multer = require("multer");
let commonUtil = require("../util/commonUtil");
let fs = require("fs");

let userDao = new UserDao();
let userRouter = express.Router();
let upload = multer({ dest: "/log" });

userRouter.get("/query", (req, resp) => {
    return resp.send(JSON.stringify(userDao.query()));
})

userRouter.post("/insert", (req, resp) => {
    let data = req.body;
    return resp.send(userDao.insert(data));
})

userRouter.post("/insertByBatch", upload.array("userFile"), (req, resp) => {
    let status = "0";
    //1.必须选择了文件，并且 必须是.csv文件
    if (req.files.length > 0 && req.files[0].originalname.endsWith(".csv")) {
        let data = fs.readFileSync(req.files[0].path);
        let userArr = commonUtil.csvParse(data.toString());//将csv文件中读取到的内容转成json对象数组
        if (userDao.insertByBatch(userArr) == 1) {
            status = "1";
        }
    }
    resp.send(status);
})
userRouter.post("/update", (req, resp) => {
    let data = req.body;
    console.log(data);
    return resp.send(userDao.update(data));

})
userRouter.post("/del", (req, resp) => {
    let idStr = req.body.idArray;//1,2,3
    let idArray = idStr.split(",");//["1","2","3"]
    return resp.send(userDao.del(idArray));
})

module.exports = userRouter;
