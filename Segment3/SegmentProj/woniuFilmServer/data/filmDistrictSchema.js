/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:14:28 Thu
 * @LastEditTime: 2022-01-21 19:30:51 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let filmDistrictSchema = dbUtil.mongoose.Schema({
    _id: Number,
    type: String,
});

let dbFilmDistrictSchemaTable = dbUtil.mongoose.model("FilmDistrict", filmDistrictSchema, "filmDistrict");

module.exports = dbFilmDistrictSchemaTable;
