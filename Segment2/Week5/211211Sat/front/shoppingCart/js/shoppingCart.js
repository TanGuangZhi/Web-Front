// 从缓存中获取当前登录的用户
let loginerInfoLocal = JSON.parse(localStorage.getItem("loginUserInfo"));
userInfoList = JSON.parse(localStorage.getItem("userInfoList"));
let loginUserInfo, userShoppingCartListTemp, loginerShoppingCartList;

// 查询购物车商品方法
let tempArr = [];
function getShoppingCart(params) {
    // 获取用户id(我知道这样写很麻烦,如果你看到,记得提醒我优化)
    loginUserInfo = userInfoList.filter(element => element.userId == loginerInfoLocal.userId);
    let userId = loginUserInfo[0].userId;
    $.ajax({
        type: "post",
        url: "/end/user/queryShoppingCart",
        data: { userId: userId },
        dataType: "json",
        success: function (response) {
            let str = ``;
            // 获取登录用户的购物车内容
            let shoppingCartList = response[0].shoppingCartList;
            // userShoppingCartListTemp = response;
            // loginerShoppingCartList = shoppingCartList;

            let goodsList = JSON.parse(localStorage.getItem("goodsList"));
            tempArr = shoppingCartList;
            // shoppingCartList = delDulShopping(shoppingCartList);

            for (let index = 0; index < shoppingCartList.length; index++) {
                const element = shoppingCartList[index];
                let goods;
                // 获取购物车中对应的商品信息
                goodsList.forEach(element2 => {
                    if (element2.id == element.goodsId) {
                        goods = element2;
                        return;
                    }
                });
                if (goods) {
                    str += `
                    <tr>
                            <td>
                                <label>选项<input type="checkbox" onchange="checkChildFlag(this.checked)" data-id=${goods.id} data-index=${index} class="sel"></label>
                            </td>
                            <th scope="row">${index + 1}</th>
                            <td>${goods.goodsName}</td>
                            <td>
                                <p id="goodsPrice${index}">
                                    <span> ${goods.goodsPrice} </span>
                                    <span>元</span>
                                </p>
                            </td>
                            <td data-index=${index}>
                                <div class="d-flex">
                                    <button type="button" class="btn btn-light btn-sm" onclick="addNum(this)">+</button>
                                    <input type="text" id="goodsCound${index}" readonly class="form-control" style="width:60px"
                                           value="${element.goodsCount}">
                                    <button type="button" class="btn btn-light btn-sm" onclick="minusNum(this)">-</button>
                                </div>
                            </td>
                            <td><img src="${goods.goodsImg}" style="width: 30px;" alt="" srcset=""></td>
                            <td>
                                <p id="totalPrice${index}">
                                    <span>${(element.goodsCount * goods.goodsPrice).toFixed(1)} </span>
                                    <span>元</span>
                                </p>
                            </td>
                            <td>
                                <button class="btn btn-danger" onclick="delGoods(${goods.id},${index})">移除商品</button>
                            </td>
                        </tr>
                        `;
                }
            }
            $("#showGoods").html(str);

        }
    });


}

// ============添加数量减少数量开始============
function checkIsZero(params) {
    let goodsCount = params.previousElementSibling.value;
    return goodsCount > 0;
}

function addNum(params) {
    params.nextElementSibling.value++;
    let btnIndex = $(params).parent().parent().attr("data-index");
    caluTotalPrice(btnIndex);
    checkChildFlag(); // 刷新总价
}

function minusNum(params) {
    if (checkIsZero(params)) {
        params.previousElementSibling.value--;
        let btnIndex = $(params).parent().parent().attr("data-index");
        caluTotalPrice(btnIndex);
        checkChildFlag(); // 刷新总价
    }
}

function caluTotalPrice(btnIndex) {
    let totalPriceDom = document.querySelector(`#totalPrice${btnIndex} span`);
    let priceDom = document.querySelector(`#goodsPrice${btnIndex} span`);
    let goodsCoundDom = document.querySelector(`#goodsCound${btnIndex}`);
    totalPriceDom.innerHTML = (goodsCoundDom.value * priceDom.innerHTML).toFixed(1);
}


// ============全选全消开始============/
function selAll(flag) {
    let childSelectList = document.getElementsByClassName("sel");
    for (const iterator of childSelectList) {
        iterator.checked = flag;
    }
    checkChildFlag(); // 刷新总价
}

