/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 17:53:30 Thu
 * @LastEditTime: 2022-02-08 20:43:47 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let cinemaBrandSchema = dbUtil.mongoose.Schema({
    _id: Number,
    name: String,
});

let dbCinemaBrandTable = dbUtil.mongoose.model("CinemaBrand", cinemaBrandSchema, "cinemaBrand");

module.exports = dbCinemaBrandTable;
