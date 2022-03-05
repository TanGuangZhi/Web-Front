/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 09:55:54 Tue
 * @LastEditTime: 2022-03-04 14:37:47 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/orderMealDb");
class DBUtil {
    static mongoose = mongoose;//将mongoose对象共享出来
    static dbSequence = mongoose.model("Sequence", mongoose.Schema({
        _id: String,
        sequenceValue: Number
    }), "sequence");
}
module.exports = DBUtil;
