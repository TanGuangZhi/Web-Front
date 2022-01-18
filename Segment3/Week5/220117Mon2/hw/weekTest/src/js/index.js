/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-17 19:29:59 Mon
 * @LastEditTime: 2022-01-18 10:15:08 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */

import "bootstrap/dist/css/bootstrap.css";
import { axios } from "./util/axios.js";

function test(params) {
    axios("http://192.168.11.87:8080//queryFilm").then((res) => {
        console.log(res);
    })
}


test();
