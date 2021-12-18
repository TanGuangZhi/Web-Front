


// 获取所有商品名
function getAllGoodsName(params) {
    let tempArr = [] // 去重
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    for (let index = 0; index < goodsList.length; index++) {
        const element = goodsList[index];
        let result = element.goodsName.match(/[一-龥]+/)
        if (!tempArr.includes(result[0])) {
            tempArr.push(result[0]);
        }
    }
    firstContentHeader(tempArr);
    return tempArr;
}

getAllGoodsName();

// 一级菜单动态生成
function firstContentHeader(params) {
    let str = ``;
    for (let i = 0; i < 4; i++) {
        for (let index = 0; index < params.length; index++) {
            const element = params[index];
            str += ` <li class="nav-item"><a class="nav-link text-dark" href="">${element}</a></li>`
        }
    }
    $("#firstNavUl").html(str);
}

// 一级菜单子内容
function firstContentHeaderChildContend(params) {
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    let str = ``;
    for (let index = 0; index < goodsList.length; index++) {
        const element = goodsList[index];
        let result = params.innerText;
        if (element.goodsName.includes(result)) {
            str += `
                <div class="col border border-light border-2" style="height:150px" data-id=${element.id} onclick="jumbDetail(this)">
                    <img src="${element.goodsImg}" alt="" width="60px">
                    <p style="width:100px">${element.goodsName}</p>
                    <p style="width:150px">价格:${element.goodsPrice}元</p>
                </div>
            `
        }
    }
    $(".firstTypeList").html(str);
}

// secondContentHeader()


// 一级菜单鼠标移入移出动画效果
let lastTimeAnimateIndex;
$('#firstNav ul li').hover(function () {
    // over
    firstContentHeaderChildContend(this);
    $('.firstTypeList').slideDown(500);
}, function () {
    // out
    // lastTimeAnimateIndex = $(this).attr("data-index");
    $(".firstTypeList").stop(true, true);
    $('.firstTypeList').slideUp(100);
}
);

// 一级菜单停留动画效果
$("#firstNav .firstTypeList").hover(function () {
    // over
    $(this).stop(true);
}, function () {
    // out
    $(this).slideUp(500);
}
);
$('.firstTypeList').slideUp(0);



// 获取全部商品类型
function getAllTypes(params) {
    let typeArr = [];
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    let str = `<option  value="">全部</option>`;
    goodsList.forEach(element => {
        if (typeArr.indexOf(element.goodsType) === -1) {
            typeArr.push(element.goodsType);
            str += `<option>${element.goodsType}</option>`;
        }
    });
    $("#goodsType").html(str);
    secondContentHeader(typeArr)
    return typeArr;
}

getAllTypes();

// 二级菜单内容动态生成
function secondContentHeader(params) {
    let str = ``;
    for (let index = 0; index < params.length; index++) {
        const element = params[index];
        str += ` <li class="nav-item"><a class="nav-link text-dark" href="">${element}</a></li>`
    }
    $("#secondNavUl").html(str);
}



// 二级菜单子菜单内容动态生成
function secondContentHeaderContend(params) {
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    let str = `<div class="row text-center">`;
    for (let index = 0; index < goodsList.length; index++) {
        const element = goodsList[index];
        if (element.goodsType == params.innerText) {
            str += `
                <div class="col-3  border border-light border-2" style="background: white;" data-id=${element.id} onclick="jumbDetail(this)">
                <img src="${element.goodsImg}" width="80%" style="margin-top: 15px">
                <p style="color: gray;margin-top: 10px">${element.goodsName}</p>
                <p style="color: orangered">${element.goodsPrice}元</p>
                </div>
            `
        }
    }
    str += `</div>`
    $("#secondType").html(str);
}

// 跳转详情
function jumbDetail(params) {
    let id = $(params).attr("data-id");
    window.location.href = `../goodsDetailPage/goodsDetail.html?id=${id}`;
}

// 二级菜单鼠标移入移出动画效果
$("#secondNav ul li").hover(function () {
    secondContentHeaderContend(this)
    // over
    $('#secondType').slideDown(500);
}, function () {
    // out
    $('#secondType').stop(true);
    $('#secondType').slideUp(500);
}
);

// 二级菜单停留动画效果
$("#secondNav #secondType").hover(function () {
    // over
    $(this).stop(true);
}, function () {
    // out
    $(this).slideUp(500);
}
);