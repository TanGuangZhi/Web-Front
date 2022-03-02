/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:14:28 Thu
 * @LastEditTime: 2022-01-21 19:12:20 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let filmTypeSchema = dbUtil.mongoose.Schema({
    _id: Number,
    type: String,
});

let dbFilmTypeSchemaTable = dbUtil.mongoose.model("FilmType", filmTypeSchema, "filmType");

module.exports = dbFilmTypeSchemaTable;
