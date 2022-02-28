/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:40 Fri
 * @LastEditTime: 2022-02-24 20:20:36 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
var express = require('express');
var router = express.Router();
let FilmModel = require("../model/filmModel");
let filmModel = new FilmModel();

let multer = require("multer");
let upload = multer({ dest: "/" });
let commonUtil = require("../util/commonUtil");

router.get("/queryFilm", async (req, resp) => {
    let filmList = await filmModel.queryFilm(req.query);
    resp.send(JSON.stringify(filmList));
});

router.get("/queryFilmType", async (req, resp) => {
    let filmList = await filmModel.queryFilmType();
    resp.send(JSON.stringify(filmList));
});

router.post("/insertFilm", upload.array("filmImg"), async (req, resp) => {
    let film = req.body.film;
    film.boxOffice = (Math.random() * 15).toFixed(2);
    let insertList = await filmModel.insertFilm(film);
    resp.send(insertList.length > 0 ? "1" : "0");
});

router.get("/deleteFilm", async (req, resp) => {
    let deleteObj = await filmModel.deleteFilm(req.query._id);
    resp.send(deleteObj.deletedCount > 0 ? "1" : "0");
});

router.post("/updateFilm", upload.array("filmImg"), async (req, resp) => {
    let film = req.body.film;
    let judgeIsUserNameExist = await filmModel.judgeIsFilmNameExist(film);
    if (judgeIsUserNameExist.length > 0) {
        resp.send(JSON.stringify("filmNameAlreadyExist"));
        return;
    }
    let modifyObj = await filmModel.updateFilm(film);
    resp.send(modifyObj.modifiedCount > 0 ? "1" : "0");
});

router.post("/uploadImg", upload.array("filmImg"), async (req, resp) => {
    let filmImg = commonUtil.upload01(req, "images/film");
    resp.send(JSON.stringify(filmImg));
});
module.exports = router;
