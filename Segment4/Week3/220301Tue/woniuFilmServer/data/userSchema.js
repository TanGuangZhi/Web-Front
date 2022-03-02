/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:14:28 Thu
 * @LastEditTime: 2022-01-22 14:18:15 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let userSchema = dbUtil.mongoose.Schema({
    _id: Number,
    name: String,
    password: String,
    phone: String,
    score: Number,
    type: Number,
    email: String,
    state: Number,
    avatar: String,
    uuid: String,
});

let dbUserTable = dbUtil.mongoose.model("User", userSchema, "user");

module.exports = dbUserTable;
