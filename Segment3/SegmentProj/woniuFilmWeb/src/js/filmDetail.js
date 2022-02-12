/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-02-11 14:49:50 Fri
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

// ## film detail
// 1. show detail
let filmId = tempArr[0];
function showDetails() {
    let temp = url.split("?");
    let tempArr = [];
    for (let i = 1; i < temp.length; i++) {
        tempArr.push(temp[i].split("=")[1] - 0);
    }
    axios(`http://localhost:3000/film/queryFilmDetail?_id=${filmId}`).then(res => {
        console.log("===============");
        console.log(res);
        let filmDetailArr = res[0];
        let filmScoreArr = filmDetailArr.scoreToAvg;
        let averageScore = calculateAverage(filmScoreArr);
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
                            ${filmDetailArr.timeCount} 分钟
                        </li>
                        <li class="ellipsis">${filmDetailArr.startTime} 上映</li>
                    </ul>
                </div>
                <div class="action-buyBtn">
                    <div class="action clearfix">
                        <a class="wishCls" >
                            <div>
                                <i class="icon wish-icon"></i>
                                <span class="wish-msg">${filmDetailArr.wantSeeNum} 人想看</span>
                            </div>
                        </a>
                        <a class="scoreCls" href="javascript:void(0)" >
                            <div>
                                <i class="icon score-btn-icon"></i>
                                <span class="score-btn-msg">评分</span>
                            </div>
                        </a>
                    </div>
                    <a class="btn buy" href="cinema.html?filmId=${filmId}" target="main-iframe">特惠购票</a>
                </div>
                <div class="movie-stats-container">
                    <div class="movie-index">
                        <p class="movie-index-title">口碑</p>
                        <div class="movie-index-content score normal-score">
                            <span class="index-left info-num">
                                <span class="stonefont">${(averageScore ?? filmDetailArr.rating).toFixed(2)} 分</span>
                            </span>
                          
                        </div>
                    </div>
                    <div class="movie-index">
                        <p class="movie-index-title">累计票房</p>
                        <div class="movie-index-content box">
                            <span class="stonefont">${filmDetailArr.views.toFixed(2)} 万</span>
                        </div>
                    </div>
                </div>
            </div>
        </div > `
        $('.banner').html(str);
        $('.dra').html(filmDetailArr.details);
        $('#director-name').html(filmDetailArr.director);
        wantSeeBtnClick();
    });
}

showDetails();

// 1.1 want see btn click
function wantSeeBtnClick() {
    $(".wishCls").click(function (e) {
        e.preventDefault();
        // console.log(1);
        alert("已想看,想看+1");
        axios(`http://localhost:3000/film/wantSeeAdd`, { filmId }).then(res => {
            window.location.reload();
            console.log(res);
        })
    });

}

// 1.2 calculateAverage
function calculateAverage(data) {
    let sum = 0;
    data.forEach(element => {
        sum += element.score;
    });
    let average = sum / data.length;
    return average;
}

// 2. echo comment
function echoComment(params) {
    axios(`http://localhost:3000/comment/queryComment`, { filmId: tempArr }).then(res => {
        console.log(res)
        let str = ``;
        res.forEach(element => {
            str += ` <li class="comment-container">
                                                    <div class="portrait-container">
                                                    <img src="http://localhost:3000/${element.userIdToDetail[0].avatar}" style="width:30px; height=30px; border-radius:50%; margin-left:30px " alt="">
                                                    <i class="level-3-icon"></i>
                                                </div>
                                                    <div class="main">
                                                        <div class="main-header clearfix">
                                                            <div class="user">
                                                                <span class="name">${element.userIdToDetail[0].name}</span>
                                                                <span class="tag">购</span>
                                                            </div>
                                                            <div class="time">
                                                                <span>${element.time}</span>
                                                                <ul class="score-star clearfix">
                                                                    <li>
                                                                        <i class="half-star left active"></i><i
                                                                            class="half-star right active"></i>
                                                                    </li>
                                                                    <li>
                                                                        <i class="half-star left active"></i><i
                                                                            class="half-star right active"></i>
                                                                    </li>
                                                                    <li>
                                                                        <i class="half-star left active"></i><i
                                                                            class="half-star right active"></i>
                                                                    </li>
                                                                    <li>
                                                                        <i class="half-star left active"></i><i
                                                                            class="half-star right active"></i>
                                                                    </li>
                                                                    <li>
                                                                        <i class="half-star left active"></i>
                                                                        <!--<i class="half-star right active"></i>-->
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="comment-content">${element.commentContent}</div>
                                                    </div>
                                                </li>`
        });
        $('#comment-list').html(str);
    })
}
echoComment();
