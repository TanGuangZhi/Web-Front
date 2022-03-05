/*
 * @Author: TanGuangZhi
 * @Date: 2022-03-04 14:43:21 Fri
 * @LastEditTime: 2022-03-04 14:44:23 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
let dbUtil = require("../util/dbUtil");
let foodSchema = dbUtil.mongoose.Schema({
   _id: Number,
   foodName: String,
   foodType: String,
   foodTag: String,
   foodImg: String,
});

let dbFood = dbUtil.mongoose.model("Food", foodSchema, "food");
module.exports = dbFood;
