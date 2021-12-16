// ================查询商品================
function queryGoods() {
    $.ajax({
        url: "/end/goods/querygoods",
        dataType: "json",
        success: function (goodsList) {
            // goodsArr = goodsList;
            let str = ``;
            goodsList.forEach((element, index) => {
                str += ` <tr>
                        <td>
                            <label><input type="checkbox" data-index=${index} data-id=${element.id} onclick="checkChildFlag(this.checked)" class="sel form-check-input mt-0"></label>
                        </td>
                        <th scope="row">${element.id}</th>
                        <td>${element.goodsName}</td>
                        <td>${element.goodsPrice}</td>
                        <td>${element.goodsType}</td>
                        <td><img src="${unescape(element.goodsImg)}" class="" style="width: 50px;" alt="" srcset=""></td>
                        <td> <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changeGoods"
                           data-bs-whatever="@mdo" data-index=${index} onclick="changeGoods(this,${index})" data-id=${element.id}>修改</button></td>
                        <td><button class="btn btn-warning delGoodsBtn" onclick="delGoods(this,${element.id})">删除</button> </td>
                    </tr>`;
            });
            $("#showGoods").html(str);

            getAllTypes();
            disabledBtnInit();
        }
    });

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
function delGoods(params, id) {
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

queryGoods();