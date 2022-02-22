/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 17:53:30 Thu
 * @LastEditTime: 2022-01-20 17:57:57 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let cinemaDistrictSchema = dbUtil.mongoose.Schema({
    _id: Number,
    name: String,
});

let dbCinemaDistrictTable = dbUtil.mongoose.model("CinemaDistrict", cinemaDistrictSchema, "cinemaDistrict");

module.exports = dbCinemaDistrictTable;
