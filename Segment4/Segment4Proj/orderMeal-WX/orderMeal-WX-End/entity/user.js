/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 09:55:54 Tue
 * @LastEditTime: 2022-03-07 10:26:28 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
let dbUtil = require("../util/dbUtil");
let userSchema = dbUtil.mongoose.Schema({
   _id: Number,
   userName: String,
   userPass: String,
   userPhone: String,
   userType: Number,
   userStatus: Number,
   email: String,
   uuid: String
});

let dbUser = dbUtil.mongoose.model("User", userSchema, "user");
module.exports = dbUser;
