/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-15 11:54:23 Sat
 * @LastEditTime: 2022-02-11 14:22:48 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */

import { axios } from "./axios.js";
import { showImg } from "./showImg.js";

// ## main content
// 1. query
let cinemaRoomArr;
function queryCinemaRoom(nowPage = 1) {
    $('[name=nowPage]').val(nowPage);
    $("#allId").prop("checked", false);
    axios("http://localhost:3000/cinemaRoom/query", "post", $('#searchForm').serialize()).then(res => {
        let str = ``;
        cinemaRoomArr = res.queryResult;
        console.log(cinemaRoomArr);
        let tempArr = ["杜比声厅", "IMAX厅", "CGS中国巨幕厅", "杜比全景声厅", "RealD厅", "Dolby Cinema厅"];
        for (let cinemaRoom of res.queryResult) {
            let randomNum = parseInt(Math.random() * 5) + 1;
            str += ` <tr>
                        <td> <input type="checkbox" class="sel"  value="${cinemaRoom._id}"></td>
                        <td>${cinemaRoom._id}</td>
                        <td>${cinemaRoom.roomIdToDetails[0]?.name ?? tempArr[randomNum]}</td>
                        <td>${cinemaRoom.roomSize}</td>
                        <td>${cinemaRoom.roomIdToDetails[0]?.level}</td>
                        <td>${cinemaRoom.language}</td>
                        <td>${cinemaRoom.filmIdToDetails[0]?.name}</td>
                        <td>${cinemaRoom.session}</td>
                        <td>${cinemaRoom.cinemaIdToDetails[0]?.name}</td>
                        <td><button type="button" class="btn btn-danger delCinemaRoom"  data-cinemaRoom-id="${cinemaRoom._id}"><span class="glyphicon glyphicon-remove"></span> 删除</button></td>
                        <td><button type="button" data-show-cinemaRoom-id="${cinemaRoom._id}" data-toggle="modal" data-target="#updateModal" class="btn btn-primary showCinemaRoom"><span class="glyphicon glyphicon-edit"></span> 修改</button></td>
                        </tr>`;
        }
        $("#showTab").html(str);

        let pageStr = `<li  class="page-item  changePage" data-change-page-id="-1" ><a href="javascript:void(0)" class="page-link" >&laquo;</a></li>`;
        for (let i = 1; i <= res.lastPage; i++) {
            pageStr += `<li class="page-item changePage" data-change-page-id="${i}"><a href="javascript:void(0)" class="page-link">${i}</a></li>`;
        }
        pageStr += `<li class="page-item  changePage" data-change-page-id="-2"><a href="javascript:void(0)" class="page-link" >&raquo;</a></li>`;
        $(".pagination").html(pageStr);

        delCinemaRoom();
        changePage();
        showCinemaRoom();
        checkAll();
    });
}

queryCinemaRoom();

// 1.2. Multiple conditional search
$("#searchBtn").click(() => {
    queryCinemaRoom();
    $("#sortId").val(0);
});

// 1.3. sort
$("#sortId").change(() => {
    queryCinemaRoom();
});

// 1.4. pageCount change
$("#pageCount,#cinemaId").change(() => {
    queryCinemaRoom();
});

// 1.5. pagination
let nowPage = 1;
let changePage = function () {
    $(".changePage").click(function (e) {
        e.preventDefault();
        nowPage = $(this).attr("data-change-page-id");
        queryCinemaRoom(nowPage);
    });
}

// 1.6.1. get all cinema
function getCinema() {
    axios("http://localhost:3000/cinemaRoom/queryCinema").then(res => {
        let str = `<option value="">请选择影院</option>`;
        res.forEach(element => {
            str += `<option value="${element._id}">${element.name}</option>`;
        });
        $('[name=cinemaId]').html(str);
    })
}
getCinema();

// 1.6.2. get all roomLevel
function getRoomLevel() {
    axios("http://localhost:3000/cinemaRoom/queryRoomLevel").then(res => {
        let str = `<option value="">请选择级别</option>`;
        res.forEach(element => {
            str += `<option value="${element._id}">${element._id}</option>`;
        });
        $('[name=roomLevel]').html(str);
    })
}
getRoomLevel();

