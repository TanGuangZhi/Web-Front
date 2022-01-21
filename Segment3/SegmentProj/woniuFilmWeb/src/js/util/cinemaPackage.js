/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-15 11:54:23 Sat
 * @LastEditTime: 2022-01-20 19:49:36 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */

// jquery
// axios
import { axios } from "./axios.js";
import { showImg } from "./showImg.js";

// ## main content
// 1. query
let cinemaArr;
function queryCinema(nowPage = 1) {
    $('[name=nowPage]').val(nowPage);
    $("#allId").prop("checked", false);
    axios("http://localhost:3000/cinema/query", "post", $('#searchForm').serialize()).then(res => {
        let str = ``;
        cinemaArr = res.queryResult;
        for (let cinema of res.queryResult) {
            str += ` <tr>
                        <td> <input type="checkbox" class="sel"  value="${cinema._id}"></td>
                        <td>${cinema._id}</td>
                        <td>${cinema.name}</td>
                        <td>${cinema.address}</td>
                        <td>${cinema.phone}</td>
                        <td><img src="http://localhost:3000/${cinema.img}" width="40px"></td>
                        <td>${cinema.district[0].name}</td>
                        <td><button type="button" class="btn btn-danger delCinema"  data-cinema-id="${cinema._id}"><span class="glyphicon glyphicon-remove"></span> 删除</button></td>
                        <td><button type="button" data-show-cinema-id="${cinema._id}" data-toggle="modal" data-target="#updateModal" class="btn btn-primary showCinema"><span class="glyphicon glyphicon-edit"></span> 修改</button></td>
                        </tr>`;
        }
        $("#showTab").html(str);

        let pageStr = `<li  class="page-item  changePage" data-change-page-id="-1" ><a href="javascript:void(0)" class="page-link" >&laquo;</a></li>`;
        for (let i = 1; i <= res.lastPage; i++) {
            pageStr += `<li class="page-item changePage" data-change-page-id="${i}"><a href="javascript:void(0)" class="page-link">${i}</a></li>`;
        }
        pageStr += `<li class="page-item  changePage" data-change-page-id="-2"><a href="javascript:void(0)" class="page-link" >&raquo;</a></li>`;
        $(".pagination").html(pageStr);

        delCinema();
        changePage();
        showCinema();
        checkAll();
    });
}

queryCinema();

// 1.2. Multiple conditional search
$("#searchBtn").click(() => {
    queryCinema();
    $("#sortId").val(0);
});

// 1.3. sort
$("#sortId").change(() => {
    queryCinema();
});

// 1.4. pageCount change
$("#pageCount").change(() => {
    queryCinema();
});

// 1.5. pagination
let changePage = function () {
    $(".changePage").click(function (e) {
        e.preventDefault();
        let nowPage = $(this).attr("data-change-page-id");
        queryCinema(nowPage);
    });
}

// 1.6. get all district
function getDistrict() {
    axios("http://localhost:3000/cinema/queryDistrict").then(res => {
        let str = `<option value="0">请选择区域</option>`;
        res.forEach(element => {
            str += `<option value="${element._id}">${element.name}</option>`;
        });
        $('[name=districtId]').html(str);
    })
}
getDistrict();

$("#addFile").change(function () {
    showImg(this, $("#addImg")[0])
})

$("#updateFile").change(function () {
    showImg(this, $("#updateImg")[0])
})

// 2. insert
$("#addForm").submit(function (e) {
    e.preventDefault();
    axios("http://localhost:3000/cinema/insert", "post", false, new FormData($("#addForm")[0])).then(res => {
        if (res == "1") {
            // $("#addModal").modal("hide");
            queryCinema();
        } else {
            alert("添加失败");
        }
    })
});

// 3. del
let delCinema = function () {
    $(".delCinema").click(function (e) {
        let _id = $(this).attr("data-cinema-id");
        axios("http://localhost:3000/cinema/delete", "post", { "idArray": _id }, "text").then(res => {
            if (res == "1") {
                queryCinema();
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
            axios("http://localhost:3000/cinema/delete", "post", "text", { "idArray": idArray.toString() }).then(res => {
                if (res == "1") {
                    queryCinema();
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
let showCinema = function () {
    $(".showCinema").click(function (e) {
        let _id = $(this).attr("data-show-cinema-id");
        let newArr = cinemaArr.find(item => item._id == _id);
        $("#updateForm [name=_id]").val(newArr._id);
        $("#updateForm [name=name]").val(newArr.name);
        $("#updateForm [name=phone]").val(newArr.phone);
        $("#updateForm [name=address]").val(newArr.address);
        $("#updateForm img").attr("src", `../${newArr.img}`);
        $("#updateForm [name=oldImg]").val(newArr.cinemaImg);
    });
}

$("#updateCinemaBtn").click(function () {
    axios("http://localhost:3000/cinema/update", "post", false, new FormData($("#updateForm")[0])).then(res => {
        if (res == "1") {
            // #TODO this way will error , don't know why
            // $("#updateModal").modal("hide");
            queryCinema();
        } else {
            alert("修改失败");
        }
    });
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
