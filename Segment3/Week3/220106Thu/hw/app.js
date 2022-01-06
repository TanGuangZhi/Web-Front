/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-06 19:07:21 Thu
 * @LastEditTime: 2022-01-06 21:33:48 Thu
 * @LastEditors: TanGuangZhi
 * @Description: entrance
 * @KeyWords: Kw
 */

let express = require("express");
let bodyParser = require("body-parser");

let app = express();

let userRouter = require("./router/userRouter");
let goodsRouter = require("./router/goodsRouter");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", express.static("public"));
app.use("/", userRouter);
app.use("/", goodsRouter);

app.listen(3000, (req, res) => {
    console.log("3000 port start success");
})
