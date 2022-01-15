/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-14 19:50:07 Fri
 * @LastEditTime: 2022-01-15 15:57:43 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */

import { $ } from "./util/jquery-3.5.1.js";
import { axios } from "./util/axios.js";
// import { book } from "./book.js";

// book();
// 0. queryStu
let stuArr;
function queryStu(nowPage = 1) {
    $('[name=nowPage]').val(nowPage);
    $("#allId").prop("checked", false);
    axios("/stu/queryStu", "post", $("#searchForm").serialize()).then(res => {
        let str = ``;
        stuArr = res.queryResult;
        for (let stu of res.queryResult) {
            str += ` <tr>
                        <td> <input type="checkbox" class="sel"  value="${stu._id}"></td>
                        <td>${stu._id}</td>
                        <td>${stu.stuName}</td>
                        <td>${stu.stuTime}</td>
                        <td>${stu.stuType}</td>
                        <td><img src="../${stu.stuImg}" width="40px"></td>
                        <td>${stu.stuSalary}</td>
                        <td><button type="button" class="btn btn-danger delStu"  data-stu-id="${stu._id}"><span class="glyphicon glyphicon-remove"></span> 删除</button></td>
                        <td><button type="button" data-show-stu-id="${stu._id}" data-toggle="modal" data-target="#updateModal" class="btn btn-primary showStu"><span class="glyphicon glyphicon-edit"></span> 修改</button></td>
                        </tr>`;
        }
        $("#showTab").html(str);

        let pageStr = `<li  class="changePage" data-change-page-id="-1" ><a href="javascript:void(0)" >&laquo;</a></li>`;
        for (let i = 1; i <= res.lastPage; i++) {
            pageStr += `<li class="changePage" data-change-page-id="${i}"><a href="javascript:void(0)">${i}</a></li>`;
        }
        pageStr += `<li class="changePage" data-change-page-id="-2"><a href="javascript:void(0)" >&raquo;</a></li>`;
        $(".pagination").html(pageStr);

        delStu();
        changePage();
        showStu();
        checkAll();
    });
}

queryStu();
getAllStuType();

// 0.1 get all stu learn type
function getAllStuType(stuList) {
    axios("/stu/getAllStuType").then((res) => {
        let str = `<option value="">请选择方向</option>`;
        res.forEach((element) => {
            str += `  <option value="${element._id}">${element.name}</option>`;
        })
        $('[name=stuType]').html(str)
    })
}

// 0.2. Multiple conditional search
$("#searchBtn").click(() => {
    alert(1);
    queryStu();
    $("#sortId").val(0);
});

// 0.3. sort
$("#sortId").change(() => {
    queryStu();
});

// 0.4. pageCount change
$("#pageCount").change(() => {
    queryStu();
});

// 0.5. pagination
let changePage = function () {
    $(".changePage").click(function (e) {
        e.preventDefault();
        let nowPage = $(this).attr("data-change-page-id");
        queryStu(nowPage);
    });
}

queryStu();

// 1. del
let delStu = function () {
    $(".delStu").click(function (e) {
        console.log(1);
        let _id = $(this).attr("data-stu-id");
        axios("/stu/deleteStu", "post", { "idArray": _id }, "text").then(res => {
            if (res == "1") {
                queryStu();
            } else {
                alert("删除失败");
            }
        });

    });
}
// 1.1 del by batch
$("#deleteManyId").click(function () {
    if (confirm("您确定要删除吗?")) {
        let idArray = [];
        //1.表单过滤选择器  :checked 对复选框中的结果集进行筛选  返回选中的复选框
        if ($(".sel:checked").length > 0) {//说明选中了
            $(".sel:checked").each(function () {
                idArray.push($(this).val());
            });
            axios("/stu/deleteStu", "post", "text", { "idArray": idArray.toString() }).then(res => {
                if (res == "1") {
                    queryStu();
                } else {
                    alert("批量删除失败");
                }
            });
        } else {
            alert("请先选择");
        }

    }
});

// 2. insert
$("#addForm").submit(function (e) {
    e.preventDefault();
    axios("/stu/addStu", "post", false, new FormData($("#addForm")[0]), "text").then(res => {
        if (res == "1") {
            // $("#addModal").modal("hide");
            queryStu();
        } else {
            alert("添加失败");
        }
    })
});

// 3. update
let showStu = function () {
    $(".showStu").click(function (e) {
        let _id = $(this).attr("data-show-stu-id");
        let newArr = stuArr.find(item => item._id == _id);
        $("#updateForm [name=_id]").val(newArr._id);
        $("#updateForm [name=stuName]").val(newArr.stuName);
        $("#updateForm [name=stuType]").val(newArr.stuType);
        $("#updateForm [name=stuSalary]").val(newArr.stuSalary);
        $("#updateForm [name=stuTime]").val(newArr.stuTime);
        $("#updateForm img").attr("src", `../${newArr.stuImg}`);
        $("#updateForm [name=oldImg]").val(newArr.stuImg);
    });
}

$("#updateStuBtn").click(function () {
    axios("/stu/updateStu", "post", false, new FormData($("#updateForm")[0])).then(res => {
        if (res == "1") {
            // #TODO this way will error , don't know why
            // $("#updateModal").modal("hide");
            queryStu();
        } else {
            alert("修改失败");
        }
    });
});

// 4. upload
$("#uploadFileBtn").click(function (e) {
    e.preventDefault();
    console.log(1);
    axios("/stu/uploadFile", "post", false, new FormData($("#uploadForm")[0])).then(res => {
        console.log(res);
        if (res == "1") {
            // #TODO this way will error , don't know why
            // $("#updateModal").modal("hide");
            queryStu();
        } else {
            alert("上传失败");
        }
    })
});

// 4.1. download file
$("#downloadFileBtn").click(function (e) {
    e.preventDefault();
    axios("/stu/downloadFile", $('#searchForm').serialize()).then(res => {
        console.log(res);
    })
});

// ## oth.1 sel all and better
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
