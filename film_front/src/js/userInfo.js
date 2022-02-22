/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-25 16:23:01 Tue
 * @LastEditTime: 2022-02-10 14:37:05 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/userInfo.css";
import { axios } from "./util/axios.js";
import { cookie } from "./util/jquery.cookie.js";

// ## get userId by userName
let userId;
function getUserIdByName(name) {
    axios(`http://localhost:3000/user/getUserIdByName`, { name }).then(res => {
        userId = res[0]._id;
        // console.log(userId);
        getUserInfo(userId);
    });
    // return userId;
}

let name = $.cookie("userName");
console.log(name);
getUserIdByName(name);

// ## user
// query user info
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
