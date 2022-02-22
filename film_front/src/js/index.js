/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-10 14:44:08 Thu
 * @LastEditTime: 2022-02-11 14:05:55 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import "../css/homeIndex1.css";
import "../css/font.css";
import { axios } from "./util/axios.js";
import { getUserIdByName } from "./util/myUtil.js";

// ## header area method
// 1. multiple condition query
$("#search-btn").click(function (e) {
    e.preventDefault();
    let searchContent = $("#search-content").val();
    let name = searchContent;
    getFilmIdByName(name);
    getCinemaIdByName(name);
    // console.log(searchContent);
});

function getCinemaIdByName(name) {
    axios(`http://localhost:3000/cinema/getCinemaIdByName`, { name }).then(res => {
        console.log(res);
        if (res.length == 1) {
            let cinemaId = res[0]._id;
            window.open(
                `cinemadetail.html?cinemaId=${cinemaId}`,
                'main-iframe'
            );
            // window.parent.location.target = `main-iframe`;
            // console.log(cinemaId);
        } else if (res.length > 1) {
            let str = `<h1 style="margin:20px">影院</h1>`;
            for (let cinema of res) {
                str += `    <div class="movie-item" style="display:inline-block; margin-left:20px">
                                        <a href="./cinemadetail.html?cinemaId=${cinema._id}">
                                            <div class="movie-poster">
                                                <img class="movie-poster-img" style="width:200px" src="http://localhost:3000/${cinema.img}">
                                                <div class="movie-overlay movie-overlay-bg">
                                                    <div class="movie-info">
                                                        <div class="movie-title movie-title-padding">
                                                            ${cinema.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                   </div>  `    ;
            }

            // $('iframe').attr('src', "./showSearchResult.html");
            $('iframe').contents().find("#app").append(str)
        }
    })
}

function getFilmIdByName(name) {
    axios(`http://localhost:3000/film/getFilmIdByName`, { name }).then(res => {
        if (res.length == 1) {
            let filmId = res[0]._id;
            window.open(
                `filmDetail.html?id =${filmId}`,
                'main-iframe'
            );
            // console.log(filmId);
        } else if (res.length > 1) {
            let str = `<h1 style="margin:20px">影视</h1>`;
            for (let cinema of res) {
                str += `    <div class="movie-item" style="display:inline-block; margin-left:20px">
                                        <a href="./filmDetail.html?filmId=${cinema._id}">
                                            <div class="movie-poster">
                                                <img class="movie-poster-img" src="http://localhost:3000/${cinema.img}">
                                                <div class="movie-overlay movie-overlay-bg">
                                                    <div class="movie-info">
                                                        <div class="movie-score"><i class="integer">${cinema.name}</i></div>
                                                        <div class="movie-title movie-title-padding">
                                                            ${cinema.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                   </div>  `    ;
            }

            // $('iframe').attr('src', "./showSearchResult.html");
            $('iframe').contents().find("#app").html(str)
        }
    })
}

// 2. echo user avatar
let userId;
getUserIdByName().then(res => {
    userId = res;
    axios("http://localhost:3000/user/queryUserById", { userId }).then(res => {
        // console.log(res);
        // if user is logined then hidden this element
        if (res.length > 0) {
            $(".user-info").eq(1).prop('hidden', true);
            $(".user-avatar img").attr("src", `http://localhost:3000/${res[0].avatar}`);
        }
    })
});

// 3. login out
$('.J-logout').click(function (e) {
    $.ajax({
        url: "http://localhost:3000/user/clearCookie",
        data: $("#loginForm").serialize(),
        xhrFields: {
            withCredentials: true
        },//支持跨域
        dataType: "jsonp",//接受跨域的数据
        success: function (res) {
            window.location.reload();
            console.log(res);
        }
    });
})

// ## other
// 1. active navbar toggle
$(".navbar li").click(function (e) {
    // e.preventDefault();
    $(".navbar li a").removeClass("active");
    $(this).find("a").addClass("active");
});

// 2. get iframe height and width
function getIframeHeightAndWidth(params) {
    let ifr = document.querySelector('iframe');
    ifr.onload = function () {
        let oHeight = Math.max(ifr.contentWindow.document.documentElement.offsetHeight, ifr.contentWindow.document.body.offsetHeight);
        let cHeight = Math.max(ifr.contentWindow.document.documentElement.clientHeight, ifr.contentWindow.document.body.clientHeight);
        let height = Math.min(oHeight, cHeight);
        ifr.height = height + 'px';
        console.log(height);
    }
}
getIframeHeightAndWidth();
