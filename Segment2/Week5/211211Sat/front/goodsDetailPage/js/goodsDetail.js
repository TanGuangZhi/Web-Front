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
    console.log(infoIndex)
    console.log(id)
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
            console.log(commentList)
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
    // alert(`添加购物车成功`);
    // 从缓存中获取当前登录的用户
    let loginerInfoLocal = JSON.parse(localStorage.getItem("loginUserInfo"));
    let userInfoList = JSON.parse(localStorage.getItem("userInfoList"));
    let loginUserInfo,userIndex;
    for (let index = 0; index < userInfoList.length; index++) {
        const element = userInfoList[index];
        if(element.userName == loginerInfoLocal.userName){
            loginUserInfo = element;
            userIndex = index;
        }
        
    }
    let shoppingCart = {
        id:id+1,
        count:"1"
    }
    loginUserInfo.shoppingCartList.push(shoppingCart);
    mergeDulShopping(loginUserInfo.shoppingCartList);
    userInfoList[userIndex] = loginUserInfo;
    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
});

// 叠加相同商品
function mergeDulShopping(list){
    for (let index = 0; index < list.length; index++) {
        const element1 = list[index];
        for (let index2 = index+1; index2 < list.length; index2++) {
            const element2 = list[index2];
            if(element1.id===element2.id){
                list[index].count++;
                list.splice(index2,1);
                index--;
            }
        }
    }
}

function init(id) {
    goodsArr = getDataFromLocalStorage();
    $("#goodsName").html(goodsArr[id].goodsName);
    $("#goodsPrice").html("$" + goodsArr[id].goodsPrice);
    $(".goodsImg").attr("src", goodsArr[id].goodsImg);
    toggleGoodsDetail();
}

let url = window.location.href;
let id = url.split("id=")[1] - 1;//获得商品id
let goodsArr;
init(id);