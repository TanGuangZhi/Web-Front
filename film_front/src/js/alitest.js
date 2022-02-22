/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-24 15:00:12 Mon
 * @LastEditTime: 2022-01-25 11:00:26 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */

import { axios } from "./util/axios.js";



$("button").click(function () {
    console.log(`1`);
    axios("http://localhost:3000/user/pay?money=200").then(res => {
        console.log(res);
        window.location.href = res;
    })
})
