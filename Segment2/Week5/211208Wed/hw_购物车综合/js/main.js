// 搜索方法绑定事件
$("#searchBtn").click(function (e) {
    queryGoods("", "", true);
});

function getAllTypes(params) {
    let typeArr = [];
    let str = `<option  value="">全部</option>`;
    checkList.forEach(element => {
        if (typeArr.indexOf(element.type) === -1) {
            typeArr.push(element.type);
            str += `<option>${element.type}</option>`;
        }
    });
    $("#selectType").html(str);
    // return typeArr;
}

// 获取所有商品类型
function getAllTypes(params) {
    let typeArr = [];
    let str = `<option  value="">全部</option>`;
    goodsJson.forEach(element => {
        if (typeArr.indexOf(element.goodsType) === -1) {
            typeArr.push(element.goodsType);
            str += `<option>${element.goodsType}</option>`;
        }
    });
    $("#goodsType").html(str);
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



// 从缓存中更新goodsJson数据
function updateJsonFromLocalStorage(params) {
    let dataStr = localStorage.getItem("goodsList");
    if (dataStr != null) {
        //1.缓存中有数据，直接从缓存中拿数据,并且将字符串转成json对象数组
        goodsJson = JSON.parse(dataStr);
    } else {
        //1.缓存中没有数据，则自己模拟数据
        // goodsJson = [
        //     { id: 1, goodsName: "蜗牛1plus", goodsPrice: 1888.88, goodsType: "手机", goodsImg: "images/goods/1.jpg" },
        //     { id: 2, goodsName: "蜗牛2plus", goodsPrice: 18888.88, goodsType: "手机", goodsImg: "images/goods/2.jpg" },
        //     { id: 3, goodsName: "蜗牛3plus", goodsPrice: 188888.88, goodsType: "电影", goodsImg: "images/goods/3.jpg" },
        //     { id: 4, goodsName: "犀牛Pro", goodsPrice: 1888888.88, goodsType: "电影", goodsImg: "images/goods/4.jpg" },
        //     { id: 5, goodsName: "犀牛Pro", goodsPrice: 188888888.88, goodsType: "咖啡", goodsImg: "images/goods/5.jpg" },
        //     {
        //         id: 6,
        //         goodsName: "犀牛Pro",
        //         goodsPrice: 188888888888.88,
        //         goodsType: "咖啡",
        //         goodsImg: "images/goods/6.jpg"
        //     },
        //     { id: 7, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 8, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 9, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 10, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 11, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 12, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 13, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 14, goodsName: "犀牛Pro", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 15, goodsName: "犀牛Pro", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 16, goodsName: "犀牛Pro", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 17, goodsName: "犀牛Pro", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 18, goodsName: "犀牛Pro", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 19, goodsName: "犀牛Pro", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 20, goodsName: "犀牛Pro", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 21, goodsName: "犀牛Pro", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 22, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 23, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 24, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 25, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" },
        //     { id: 26, goodsName: "蜗牛5plus", goodsPrice: 188888888.88, goodsType: "手上岛咖啡", goodsImg: "images/goods/5.jpg" }
        // ];

        goodsJson = mockData.userList;
        //2.模拟完数据之后，将数据缓存起来
        localStorage.setItem("goodsList", JSON.stringify(goodsJson));
    }
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
    // 持久化本地存储
    localStorage.setItem("goodsList", JSON.stringify(goodsJson));
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
            let delLength = 0; // 消除删除一个数后对后续删除造成的影响
            delArr.forEach(element => {
                goodsJson.splice(element - delLength++, 1);
                ;
            });
            // 持久化本地存储
            localStorage.setItem("goodsList", JSON.stringify(goodsJson));
            queryGoods();
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
function queryGoods(fIndex, lIndex, ruleFlag) {
    let str = ``;
    updateJsonFromLocalStorage();
    if (!fIndex || !lIndex) {
        fIndex = 0;
        lIndex = 10;
    }
    // console.log(`${typeof goodsJson}`);
    goodsJson = Array.from(goodsJson);
    let showGoodsArr = goodsJson.slice(fIndex, lIndex);
    if (ruleFlag) showGoodsArr = queryByRules();
    // goodsJson = showGoodsArr;

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
                        <td> <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changeMovie"
                           data-bs-whatever="@mdo" data-index=${index} data-id=${element.id}>修改</button></td>
                        <td><button class="btn btn-warning delGoodsBtn">删除</button> </td>
                        <td><button class="btn btn-light upMove" >上移</button>
                            <button class="btn btn-light downMove" >下移</button>
                            </td>
                    </tr>`;
    });
    $("#showGoods").html(str);
    setPageFootNum();
    pageNumActiveControl(pageNumForActive);


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
        $.ajax({
            type: "post",
            url: "/user/deleteUser",
            data: `index=${goodsIndex}`,
            dataType: "json",
            success: function (response) {

                // console.log(`${response}`);
                if (response.status == 200) {
                    goodsJson = response.list;
                    // 持久化本地存储
                    localStorage.setItem("goodsList", JSON.stringify(goodsJson));
                    queryGoods();
                    disabledBtnInit();
                }
            }
        });
        // goodsJson.splice(goodsIndex, 1);
    });


    // 修改电影
    // 模态框按钮点击-->获取行索引
    $('[data-bs-target="#changeMovie"]').click(function () {
        // 去除上次输入结果对本次的影响
        $("#changeMovieNameId").val("");
        $("#changeMoviePriceId").val("");
        $("#changeMovieTypeId").val("");
        $("#changeMovieImgId").val("");
        $(".alertMsgSpan").html("*");
        $(".alertMsgSpan").css("color", "");

        allRegCheckFlagList = [false];
        // 获取行id
        let rowId = $(this).attr("data-id");
        // 展示id
        $("#changeMovieIdId").val(rowId);

        goodsIndex = $(this).attr("data-index");
    })
    // 修改值
    $('#changeMovieBtn').click(function () {
        if (!checkIsCanAddOrChange()) return;
        goodsJson[goodsIndex].goodsName = $("#changeMovieNameId").val();
        goodsJson[goodsIndex].goodsPrice = $("#changeMoviePriceId").val();
        goodsJson[goodsIndex].goodsType = $("#changeMovieTypeId").val();
        goodsJson[goodsIndex].goodsImg = $("#changeMovieImgId").val();
        // 持久化本地存储
        localStorage.setItem("goodsList", JSON.stringify(goodsJson));
        queryGoods();
        disabledBtnInit();
    })

    // 分页数字点击触发事件
    $('#pageFootNum li').click(function () {

        let pageNum = $(this).find("a").attr("data-index") - 1;
        pageNumForActive = pageNum;
        firstIndex = pageNum * 10;
        lastIndex = firstIndex + 10;
        // pageNumActiveControl(pageNumForActive);
        queryGoods(pageNum * 10, pageNum * 10 + 10);
    });
}

// ================主函数================
let allRegCheckFlagList = [false];
let goodsIndex, goodsJson;
let pageNumForActive = 0; // 用于控制分页active的那个样式
updateJsonFromLocalStorage();
let count = goodsJson.length + 1; // 用于添加商品时id自增1

queryGoods();
getAllTypes();
disabledBtnInit();