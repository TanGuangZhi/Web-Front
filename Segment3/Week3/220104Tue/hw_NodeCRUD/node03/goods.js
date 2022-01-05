/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-04 19:20:37 Tue
 * @LastEditTime: 2022-01-04 20:24:24 Tue
 * @LastEditors: TanGuangZhi
 * @Description: user nodejs to complete user and goods CRUD
 * @KeyWords: Kw
 */

let GoodsModule = require("./module/GoodsModule");
let goods = new GoodsModule();


goods.addGoods({ goodsName: "hhh" });

goods.delGoods([1, 3]);

goods.changeGoods({ id: 5, goodsName: "tttt" });

goods.queryGoods();