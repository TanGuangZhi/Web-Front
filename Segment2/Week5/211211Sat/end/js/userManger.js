let userList;
let userInfoLastId = JSON.parse(localStorage.getItem("userInfoLastId"));
let allInfoList2 = JSON.parse(localStorage.getItem("allInfoList"));
// 查询
function queryUser(page, limitFlag) {
    // page不传值则默认指定为1
    page = page ?? 1;
    // 获取限制条件
    let userName = $('#userName').val();
    let userType = $('#userType').val();

    let limit;
    if (limitFlag) {
        limit = { userName: userName, userType: userType };
    }
    $.ajax({
        url: "/end/queryUser",
        data: { "nowPage": page, "limit":limit },
        dataType: "json",
        type: "post",
        success: function (response) {
            let str = ``;
            userList = response.list;
            userList.forEach((element, index) => {
                str += ` <tr>
                                 <td>
                                     <label><input type="checkbox" data-index=${index} data-id=${element.userId} onclick="checkChildFlag(this.checked)" class="sel form-check-input mt-0"></label>
                                 </td>
                                 <th scope="row">${element.userId}</th>
                                 <td>${element.userName}</td>
                                 <td><img src="${unescape((element.userAvatar))}" class="rounded-circle" style="width: 40px;" alt="" ></td>
                                 <td>${element.userType}</td>
                                 <td> <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changeUser"
                                    data-bs-whatever="@mdo" data-index=${index} onclick="changeUser(this,${index})" data-id=${element.userId}>修改</button></td>
                                 <td><button class="btn btn-warning delGoodsBtn" onclick="delUser(this,${element.userId})">删除</button> </td>
                                 <td><button class="btn btn-light upMove" onclick="upMove(this)">上移</button>
                                     <button class="btn btn-light downMove" onclick="downMove(this)">下移</button>
                                     </td>
                             </tr>`;
            });
            $("#showUser").html(str);
            getAllTypes();
            disabledBtnInit();
            queryPage(response.nowPage);

        }
    });

}

$("#searchBtn").click(function (e) {
    queryUser(null, true);
});

// 带条件查询
function queryByRules() {
    // 获取限制条件
    let name = $('#userName').val();
    let type = $('#userType').val();
    // let checkStatus = $('#checkStatus').val();
    // console.log(`${type}`);
    // console.log(`${checkStatus}`);
    let userSearchedByRulesArr = [];
    allInfoList2.forEach(element => {
        // 使用indexof实现名字模糊查询
        let nameTemp = element.userName.indexOf(name) != -1 || !name;
        // 此处逻辑:如果已有数组中类型等于界面输入,OK
        // 或者界面输入的是空字符串,代表查询全部,则也OK
        let typeTemp = element.userType == type || !type;
        // let statusTemp = element.checkStatus == checkStatus || !checkStatus;
        if (nameTemp && typeTemp) {
            userSearchedByRulesArr.push(element);
        }

    });
    return userSearchedByRulesArr.slice(0, 10);
}


// 查询一共要生成多少页码
function queryPage(nowPage) {
    $.ajax({
        url: "/end/queryPage",
        success: function (pageNum) {
            console.log(pageNum);
            let str = ``;
            str += ` <li class="page-item"><a class="page-link" onclick="changePage(-3)"">上一页</a></li>`;
            for (let i = 1; i <= pageNum; i++) {
                if (i == 1) {
                    str += `<li class="page-item active"><a class="page-link" href="#" onclick="changePage(${i})" >${i}</a></li>`;
                    continue;
                }
                str += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${i})" >${i}</a></li>`;
            }
            str += `<li class="page-item"><a class="page-link" onclick="changePage(-2)"">下一页</a></li>`;
            $("#pageFoot").html(str);
            pageNumActiveControl(nowPage);
        }
    });
}


//点击数字页码完成翻页功能
let globalNowPage = 1;
function changePage(nowPage) {
    globalNowPage = nowPage;
    queryUser(globalNowPage);

}

// 控制分页数字active字样
function pageNumActiveControl(pageNumForActive) {
    $('#pageFoot li').removeClass("active");
    $('#pageFoot li').eq(pageNumForActive).addClass("active");
}

