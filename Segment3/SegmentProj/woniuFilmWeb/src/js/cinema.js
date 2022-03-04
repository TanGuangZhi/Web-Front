/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-03-02 20:55:43 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import { axios } from "./util/axios.js";
import "../css/cinemas-list.0350856d.css";
import "../css/font.css";
import { judgeIsUserLogined } from "./util/myUtil.js";

let url = window.location.href;
// alert(url);
let temp = url.split("?");
let tempArr = [];
for (let i = 1; i < temp.length; i++) {
    tempArr.push(temp[i].split("=")[1] - 0);
}
let filmId = tempArr[0];
console.log(filmId);

// 1. query cinema
let lastPage;
function query(nowPage = 1, cinemaBrandId = null, districtId = null) {
    axios("http://localhost:3000/cinemaRoom/query", "post", { nowPage, pageCount: 10, filmId, cinemaBrandId, districtId }).then(res => {
        console.log(res);
        let queryResult = res.queryResult;
        lastPage = res.lastPage;
        let str = ``;
        queryResult.forEach((element, index) => {
            str += `<div class="cinema-cell">
                    <div class="cinema-info">
                        <a href="cinemadetail.html?cinemaId=${element.cinemaId}">${element.cinemaIdToDetails[0].name}</a>
                        <p class="cinema-address">${element.cinemaIdToDetails[0].address}</p>
                        <span class="cinema-tags-item">${element.roomIdToDetails[0].name}</span>
                    </div>
                    <div class="buy-btn">
                        <a href="" class="buy" data-cinema-id=${element.cinemaId} data-room-id=${element.roomId} data-price=${element.filmIdToDetails[0]?.price} >选座购票</a>
                    </div>
                    <div class="price">
                        <span class="rmb red">￥</span>
                        <span class="price-num red stonefont">${element.filmIdToDetails[0]?.price}</span>
                        <span>起</span>
                    </div>
                </div>`;
        });
        let pageStr = ` <li>
                                <a class="page_1 changePage"data-change-page-id="-1" href="javascript:void(0);" style="cursor: pointer">上一页</a>
                            </li> `
        for (let i = 1; i <= res.lastPage; i++) {
            if (i == nowPage) {
                pageStr += ` <li class="active">
                <a class="page_1 changePage" href="javascript:void(0);" data-change-page-id="${i}" style="cursor: pointer">${i}</a>
                    </li> `
                continue;
            }
            pageStr += ` <li>
                <a class="page_1 changePage" href="javascript:void(0);" data-change-page-id="${i}" style="cursor: pointer">${i}</a>
            </li> `
        };

        pageStr += `<li >
                                <a class="page_1 changePage" href="javascript:void(0);" data-change-page-id="-2" style="cursor: pointer">下一页</a>
                            </li> `
        $(".list-pager").html(pageStr);
        $('.cinema-info-list').html(str);
        changePage();
        buyTicketClick();
    })
}
query();

// 1-BC pagination
let nowPage = 1;
let changePage = function () {
    $(".changePage").click(function (e) {
        e.preventDefault();
        let temp = $(this).attr("data-change-page-id");
        if (temp < 0) {
            if (temp == -1 && nowPage > 1) {
                nowPage--;
            }
            if (temp == -2 && nowPage < lastPage) {
                nowPage++;
            }
        } else {
            nowPage = temp;
        }
        query(nowPage);
    });
}

// 1.2 get all cinema brand
function getCinemaBrand() {
    axios("http://localhost:3000/cinemaRoom/queryCinema").then(res => {
        let str = `<li class="active">
        <a href="javascript:void(0);" class="cinema-brand" style="cursor: pointer">全部</a>
        </li>`;
        res.forEach((element, index) => {
            str += `<li>
            <a href="javascript:void(0);" class="cinema-brand" data-brand-id="${index + 1}"style="cursor: pointer">${element.name}</a>
            </li>`;
        });
        $('#brandId').html(str);
        clickCinemaBrand();
    })
}
getCinemaBrand();

// 1.2-BC multiple query by cinema brand
let cinemaBrandId;
let cinemaName
let clickCinemaBrand = function () {
    $(".cinema-brand").click(function (e) {
        e.preventDefault();
        $(".cinema-brand").parent().removeClass("active");
        cinemaBrandId = $(this).attr("data-brand-id");
        cinemaName = $(this).html();

        $(this).parent().addClass("active");
        query(1, cinemaBrandId);
    });
}

// 1.3 get all roomLevel
function getRoomLevel() {
    axios("http://localhost:3000/cinemaRoom/queryRoomLevel").then(res => {
        let str = `<li class="active">
                                <a href="javascript:void(0);" class="hall-type" style="cursor: pointer">全部</a>
                                 </li>`;
        res.forEach((element, index) => {
            str += `<li>
                                <a href="javascript:void(0);" class="hall-type" data-brand-id="${index}"style="cursor: pointer">${element.name}</a>
                            </li>`;
        });
        $('#hallTypeId').html(str);
    })
}
getRoomLevel();

// 1.4 query district
function getDistrict() {
    axios("http://localhost:3000/cinema/queryDistrict").then(res => {
        let str = `<li class="active">
                                <a href="javascript:void(0);" class="cinema-district" style="cursor: pointer">全部</a>
                                 </li>`;
        res.forEach((element, index) => {
            str += `<li>
                                <a href="javascript:void(0);" class="cinema-district" data-district-id="${index + 1}"style="cursor: pointer">${element.name}</a>
                            </li>`;
        });
        $('#districtId').html(str);
        clickDistrict(1, null, districtId);
    })
}
getDistrict();

// 1.4-BC multiple query by district 
let districtId;
let clickDistrict = function () {
    $(".cinema-district").click(function (e) {
        e.preventDefault();
        $(".cinema-district").parent().removeClass("active");
        districtId = $(this).attr("data-district-id");

        $(this).parent().addClass("active");
        query(1, null, districtId);
    });
}

// 1.5 buy ticket
function buyTicketClick(params) {
    $(".buy").click(function (e) {
        e.preventDefault();
        if (!judgeIsUserLogined()) {
            alert("请先登录");
            return;
        };
        let cinemaId = $(this).attr("data-cinema-id");
        let roomId = $(this).attr("data-room-id");
        let price = $(this).attr("price");
        window.open(
            `chooseseat.html?filmId=${filmId}&cinemaId=${cinemaId}&roomId=${roomId}&price=${price}`,
            'main-iframe'
        );
    });
}
