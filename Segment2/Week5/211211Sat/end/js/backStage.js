// 搜索方法绑定事件
$("#searchBtn").click(function (e) {
    queryGoods("", "", true);
});


// 获取所有商品类型
function getAllTypes(params) {
    let typeArr = [];
    let str = `<option  value="">全部</option>`;
    mockMovieList.forEach(element => {
        if (typeArr.indexOf(element.movieType) === -1) {
            typeArr.push(element.movieType);
            str += `<option>${element.movieType}</option>`;
        }
    });
    $("#goodsType").html(str);
    $("#addMovieTypeId").html(str);
    // return typeArr;
}


function queryByRules() {
    // 获取限制条件
    let name = $('#goodsName').val();
    let type = $('#goodsType').val();
    // let checkStatus = $('#checkStatus').val();
    // console.log(`${type}`);
    // console.log(`${checkStatus}`);
    let goodSearchedByRulesArr = [];
    goodsJson.forEach(element => {
        // 使用indexof实现名字模糊查询
        let nameTemp = element.goodsName.indexOf(name) != -1 || !name;
        // 此处逻辑:如果已有数组中类型等于界面输入,OK
        // 或者界面输入的是空字符串,代表查询全部,则也OK
        let typeTemp = element.goodsType == type || !type;
        // let statusTemp = element.checkStatus == checkStatus || !checkStatus;
        if (nameTemp && typeTemp) {
            goodSearchedByRulesArr.push(element);
        }

    });
    return goodSearchedByRulesArr.slice(0, 10);
}





// 分页方法
let nextBtnCount = 1;
let preBtnCount = 1;
let firstIndex = 0;
let lastIndex = 10;
function nextPage(params) {
    // alert(1)
    if (lastIndex < goodsJson.length) {
        firstIndex += 10;
        lastIndex += 10;
        pageNumForActive += 1;
        queryGoods(firstIndex, lastIndex);
        pageNumActiveControl(pageNumForActive);
        disabledBtnInit();
    }

}

function prePage(params) {
    if (firstIndex > 0) {
        firstIndex -= 10;
        lastIndex -= 10;
        pageNumForActive -= 1;
        queryGoods(firstIndex, lastIndex);
        pageNumActiveControl(pageNumForActive);
        disabledBtnInit();
    }
}

// 获取分页数
function setPageFootNum(params) {
    let everyPageNum = 10;
    let totalPageNum = Math.ceil(goodsJson.length / everyPageNum);
    let str = `<li class="page-item active"><a class="page-link "  data-index="1">1</a></li>`;
    for (let index = 2; index <= totalPageNum; index++) {
        str += ` <li class="page-item"><a class="page-link"  data-index="${index}">${index}</a></li>`
    }
    $("#pageFootNum").html(str);
}



// 控制分页数字active字样
function pageNumActiveControl(pageNumForActive) {
    $('#pageFootNum li').removeClass("active");
    $('#pageFootNum li').eq(pageNumForActive).addClass("active");
}

// 全选全消
function selAll(flag) {
    $('.sel').prop("checked", flag);
}

function checkChildFlag() {
    let flag = true;
    $('.sel').each(function () {
        if (!$(this).prop("checked")) {
            return flag = false;
        }
    })
    $('#all-id').prop("checked", flag);
}

// 上移下移特殊行置灰
function disabledBtnInit() {
    $('tr .upMove,.downMove').prop("disabled", false);
    $('tr .upMove').first().prop("disabled", true);
    $('tr .downMove').last().prop("disabled", true);
}

// 添加修改电影模态框正则检测
$("#addMovie form input").eq(0).on("keyup focus blur", function () {
    checkAddMovie(0);
})
$("#addMovie form input").eq(1).on("keyup focus blur", function () {
    checkAddMovie(1);
})
$("#addMovie form select").on("change", function () {
    checkAddMovie(2);
})

$("#changeMovie form input").eq(1).on("keyup focus blur", function () {
    checkChangeMovie(1);
})
$("#changeMovie form input").eq(2).on("keyup focus blur", function () {
    checkChangeMovie(2);
})
$("#changeMovie form input").eq(3).on("keyup focus blur", function () {
    checkChangeMovie(3);
})


// 添加按钮触发事件
$("[data-bs-target='#addMovie']").click(function () {
    // 清除上一次输入的影响
    $("#addMovie #addMovieNameId").val("");
    $("#addMovie #addMoviePriceId").val("");
    $("#addMovie #addMovieTypeId").val("");
    $("#addMovie #addMovieImgId").val("");
    $(".alertMsgSpan").html("*");
    $(".alertMsgSpan").css("color", "");
})

// 添加商品模态框中添加按钮触发事件

