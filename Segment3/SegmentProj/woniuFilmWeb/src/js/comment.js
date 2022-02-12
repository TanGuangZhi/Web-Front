/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-09 20:23:05 Wed
 * @LastEditTime: 2022-02-09 21:21:25 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import { axios } from "./util/axios.js";
import { formatDate } from "./util/myUtil.js";
import "../css/comment.min.css";

let url = window.location.href;
// alert(url);
let temp = converter(url.split("?")[1]);
// console.log(temp);

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

$("#comment-btn").click(function (e) {
    e.preventDefault();
    let data = {};
    data.commentContent = $("#comment-content").val();
    data.filmId = temp.filmId;
    data.score = $(".score-rating").html();
    data.time = new Date().Format("yyyy-MM-dd HH:mm");
    data.userId = temp.userId;
    data.orderId = temp.orderId;
    console.log(data);
    axios("http://localhost:3000/comment/insertComment", { data }).then(res => {
        console.log(res);
        alert("评论成功!");
    });
});

var starClicked = false;

$(function () {

    $('.star').click(function () {

        $(this).children('.selected').addClass('is-animated');
        $(this).children('.selected').addClass('pulse');

        var target = this;

        setTimeout(function () {
            $(target).children('.selected').removeClass('is-animated');
            $(target).children('.selected').removeClass('pulse');
        }, 1000);

        starClicked = true;
    })

    $('.half').click(function () {
        if (starClicked == true) {
            setHalfStarState(this)
        }
        $(this).closest('.rating').find('.js-score').text($(this).data('value'));

        $(this).closest('.rating').data('vote', $(this).data('value'));
        calculateAverage()
        console.log(parseInt($(this).data('value')));

    })

    $('.full').click(function () {
        if (starClicked == true) {
            setFullStarState(this)
        }
        $(this).closest('.rating').find('.js-score').text($(this).data('value'));

        $(this).find('js-average').text(parseInt($(this).data('value')));

        $(this).closest('.rating').data('vote', $(this).data('value'));
        calculateAverage()

        console.log(parseInt($(this).data('value')));
    })

    $('.half').hover(function () {
        if (starClicked == false) {
            setHalfStarState(this)
        }

    })

    $('.full').hover(function () {
        if (starClicked == false) {
            setFullStarState(this)
        }
    })

})

function updateStarState(target) {
    $(target).parent().prevAll().addClass('animate');
    $(target).parent().prevAll().children().addClass('star-colour');

    $(target).parent().nextAll().removeClass('animate');
    $(target).parent().nextAll().children().removeClass('star-colour');
}

function setHalfStarState(target) {
    $(target).addClass('star-colour');
    $(target).siblings('.full').removeClass('star-colour');
    updateStarState(target)
}

function setFullStarState(target) {
    $(target).addClass('star-colour');
    $(target).parent().addClass('animate');
    $(target).siblings('.half').addClass('star-colour');

    updateStarState(target)
}

function calculateAverage() {
    var average = 0

    $('.rating').each(function () {
        average += $(this).data('vote')
    })

    $('.js-average').text((average / $('.rating').length).toFixed(1))
}
