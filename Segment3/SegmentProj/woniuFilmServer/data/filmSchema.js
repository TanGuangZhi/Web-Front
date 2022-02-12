/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:14:28 Thu
 * @LastEditTime: 2022-02-11 13:09:09 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let filmSchema = dbUtil.mongoose.Schema({
    _id: Number,
    name: String,
    price: String,
    typeId: Number,
    startTime: String,
    districtId: Number,
    img: String,
    timeCount: Number,
    director: String,
    details: String,
    wantSeeNum: Number,
    views: Number,
    rating: Number,
});

let dbFilmSchemaTable = dbUtil.mongoose.model("Film", filmSchema, "film");

module.exports = dbFilmSchemaTable;