$("#addMovie #addMovieBtn").click(function () {
    if (!checkIsCanAdd()) return;
    $.ajax({
        type: "post",
        url: "/movie/addMovie",
        data: {
            "id":mockMovieList.length+1,
            "movieName": $("#addMovieNameId").val(),
            "moviePrice": $("#addMoviePriceId").val(),
            "movieType": $("#addMovieTypeId").val(),
            "movieImg": $("#addMovieImgId").val(),
            "movieStatus":"right"
        },
        dataType: "json",
        success: function (response) {
            queryGoods();
            disabledBtnInit();
        }
    });

})

// 删除电影
function delMovie(params, id) {
    $.ajax({
        type: "post",
        url: "/movie/deleteMovie",
        data: `index=${id - 1}`,
        dataType: "json",
        success: function (response) {
            // console.log(`${response}`);
            if (response.status == 200) {
                queryGoods();
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
                url: "/movie/deleteMovieBatch",
                data: { "delArr": delArr.join(",") },
                dataType: "json",
                success: function (response) {
                    queryGoods();
                }
            });
        }
    }
})

// 修改电影
// 模态框按钮点击
function changeMovie(params, index) {
    // 回显数据
    $("#changeMovieNameId").val($("#showGoods tr").eq(index).find("td").eq(1).html());
    $("#changeMoviePriceId").val($("#showGoods tr").eq(index).find("td").eq(2).html());
    $("#changeMovieTypeId").val($("#showGoods tr").eq(index).find("td").eq(3).html());
    console.log(`${$("#showGoods tr").eq(index).find("td").eq(4).find("img").attr("src")}`);
    $(".showBackImg").attr("src", $("#showGoods tr").eq(index).find("td").eq(4).find("img").attr("src"));
    $("#changeMovieImgId").val($("#showGoods tr").eq(index).find("td").eq(4).find("img").attr("src"));
    $(".alertMsgSpan").html("*");
    $(".alertMsgSpan").css("color", "");

    allRegCheckFlagList = [false];
    // 获取行id
    let rowId = $(params).attr("data-id");
    // 展示id
    $("#changeMovieIdId").val(rowId);
    // 获取行索引
    goodsIndex = $(params).attr("data-index");
}
// 修改值
$('#changeMovieBtn').click(function () {
    if(!checkIsCanChange()) return;
    $.ajax({
        type: "post",
        url: "/movie/updateMovie",
        data: {
            "id":"",
            "movieName": $("#changeMovieNameId").val(),
            "moviePrice": $("#changeMoviePriceId").val(),
            "movieType": $("#changeMovieTypeId").val(),
            "movieImg": $("#changeMovieImgId").val(),
            "movieStatus":"right",
            "index":goodsIndex
        },
        dataType: "json",
        success: function (response) {
            queryGoods();
            disabledBtnInit();
        }
    });
})
// 上传随机图片
$(".uploadImgBtn").click(function () {
    console.log(1);
    let imgRandom = parseInt(Math.random() * 15) + 1;
    $(this).parent().parent().find("input").val(`./img/film/${imgRandom}.jpg`);
    $(".showBackImg").attr("src", `./img/film/${imgRandom}.jpg`)
})

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


// ================查询商品================
function queryGoods() {
    $.ajax({
        url: "/movie/queryMovie",
        dataType: "json",
        success: function (movieList) {
            // movieArr = movieList;
            let str = ``;
            movieList.forEach((element, index) => {
                let imgRandom = parseInt(Math.random() * 15) + 1;
                str += ` <tr>
                        <td>
                            <label><input type="checkbox" data-index=${index} data-id=${element.id} onclick="checkChildFlag(this.checked)" class="sel form-check-input mt-0"></label>
                        </td>
                        <th scope="row">${element.id}</th>
                        <td>${element.movieName}</td>
                        <td>${element.moviePrice}</td>
                        <td>${element.movieType}</td>
                        <td><img src="${unescape(element.movieImg)}" class="" style="width: 50px;" alt="" srcset=""></td>
                        <td> <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changeMovie"
                           data-bs-whatever="@mdo" data-index=${index} onclick="changeMovie(this,${index})" data-id=${element.id}>修改</button></td>
                        <td><button class="btn btn-warning delGoodsBtn" onclick="delMovie(this,${element.id})">删除</button> </td>
                        <td><button class="btn btn-light upMove" onclick="upMove(this)">上移</button>
                            <button class="btn btn-light downMove" onclick="downMove(this)">下移</button>
                            </td>
                    </tr>`;
            });
            $("#showGoods").html(str);

            getAllTypes();
            disabledBtnInit();
        }
    });

}

// ================主函数================
let allRegCheckFlagList = [false];
let pageNumForActive = 0; // 用于控制分页active的那个样式
// updateJsonFromLocalStorage();

queryGoods();
