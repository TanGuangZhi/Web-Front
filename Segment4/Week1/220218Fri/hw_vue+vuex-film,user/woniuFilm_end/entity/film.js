/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 09:55:54 Tue
 * @LastEditTime: 2022-02-24 19:33:09 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
let dbUtil = require("../util/dbUtil");
let filmSchema = dbUtil.mongoose.Schema({
   _id: Number,
   filmName: String,
   filmPrice: Number,
   filmType: String,
   filmImg: String,
   filmScore: Number,
   boxOffice: Number
});
let dbFilm = dbUtil.mongoose.model("Film", filmSchema, "film");
module.exports = dbFilm;
