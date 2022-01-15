/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-15 10:19:44 Sat
 * @LastEditTime: 2022-01-15 11:21:49 Sat
 * @LastEditors: TanGuangZhi
 * @Description: separate data from util.js
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let stuSchema = dbUtil.mongoose.Schema({
    _id: Number,
    stuName: String,
    stuType: Number,
    stuImg: String,
    stuSalary: Number,
    stuTime: String,
});

let dbStuTable = dbUtil.mongoose.model("Student", stuSchema, "student");

module.exports = dbStuTable;
