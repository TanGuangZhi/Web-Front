/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-06 14:13:33 Thu
 * @LastEditTime: 2022-01-06 15:32:15 Thu
 * @LastEditors: TanGuangZhi
 * @Description: router study and practice
 * @KeyWords: Kw
 */

let express = require("express");
// 1. create routes
let userRouter = express.Router();

// 2. add child routes
userRouter.get('/addUser', (req, res) => {
    res.send("user addUser");
})

// 3. delete child routes
userRouter.get('/delUser', (req, res) => {
    res.send("user deUser");
})

module.exports = userRouter;
