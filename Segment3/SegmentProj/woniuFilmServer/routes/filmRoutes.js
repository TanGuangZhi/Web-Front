/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:27:44 Thu
 * @LastEditTime: 2022-02-11 12:04:52 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let express = require('express');
let multer = require("multer");
let FilmModel = require('../model/filmModel.js');
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
        if (temp) {
            nowPage = temp;
        }
    }
    let queryResult = await FilmModel.query(nowPage, req.body.pageCount, req.body);
    let filmCount = await FilmModel.getCount(req.body);
    lastPage = Math.ceil(filmCount / req.body.pageCount);
    res.send(JSON.stringify({ queryResult, lastPage }));
});

router.get('/queryWantSeeNum', async (req, res, next) => {
    let queryResult = await FilmModel.queryWantSeeNum();
    queryResult.forEach(async element => {
        element = JSON.parse(JSON.stringify(element));
        if (element.wantSeeNum == 0 || !element.wantSeeNum) {
            let updateObj = await FilmModel.updateTemp(element);
            console.log(updateObj);
        }
    });
    res.send(JSON.stringify(queryResult));
})

router.get('/getFilmIdByName', async (req, res, next) => {
    let queryResult = await FilmModel.getFilmIdByName(req.query.name);
    res.send(JSON.stringify(queryResult));
})

router.get('/getFilmIdByName', async (req, res, next) => {
    let queryResult = await FilmModel.getFilmIdByName(req.query.name);
    res.send(JSON.stringify(queryResult));
})

router.get('/wantSeeAdd', async (req, res, next) => {
    let queryResult = await FilmModel.wantSeeAdd(req.query.filmId);
    res.send(JSON.stringify(queryResult));
})

router.get('/queryType', async (req, res, next) => {
    let queryResult = await FilmModel.queryType();
    res.send(JSON.stringify(queryResult));
})

router.get('/queryDistrict', async (req, res, next) => {
    let queryResult = await FilmModel.queryDistrict();
    res.send(JSON.stringify(queryResult));
})

router.get('/queryFilmDetail', async (req, res, next) => {
    let queryResult = await FilmModel.queryFilmDetail(req.query._id);
    res.send(JSON.stringify(queryResult));
})

router.get("/queryHotFilm", async (req, resp) => {
    let nowTime = new Date();
    let beforeTime = new Date();
    beforeTime.setDate(beforeTime.getDate() - 360);
    console.log(getTimeString(nowTime), getTimeString(beforeTime));
    let filmList = await FilmModel.queryHotPlayerFilm(getTimeString(nowTime), getTimeString(beforeTime));
    resp.send(JSON.stringify(filmList));
});

router.get("/queryAfterFilm", (req, resp) => {
    (async () => {
        let nowTime = new Date();
        let filmList = await FilmModel.queryAfterPlayerFilm(getTimeString(nowTime));
        resp.send(JSON.stringify(filmList));
    })();
});

function getTimeString(date) {
    let dateStr = date.toLocaleDateString();
    while (true) {
        dateStr = dateStr.replace("/", "-");
        if (dateStr.indexOf("/") == -1) {
            break;
        }
    }
    let dateArr = dateStr.split("-");
    for (let i = 0; i < dateArr.length; i++) {
        if (dateArr[i].length == 1) {
            dateArr[i] = "0" + dateArr[i];
        }
    }
    dateStr = dateArr.join("-");
    return dateStr + " 00:00";
}
router.post("/delete", async (req, resp) => {
    let idStr = req.body.idArray;
    let idArray = idStr.split(",");
    let delObj = await FilmModel.delete(idArray);
    resp.send(delObj.deletedCount > 0 ? "1" : "0");
});

router.post("/insert", upload.array("filmImg"), async (req, resp) => {
    let film = req.body;
    film.img = commonUtil.upload01(req, "images/film");
    let arr = await FilmModel.insert([film]);
    resp.send(arr.length > 0 ? "1" : "0");
});

router.post("/update", upload.array("filmImg"), async (req, resp) => {
    let film = req.body;
    film.img = commonUtil.upload01(req, "images/film");
    //没有选择图片则使用原来的图片
    if (!film.img) { film.img = film.oldImg }
    delete film.oldImg;
    let updateObj = await FilmModel.update(film);
    resp.send(updateObj.modifiedCount > 0 ? "1" : "0");
});

router.get("/downloadFile", async (req, resp) => {
    let queryResult = await FilmModel.query(nowPage, 6, {});
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
    let filmList = commonUtil.csvParse(data.toString());

    // 4. write data to db
    let arr = await FilmModel.insert(filmList);
    resp.send(arr.length > 0 ? "1" : "0");
})
module.exports = router;
