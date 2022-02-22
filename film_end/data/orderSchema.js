/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:14:28 Thu
 * @LastEditTime: 2022-01-25 12:10:30 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let orderSchema = dbUtil.mongoose.Schema({
    _id: Number,
    startTime: String,
    completeTime: String,
    price: Number,
    filmId: Number,
    filmCount: Number,
    roomId: Number,
    roomSeat: String,
    cinemaId: Number,
    orderId: Number,
    status: String,
    userId: Number,
});

let dbOrderTable = dbUtil.mongoose.model("Order", orderSchema, "order");

module.exports = dbOrderTable;
