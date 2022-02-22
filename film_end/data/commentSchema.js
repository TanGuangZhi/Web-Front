/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 15:14:28 Thu
 * @LastEditTime: 2022-02-09 20:32:25 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
let dbUtil = require("../util/dbUtil");
let commentSchema = dbUtil.mongoose.Schema({
    _id: Number,
    time: String,
    filmId: Number,
    commentContent: String,
    score: Number,
    userId: Number,
    orderId: Number,
});

let dbCommentTable = dbUtil.mongoose.model("Comment", commentSchema, "comment");

module.exports = dbCommentTable;
