/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-06 14:13:33 Thu
 * @LastEditTime: 2022-01-06 14:28:58 Thu
 * @LastEditors: TanGuangZhi
 * @Description: router study and practice
 * @KeyWords: Kw
 */

let express = require("express");
// 1. create routes
let goodsRouter = express.Router();

// 2. add child routes
goodsRouter.get('/addGoods', (req, res) => {
    res.send("goods addGoods");
})

// 3. delete child routes
goodsRouter.get('/delGoods', (req, res) => {
    res.send("goods delGoods");
})

module.exports = goodsRouter;
