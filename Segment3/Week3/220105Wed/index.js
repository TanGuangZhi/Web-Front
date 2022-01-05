/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-05 10:08:41 Wed
 * @LastEditTime: 2022-01-05 12:07:17 Wed
 * @LastEditors: TanGuangZhi
 * @Description: learn express
 * @KeyWords: Kw
 */

// 1. link in module
let express = require('express');

// 2. user express
let app = express();;

// 3. create server,the port between 0-65535
let server = app.listen(3001, () => {
    console.log("server start success!");
});

// 4. create routes, each route can be deal diffident request
// app.get('/', (req, res) => {
//     res.send("hello world");
// })

app.get('/query', (req, res) => {
    res.send("query user");
})
app.get('/add', (req, res) => {
    res.send("add user");
})
app.get('/del', (req, res) => {
    res.send("del user");
})
app.get('/change', (req, res) => {
    res.send("change user");
})
// app.get('/change', (req, res) => {
//     res.send("change");
// })

// load static files
app.use("/", express.static("public"));

// ## form
app.get("/delUser", (req, res) => {
    let id = req.query.id;
    let userName = req.query.userName;
    let userPass = req.query.userPass;
    console.log(id + "" + userName + userPass);
})


app.get("/addUser", (req, res) => {
    let { userName, userPass } = { ...req.query };
    console.log(userName + " " + userPass);
})


// because app.post can't handle the POST request,so we need to bodyParser to deal the data
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/addUser", (req, res) => {
    console.log(req.body);
    // let { userName, userPass } = { ...req.query };
    // console.log(userName + " " + userPass);
})

