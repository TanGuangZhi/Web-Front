/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-25 16:23:01 Tue
 * @LastEditTime: 2022-02-07 16:24:41 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/userInfo.css";
import { axios } from "./util/axios.js";

let userId = 1;

function getUserInfo(userId) {
    axios(`http://localhost:3000/user/queryUser`, "post", { userId }).then(res => {
        let userInfo = res.queryResult;
        console.log(userInfo);
        let str = ``;
        userInfo.forEach(element => {
            str += ` <h1>${element.name}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus.
                    Nam vestibulum sodales odio ut pulvinar.</p>
                <span class="more">Phone:${element.phone}</span>`
            $('.level').html(`Score:${element.score}`);
            $('.points').html(`Email:${element.email}`);
            $('.img img').attr("src", `http://localhost:3000/${element.avatar}`);
        });
        $(".general").html(str);
    });
}

getUserInfo(userId);
