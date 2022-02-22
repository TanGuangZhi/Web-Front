/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-02-10 13:06:02 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import "../css/cinemas-cinema.b26baff1.css";
import { axios } from "./util/axios.js";

// ## get data from url
let url = window.location.href;
let temp = converter(url.split("?")[1]);
console.log(temp);

function converter(str) {
    let fieldArray = str.split("&");
    let res = `{`;
    for (let field of fieldArray) {
        res += `"${field.split("=")[0]}":"${field.split("=")[1]}",`;
    }
    //删除最后一个逗号...
    res = res.substring(0, res.length - 1);
    res += `}`;
    return JSON.parse(res);
}

// ## cinemaDetail
// 1. query Cinema Detail
let cinemaId = temp.cinemaId;
function queryCinemaDetail(params) {
    axios(`http://localhost:3000/cinema/queryCinemaDetail`, { cinemaId }).then(res => {
        let str = ``;
        res.forEach(element => {
            str += `<div class="wrapper clearfix">
                <div class="cinema-left">
                    <div class="avatar-shadow">
                        <img class="avatar" src="http://localhost:3000/${element.img}">
                    </div>
                </div>

                <div class="cinema-main clearfix">
                    <div class="cinema-brief-container">
                        <h1 class="name text-ellipsis" style="color: white">${element.name}</h1>
                        <div class="address text-ellipsis">${element.address}</div>
                        <div class="telphone">电话: ${element.phone}</div>

                        <div class="features-group">
                            <div class="group-title">影院服务</div>

                            <div class="feature">
                                <span class="tag ">改签</span>
                                <p class="desc text-ellipsis" title="未取票用户放映前60分钟可改签">未取票用户放映前60分钟可改签</p>
                            </div>
                            <div class="feature">
                                <span class="tag ">儿童优惠</span>
                                <p class="desc text-ellipsis"
                                    title="1.3米以下儿童可免费无座观影（VIP厅、IMAX厅、4DX厅除外），一名成人限带一名儿童（仅限1.3米以下，观看3D均有3D眼镜）。">
                                    1.3米以下儿童可免费无座观影（VIP厅、IMAX厅、4DX厅除外），一名成人限带一名儿童（仅限1.3米以下，观看3D均有3D眼镜）。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        });
        $(".wrapper").html(str);
        // console.log(res);
    })
}

queryCinemaDetail();

// 2. query cinema room 
let cinemaRoomTempArray = [];
function queryCinemaRoom() {
    axios(`http://localhost:3000/cinemaRoom/queryCinemaRoom`, { cinemaId }).then(res => {
        let str2 = ``
        cinemaRoomTempArray = res;
        res.forEach(element => {
            str2 += ` <img src=" http://localhost:3000/${element.filmIdToDetails[0].img}" class="film-img" data-film-id="${element.filmId}">`;

        });
        $(".movie").html(str2);
        // console.log(res);
        showCinemaRoom($(".movie img").eq(0).attr("data-film-id"));
        imgClickToShow();
    });
}
queryCinemaRoom();

// 2.1 film img click to show detail and room
function imgClickToShow(params) {
    $(".film-img").click(function (e) {
        e.preventDefault();
        let filmId = $(this).attr("data-film-id");
        // console.log(cinemaRoomTempArray);
        // console.log(filmId);
        let filmIdToDetail = cinemaRoomTempArray.find(element => {
            return element.filmId == filmId;
        })
        let str = ``;
        str += `<div>
            <h2 class="movie-name">${filmIdToDetail.filmIdToDetails[0].name}</h2>
                        <span class="score sc">9</span>
                        </div>

                        <div class="movie-desc">
                        <div>
                        <span class="key">时长 :</span>
                        <span class="value">${filmIdToDetail.filmIdToDetails[0].timeCount}分钟</span>
                        </div>
                        <div>
                            <span class="key">类型 :</span>
                            <span class="value">
                                <a class="text-link" href="javascript:void(0)"> 奇幻 </a>
                                </span>
                                </div>
                                <div>
                                <span class="key">导演 :</span>
                            <span>${filmIdToDetail.filmIdToDetails[0].director}</span>
                            </div>
                            </div>`;
        $(".movie-info").html(str);
        // console.log(filmIdToDetail);
        showCinemaRoom(filmId);
    });
}

// 2.1-BC show cinema room 
function showCinemaRoom(filmId) {
    let cinemaRoomArr = cinemaRoomTempArray.filter(element => {
        return element.filmId == filmId;
    });
    let str = ``;
    cinemaRoomArr.forEach(element => {
        let startTime = element.session.slice(-5);
        str += ` <tr>
                                <td>
                                    <span class="begin-time">${startTime}</span>
                                    <br>
                                    <span class="end-time">21:00散场</span>
                                </td>
                                <td>
                                    <span class="lang">${element.language}</span>
                                </td>
                                <td>
                                    <span class="hall">${element.detailsPosition}</span>
                                </td>
                                <td>
                                    <span class="sell-price"><span class="stonefont">${element.filmIdToDetails[0].price}</span></span>
                                </td>
                                <td>
                                    <a href="chooseseat.html?filmId=${filmId}&cinemaId=${element.cinemaId}&roomId=${element.roomId}&price=${element.filmIdToDetails[0].price}" class="buy-btn normal">选座购票</a>
                                </td>
                            </tr>`;
    });
    $("tbody").html(str);
    console.log(cinemaRoomArr);
}
