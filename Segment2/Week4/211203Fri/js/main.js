// ============主界面内容区================
let goodsJson = [
    { id: 1, goodsName: "蜗牛1plus", goodsPrice: 1888.88, goodsType: "sdjklf", goodsImg: "images/goods/1.jpg" },
    { id: 2, goodsName: "蜗牛2plus", goodsPrice: 18888.88, goodsType: "手机", goodsImg: "images/goods/2.jpg" },
    { id: 3, goodsName: "蜗牛3plus", goodsPrice: 188888.88, goodsType: "上将屡颠覆", goodsImg: "images/goods/3.jpg" },
    { id: 4, goodsName: "蜗牛4plus", goodsPrice: 1888888.88, goodsType: "收到后方可", goodsImg: "images/goods/4.jpg" },
    { id: 5, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    {
        id: 6,
        goodsName: "蜗牛6plus",
        goodsPrice: 188888888888.88,
        goodsType: "经历看见了",
        goodsImg: "images/goods/6.jpg"
    },
    { id: 7, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 8, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 9, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 10, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 11, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 12, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 13, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 14, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 15, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 16, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 17, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 18, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 19, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 20, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 21, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 22, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 23, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 24, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 25, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
    { id: 26, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" }
];


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
        queryGoods(firstIndex, lastIndex);
        disabledBtnInit();
    }

}

function prePage(params) {
    // alert(1)
    if (firstIndex > 0) {
        firstIndex -= 10;
        lastIndex -= 10;
        queryGoods(firstIndex, lastIndex);
        disabledBtnInit();
    }
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

// 添加商品模态框中添加按钮触发事件
let count = goodsJson.length + 1;
$("#addMovie #addMovieBtn").click(function () {
    if (!checkIsCanAddOrChange()) return;
    allRegCheckFlagList = [false];

    let good = {};
    good.goodsName = $("#addMovieNameId").val();
    good.goodsPrice = $("#addMoviePriceId").val();
    good.goodsType = $("#addMovieTypeId").val();
    good.id = count;
    good.goodsImg = "../film/8.jpg";
    goodsJson.unshift(good);
    count++;

    $("addMovieNameId").val("");
    $("addMoviePriceId").val("");
    $("addMovieTypeId").val("");
    queryGoods();
    disabledBtnInit();
})

// 批量删除
$('#delByBatchBtn').on("click", function () {
    let delArr = [];

    $('.sel').each(function () {
        if ($(this).prop("checked")) {
            delArr.push($(this).attr("data-index"));
        }
    });
    let isOk = confirm("您确定要删除吗?");//点击确定 true  取消 false
    if (isOk) {
        if (delArr.length == 0) {
            alert("请先选择...");
        } else {
            alert(delArr.toString());
        }
    }
})

// 添加修改电影模态框正则检测
$("#addMovie form input").eq(0).on("keyup focus blur", function () {
    checkAddMovie(0);
})
$("#addMovie form input").eq(1).on("keyup focus blur", function () {
    checkAddMovie(1);
})
$("#addMovie form input").eq(2).on("keyup focus blur", function () {
    checkAddMovie(2);
})
$("#addMovie form input").eq(3).on("keyup focus blur", function () {
    checkAddMovie(3);
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
$("#changeMovie form input").eq(4).on("keyup focus blur", function () {
    checkChangeMovie(4);
})

// ================查询商品================
function queryGoods(firstIndex, lastIndex) {
    let str = ``;
    let showGoodsDom = document.getElementById("showGoods");
    if (!firstIndex || !lastIndex) {
        firstIndex = 0;
        lastIndex = 10;
    }
    let showGoodsArr = goodsJson.slice(firstIndex, lastIndex);

    showGoodsArr.forEach((element, index) => {
        let imgRandom = parseInt(Math.random() * 15) + 1;
        str += ` <tr>
                        <td>
                            <label><input type="checkbox" data-index=${index} onclick="checkChildFlag(this.checked)" class="sel form-check-input mt-0"></label>
                        </td>
                        <th scope="row">${element.id}</th>
                        <td>${element.goodsName}</td>
                        <td>${element.goodsPrice}</td>
                        <td>${element.goodsType}</td>
                        <td><img src="./img/film/${imgRandom}.jpg" class="" style="width: 50px;" alt="" srcset=""></td>
                        <td> <button class="btn btn-primary" data-toggle="modal" data-target="#changeMovie"
                           data-bs-whatever="@mdo" data-index=${index}>修改</button></td>
                        <td><button class="btn btn-warning delGoodsBtn">删除</button> </td>
                        <td><button class="btn btn-light upMove" >上移</button>
                            <button class="btn btn-light downMove" >下移</button>
                            </td>
                    </tr>`;
    });
    $("#showGoods").html(str);

    // 上移下移行
    $('.upMove').on("click", function () {
        let nowTr = $(this).parent().parent();
        let prevTr = nowTr.prev();
        prevTr.before(nowTr);
        disabledBtnInit();
    });

    $('.downMove').on("click", function () {
        let nowTr = $(this).parent().parent();
        let nextTr = nowTr.next();
        nowTr.before(nextTr);
        disabledBtnInit();
    });

    // 删除电影
    $('tr .delGoodsBtn').on("click", function () {
        // 从复选框中获取index
        let goodsIndex = $(this).parent().parent().find("input.sel").attr("data-index");
        goodsIndex -= 0;
        goodsJson.splice(goodsIndex, 1);
        queryGoods();
        disabledBtnInit();
        // ↑上述写法queryGoods()这个方法会清除已绑定好的事件,不建议使用(有解决办法了,可以这样写 2021-12-02)
        // 直接清除父级tr元素
        // $(this).parent().parent().remove();
        // disabledBtnInit();
    });


    // 修改电影
    // 获取行索引
    $('[data-target="#changeMovie"]').click(function () {
        // 去除上次输入结果对本次的影响
        allRegCheckFlagList = [false];
        $("#changeMovieNameId").val("");
        $("#changeMoviePriceId").val("");
        $("#changeMovieTypeId").val("");
        $("#changeMovieImgId").val("");
        goodsIndex = $(this).attr("data-index");
    })
    // 修改值
    $('#changeMovieBtn').click(function () {
        if (!checkIsCanAddOrChange()) return;
        goodsJson[goodsIndex].goodsName = $("#changeMovieNameId").val();
        goodsJson[goodsIndex].goodsPrice = $("#changeMoviePriceId").val();
        goodsJson[goodsIndex].goodsType = $("#changeMovieTypeId").val();
        goodsJson[goodsIndex].goodsImg = $("#changeMovieImgId").val();

        queryGoods();
        disabledBtnInit();
    })
}

// ================主函数================
let allRegCheckFlagList = [false];
let goodsIndex;

queryGoods();
disabledBtnInit();