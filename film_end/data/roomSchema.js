/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 17:53:30 Thu
 * @LastEditTime: 2022-01-22 10:48:17 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let roomSchema = dbUtil.mongoose.Schema({
    _id: Number,
    name: String,
    level: Number,
});

let dbRoomTable = dbUtil.mongoose.model("Room", roomSchema, "room");

module.exports = dbRoomTable;
