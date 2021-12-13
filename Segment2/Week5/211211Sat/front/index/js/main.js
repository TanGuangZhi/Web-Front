// ================查询商品================
function queryGoods() {
    $.ajax({
        url: "/goods/querygoods",
        dataType: "json",
        success: function (goodsList) {
            goodsArr = goodsList;
            let str = ``;
            goodsList.slice(0, 6).forEach((element, index) => {
                str += ` <div class="col" >
                            <div class="card shadow mt-3" onclick="jumbDetail(this)" data-id=${element.id}>
                                <img src="${element.goodsImg}" alt="" >
                                <div class="card-body">
                                    <h5 class="card-title">${element.goodsName}</h5>
                                    <p class="card-text">￥${element.goodsPrice}</p>
                                </div>
                            </div>
                        </div>`;
            });
            $("#showGoods").html(str);
        }
    });
}

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

function toggleComment() {

}

// ================主函数================
let goodsArr;
queryGoods();
