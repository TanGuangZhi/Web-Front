/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-02-18 12:59:15 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/common1.css";
import { axios } from "./util/axios.js";
import { cookie } from "./util/jquery.cookie.js";
import "../css/cinemas-seat.b8adee6e.css";
import { formatDate } from "./util/myUtil.js";


let url = window.location.href;
// alert(url);
let temp = converter(url.split("?")[1]);

if (temp.orderId) {
    axios(`http://localhost:3000/order/updateOrder`, { temp }).then(res => {
        console.log(res);
    })
}
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

// ## movie info
function showMovieInfo() {
    axios(`http://localhost:3000/film/queryFilmDetail?_id=${temp.filmId}`).then(res => {
        // console.log(res);
        let str = ``;
        res.forEach(element => {
            str += ` <div class="movie-info clearfix">
                        <div class="poster">
                            <img src="http://localhost:3000/${element.img}">
                        </div>
                        <div class="content">
                            <p class="name text-ellipsis">${element.name}</p>
                            <div class="info-item">
                                <span>类型 :</span>
                                <span class="value">动漫</span>
                            </div>
                            <div class="info-item">
                                <span>时长 :</span>
                                <span class="value">${element.timeCount}分钟</span>
                            </div>
                        </div>
                    </div>

                    <div class="show-info">
                        <div class="info-item">
                            <span>导演 :</span>
                            <span class="value text-ellipsis">${element.director}</span>
                        </div>
                        <div class="info-item">
                            <span>影厅 :</span>
                            <span class="value text-ellipsis">精品VIP厅</span>
                        </div>
                        <div class="info-item">
                            <span>版本 :</span>
                            <span class="value text-ellipsis">1.0.0</span>
                        </div>
                        <div class="info-item">
                            <span>场次 :</span>
                            <span class="value text-ellipsis screen">${element.startTime}</span>
                        </div>
                        <div class="info-item">
                            <span>票价 :</span>
                            <span class="value text-ellipsis">￥${element.price}</span>
                        </div>
                    </div>

                    <div class="ticket-info">
                        <div class="no-ticket">
                            <p class="buy-limit">座位：一次最多选4个座位</p>
                            <p class="no-selected">请<span>点击左侧</span>座位图选择座位</p>
                        </div>
                        <div class="has-ticket" style="display: block;">
                            <span class="text">座位：</span>
                            <div class="ticket-container">
                                <!-- <span class="ticket">10排3座</span>
                            <span class="ticket">10排4座</span>
                            <span class="ticket">10排5座</span>
                            <span class="ticket">10排6座</span>-->
                            </div>
                        </div>

                        <div class="total-price">
                            <span>总价 :</span>
                            <span class="price">0</span>
                        </div>
                    </div>

                    <div class="confirm-order">
                        <div class="cellphone">
                            <span>手机号 :</span>
                            <span class="phone-num">18179160007</span>
                        </div>
                        <div type="button" class="confirm-btn">确认选座</div>
                    </div>`
            $('.side').html(str);
            buySeatButton();
        });
    });
}
showMovieInfo();

// ## seat
//1.选择位置
let seatSize = "10-10";//影厅的大小
let seatRow = parseInt(seatSize.split("-")[0]);//总行数
let seatCol = parseInt(seatSize.split("-")[1]);//总的列数
let str = ``;
//模拟已经售出的座位信息
let soldSeatArr = [
    { seatX: 3, seatY: 3 },
    { seatX: 3, seatY: 4 },
];

// query all saled seat 
axios(`http://localhost:3000/order/queryAllSaledSeat`, { temp }).then(res => {
    // console.log(res);
    res.forEach(element => {
        let roomSeatList = element.roomSeat.split("-");
        roomSeatList.forEach(element2 => {
            let roomSeat = element2.split("_");
            soldSeatArr.push({ seatX: roomSeat[0] - 0, seatY: roomSeat[1] - 0 });
        });
    });
    // console.log(soldSeatArr);
    echoTheSoldedSeat();
});

