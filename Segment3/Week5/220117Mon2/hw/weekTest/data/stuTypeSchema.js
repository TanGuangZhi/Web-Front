/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-15 10:57:08 Sat
 * @LastEditTime: 2022-01-15 11:01:48 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let stuTypeSchema = dbUtil.mongoose.Schema({
    _id: Number,
    name: String,
});

let dbStuTypeTable = dbUtil.mongoose.model("StuType", stuTypeSchema, "stuType");

module.exports = dbStuTypeTable;
