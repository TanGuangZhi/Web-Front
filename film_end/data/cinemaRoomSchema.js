/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:14:28 Thu
 * @LastEditTime: 2022-01-21 20:31:22 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let cinemaRoomSchema = dbUtil.mongoose.Schema({
    _id: Number,
    cinemaId: Number,
    roomId: Number,
    roomSize: String,
    session: String,
    filmId: Number,
    language: String,
    detailsPosition: String,
});

let dbCinemaRoomTable = dbUtil.mongoose.model("CinemaRoom", cinemaRoomSchema, "cinemaRoom");

module.exports = dbCinemaRoomTable;
