/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-02-07 13:29:13 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import "../css/profile-profile.772600de.css";

import { axios } from "./util/axios.js";

// ## my order
let userId = 1;
// 1. query order
function queryUserOrder(params) {
    axios(`http://localhost:3000/user/queryUserOrder?userId=${userId}`).then(res => {
        let str = ``;
        console.log(res);
        res.forEach(element => {
            str += ` <div class="order-body">
                                    <div class="poster" style="width: 66px;height: 91px">
                                        <img
                                            src="http://localhost:3000/${element.filmIdToDetail[0].img}">
                                    </div>
                                    <div class="order-content">
                                        <div class="movie-name">${element.filmIdToDetail[0].name}</div>
                                        <div class="cinema-name">${element.cinemaIdToDetail[0].name}</div>
                                        <div class="hall-ticket">
                                            <span>${element.roomIdToDetail[0].name}</span>
                                            <span>位置:${element.roomSeat}</span>
                                        </div>
                                        <div class="show-time">${element.startTime}</div>
                                    </div>
                                    <div class="order-price">￥${element.price}</div>
                                    <div class="order-status">
                                        <span>${element.status}</span>
                                    </div>
                                    <div class="actions">
                                        <div>
                                            <a href="#" class="pay-btn">付款</a>
                                        </div>
                                    </div>
                                </div>`;
        });
        $(".order-box").html(str);

        // button status toggle
        if ($(".order-status span").html() == "completed") {
            $(".pay-btn").html("评价");
        }
    });
}
queryUserOrder();

// toggle user info
$(".profile").click(function () {
    window.location.href = "../userInfo.html"
})
