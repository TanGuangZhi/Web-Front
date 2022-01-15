/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-14 12:30:19 Fri
 * @LastEditTime: 2022-01-14 12:40:08 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
/*import {count} from "./util.js";
import {name} from "./util.js";
import {show} from "./util.js";
import {user} from "./util.js";
import stu from "./util.js";  //导入默认暴露的对象*/
import stu from "./util.js";

import { show } from "./util.js";
// import * as obj from "./util.js";//默认引入全部暴露的内容
//import {age} from "./util.js";

// console.log("属性:", count, name);
show();
// console.log("对象:", user);
// console.log("----------------------");
console.log(stu.address, stu.age);//获取默认的暴露对象
stu.stuShow();
// obj.stuShow;
// console.log(obj.count);
// console.log(obj.name);
// console.log(obj.default);
