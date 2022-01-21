/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:14:28 Thu
 * @LastEditTime: 2022-01-21 17:02:42 Fri
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
});

let dbFilmSchemaTable = dbUtil.mongoose.model("Film", filmSchema, "film");

module.exports = dbFilmSchemaTable;
