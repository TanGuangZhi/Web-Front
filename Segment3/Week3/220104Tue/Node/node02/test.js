/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-04 15:35:35 Tue
 * @LastEditTime: 2022-01-04 19:17:47 Tue
 * @LastEditors: TanGuangZhi
 * @Description: test
 * @KeyWords: Kw
 */

let fs = require('fs');
const path = require("path")
path.join("file", "hello.txt");

console.log();
fs.readFile("file/hello.txt",function(err, data){
    if(err) {
        console.log(err);
    }
    console.log(data.toString());
})

