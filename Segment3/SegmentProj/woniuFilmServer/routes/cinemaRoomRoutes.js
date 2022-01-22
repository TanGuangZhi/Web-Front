/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:27:44 Thu
 * @LastEditTime: 2022-01-22 10:33:28 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let express = require('express');
let multer = require("multer");
let CinemaRoomModel = require('../model/cinemaRoomModel.js');
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
    let queryResult = await CinemaRoomModel.query(nowPage, req.body.pageCount, req.body);
    let cinemaCount = await CinemaRoomModel.getCount(req.body);
    lastPage = Math.ceil(cinemaCount / req.body.pageCount);
    res.send(JSON.stringify({ queryResult, lastPage }));
});

router.get('/queryCinema', async (req, res, next) => {
    let queryResult = await CinemaRoomModel.queryCinema();
    res.send(JSON.stringify(queryResult));
})

router.get('/queryRoomLevel', async (req, res, next) => {
    let queryResult = await CinemaRoomModel.queryRoomLevel();
    res.send(JSON.stringify(queryResult));
})

router.get('/queryFilm', async (req, res, next) => {
    let queryResult = await CinemaRoomModel.queryFilm();
    res.send(JSON.stringify(queryResult));
})

router.post("/delete", async (req, resp) => {
    let idStr = req.body.idArray;
    let idArray = idStr.split(",");
    let delObj = await CinemaRoomModel.delete(idArray);
    resp.send(delObj.deletedCount > 0 ? "1" : "0");
});

router.post("/insert", async (req, resp) => {
    let cinema = req.body;
    let arr = await CinemaRoomModel.insert([cinema]);
    resp.send(arr.length > 0 ? "1" : "0");
});

router.post("/update", upload.array("cinemaImg"), async (req, resp) => {
    let cinema = req.body;
    cinema.img = commonUtil.upload01(req, "images/cinema");
    //没有选择图片则使用原来的图片
    if (!cinema.img) { cinema.img = cinema.oldImg }
    delete cinema.oldImg;
    let updateObj = await CinemaRoomModel.update(cinema);
    resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});

router.get("/downloadFile", async (req, resp) => {
    let queryResult = await CinemaRoomModel.query(nowPage, 6, {});
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
    let arr = await CinemaRoomModel.add(cinemaList);
    resp.send(arr.length > 0 ? "1" : "0");
})
module.exports = router;
