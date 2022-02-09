/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-01-26 10:47:24 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/style.css";
import "../css/font-awesome.min.css";
import { axios } from "./util/axios.js";
import { cookie } from "./util/jquery.cookie.js";

//1.从客户端获取cookie
let userName = $.cookie("userName");
let userPass = $.cookie("userPass");
console.log(userName);
$("#loginForm [name=name]").val(userName);
$("#loginForm [name=password]").val(userPass);

$("#loginBtn").click(function () {
    axios("http://localhost:3000/user/loginUser", $("#loginForm").serialize(), "json").then(res => {
        if (res == "200") {
            alert("登录成功");
            window.location.href = "../index.html";
        } else if (res == "1") {
            alert("用户名不存在...");
        } else if (res == "2") {
            alert("用户未激活...");
        } else if (res == "3") {
            alert("用户权限不对...");
        } else if (res == "4") {
            alert("密码错误...");
        }
    });
});
