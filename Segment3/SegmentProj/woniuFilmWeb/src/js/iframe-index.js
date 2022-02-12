/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-02-11 14:50:53 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import "../css/homeIndex1.css";
import "../css/font.css";
import { axios } from "./util/axios.js";

// 1. 正在热映
let nowPlayFilm = [];
axios("http://localhost:3000/film/queryHotFilm").then(res => {
    let str = ``;
    nowPlayFilm = res;
    for (let film of res) {
        str += `<dd>
               <div class="movie-item">
                                        <a href="./filmDetail.html?filmId=${film._id}">
                                            <div class="movie-poster">
                                                <img class="poster-default" src="./images/loading_2.e3d934bf.png">
                                                <img class="movie-poster-img" src="http://localhost:3000/${film.img}">
                                                <div class="movie-overlay movie-overlay-bg">
                                                    <div class="movie-info">
                                                        <div class="movie-score"><i class="integer">${film.rating}</i></div>
                                                        <div class="movie-title movie-title-padding">
                                                            ${film.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div class="movie-detail movie-detail-strong movie-sale">
                                            <a href="./filmDetail.html?filmId=${film._id}" class="active" >购 票</a>
                                        </div>
                                        <div class="movie-ver"></div>
                                   </div>                     

                       </dd>`;
    }
    $("#hotFilmList").html(str);
});

// 2. 即将上映
axios("http://localhost:3000/film/queryAfterFilm").then(res => {
    let str = ``;
    for (let film of res) {
        str += ` <dd>
                                    <div class="movie-item" >
                                        <a href="./filmDetail.html?filmId=${film._id}" target="_blank" >
                                            <div class="movie-poster" >
                                                <img class="poster-default" src="./images/loading_2.e3d934bf.png">
                                                <img class="movie-poster-img"  src="http://localhost:3000/${film.img}">
                                                <div class="movie-overlay movie-overlay-bg">
                                                    <div class="movie-info">
                                                        <div class="movie-title">${film.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div class="movie-detail movie-wish"><span class="stonefont">${film.wantSeeNum}</span>人想看
                                        </div>
                                        <div class="movie-detail movie-detail-strong movie-presale">
                                            <a class="movie-presale-sep">预告片
                                            </a><a href="javascript:void(0)" class="active" >预 售</a>
                                        </div>
                                        <div class="movie-ver"></div>
                                    </div>
                                    <div class="movie-detail movie-rt">${film.startTime}上映</div>
                                </dd>`;
    }
    $("#afterFilmList").html(str);
});

// 3. today box office
// let todayBoxOffice;
function todayBoxOffice() {
    // 1. query all office from db
    axios("http://localhost:3000/order/queryTodayBoxOffice").then(res => {
        console.log(res);
        // todayBoxOffice = res;
        let str = ``;
        res.forEach((element, index) => {
            // console.log(nowPlayFilm);
            let nowFilm = nowPlayFilm.find(element2 => element2._id == element._id);
            // console.log(nowFilm);
            str += ` <li class="ranking-item ranking-index-2">
                                        <a href="javascript:void(0)">
                                            <span class="normal-link">
                                                <i class="ranking-index">${index + 1}</i>
                                                 <span class="ranking-movie-name">${nowFilm.name}</span>
                                                <span class="ranking-num-info stonefont">${element.sum.toFixed(2)}万</span>
                                            </span>
                                        </a>
                                    </li> `
        });
        $("#today-box-office").html(str);
        console.log(res);
        todayBigPlant(res);
    })
}
todayBoxOffice();

// 3.1 today big plant
function todayBigPlant(data) {
    let sum = 0;
    data.forEach(element => {
        sum += element.sum;
    });
    // console.log(sum);
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "H+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    let nowDate = new Date().Format("HH:mm");
    $('#today-big-plant').html(`                            <p>
                                <span class="num"><span class="stonefont">${sum.toFixed(2)}</span></span>万
                                <a class="more" target="_blank" href="#">查看更多
                                    <span class="panel-arrow panel-arrow-red"></span></a>
                            </p>
                            <p class="meta-info">
                                北京时间 ${nowDate} 
                                <span class="pull-right">实时票房数据</span>
                            </p>`);
    // return sum;
}

// 4.1 the most expected
let allMovieArr = [];
function showTheMostExpected(params) {
    axios("http://localhost:3000/film/query", "post", { pageCount: 1000 }).then(res => {
        allMovieArr = res.queryResult;
        allMovieArr = allMovieArr.sort((a, b) => b.wantSeeNum - a.wantSeeNum);
        let str = ``;
        for (let index = 3; index < 9; index++) {
            const element = allMovieArr[index];
            str += `   
             <li class="ranking-item ranking-index-4">
                                        <a href="./filmDetail.html?filmId=${element._id}">
                                            <span class="normal-link">
                                                <i class="ranking-index">${index + 1}</i>
                                                <span class="ranking-movie-name">${element.name}</span>
                                                <span class="ranking-num-info">
                                                    <span class="stonefont">${element.wantSeeNum}</span>人想看
                                                </span>
                                            </span>
                                        </a>
                                    </li>`
        }
        $('#most-expect-list').html(` <li class="ranking-item ranking-top ranking-index-1">
                                        <a href="./filmDetail.html?filmId=${allMovieArr[0]._id}">
                                            <div class="ranking-top-left">
                                                <i class="ranking-top-icon"></i>
                                                <img class="ranking-img  default-img"
                                                    src="http://localhost:3000/${allMovieArr[0].img} ">
                                            </div>
                                            <div class="ranking-top-right">
                                                <div class="ranking-top-right-main">
                                                    <span class="ranking-top-moive-name">${allMovieArr[0].name}</span>

                                                    <p class="ranking-release-time">上映时间：${allMovieArr[0].startTime}</p>

                                                    <p class="ranking-top-wish">
                                                        <span class="stonefont">${allMovieArr[0].wantSeeNum}</span>人想看
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                    <li class="ranking-item ranking-index-2">
                                       <a href="./filmDetail.html?filmId=${allMovieArr[1]._id}">
                                            <i class="ranking-index">2</i>
                                            <span class="img-link"><img class="ranking-img default-img"
                                                    src="http://localhost:3000/${allMovieArr[1].img}"
                                                    alt="温暖的抱抱电影海报"></span>
                                            <div class="name-link ranking-movie-name">${allMovieArr[1].name}</div>

                                            <span class="ranking-num-info"><span
                                                    class="stonefont">${allMovieArr[1].wantSeeNum}</span>人想看</span>
                                        </a>
                                    </li>

                                     <li class="ranking-item ranking-index-2">
                                         <a href="./filmDetail.html?filmId=${allMovieArr[2]._id}">
                                            <i class="ranking-index">2</i>
                                            <span class="img-link"><img class="ranking-img default-img"
                                                    src="http://localhost:3000/${allMovieArr[2].img}"
                                                    alt="温暖的抱抱电影海报"></span>
                                            <div class="name-link ranking-movie-name">${allMovieArr[3].name}</div>

                                            <span class="ranking-num-info"><span
                                                    class="stonefont">${allMovieArr[4].wantSeeNum}</span>人想看</span>
                                        </a>
                                    </li>

                                  ${str}`);
        // console.log(allMovieArr);
    })
}
showTheMostExpected();
