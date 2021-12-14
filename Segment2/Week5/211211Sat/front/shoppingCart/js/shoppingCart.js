// 从缓存中获取当前登录的用户
let loginerInfoLocal = JSON.parse(localStorage.getItem("loginUserInfo"));
let userInfoList = JSON.parse(localStorage.getItem("userInfoList"));
let loginUserInfo;

// 查询购物车商品方法
let tempArr = [];
function getShoppingCart(params) {
    let str = ``;
    loginUserInfo = userInfoList.filter(element => element.userName == loginerInfoLocal.userName);
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    let shoppingCartList = loginUserInfo[0].shoppingCartList;
    tempArr = shoppingCartList;
    // shoppingCartList = delDulShopping(shoppingCartList);
    for (let index = 0; index < shoppingCartList.length; index++) {
        const element = shoppingCartList[index];
        let goods;
        goodsList.forEach(element2 => {
            if (element2.id == element.id) {
                goods = element2;
                return;
            }
        });
        str += `
            <tr>
                    <td>
                        <label>选项<input type="checkbox" onchange="checkChildFlag(this.checked)" data-index=${index} class="sel"></label>
                    </td>
                    <th scope="row">${goods.id}</th>
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
                                   value="${element.count}">
                            <button type="button" class="btn btn-light btn-sm" onclick="minusNum(this)">-</button>
                        </div>
                    </td>
                    <td><img src="${goods.goodsImg}" style="width: 30px;" alt="" srcset=""></td>
                    <td>
                        <p id="totalPrice${index}">
                            <span>${(element.count * goods.goodsPrice).toFixed(1)} </span>
                            <span>元</span>
                        </p>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="delGoods(${goods.id},${index})">移除商品</button>
                    </td>
                </tr>
                `;
    }


    $("#showGoods").html(str);
}

// 购物车商品去重
// function delDulShopping(params) {
//     let tempArr = [];
//     let flag = true;
//     params.forEach(element => {
//         for (let index = 0; index < tempArr.length; index++) {
//             const element2 = tempArr[index];
//             if (element2.id == element.id) {
//                 flag = false;
//                 break;
//             }

//         }
//         if (flag) tempArr.push(element);

//     });
//     return tempArr;
// }

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
function delGoods(id, index) {
    userInfoList.forEach((element) => {
        if (element.userName == loginerInfoLocal.userName) {
            element.shoppingCartList.splice(index, 1);
        }
    });
    $('#showGoods tr').eq(index).remove();
    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    // document.querySelector(`#showGoods tr:nth-child(${index})`).innerHTML = '';
    checkChildFlag(); // 刷新总价
}

// 结算按钮点击事件
$('#settlementBtn').click(function (e) {
    let totalPrice = $('#allGoodsPrice').html();
    totalPrice -= 0;
    // if (totalPrice <= 0 || $(".form-select").val() === "请选择地址") {
    //     alert('请选择商品与地址');
    //     return;
    // }
    setShoppingOrderInfo()
    // alert('结算成功');

});

function setShoppingOrderInfo(params) {
    let date = new Date();
    let userOrderList = [];
     // 检查所有checked为true的元素
     let childSelectList = document.getElementsByClassName("sel");
     // object转数组
     childSelectList = Array.from(childSelectList);
 
     // 获取checked为true的元素对应的id
     childSelectList.forEach(value => {
         if (value.checked === true) {
             // let trDom = value.parentNode.parentNode;
             // let idDom = trDom.nextElementSibling;
             let index = $(value).attr("data-index");
             let shoppingOrder = {
                orderId: date.getTime()+index,
                orderTime:formatDate(date),
                goodsId:tempArr[index].id,
                goodsCount:tempArr[index].count,
                orderStatus:"待收货"
            }
            userOrderList.push(shoppingOrder);
         }
     });
    
    localStorage.setItem("userOrderList", JSON.stringify(userOrderList));
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
    return (myyear + "" + mymonth + "" + myweekday);//想要什么格式都可以随便自己拼
}


getShoppingCart();