function checkChildFlag(flag) {
    let parentCheckedFlag = document.getElementById("all-id");
    let childSelectList = document.getElementsByClassName("sel");
    // object转数组
    childSelectList = Array.from(childSelectList);
    let allFlag = childSelectList.every(value => value.checked);
    parentCheckedFlag.checked = allFlag;
    caluAllGoodsPrice();
}

// ============计算总价左下角展示框开始============/
function caluAllGoodsPrice() {
    // 检查所有checked为true的元素
    let childSelectList = document.getElementsByClassName("sel");
    // object转数组
    childSelectList = Array.from(childSelectList);

    // 获取checked为true的元素对应的id
    let totalGoodsPrice = 0;
    childSelectList.forEach(value => {
        if (value.checked === true) {
            // let trDom = value.parentNode.parentNode;
            // let idDom = trDom.nextElementSibling;
            let index = $(value).attr("data-index");
            let goodsPrice = document.querySelector(`#totalPrice${index} span`).innerHTML;
            totalGoodsPrice += goodsPrice - 0;
        }
    });

    document.querySelector(`#allGoodsPrice`).innerHTML = totalGoodsPrice.toFixed(1);
}

// 移除商品
function delGoods(goodsId, index) {
    $.ajax({
        type: "post",
        url: "/end/user/delShoppingCart",
        data: { goodsId: goodsId },
        dataType: "json",
        success: function (response) {
            getShoppingCart();
            checkChildFlag(); // 刷新总价
        }
    });
}

// 结算按钮点击事件
$('#settlementBtn').click(function (e) {
    let totalPrice = $('#allGoodsPrice').html();
    totalPrice -= 0;
    if (totalPrice <= 0 || $(".form-select").val() === "请选择地址") {
        alert('请选择商品与地址');
        return;
    }
    setOrderInfo()
    // alert('结算成功');

});

function setOrderInfo(params) {
    let date = new Date();
    let userOrderList = {};
    // 检查所有checked为true的元素
    let childSelectList = document.getElementsByClassName("sel");
    // object转数组
    childSelectList = Array.from(childSelectList);

    let userId = loginerInfoLocal.userId

    // 获取checked为true的元素对应的id
    let shoppingOrderList = [];
    childSelectList.forEach(value => {
        if (value.checked === true) {
            // let trDom = value.parentNode.parentNode;
            // let idDom = trDom.nextElementSibling;
            let id = $(value).attr("data-id");
            let scIndex;
            for (let index = 0; index < tempArr.length; index++) {
                const element = tempArr[index];
                if(element.goodsId == id){
                    scIndex = index;
                }
            }
            let shoppingOrder = {
                orderId: date.getTime() + scIndex,
                orderCompTime: "待收货",
                orderTime: formatDate(date),
                goodsId: tempArr[scIndex].goodsId,
                goodsCount: tempArr[scIndex].goodsCount,
                orderStatus: "待收货"
            }
            shoppingOrderList.push(shoppingOrder);

            let goodsId = $(value).attr("data-id");
            for (let index = 0; index < tempArr.length; index++) {
                const element = tempArr[index];
                if (element.goodsId == goodsId) {
                    tempArr.splice(index, 1);
                }
            }
            for (let index = 0; index < userShoppingCartList.length; index++) {
                const element = userShoppingCartList[index];
                if(element.userId == userId){
                    element.shoppingCartList = tempArr;
                }
                
            }
            localStorage.setItem("userShoppingCartList", JSON.stringify(userShoppingCartList));
        }
    });
    userOrderList.orderList = shoppingOrderList;
    userOrderList.userId = userId;
    alert(`success`);
    getShoppingCart();
    checkChildFlag(); // 刷新总价
    localStorage.setItem("userOrderList", JSON.stringify(userOrderList));
}

// 获取用户全部地址信息
function getUserAddressInfo(params) {
    let userAddressList;;
    let str = "<option selected>请选择地址</option>";
    let userId = loginerInfoLocal.userId
    $.ajax({
        type: "post",
        url: "/end/userHome/queryAddress",
        data: { userId: userId },
        dataType: "json",
        success: function (response) {
            userAddressList = response.userAddressList;
            // 地址拼接
            userAddressList.forEach((element, index) => {
                let addressDetailInfo = `${element.province}${element.city}${element.county}`;
                str += `<option value="${index}">${addressDetailInfo}</option>`
            });
            $('#addressSelect').html(str);
        }
    });

}

getUserAddressInfo();

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
    return (myyear + "" + mymonth + "" + myweekday);//想要什么格式都可以随便自己拼
}


getShoppingCart();