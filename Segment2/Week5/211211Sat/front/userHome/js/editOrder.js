// 获取缓存中的订单
function getOrderList(params) {
    let orderList = JSON.parse(localStorage.getItem("userOrderList"));
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    let str = ``;
    for (let index = 0; index < orderList.length; index++) {
        const element = orderList[index];
        str += `
            <tr>
                <td>${element.orderId}</td>
                <td>${element.orderTime}</td>
                <td>${element.orderStatus}</td>
                <td><img src="${goodsList[element.goodsId].goodsImg}" width="100px"></td>
                <td>${goodsList[element.goodsId].goodsPrice}元</td>
                <td>${element.goodsCount} 件</td>
                <td>${(goodsList[element.goodsId].goodsPrice*element.goodsCount).toFixed(1)}元</td>
                <td>${element.orderStatus}</td>
                <td><a href="#" class="btn btn-success">确认收货</a></td>
                <td><a href="#" class="btn btn-warning">取消订单</a></td>
            </tr>
    `
    }
    $("#showAddressBody").html(str);
}

getOrderList();