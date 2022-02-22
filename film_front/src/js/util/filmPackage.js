/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-15 11:54:23 Sat
 * @LastEditTime: 2022-02-11 12:04:09 Fri
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
let filmArr;
function queryFilm(nowPage = 1) {
    $('[name=nowPage]').val(nowPage);
    $("#allId").prop("checked", false);
    axios("http://localhost:3000/film/query", "post", $('#searchForm').serialize()).then(res => {
        let str = ``;
        filmArr = res.queryResult;
        // console.log(filmArr);
        for (let film of res.queryResult) {
            str += ` <tr>
                        <td> <input type="checkbox" class="sel"  value="${film._id}"></td>
                        <td>${film._id}</td>
                        <td>${film.name}</td>
                        <td>${film.typeIdToName[0]?.type}</td>
                        <td>${film.price}</td>
                        <td>${film.districtIdToName[0]?.type}</td>
                        <td><img src="http://localhost:3000/${film.img}" width="40px"></td>
                        <td>${film.startTime}</td>
                        <td>${film.director}</td>
                        <td>${film.timeCount}分钟</td>
                        <td><button type="button" class="btn btn-danger delFilm"  data-film-id="${film._id}"><span class="glyphicon glyphicon-remove"></span> 删除</button></td>
                        <td><button type="button" data-show-film-id="${film._id}" data-toggle="modal" data-target="#updateModal" class="btn btn-primary showFilm"><span class="glyphicon glyphicon-edit"></span> 修改</button></td>
                        </tr>`;
        }
        $("#showTab").html(str);

        let pageStr = `<li  class="page-item  changePage" data-change-page-id="-1" ><a href="javascript:void(0)" class="page-link" >&laquo;</a></li>`;
        for (let i = 1; i <= res.lastPage; i++) {
            pageStr += `<li class="page-item changePage" data-change-page-id="${i}"><a href="javascript:void(0)" class="page-link">${i}</a></li>`;
        }
        pageStr += `<li class="page-item  changePage" data-change-page-id="-2"><a href="javascript:void(0)" class="page-link" >&raquo;</a></li>`;
        $(".pagination").html(pageStr);

        delFilm();
        changePage();
        showFilm();
        checkAll();
    });
}

queryFilm();



// 1.2. Multiple conditional search
$("#searchBtn").click(() => {
    queryFilm();
    $("#sortId").val(0);
});

// 1.3. sort
$("#sortId").change(() => {
    queryFilm();
});

// 1.4. pageCount change
$("#pageCount").change(() => {
    queryFilm();
});

// 1.5. pagination
let nowPage = 1;
let changePage = function () {
    $(".changePage").click(function (e) {
        e.preventDefault();
        nowPage = $(this).attr("data-change-page-id");
        queryFilm(nowPage);
    });
}

// 1.6. get all district
function getAllDistrict() {
    axios("http://localhost:3000/film/queryDistrict").then(res => {
        let str = `<option value="">请选择区域</option>`;
        res.forEach(element => {
            str += `<option value="${element._id}">${element.type}</option>`;
        });
        $('[name=districtId]').html(str);
    })
}
getAllDistrict();

// 1.6.2. get all type
function getAllType() {
    axios("http://localhost:3000/film/queryType").then(res => {
        let str = `<option value="">请选择类型</option>`;
        res.forEach(element => {
            str += `<option value="${element._id}">${element.type}</option>`;
        });
        $('[name=typeId]').html(str);
    });
}
getAllType();



// 2. insert
$("#addForm").submit(function (e) {
    e.preventDefault();
    axios("http://localhost:3000/film/insert", "post", false, new FormData($("#addForm")[0])).then(res => {
        console.log(res);
        if (res == "1") {
            // $("#addModal").modal("hide");
            alert("添加成功");
            queryFilm(nowPage);
        } else {
            alert("添加失败");
        }
    });
});

// 3. del
let delFilm = function () {
    $(".delFilm").click(function (e) {
        let _id = $(this).attr("data-film-id");
        axios("http://localhost:3000/film/delete", "post", { "idArray": _id }, "text").then(res => {
            if (res == "1") {
                queryFilm(nowPage);
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
            axios("http://localhost:3000/film/delete", "post", "text", { "idArray": idArray.toString() }).then(res => {
                if (res == "1") {
                    queryFilm(nowPage);
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
let showFilm = function () {
    $(".showFilm").click(function (e) {
        let _id = $(this).attr("data-show-film-id");
        let newArr = filmArr.find(item => item._id == _id);
        $("#updateForm [name=_id]").val(newArr._id);
        $("#updateForm [name=name]").val(newArr.name);
        $("#updateForm [name=price]").val(newArr.price);
        $("#updateForm [name=startTime]").val(newArr.startTime);
        $("#updateForm [name=director]").val(newArr.director);
        $("#updateForm [name=timeCount]").val(newArr.timeCount);
        $("#updateForm img").attr("src", `http://localhost:3000/${newArr.img}`);
        $("#updateForm [name=oldImg]").val(newArr.img);
    });
}

$("#updateForm").submit(function () {
    axios("http://localhost:3000/film/update", "post", false, new FormData($("#updateForm")[0])).then(res => {
        if (res == "1") {
            // #TODO this way will error , don't know why
            // $("#updateModal").modal("hide");
            alert("修改成功");
            queryFilm(nowPage);
        } else {
            alert("修改失败");
        }
    });
});

// 5. upload file
$("#uploadFileBtn").click(function (e) {
    e.preventDefault();
    axios("http://localhost:3000/film/uploadFile", "post", false, new FormData($("#uploadForm")[0])).then(res => {
        console.log(res);
        if (res == "1") {
            // #TODO this way will error , don't know why
            // $("#updateModal").modal("hide");
            alert("批量上传成功");
            queryFilm();
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
