/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-25 11:16:36 Tue
 * @LastEditTime: 2022-02-18 12:55:12 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import { cookie } from "./jquery.cookie.js";
import { axios } from "./axios.js";

// 1. formatDate
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// nowDate = new Date().Format("yyyy-MM-dd HH:mm");

// 2. get user id by name
let name = $.cookie("userName");
export let getUserIdByName = async function () {
    let userId;
    await axios(`http://localhost:3000/user/getUserIdByName`, { name }).then(res => {
        userId = res[0]?._id;
        // console.log(userId);
    });
    return userId;
}

// 3. judge is user logined
export function judgeIsUserLogined() {
    if (!name) {
        return false;
    }
    return true;
}
