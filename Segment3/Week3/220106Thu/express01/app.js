/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-06 12:17:08 Thu
 * @LastEditTime: 2022-01-06 14:32:32 Thu
 * @LastEditors: TanGuangZhi
 * @Description: use router to manage request
 * @KeyWords: Kw
 */
let express = require("express");
let app = express();
//加载插件  只处理post的表单字符串类型的数据  (不是表单的流数据)
let bodyParser = require("body-parser");
let commonUtil = require("./util/CommonUtil");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let multer = require("multer");
let upload = multer({ dest: "/log" });//用来存储客户端上传过来的临时目录


//1.开启服务
app.listen(3000, () => {
   console.log("服务器已经开启...");
});
app.use("/", express.static("public"));

// 2. use user routes
let userRoutes = require("./router/UserRouter");
// 3. use goods router
let goodsRoutes = require("./router/GoodsRouter");

app.use("/", goodsRoutes);
app.use("/", userRoutes);
