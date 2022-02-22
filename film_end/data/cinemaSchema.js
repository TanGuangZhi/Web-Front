/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:14:28 Thu
 * @LastEditTime: 2022-01-20 17:57:19 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let cinemaSchema = dbUtil.mongoose.Schema({
    _id: Number,
    name: String,
    address: String,
    img: String,
    phone: Number,
    districtId: Number
});

let dbCinemaTable = dbUtil.mongoose.model("Cinema", cinemaSchema, "cinema");

module.exports = dbCinemaTable;
