/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-01-22 16:35:48 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import "../css/homeIndex1.css";
import "../css/font.css";
import { axios } from "./util/axios.js";

// 1. 正在热映
axios("http://localhost:3000/film/queryHotFilm").then(res => {
    let str = ``;
    for (let film of res) {
        str += `<dd>
               <div class="movie-item">
                                        <a href="./filmDetail.html?filmId=${film._id}">
                                            <div class="movie-poster">
                                                <img class="poster-default" src="./images/loading_2.e3d934bf.png">
                                                <img class="movie-poster-img" src="http://localhost:3000/${film.img}">
                                                <div class="movie-overlay movie-overlay-bg">
                                                    <div class="movie-info">
                                                        <div class="movie-score"><i class="integer">9.0</i></div>
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
                                        <div class="movie-detail movie-wish"><span class="stonefont">10000</span>人想看
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
