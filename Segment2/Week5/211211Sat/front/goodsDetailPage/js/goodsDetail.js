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

// 商品数量加减
let goodsCount = 1;
$("#addShoppingBtn").click(function (e) {
    goodsCount += 1;
    $('#count').val(goodsCount);

});
$("#minusShoppingBtn").click(function (e) {
    if (goodsCount === 1) {
        return;
    }
    goodsCount -= 1;
    $('#count').val(goodsCount);
});


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
                let randomNum = parseInt(Math.random()*8)+1;
                str += `
                    <div class="col">
                        <div class="card mb-3 shadow text-dark bg-light" >
                            <div class="card-body">
                                <div class="row">
                                <div class="col-2">
                                    <img src="../../img/avatar/randomAvatar${randomNum}.png" alt="" style="width:30px" class="rounded-circle" srcset="">
                                </div>
                                <div class="col-3">
                                    <h5 class="card-title" style="margin-top:3px">${element.commenter}</h5>
                                </div>       
                                </div>

                              
                                <p class="card-subtitle mb-2 fs-6 text-muted">${element.date}</p>
                                <p class="card-text" style="height: 50px">${element.content}</p>
                                <a href="#" class="card-link text-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                              </svg></a>
                                <a href="#" class="card-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                              </svg></a>
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
        data: { userId: userId, goodsId: id, goodsCount: goodsCount },
        dataType: "json",
        success: function (response) {
            // let userShoppingCartList = response.shoppingCartList;
            // console.log(response);
            // alert(`添加成功`);
            $('#showNum').html(($('#showNum').html()-0)+goodsCount);
            $('#showNum').prop("hidden",false);
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
    recentlyViewedArr.unshift(id);
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
    // 用于记录全部用户的浏览数据
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
                <div class="card" data-id=${element2.id} onclick="jumbDetail(this)">
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

// 跳转详情
function jumbDetail(params) {
    let id = $(params).attr("data-id");
    window.location.href = `../goodsDetailPage/goodsDetail.html?id=${id}`;
}

// 修复iframe跳转时焦点不在顶部bug
function jumbPageTop(params) {
    $('#goBackTopBtn').trigger("click");
}

function clickAnchor() {
	document.getElementById('header').scrollIntoView(true);
    // 平滑过渡
	// document.getElementById('header').scrollIntoView({ behavior: "smooth" });
}

let url = window.location.href;
let id = url.split("id=")[1];//获得商品id
let goodsArr;
init(id);
recentlyViewed();
jumbPageTop();