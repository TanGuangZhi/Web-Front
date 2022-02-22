/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-13 12:21:04 Thu
 * @LastEditTime: 2022-01-20 15:18:29 Thu
 * @LastEditors: TanGuangZhi
 * @Description: separate data from util
 * @KeyWords: NodeJs, Express, MongoDB
 */
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/filmdb");
class DBUtil {
    static mongoose = mongoose;
    static dbSequence = DBUtil.getCollection("Sequence", {
        _id: String,
        sequenceValue: Number
    }, "sequence");

    static getCollection(modelName, modelData, collectionName) {
        let objSchema = mongoose.Schema(modelData);
        let dbCollection = mongoose.model(modelName, objSchema, collectionName);
        return dbCollection;
    }
}
module.exports = DBUtil;
