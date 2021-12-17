// 切换显示评论
$("#commentBtn").click(function () {
    $(".detailInfoGroup").find("a").removeClass("active");
    $(this).addClass("active");
    toggleComment();
})

// 切换商品详情
$("#goodsDetailBtn").click(function () {
    $(".detailInfoGroup").find("a").removeClass("active");
    $(this).addClass("active");
    toggleGoodsDetail();
})

// 商品详情展现内容
function toggleGoodsDetail() {
    let detailInfo = [
        `Pro 级摄像头系统，能力强悍提升； <br> 显示屏响应之快，让体验全面刷新； <br>
        芯片速度再创 iPhone 巅峰； <br> 坚固耐用的设计，出类拔萃； 电池续航更是大步飞跃。 <br>
        <b>来吧，Pro 起来</b>`,
        'M1 Pro 为专业用户，将 M1 芯片架构的潜能飙升到全新境界。有了最多达 10 个中央处理器核心，最多达 16 个图形处理器核心，16 核神经网络引擎，以及支持 H.264、HEVC 和 ProRes 的专用编解码媒体处理引擎，再雄心勃勃的项目，做起来也轻轻松松',
        '更大的显示屏，令整体使用体验大大提升。各种内容更加一目了然，各种操作更加游刃有余。我们的大胆创新和万千巧思，在 Series 7 上体现得淋漓尽致。'
    ];
    let infoIndex = goodsArr[id].goodsDetailInfo - 1;
    let detailImg = ` <div class="row rounded-2 mt-5">
                    <img src=" ./img/mba.jpg" class="rounded-3 p-0 " alt="">
                    <img src=" ./img/mba1.png" alt="" class="rounded-3 mt-4 p-0">

                </div>`;
    let detailWord = `<p class="text-center">${detailInfo[infoIndex]}</p>`
    $(".detailInfoShowArea").html(detailWord + detailImg);
}

// ================查询评论================
function queryComment(id) {
    $.ajax({
        url: `/comment/queryComment`,
        type: "post",
        data: `id=${id}`,
        dataType: "json",
        success: function (commentList) {
            commentList = commentList.comment;
            let str = `<div class="row row-cols-3">`;
            commentList.forEach(element => {
                str += `
                    <div class="col">
                        <div class="card mb-3 shadow-lg" >
                            <div class="card-body">
                                <h5 class="card-title">${element.commenter}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${element.date}</h6>
                                <p class="card-text" style="height: 50px">${element.content}</p>
                                <a href="#" class="card-link">爱心</a>
                                <a href="#" class="card-link">评论</a>
                            </div>
                        </div>
                    </div>`;
            })
            str += `</div>`
            $(".detailInfoShowArea").html(str);
        }
    });
}

function toggleComment() {
    queryComment(id);
    // $(".detailInfoShowArea").html(`广告位招租`);
}

// 立即购买
$("#buyNowBtn").click(function () {
    window.location.href = "../shoppingCart/shoppingCart.html"
})

// 获得缓存中的数据
function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("goodsList"));
}

// 点击左侧小图片时切换大图片
$("#smallImg li img").click(function () {
    $("#bigImg").attr("src", $(this).attr("src"));
})

// 添加至购物车
$("#addToShoppingCartBtn").click(function (e) {
    // 从缓存中获取当前登录的用户
    let loginerInfoLocal = JSON.parse(localStorage.getItem("loginUserInfo"));
    let userId;
    if (!loginerInfoLocal) {
        alert('请先登录');
        return;
    } else {
        userId = loginerInfoLocal.userId;
    }

    $.ajax({
        type: "post",
        url: "/end/user/addToShoppingCart",
        data: { userId: userId, goodsId: id, goodsCount: 1 },
        dataType: "json",
        success: function (response) {
            // let userShoppingCartList = response.shoppingCartList;
            // console.log(response);
            alert(`添加成功`);
        }
    });
});

function init(id) {
    goodsArr = getDataFromLocalStorage();
    for (let index = 0; index < goodsArr.length; index++) {
        const element = goodsArr[index];
        if (element.id == id) {
            $("#goodsName").html(element.goodsName);
            $("#goodsPrice").html("$" + element.goodsPrice);
            $(".goodsImg").attr("src", unescape(element.goodsImg));
            toggleGoodsDetail();
        }

    }
}

// 近期浏览
function recentlyViewed(params) {
    // 获取userId
    let loginerInfoLocal = JSON.parse(localStorage.getItem("loginUserInfo"));
    let userId = loginerInfoLocal.userId;
    if (!userId) return;

    let recentlyViewedList = {}
    let recentlyViewedArr = [];
    let recentlyViewedListArr = [];
    let temp = JSON.parse(localStorage.getItem("recentlyViewedListArr"));
    if (!temp) {
        recentlyViewedArr = [];

    } else {
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            if (element.userId == userId) {
                recentlyViewedArr = element.recentlyViewedArr;
            }

        }
    }
    // 剔重,并提高相同浏览时最近一条的展示权重
    recentlyViewedArr.unshift(id + 1);
    for (let index = 0; index < recentlyViewedArr.length; index++) {
        const element = recentlyViewedArr[index];
        for (let index2 = index + 1; index2 < recentlyViewedArr.length; index2++) {
            const element2 = recentlyViewedArr[index2];
            if (element == element2) {
                recentlyViewedArr.splice(index2, 1);
            }
        }

    }
    recentlyViewedList.recentlyViewedArr = recentlyViewedArr;
    recentlyViewedList.userId = userId;
    recentlyViewedListArr.push(recentlyViewedList);
    localStorage.setItem("recentlyViewedListArr", JSON.stringify(recentlyViewedListArr));

    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    let str = ``;
    for (let index = 0; index < recentlyViewedArr.length; index++) {
        const element = recentlyViewedArr[index];
        for (let index2 = 0; index2 < goodsList.length; index2++) {
            const element2 = goodsList[index2];
            if (element2.id == element) {
                str += `
                <div class="col">
                <div class="card">
                    <img src="${unescape(element2.goodsImg)}" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${element2.goodsName}</h5>
                    </div>
                </div>
            </div>`;
            }
        }
    }
    $('#recentlyViewedArea').html(str);
}

let url = window.location.href;
let id = url.split("id=")[1] - 1;//获得商品id
let goodsArr;
init(id);
recentlyViewed();