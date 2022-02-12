/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-15 11:54:23 Sat
 * @LastEditTime: 2022-02-11 11:14:27 Fri
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
let userArr;
function queryUser(nowPage = 1) {
    $('[name=nowPage]').val(nowPage);
    $("#allId").prop("checked", false);
    console.log(1);
    axios("http://localhost:3000/user/queryUser", "post", $("#searchForm").serialize()).then(res => {
        let str = ``;
        console.log(res);
        userArr = res.queryResult;
        for (let user of res.queryResult) {
            str += ` <tr>
                        <td> <input type="checkbox" class="sel"  value="${user._id}"></td>
                        <td>${user._id}</td>
                        <td>${user.name}</td>
                        <td><img src="http://localhost:3000/${user.avatar}" width="40px"></td>
                        <td>${user.score}</td>
                        <td>${user.state}</td>
                        <td>${user.phone}</td>
                        <td>${user.email}</td>
                        <td>${user.uuid}</td>
                        <td><button type="button" class="btn btn-danger delUser"  data-user-id="${user._id}"><span class="glyphicon glyphicon-remove"></span> 删除</button></td>
                        <td><button type="button" data-show-user-id="${user._id}" data-toggle="modal" data-target="#updateModal" class="btn btn-primary showUser"><span class="glyphicon glyphicon-edit"></span> 修改</button></td>
                        </tr>`;
        }
        $("#showTab").html(str);

        let pageStr = `<li  class="page-item  changePage" data-change-page-id="-1" ><a href="javascript:void(0)" class="page-link" >&laquo;</a></li>`;
        for (let i = 1; i <= res.lastPage; i++) {
            pageStr += `<li class="page-item changePage" data-change-page-id="${i}"><a href="javascript:void(0)" class="page-link">${i}</a></li>`;
        }
        pageStr += `<li class="page-item  changePage" data-change-page-id="-2"><a href="javascript:void(0)" class="page-link" >&raquo;</a></li>`;
        $(".pagination").html(pageStr);

        delUser();
        changePage();
        showUser();
        checkAll();
    });
}

queryUser();

// 1.2. Multiple conditional search
$("#searchBtn").click(() => {
    queryUser();
    $("#sortId").val(0);
});

// 1.3. sort
$("#sortId").change(() => {
    queryUser();
});

// 1.4. pageCount change
$("#pageCount").change(() => {
    queryUser();
});

// 1.5. pagination
let changePage = function () {
    $(".changePage").click(function (e) {
        e.preventDefault();
        let nowPage = $(this).attr("data-change-page-id");
        queryUser(nowPage);
    });
}


// 2. insert
$("#addForm").submit(function (e) {
    e.preventDefault();
    axios("http://localhost:3000/user/insertUser", "post", false, new FormData($("#addForm")[0])).then(res => {
        if (res == "1") {
            // $("#addModal").modal("hide");
            alert("添加成功");
            queryUser();
        } else {
            alert("添加失败");
        }
    })
});

// 3. del
let delUser = function () {
    $(".delUser").click(function (e) {
        let _id = $(this).attr("data-user-id");
        axios("http://localhost:3000/user/deleteUser", "post", { "idArray": _id }, "text").then(res => {
            if (res == "1") {
                queryUser();
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
            axios("http://localhost:3000/user/deleteUser", "post", "text", { "idArray": idArray.toString() }).then(res => {
                if (res == "1") {
                    queryUser();
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
let showUser = function () {
    $(".showUser").click(function (e) {
        let _id = $(this).attr("data-show-user-id");
        let newArr = userArr.find(item => item._id == _id);
        $("#updateForm [name=_id]").val(newArr._id);
        $("#updateForm [name=userName]").val(newArr.name);
        $("#updateForm [name=userPhone]").val(newArr.phone);
        $("#updateForm img").attr("src", `../${newArr.img}`);
        $("#updateForm [name=oldImg]").val(newArr.img);
    });
}

$("#updateUserBtn").click(function () {
    axios("http://localhost:3000/user/updateUser", "post", false, new FormData($("#updateForm")[0])).then(res => {
        if (res == "1") {
            // #TODO this way will error , don't know why
            // $("#updateModal").modal("hide");
            alert("修改成功");
            queryUser();
        } else {
            alert("修改失败");
        }
    });
});

// 5. upload file
$("#uploadFileBtn").click(function (e) {
    e.preventDefault();
    axios("http://localhost:3000/user/uploadFile", "post", false, new FormData($("#uploadForm")[0])).then(res => {
        console.log(res);
        if (res == "1") {
            // #TODO this way will error , don't know why
            // $("#updateModal").modal("hide");
            alert("批量上传成功");
            queryUser();
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

$("#addFile").change(function () {
    showImg(this, $("#addImg")[0]);
})

let checkAll = () => {
    $('.sel').click(() => {
        $("#allId").prop("checked",
            $('.sel:checked').length == $(".sel").length);
    })
}
