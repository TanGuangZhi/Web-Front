/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:27:44 Thu
 * @LastEditTime: 2022-02-11 12:01:39 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let express = require('express');
let multer = require("multer");
let CinemaModel = require('../model/cinemaModel.js');
let commonUtil = require("../util/commonUtil");
let fs = require('fs');

let upload = multer({ dest: "/log" });
let router = express.Router();

let nowPage = 1;
let lastPage = -1;

router.post('/query', async (req, res, next) => {
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
    let queryResult = await CinemaModel.query(nowPage, req.body.pageCount, req.body);
    let cinemaCount = await CinemaModel.getCount(req.body);
    lastPage = Math.ceil(cinemaCount / req.body.pageCount);
    res.send(JSON.stringify({ queryResult, lastPage }));
});

router.get('/queryCinemaDetail', async (req, res, next) => {
    let queryResult = await CinemaModel.queryCinemaDetail(req.query);
    res.send(JSON.stringify(queryResult));
})

router.get('/getCinemaIdByName', async (req, res, next) => {
    let queryResult = await CinemaModel.getCinemaIdByName(req.query.name);
    res.send(JSON.stringify(queryResult));
})

router.get('/queryDistrict', async (req, res, next) => {
    let queryResult = await CinemaModel.queryDistrict();
    res.send(JSON.stringify(queryResult));
})

router.post("/delete", async (req, resp) => {
    let idStr = req.body.idArray;
    let idArray = idStr.split(",");
    let delObj = await CinemaModel.delete(idArray);
    resp.send(delObj.deletedCount > 0 ? "1" : "0");
});

router.post("/insert", upload.array("cinemaImg"), async (req, resp) => {
    let cinema = req.body;
    cinema.img = commonUtil.upload01(req, "images/cinema");
    let arr = await CinemaModel.insert([cinema]);
    resp.send(arr.length > 0 ? "1" : "0");
});

router.post("/update", upload.array("cinemaImg"), async (req, resp) => {
    let cinema = req.body;
    cinema.img = commonUtil.upload01(req, "images/cinema");
    //没有选择图片则使用原来的图片
    if (!cinema.img) { cinema.img = cinema.oldImg }
    delete cinema.oldImg;
    let updateObj = await CinemaModel.update(cinema);
    resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});

router.get("/downloadFile", async (req, resp) => {
    let queryResult = await CinemaModel.query(nowPage, 6, {});
    let csvData = commonUtil.jsonToCSV(JSON.parse(JSON.stringify(queryResult)));
    let path = "./public/file/app.csv";
    fs.writeFileSync(path, csvData);
    resp.download(path);
});

router.post("/uploadFile", upload.array("uploadFile"), async (req, resp) => {
    // 1. get temp path
    // 2. read file
    let data = fs.readFileSync(req.files[0].path);

    // 3. data to json
    let cinemaList = commonUtil.csvParse(data.toString());

    // 4. write data to db
    let arr = await CinemaModel.insert(cinemaList);
    resp.send(arr.length > 0 ? "1" : "0");
})
module.exports = router;
