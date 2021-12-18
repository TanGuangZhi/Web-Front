// 获取缓存中的订单
let userId, nowGoodsId, userOrderList, userOrderListTemp, allUserOrderList, nowUserIndex;
function getOrderList(params) {
    allUserOrderList = JSON.parse(localStorage.getItem("allUserOrderList"));
    let loginerInfoLocal = JSON.parse(localStorage.getItem("loginUserInfo"));
    userId = loginerInfoLocal.userId;

    for (let index = 0; index < allUserOrderList.length; index++) {
        const element = allUserOrderList[index];
        if (element.userId == userId) {
            userOrderListTemp = element.orderList;
            nowUserIndex = index;
        }

    }
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    let str = ``;
    for (let index = 0; index < userOrderListTemp.length; index++) {
        const element = userOrderListTemp[index];
        let goodsIndex;
        for (let index2 = 0; index2 < goodsList.length; index2++) {
            const element2 = goodsList[index2];
            if (element2.id == element.goodsId) {
                goodsIndex = index2;
            }

        }
        str += `
            <tr>
                <td>${element.orderId}</td>
                <td>${element.orderTime}</td>
                <td class="orderCompTime">${element.orderCompTime}</td>
                <td>${goodsList[goodsIndex].goodsName}</td>
                <td><img src="${goodsList[goodsIndex].goodsImg}" width="50px"></td>
                <td>${goodsList[goodsIndex].goodsPrice}元</td>
                <td>${element.goodsCount} 件</td>
                <td>${(goodsList[goodsIndex].goodsPrice * element.goodsCount).toFixed(1)}元</td>
                <td class="orderStatus">${element.orderStatus}</td>
                <td><button type="button" class="btn ${element.confirmReceiptGoodsClass ?? "btn-success"} confirmReceiptGoods" onClick="confirmReceiptGoods(this,${element.orderId},${element.goodsId})">${element.confirmReceiptGoodsText ?? "确认收货"}</button></td>
                <td><button class="btn btn-warning cancelOrder" ${element.cancelOrderProp} onClick="cancelOrder(this,${element.orderId})">取消订单</button></td>
            </tr>
    `
    }
    $("#showAddressBody").html(str);
}

// 确认收货
function confirmReceiptGoods(params, orderId, goodsId) {
    if ($(params).hasClass("btn-info")) {
        addComment(params, goodsId);
    } else {
        for (let index = 0; index < userOrderListTemp.length; index++) {
            const element = userOrderListTemp[index];
            if (element.orderId == orderId) {
                element.orderCompTime = formatDate(new Date());
                element.orderStatus = "已完成";
                element.confirmReceiptGoodsText = "添加评论";
                element.confirmReceiptGoodsClass = "btn-info";
                element.cancelOrderProp = "hidden";
                break;
            }
        }
        $(params).html("添加评论");
        $(params).addClass("btn-info");
        localStorage.setItem("allUserOrderList", JSON.stringify(allUserOrderList));
        getOrderList();
    }
}

// 添加评论模态框触发

function addComment(params, goodsId) {
    nowGoodsId = goodsId;
    // #TODO 触发模态框,要点2次,是个bug,不想修
    $(params).attr({ "data-bs-toggle": "modal", "data-bs-target": "#addCommentModal" })
}

// 确认添加评论按钮
$('#addCommentSureBtn').click(function (params) {
    let userList = JSON.parse(localStorage.getItem("userInfoList"));
    // 获取评论用户的用户名
    let userName;
    for (let index = 0; index < userList.length; index++) {
        const element = userList[index];
        if (element.userId == userId) {
            userName = element.userName;
        }
    }
    // 获取评论信息
    let commentList = {
        content: $("#commentTextArea").val(),
        date: formatDate(new Date()),
        userId: userId,
        commenter: userName
    }
    let mockCommentList = JSON.parse(localStorage.getItem("commentList"));
    for (let index = 0; index < mockCommentList.length; index++) {
        const element = mockCommentList[index];
        if (element.goodsId == nowGoodsId) {
            element.comment.push(commentList);
        }

    }
    alert(`添加成功`);
    localStorage.setItem("commentList", JSON.stringify(mockCommentList));
})

// 取消订单
function cancelOrder(params, orderId) {
    let tempArr = userOrderListTemp.concat(); // 复制一个数组,避免splice原数组产生的下标影响
    for (let index = 0; index < userOrderListTemp.length; index++) {
        const element = userOrderListTemp[index];
        if (element.orderId == orderId) {
            tempArr.splice(index, 1);
            break;
        }
    }
    userOrderList.orderList = tempArr;
    localStorage.setItem("userOrderList", JSON.stringify(userOrderList));
    getOrderList();
}


//格式化日期：yyyy-MM-dd
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);//想要什么格式都可以随便自己拼
}


getOrderList();