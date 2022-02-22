/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-02-12 16:24:37 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import "../css/profile-profile.772600de.css";

import { axios } from "./util/axios.js";
import { cookie } from "./util/jquery.cookie.js";

// ## my order
let userId;
let name = $.cookie("userName");
// 1. query order
axios(`http://localhost:3000/user/getUserIdByName`, { name }).then(res => {
    userId = res[0]._id;
    // console.log(userId);
    queryUserOrder(userId)
});

function queryUserOrder(userId) {
    axios(`http://localhost:3000/user/queryUserOrder?userId=${userId}`).then(res => {
        let str = ``;
        console.log(res);
        let btnContent, btnColor;
        res.forEach(element => {

            if (element.status == "completed") {
                btnContent = "评价";
                btnColor = ' style="background-color:green"'
            } else {
                btnContent = "付款";
                btnColor = "";
            }
            str += ` <div class="order-body">
            <input type="text" class="showBack" hidden data-film-id="${element.filmId}" data-cinema-id="${element.cinemaId}" data-room-id=${element.roomId} data-order-money=${element.price} data-order-id="${element.orderId}">
                                    <div class="poster" style="width: 66px;height: 91px">
                                        <img
                                            src="http://localhost:3000/${element.filmIdToDetail[0]?.img}">
                                    </div>
                                    <div class="order-content">
                                        <div class="movie-name">${element.filmIdToDetail[0]?.name}</div>
                                        <div class="cinema-name">${element.cinemaIdToDetail[0]?.name}</div>
                                        <div class="hall-ticket">
                                            <span>${element.roomIdToDetail[0]?.name}</span>
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
                                            <a href="#" class="pay-btn" ${btnColor}>${btnContent}</a>
                                        </div>
                                    </div>
                                </div>`;
        });
        $(".order-box").html(str);
        payBtnClick();
    });
}
// queryUserOrder();

// toggle user info
$(".profile").click(function () {
    window.location.href = "../userInfo.html"
})

// pay btn click 
function payBtnClick() {
    $(".pay-btn").click(function (e) {
        e.preventDefault();
        let temp = {};
        temp.orderId = $(this).parent().parent().parent().find("input").attr("data-order-id");
        temp.totalPrice = $(this).parent().parent().parent().find("input").attr("data-order-money");
        temp.filmId = $(this).parent().parent().parent().find("input").attr("data-film-id");
        temp.cinemaId = $(this).parent().parent().parent().find("input").attr("data-cinema-id");
        temp.roomId = $(this).parent().parent().parent().find("input").attr("data-room-id");
        // console.log(temp);
        console.log($(this).html());
        if ($(this).html() == "付款") {
            axios(`http://localhost:3000/user/pay`, { temp }).then(async res => {
                console.log(res);
                window.location.href = res;
            })
        } else {
            window.location.href = `../comment.html?filmId=${temp.filmId}&userId=${userId}&orderId=${temp.orderId}`;
        }
    })
}
