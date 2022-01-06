/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-05 18:59:01 Wed
 * @LastEditTime: 2022-01-06 09:49:22 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Kw
 */
let express = require("express");
let app = express();
let server = app.listen(3001, () => {
    console.log("服务器成功开启...");
});

let fs = require("fs");

//1.引入书籍数据操作的模块(对书籍进行增删改查)
let BookModule = require("./module/BookModule");
let bookModule = new BookModule();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let multer = require("multer");
// set upload file store in 指定的路径 
app.use(multer({ dest: "/" }).array("bookImg"));

//1.加载静态资源
app.use("/", express.static("public"));
//2.添加查询书籍的路由
app.get("/queryBook", (req, resp) => {
    //1.响应数据至客户端
    resp.send(JSON.stringify(bookModule.queryBook()));
});

app.get("/deleteBook", (req, resp) => {
    let id = parseInt(req.query.id);
    resp.send(bookModule.deleteBook([id]) == 1 ? "1" : "0");
});

let bookImg = "";
app.post("/addBook", (req, resp) => {
    let status = "0";
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/images/book");
        },
        filename: function (req, file, cb) {
            bookImg = Date.now() + file.originalname;
            cb(null, bookImg);
        }
    });
    let upload = multer({ storage });
    let fun = upload.single("bookImg");
    fun(req, resp, (error) => {
        if (error) {
            return console.error(error);
        }
        let bookName = req.body.bookName;
        let bookCount = req.body.bookCount;
        let bookPrice = req.body.bookPrice;
        let bookNum = req.body.bookNum;
        let bookType = req.body.bookType;
        bookImg = "images/book/" + bookImg;
        let book = { bookImg, bookType, bookCount, bookPrice, bookNum, bookName };
        resp.send(bookModule.addBook(book) == 1 ? "1" : "0");
    });
});


// method1: user bottomLayer method to solve file upload
app.post('/changeBook', (req, resp) => {
    let id = req.body.id;
    let bookName = req.body.bookName;
    let bookCount = req.body.bookCount;
    let bookPrice = req.body.bookPrice;
    let bookNum = req.body.bookNum;
    let bookType = req.body.bookType;
    fs.readFile(req.files[0]?.path, function (error, data) {
        if (error) {
            return console.error(error);
        }
        let fileName = Date.now() + req.files[0]?.originalname;//防止上传文件重复
        let upPath = __dirname + "/public/images/book/" + fileName;
        fs.writeFile(upPath, data, function (error) {
            if (error) {
                return console.error(error);
            }
            bookImg = "images/book/" + fileName;
            let book = { id, bookImg, bookType, bookCount, bookPrice, bookNum, bookName };
            resp.send(bookModule.changeBook(book) + "");
        })
    });
})

// method2: user framework method to solve the file upload
// app.post('/changeBook', (req, resp) => {
//     let status = "0";
//     let storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, "public/images/book");
//         },
//         filename: function (req, file, cb) {
//             bookImg = Date.now() + file.originalname;
//             cb(null, bookImg);
//         }
//     });
//     let upload = multer({ storage });
//     let fun = upload.single("bookImg");
//     fun(req, resp, (error) => {
//         if (error) {
//             return console.error(error);
//         }
//         let bookName = req.body.bookName;
//         let bookCount = req.body.bookCount;
//         let bookPrice = req.body.bookPrice;
//         let bookNum = req.body.bookNum;
//         let bookType = req.body.bookType;
//         let id = req.body.id;
//         bookImg = "images/book/" + bookImg;
//         let book = { id, bookImg, bookType, bookCount, bookPrice, bookNum, bookName };
//         console.log(book);
//         resp.send(bookModule.changeBook(book) + "");
//     });
// })
