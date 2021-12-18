// ================查询商品================
function queryGoods(page, limitFlag) {
    // page不传值则默认指定为1
    page = page ?? 1;
    // 获取限制条件
    let goodsName = $('#goodsName').val();
    let goodsType = $('#goodsType').val();

    let limit;
    if (limitFlag) {
        limit = { goodsName: goodsName, goodsType: goodsType };
    }
    $.ajax({
        url: "/goods/querygoods",
        data: { "nowPage": page, "limit": limit },
        type: "post",
        dataType: "json",
        success: function (response) {
            goodsList = response.list;
            goodsArr = goodsList;
            let str = ``;
            goodsList.slice(0, 9).forEach((element, index) => {
                str += ` <div class="col" >
                            <div class="card shadow mt-3" onclick="jumbDetail(this)" data-id=${element.id}>
                                <img src="${unescape(element.goodsImg)}" style="width:100%" alt="" >
                                <div class="card-body">
                                    <h5 class="card-title">${element.goodsName}</h5>
                                    <div class="row">
                                        <div class="col-8">
                                            <p class="card-text">￥${element.goodsPrice}</p>
                                        </div>
                                        <div class="col-4">
                                        <span class="card-text">${element.goodsType}</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>`;
            });
            $("#showGoods").html(str);
            queryPage(response.nowPage);
        }
    });
}

// 查询一共要生成多少页码
function queryPage(nowPage) {
    $.ajax({
        url: "/goods/queryGoodsPage",
        success: function (pageNum) {
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

// 条件查询
$("#searchBtn").click(function (e) {
    queryGoods(null, true);
});



//点击数字页码完成翻页功能
let globalNowPage = 1;
function changePage(nowPage) {
    globalNowPage = nowPage;
    queryGoods(globalNowPage);

}

// 控制分页数字active字样
function pageNumActiveControl(pageNumForActive) {
    $('#pageFoot li').removeClass("active");
    $('#pageFoot li').eq(pageNumForActive).addClass("active");
}

// 跳转详情
function jumbDetail(params) {
    let id = $(params).attr("data-id");
    window.location.href = `../goodsDetailPage/goodsDetail.html?id=${id}`;
}

// 切换显示评论
$("#commentBtn").click(function () {
    alert("1")
    $(".detailInfoGroup").find("a").removeClass("active");
    $(this).addClass("active");
})


// ================主函数================
let goodsArr;
queryGoods();
queryPage();
// showShoppingCartGoodsNum();
// queryPage();
// $('#showNum').html("response[0].shoppingCartList.length");