// Echo the seats sold
function echoTheSoldedSeat(params) {
    for (let i = 1; i <= seatRow; i++) {
        str += `<div class="seat-example sel-seat">`;
        for (let j = 1; j <= seatCol; j++) {
            let flag = soldSeatArr.some(item => {
                return i == item.seatX && j == item.seatY;
            });
            if (flag) {
                str += `<span class="sold-example example" seatX="${i}" seatY="${j}"></span>`;
            } else {
                str += `<span class="selectable-example example" seatX="${i}" seatY="${j}"></span>`;
            }
        }
        str += "</div>";
    }
    $("#seatList").html(str);
    chooseSeat();
}


let selSeatList = [];
// let price = 66;
let totalPrice = 0;
function chooseSeat(params) {
    //1.点击座位进行 选择座位以及 取消选中座位
    $("#seatList .example").click(function () {
        let seatX = parseInt($(this).attr("seatX"));//1
        let seatY = parseInt($(this).attr("seatY"));//1
        if ($(this).hasClass("sold-example")) {
            alert("此座位已售出");
        } else if ($(this).hasClass("selectable-example") && selSeatList.length < 4) {//你是可选，点击一下 变成已选 （往数组中添加座位）
            $(this).removeClass("selectable-example");
            $(this).addClass("selected-example");
            selSeatList.push({ seatX, seatY });
        } else if ($(this).hasClass("selected-example")) {//是已选   点击一下 变成 可选   从数组中删除座位
            $(this).removeClass("selected-example");
            $(this).addClass("selectable-example");
            selSeatList = selSeatList.filter(item => {
                return !(item.seatX == seatX && item.seatY == seatY);
            });
        } else {
            alert("一次最多只能购买4张票");
        }
        //回显数组数据
        let selSeatStr = ``;
        for (let seat of selSeatList) {
            selSeatStr += `<span class="ticket">${seat.seatX}排${seat.seatY}座</span>`;
        }
        $(".ticket-container").html(selSeatStr);
        //显示价格:
        totalPrice = temp.price * selSeatList.length;
        temp.totalPrice = totalPrice;
        $(".price").html(totalPrice);
    });
}

// 2. sure buy seat btn click
function buySeatButton(params) {
    $(".confirm-btn").click(function (e) {
        e.preventDefault();
        // jump to alipay page 
        let orderId = Date.now();
        temp.orderId = orderId;
        axios(`http://localhost:3000/user/pay`, { temp }).then(async res => {
            let orderInfoList = {};
            // ##TODO user id
            orderInfoList.userId = userId;
            orderInfoList.price = totalPrice;
            orderInfoList.orderId = orderId;
            orderInfoList.startTime = new Date().Format("yyyy-MM-dd HH:mm");
            orderInfoList.filmId = temp.filmId;
            orderInfoList.filmCount = selSeatList.length;
            orderInfoList.roomId = temp.roomId;
            let selSeatListToString = "";
            selSeatList.forEach(element => {
                let temp = element.seatX + "_" + element.seatY;
                selSeatListToString += temp + "-";
            });
            selSeatListToString = selSeatListToString.substr(0, selSeatListToString.length - 1);
            orderInfoList.roomSeat = selSeatListToString;
            orderInfoList.cinemaId = temp.cinemaId;
            orderInfoList.status = "unPay";
            window.parent.location.href = res;
            // record order info
            axios(`http://localhost:3000/order/insertOrder`, "post", orderInfoList).then(res => {
                console.log(res);
            })
        })
    });
}

// 2.1 get userId by userName
let userId;
function getUserIdByName(name) {
    axios(`http://localhost:3000/user/getUserIdByName`, { name }).then(res => {
        userId = res[0]?._id;
        // console.log(userId);
    });
    // return userId;
}

let name = $.cookie("userName");
getUserIdByName(name);

// test
import { judgeIsUserLogined } from "./util/myUtil.js";
judgeIsUserLogined();
