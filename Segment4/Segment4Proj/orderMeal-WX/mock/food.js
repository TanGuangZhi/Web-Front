/*
 * @Author: TanGuangZhi
 * @Date: 2022-03-04 14:03:16 Fri
 * @LastEditTime: 2022-03-04 14:04:20 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import { Mock } from "./mock.js";
//3.随机生成指定范围的年龄[18-80]
let user2 = Mock.mock({
    "userName|1-4": "abc",
    "discription|4-8": "@cword",
    "age|18-80": 1
});
console.log(user2);
