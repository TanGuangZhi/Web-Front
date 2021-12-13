// ================查询商品================
function queryGoods() {
    $.ajax({
        url: "/movie/queryMovie",
        dataType: "json",
        success: function (movieList) {
            // movieArr = movieList;
            let str = ``;
            movieList.slice(0,6).forEach((element, index) => {
                str += ` <div class="col">
                            <div class="card shadow mt-3">
                             <div class="img rounded-lg" style=' background: url("${element.movieImg}") no-repeat;'>
                                    </div>
                                <div class="card-body">
                                    <h5 class="card-title">${element.movieName}</h5>
                                    <p class="card-text">￥${element.moviePrice}</p>
                                </div>
                            </div>
                        </div>`;
            });
            $("#showGoods").html(str);
        }
    });

}

// ================主函数================
queryGoods();
