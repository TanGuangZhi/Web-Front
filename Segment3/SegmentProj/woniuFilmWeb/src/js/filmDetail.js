/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-01-24 20:31:52 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import { axios } from "./util/axios.js";
import "../css/movie-detail.86416149.css";

let url = window.location.href;
// alert(url);
let temp = url.split("?");
let tempArr = [];
for (let i = 1; i < temp.length; i++) {
    tempArr.push(temp[i].split("=")[1] - 0);
}
console.log(tempArr);

function showDetails() {
    let temp = url.split("?");
    let tempArr = [];
    for (let i = 1; i < temp.length; i++) {
        tempArr.push(temp[i].split("=")[1] - 0);
    }
    let filmId = tempArr[0];
    axios(`http://localhost:3000/film/queryFilmDetail?_id=${filmId}`).then(res => {
        console.log(res);
        let filmDetailArr = res[0];
        let str = `<div class="wrapper clearfix">
            <div class="celeInfo-left">
                <div class="avatar-shadow">
                    <img class="avatar" src=http://localhost:3000/${filmDetailArr.img}>
        <div class="movie-ver"></div>
                </div >
            </div >
            <div class="celeInfo-right clearfix">
                <div class="movie-brief-container">
                    <h1 class="name">${filmDetailArr.name}</h1>
                    <ul>
                        <li class="ellipsis">
                            <span>动漫</span>
                        </li>
                        <li class="ellipsis">
                            ${filmDetailArr.timeCount}分钟
                        </li>
                        <li class="ellipsis">${filmDetailArr.startTime}上映</li>
                    </ul>
                </div>
                <div class="action-buyBtn">
                    <div class="action clearfix">
                        <a class="wishCls" >
                            <div>
                                <i class="icon wish-icon"></i>
                                <span class="wish-msg">想看</span>
                            </div>
                        </a>
                        <a class="scoreCls" href="javascript:void(0)" >
                            <div>
                                <i class="icon score-btn-icon"></i>
                                <span class="score-btn-msg">评分</span>
                            </div>
                        </a>
                    </div>
                    <a class="btn buy" href="cinema.html?filmId=${filmId}" target="_blank">特惠购票</a>
                </div>
                <div class="movie-stats-container">
                    <div class="movie-index">
                        <p class="movie-index-title">口碑</p>
                        <div class="movie-index-content score normal-score">
                            <span class="index-left info-num">
                                <span class="stonefont">9分</span>
                            </span>
                            <div class="index-right">
                                <div class="star-wrapper">
                                    <div class="star-on" style="width:79%;"></div>
                                </div>
                                <span class="score-num">1000万人评分</span>
                            </div>
                        </div>
                    </div>
                    <div class="movie-index">
                        <p class="movie-index-title">累计票房</p>
                        <div class="movie-index-content box">
                            <span class="stonefont">30000万</span>
                        </div>
                    </div>
                </div>
            </div>
        </div > `
        $('.banner').html(str);
        $('.dra').html(filmDetailArr.details);
        $('#director-name').html(filmDetailArr.director);
    });
}

showDetails();
