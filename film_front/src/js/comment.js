/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-09 20:23:05 Wed
 * @LastEditTime: 2022-02-19 16:13:07 Sat
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
    if (data.commentContent.trim().length < 5) {
        alert("请输入不少于5字的评论");
        return;
    }
    data.filmId = temp.filmId;
    data.score = $("#rating").html();
    data.time = new Date().Format("yyyy-MM-dd HH:mm");
    data.userId = temp.userId;
    data.orderId = temp.orderId;
    console.log(data);
    axios("http://localhost:3000/comment/insertComment", { data }).then(res => {
        console.log(res);
        alert("评论成功!");
    });
});

$("[type=radio]").change(function (e) {
    e.preventDefault();
    let rating = $(this).val();
    $("#rating").html(rating);
});