// 获取所有用户类型
function getAllTypes(params) {
    let typeArr = [];
    let str = `<option  value="">全部</option>`;
    allInfoList2.forEach(element => {
        if (typeArr.indexOf(element.userType) === -1) {
            typeArr.push(element.userType);
            str += `<option>${element.userType}</option>`;
        }
    });
    $("#userType,#changeUserTypeId,#addUserTypeId").html(str);
    return typeArr;
}

// 上移下移特殊行置灰
function disabledBtnInit() {
    $('tr .upMove,.downMove').prop("disabled", false);
    $('tr .upMove').first().prop("disabled", true);
    $('tr .downMove').last().prop("disabled", true);
}

// 上移下移行
function upMove(params) {
    let nowTr = $(params).parent().parent();
    let prevTr = nowTr.prev();
    prevTr.before(nowTr);
    disabledBtnInit();
}

function downMove(params) {
    let nowTr = $(params).parent().parent();
    let nextTr = nowTr.next();
    nowTr.before(nextTr);
    disabledBtnInit();
}

// 删除
function delUser(params, id) {
    $.ajax({
        type: "post",
        url: "/end/deleteUser",
        data: `index=${id - 1}`,
        dataType: "json",
        success: function (response) {
            // console.log(`${response}`);
            if (response.status == 200) {
                queryUser();
                disabledBtnInit();
            }
        }
    });
}

// 批量删除
$('#delByBatchBtn').on("click", function () {
    let delArr = [];

    $('.sel').each(function () {
        if ($(this).prop("checked")) {
            delArr.push($(this).attr("data-id") - 1);
        }
    });
    let isOk = confirm("您确定要删除吗?");//点击确定 true  取消 false
    if (isOk) {
        if (delArr.length == 0) {
            alert("请先选择...");
        } else {
            $.ajax({
                type: "post",
                url: "/end/deleteUserBatch",
                data: { "delArr": delArr.join(",") },
                dataType: "json",
                success: function (response) {
                    queryUser();
                    disabledBtnInit();
                }
            });
        }
    }
})

// 添加商品模态框中添加按钮触发事件
$("#addUser #addUserBtn").click(function () {
    $.ajax({
        type: "post",
        url: "/end/addUser",
        data: {
            "userId": userInfoLastId + 1,
            "userName": $("#addUserNameId").val(),
            "userType": $("#addUserTypeId").val(),
            "userAvatar": $("#addUserImgId").val(),
            "userStatus": "right"
        },
        dataType: "json",
        success: function (response) {
            queryUser();
            disabledBtnInit();
            alert("添加成功");
        }
    });

})

// 修改电影
// 模态框按钮点击
function changeUser(params, index) {
    // 回显数据
    $("#changeUserNameId").val($("#showUser tr").eq(index).find("td").eq(1).html());
    $("#changeUserTypeId").val($("#showUser tr").eq(index).find("td").eq(3).html());
    console.log($("#showUser tr").eq(index).find("td").find("img").attr("src"));
    $(".showBackImg").attr("src", $("#showUser tr").eq(index).find("td").find("img").attr("src"));
    $("#changeUserImgId").val($("#showUser tr").eq(index).find("td").find("img").attr("src"));
    $(".alertMsgSpan").html("*");
    $(".alertMsgSpan").css("color", "");

    allRegCheckFlagList = [false];
    // 获取行id
    let rowId = $(params).attr("data-id");
    // 展示id
    $("#changeUserIdId").val(rowId);
    // 获取行索引
    // goodsIndex = $(params).attr("data-index");
}
// 修改值
$('#changeUserBtn').click(function () {
    $.ajax({
        type: "post",
        url: "/end/updateUser",
        data: {
            "userId": $("#changeUserIdId").val(),
            "userName": $("#changeUserNameId").val(),
            "userType": $("#changeUserTypeId").val(),
            "userAvatar": $("#changeUserImgId").val(),
            "userStatus": "right",
        },
        dataType: "json",
        success: function (response) {
            queryUser();
            disabledBtnInit();
        }
    });
})
// 上传随机图片
$(".uploadImgBtn").click(function () {
    console.log(1);
    let imgRandom = parseInt(Math.random() * 15);
    $(this).parent().parent().find("input").val(`./img/avatar/userAvatar${imgRandom}.png`);
    $(".showBackImg").attr("src", `./img/avatar/userAvatar${imgRandom}.png`)
})


queryUser();