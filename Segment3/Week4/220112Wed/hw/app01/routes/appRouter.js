/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-12 19:13:35 Wed
 * @LastEditTime: 2022-01-13 09:52:44 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
var router = express.Router();

let multer = require("multer");
let commonUtil = require("../util/commonUtil");
let AppModel = require("../model/appModel");

let upload = multer({ dest: "/log" });
let appModel = new AppModel();

let nowPage = 1;
let pageCount = 6;
let lastPage = -1;
router.get("/queryType", (req, resp) => {
    (async () => {
        let typeList = await appModel.queryAppType();
        resp.send(JSON.stringify(typeList));
    })();
});

router.get("/queryPlatform", (req, resp) => {
    (async () => {
        let platformList = await appModel.queryAppPlatform();
        resp.send(JSON.stringify(platformList));
    })();
});

router.post("/queryApp", (req, resp) => {
    (async () => {
        let temp = parseInt(req.body.nowPage);
        if (temp < 0) {
            if (temp == -1 && nowPage > 1) {
                nowPage--;
            }
            if (temp == -2 && nowPage < lastPage) {
                nowPage++;
            }
        } else {
            nowPage = temp;
        }
        let appList = await appModel.queryApp(nowPage, req.body.pageCount, req.body);
        let appCount = await appModel.getAppCount(req.body);
        lastPage = Math.ceil(appCount / req.body.pageCount);
        resp.send(JSON.stringify({ appList, lastPage }));
    })();
});

router.post("/deleteApp", async (req, resp) => {
    let idStr = req.body.idArray;
    let idArray = idStr.split(",");
    let delObj = await appModel.deleteApp(idArray);
    resp.send(delObj.deletedCount > 0 ? "1" : "0");
});

router.post("/addApp", upload.array("appImg"), async (req, resp) => {
    let app = req.body;
    app.appImg = commonUtil.upload01(req, "images/app");
    let arr = await appModel.addApp(app);
    resp.send(arr.length > 0 ? "1" : "0");
});

router.post("/updateApp", upload.array("appImg"), async (req, resp) => {
    let app = req.body;
    app.appImg = commonUtil.upload01(req, "images/app");
    //没有选择图片则使用原来的图片
    if (!app.appImg) { app.appImg = app.oldImg }
    delete app.oldImg;

    let updateObj = await appModel.updateApp(app);
    resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});


module.exports = router;
