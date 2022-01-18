/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-15 16:43:52 Sat
 * @LastEditTime: 2022-01-15 16:46:06 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let userSchema = dbUtil.mongoose.Schema({
    _id: Number,
    userName: String,
    userPass: String,
    userPhone: String,
    userScore: Number
});

let dbUserTable = dbUtil.mongoose.model("User", userSchema, "user");

module.exports = dbUserTable;
