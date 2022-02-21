/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:40 Fri
 * @LastEditTime: 2022-02-18 19:19:55 Fri
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
    let filmList = await filmModel.queryFilm();
    resp.send(JSON.stringify(filmList));
});

router.post("/insertFilm", upload.array("filmImg"), async (req, resp) => {
    let film = req.body;
    film.filmImg = commonUtil.upload01(req, "images/film");
    let addList = await filmModel.addFilm(film);
    resp.send(addList.length > 0 ? "1" : "0");
});

router.get("/deleteFilm", async (req, resp) => {
    let deleteObj = await filmModel.deleteFilm(req.query._id);
    resp.send(deleteObj.deletedCount > 0 ? "1" : "0");
});

router.post("/updateFilm", upload.array("filmImg"), async (req, resp) => {
    let film = req.body;
    film.filmImg = film.oldFilmImg;
    let filmImg = commonUtil.upload01(req, "images/film");
    if (filmImg) {
        film.filmImg = filmImg;
    }
    console.log(film);
    let modifyObj = await filmModel.updateFilm(film);
    resp.send(modifyObj.modifiedCount > 0 ? "1" : "0");

});
module.exports = router;
