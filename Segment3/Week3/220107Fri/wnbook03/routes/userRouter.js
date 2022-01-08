var express = require('express');
let UserModule = require("../module/userModule");
let commonUtil = require("../util/commonUtil");
let multer = require("multer");
let fs = require("fs");

var router = express.Router();
let upload = multer({ dest: "/log" });
let userModule = new UserModule();

let loginSuccess;
//1.登录功能
router.get("/login", (req, resp) => {
    let userName = req.query.userName;
    let userPass = req.query.userPass;
    let days = parseInt(req.query.days);
    let user = userModule.loginUser(userName);
    if (user != null && user.userPass == userPass) {//说明用户名存在  密码也存在
        resp.cookie("userName", userName, { maxAge: 1000 * 3600 * 24 * days, path: "/", domain: "localhost" });
        resp.cookie("userPass", userPass, { maxAge: 1000 * 3600 * 24 * days, path: "/", domain: "localhost" });
        resp.cookie("days", days, { maxAge: 1000 * 3600 * 24 * days, path: "/", domain: "localhost" });
        loginSuccess = true;
    }
    resp.redirect("/index.html");
});


router.get("/logout", (req, resp) => {
    if (req.cookies.userName) {
        resp.cookie("userName", "", { maxAge: 0, path: "/", domain: "localhost" });
        resp.cookie("userPass", "", { maxAge: 0, path: "/", domain: "localhost" });
        resp.cookie("days", "", { maxAge: 0, path: "/", domain: "localhost" });
        loginSuccess = false;
    }
    resp.redirect("/index.html");
});

router.get("/goToAdmin", (req, resp) => {
    if (loginSuccess) {
        resp.redirect("/public/admin.html");
    } else {
        resp.send("0");
    }
})

router.get("/register", (req, resp) => {
    let userName = req.query.userName;
    let userPass = req.query.userPass;
    let userPhone = req.query.userPhone;

    let user = {
        userName, userPass, userPhone
    }
    userModule.registerUser(user);
    resp.redirect("/index.html");
});

router.post("/query", (req, resp) => {
    let data = req.body;
    resp.send(JSON.stringify(userModule.queryUser(data)));
});

router.post("/insert", (req, resp) => {
    let data = req.body;
    resp.send(JSON.stringify(userModule.insertUser(data)));
})

// router.post("/insertByBatch", upload.array("userFile"), (req, resp) => {
//     let data = fs.readFileSync(req.files[0].path);
//     let userArr = commonUtil.csvParse(data.toString());//将csv文件中读取到的内容转成json对象数组
//     resp.send(JSON.stringify(userModule.insertUserByBatch(userArr)));
// })
router.post("/insertByBatch", upload.array("userFile"), (req, resp) => {
    let status = "0";
    //1.必须选择了文件，并且 必须是.csv文件
    if (req.files.length > 0 && req.files[0].originalname.endsWith(".csv")) {
        let data = fs.readFileSync(req.files[0].path);
        let userArr = commonUtil.csvParse(data.toString());//将csv文件中读取到的内容转成json对象数组
        if (userModule.insertUserByBatch(userArr) == 1) {
            status = "1";
        }
    }
    resp.send(status);
})

router.post("/del", (req, resp) => {
    let idStr = req.body.idArray;//1,2,3
    let idArray = idStr.split(",");//["1","2","3"]
    resp.send(JSON.stringify(userModule.deleteUser(idArray)));
})

router.post("/update", (req, resp) => {
    let data = req.body;
    resp.send(JSON.stringify(userModule.updateUser(data)));
})

router.get("/downloadData", (req, resp) => {
    // get data 
    let allQueryUser = userModule.queryUser();
    allQueryUser = commonUtil.jsonToCSV(allQueryUser);
    // writeData to file
    let fileName = "userData.csv";
    let writePath = __dirname + "/public/file/" + fileName;
    writePath = writePath.replace("routes/", "");
    fs.writeFile(writePath, allQueryUser, function (error) {
        if (error) {
            return console.error(error);
        }
        resp.download(writePath);
    });
    // response file addressStr
})
module.exports = router;
