// ===========================模拟用户信息
// 管理员信息
let adminInfo = [{
    userId: "boss",
    userName: "kunkka",
    userPass: "666",
    // userType: "boss",
    userAvatar: /\.\/img\/avatar\/boss\.png/,
}, {
    userId: "admin1",
    userName: "Kunkka1",
    userPass: "666",
    "userStatus": "right",
    userType: "admin",
    userAvatar: "./img/avatar/adminAvatar1.png",
}, {
    userId: "admin2",
    userName: "Kunkka2",
    userPass: "666",
    "userStatus": "right",
    userType: "admin",
    userAvatar: "./img/avatar/adminAvatar2.png",
}]

let userInfoList, adminInfoList;
let userShoppingCartList = [];



// 模拟后端用户数据(DB)
let userStr = localStorage.getItem("userInfoList");
if (userStr != null) {
    userInfoList = JSON.parse(userStr);
} else {
    //模拟后端用户数据(DB)
    let mockUserData = Mock.mock({
        "userInfoList|50-100": [
            {
                "userId|+1": 1,
                "userName": "@last",
                "userPass": "1234",
                "userType": "user",
                "userStatus": "right",
                "userAvatar": /\.\/img\/avatar\/userAvatar([0-9])\.png/,   // \/ 等价于"/"   \. 等于"."
            }
        ]
    });
    userInfoList = mockUserData.userInfoList;
    localStorage.setItem("userInfoLastId", JSON.stringify(userInfoList.length));
    userInfoList = userDeDuplication();
    // console.log(userInfoList);
    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    localStorage.setItem("adminInfoList", JSON.stringify(adminInfo));
}

// 用户去重
function userDeDuplication(params) {
    let tempArr = []; // 用于去重
    let tempArr2 = [];
    userInfoList.forEach(element => {
        if (tempArr.indexOf(element.userName)===-1) {
            tempArr.push(element.userName);
            tempArr2.push(element);
        }

    });
    return tempArr2;
}


// 查询用户
Mock.mock("/end/user/queryUser", "get", function (obj) {
    return {
        userInfoList: userInfoList,
        adminInfoList: adminInfo,
    }
})



// 用户注册
Mock.mock("/end/regUser", "post", function (obj) {
    //decodeURI:获取客户端发送过来的数据进行解码
    let requestData = decodeURI(obj.body);//index=0
    let jsonObj = converter(requestData);//{"index":"0"}
})



// ==================模拟后端用户购物车数据(DB)
let userShoppingCartStr = localStorage.getItem("userShoppingCartList");
if (userShoppingCartStr != null) {
    userShoppingCartList = JSON.parse(userShoppingCartStr);
} else {
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    for (let index = 0; index < userInfoList.length; index++) {
        let randomCount = parseInt(Math.random() * 15) + 1;
        let tempArr = [];// 用于去重
        // 控制生成多少条数据
        let shoppingCartList = [];
        for (let index2 = 0; index2 < randomCount; index2++) {
            let shoppingCart = {};
            let randomId = parseInt(Math.random() * goodsList.length);
            shoppingCart.goodsId = randomId;
            shoppingCart.goodsCount = randomId % 3 + 1;// 别太多..
            if (tempArr.indexOf(randomId) === -1) {
                shoppingCartList.push(shoppingCart);
                tempArr.push(randomId);
            }
        }
        userShoppingCartList.push({ userId: userInfoList[index].userId, shoppingCartList: shoppingCartList });
    }
    localStorage.setItem("userShoppingCartList", JSON.stringify(userShoppingCartList));
}

// 查询购物车
Mock.mock("/end/user/queryShoppingCart", "post", function (obj) {
    return userShoppingCartList;
})

function converter(str) {
    let fieldArray = str.split("&");
    let res = `{`;
    for (let field of fieldArray) {
        res += `"${field.split("=")[0]}":"${field.split("=")[1]}",`;
    }
    //删除最后一个逗号...
    res = res.substring(0, res.length - 1);
    res += `}`;
    return JSON.parse(res);
}