// 1.6.3. get all film
function getFilm() {
    axios("http://localhost:3000/cinemaRoom/queryFilm").then(res => {
        let str = `<option value="">请选择电影</option>`;
        res.forEach(element => {
            str += `<option value="${element._id}">${element.name}</option>`;
        });
        $('[name=filmId]').html(str);
    })
}
getFilm();

// 2. insert
$("#addForm").submit(function (e) {
    e.preventDefault();
    axios("http://localhost:3000/cinemaRoom/insert", "post", $('#addForm').serialize()).then(res => {
        console.log(res);
        if (res == "1") {
            // $("#addModal").modal("hide");
            alert("添加成功");
            queryCinemaRoom(nowPage);
        } else {
            alert("添加失败");
        }
    })
});

// 3. del
let delCinemaRoom = function () {
    $(".delCinemaRoom").click(function (e) {
        let _id = $(this).attr("data-cinemaRoom-id");
        axios("http://localhost:3000/cinemaRoom/delete", "post", { "idArray": _id }, "text").then(res => {
            if (res == "1") {
                queryCinemaRoom(nowPage);
            } else {
                alert("删除失败");
            }
        });

    });
}
// 3.1 del by batch
$("#deleteManyId").click(function () {
    if (confirm("您确定要删除吗?")) {
        let idArray = [];
        //1.表单过滤选择器  :checked 对复选框中的结果集进行筛选  返回选中的复选框
        if ($(".sel:checked").length > 0) {//说明选中了
            $(".sel:checked").each(function () {
                idArray.push($(this).val());
            });
            axios("http://localhost:3000/cinemaRoom/delete", "post", "text", { "idArray": idArray.toString() }).then(res => {
                if (res == "1") {
                    queryCinemaRoom(nowPage);
                } else {
                    alert("批量删除失败");
                }
            });
        } else {
            alert("请先选择");
        }

    }
});

// 4. update
let showCinemaRoom = function () {
    $(".showCinemaRoom").click(function (e) {
        let _id = $(this).attr("data-show-cinemaRoom-id");
        let newArr = cinemaRoomArr.find(item => item._id == _id);
        $("#updateForm [name=_id]").val(newArr._id);
        $("#updateForm [name=roomId]").val(newArr.roomId);
        $("#updateForm [name=roomName]").val(newArr.roomIdToDetails[0].name);
        $("#updateForm [name=roomSize]").val(newArr.roomSize);
        $("#updateForm [name=language]").val(newArr.language);
        $("#updateForm [name=session]").val(newArr.session);
    });
}

$("#updateForm").submit(function (e) {
    e.preventDefault();
    axios("http://localhost:3000/cinemaRoom/update", "post", false, new FormData($("#updateForm")[0])).then(res => {
        if (res == "1") {
            // #TODO this way will error , don't know why
            // $("#updateModal").modal("hide");
            alert("修改成功");
            queryCinemaRoom(nowPage);
        } else {
            alert("修改失败");
        }
    });
});

// 5. upload file
$("#uploadFileBtn").click(function (e) {
    e.preventDefault();
    axios("http://localhost:3000/cinemaRoom/uploadFile", "post", false, new FormData($("#uploadForm")[0])).then(res => {
        console.log(res);
        if (res == "1") {
            // #TODO this way will error , don't know why
            // $("#updateModal").modal("hide");
            alert("批量上传成功");
            queryCinemaRoom();
        } else {
            alert("上传失败");
        }
    })
});

// ## other
// oth.1. sel all and better
$("#allId").change(() => {
    $(".sel").prop("checked",
        $("#allId").prop("checked"));
});

let checkAll = () => {
    $('.sel').click(() => {
        $("#allId").prop("checked",
            $('.sel:checked').length == $(".sel").length);
    })
}

// oth.2. show img on modal
$("#addFile").change(function () {
    showImg(this, $("#addImg")[0]);
})

$("#updateFile").change(function () {
    showImg(this, $("#updateImg")[0]);
})
