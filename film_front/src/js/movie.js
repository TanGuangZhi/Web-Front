/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-02-11 14:31:20 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import "../css/movie-list.79052e3e.css";
import { axios } from "./util/axios.js";
// import { myUtil } from "./util/myUtil.js";

let lastPage;

// ## now playing
// 1. query movie
function queryMovie(nowPage = 1, typeId, districtId, sortCondition = null, startTime, classicFlag = null) {
    axios("http://localhost:3000/film/query", "post", { nowPage, pageCount: 10, typeId, districtId, sortCondition, startTime, classicFlag }).then(res => {
        let str = ``;
        console.log("==============");
        console.log(res);
        lastPage = res.lastPage;
        for (let film of res.queryResult) {
            str += `   <dd>
                            <div class="movie-item film-channel">
                                <a href="filmDetail.html?id=${film._id}" >
                                    <div class="movie-poster">
                                        <img class="" src="http://localhost:3000/${film.img}">
                                    </div>
                                </a>
                                <div class="channel-action channel-action-sale">
                                    <a>购票</a>
                                </div>
                                <div class="movie-ver"></div>
                            </div>
                            <div class="channel-detail movie-item-title">
                                <a href="filmDetail.html?id=${film._id}">${film.name}</a>
                            </div>
                            <div class="channel-detail channel-detail-orange">
                                <i class="integer">${film.rating}分</i></div>
                        </dd>
                       `;
        }
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
        $(".movie-list").html(str);
        $(".list-pager").html(pageStr);
        changePage();
    });
}
queryMovie();

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
        console.log(nowDate);
        queryMovie(nowPage, movieTypeId, districtId, undefined, nowDate, classicFlag);
    });
}

// 1-BC-02 coming soon
let nowDate;
$('#coming-soon').click(function (e) {
    multipleCondition2Init();
    $(this).parent().siblings().find("a").removeClass("active");
    $(this).addClass("active");
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
    nowDate = new Date().Format("yyyy-MM-dd HH:mm");

    // console.log(nowDate);
    queryMovie(undefined, undefined, undefined, undefined, nowDate);
})

// 1-BC-03 hot play  
$('#hot-play').click(function (e) {
    nowDate = undefined;
    multipleCondition2Init();
    $(this).parent().siblings().find("a").removeClass("active");
    $(this).addClass("active");
    queryMovie(undefined, undefined, undefined, undefined, nowDate);
})

// 1-BC-04 classic movie  
let classicFlag;
$('#classic').click(function (e) {
    nowDate = "2013-01-01 00:00";
    multipleCondition2Init();
    $(this).parent().siblings().find("a").removeClass("active");
    $(this).addClass("active");
    queryMovie(undefined, undefined, undefined, undefined, nowDate, classicFlag = true);
})

// 1.2 query all type
function queryType() {
    axios("http://localhost:3000/film/queryType").then(res => {
        let str = `  <li class="active">
                                <a href="javascript:void(0);" class="movie-type" style="cursor: pointer">全部</a>
                            </li>`
        res.forEach((element, index) => {
            str += `<li>
                                <a href="javascript:void(0);" data-type-id=${index} class="movie-type" style="cursor: pointer">${element.type}</a>
                        </li>`;
        });

        $('#movieTypeUl').html(str);
        clickMovieType();
    });

}
queryType();

// 1.2-BC multiple query by type
let movieTypeId;
let clickMovieType = function () {
    $(".movie-type").click(function (e) {
        e.preventDefault();
        $('.movie-type').parent().removeClass("active");
        movieTypeId = $(this).attr("data-type-id");

        $(this).parent().addClass("active");
        queryMovie(nowPage = 1, movieTypeId, districtId, undefined, nowDate, classicFlag);
    });
}

// 1.2-BC2 put the multiple condition to the initial
function multipleCondition2Init(params) {
    $('.movie-district').parent().removeClass("active");
    $('.movie-district').parent().eq(0).addClass("active");
    $('.movie-type').parent().removeClass("active");
    $('.movie-type').parent().eq(0).addClass("active");
    nowPage = 1;
    movieTypeId = undefined;
    districtId = undefined;
    classicFlag = undefined;
}

// 1.3 queryDistrict
function queryDistrict() {
    axios("http://localhost:3000/film/queryDistrict").then(res => {
        let str = ` <li class="active">
                                <a href="javascript:void(0);" class="movie-district" style="cursor: pointer">全部</a>
                                 </li> `
        res.forEach((element, index) => {
            str += ` <li>
                                <a href="javascript:void(0);" class="movie-district " data-district-id="${index}"style="cursor: pointer">${element.type}</a>
                            </li> `
        });
        $('#movieDistrict').html(str);
        clickMovieDistrict();
    })
}
queryDistrict();

// 1.3-BC multiple query by district
let districtId;
let clickMovieDistrict = function () {
    $(".movie-district").click(function (e) {
        e.preventDefault();
        $('.movie-district').parent().removeClass("active");
        districtId = $(this).attr("data-district-id");

        $(this).parent().addClass("active");
        queryMovie(nowPage = 1, movieTypeId, districtId, undefined, nowDate, classicFlag);
    });
}

// 1.4 sort
$(".sort-control-group").click(function (e) {
    e.preventDefault();
    $(".sort-control-group span").removeClass("sort-radio-checked");
    $(this).find("span").eq(0).addClass("sort-radio-checked");

    let sortCondition = $(this).find("span").eq(1).attr("name");
    console.log(sortCondition);
    queryMovie(1, movieTypeId, districtId, sortCondition);

});
function sortByCondition(condition) {

}
