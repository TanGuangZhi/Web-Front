// 管理员信息
let adminInfo = [{
    userName: "admin",
    userPass: "666",
    userType: "admin"
}, {
    userName: "admin2",
    userPass: "666",
    userType: "admin"
}]

let userInfoList, adminInfoList;



// 模拟后端数据(DB)
let userInfoListDB = [];
let userStr = localStorage.getItem("userInfoList");
if (userStr != null) {
    userInfoList = JSON.parse(userStr);
} else {
    //模拟后端用户数据(DB)
    let mockUserData = Mock.mock({
        "userInfoList|20-30": [
            {
                "id|+1": 1,
                "userName": "@last",
                "userPass": "1234",
                "userType": "user",
                "userAvatar": /\.\/img\/film\/([0-9])\.jpg/,   // \/ 等价于"/"   \. 等于"."
            }
        ]
    });
    userInfoList = mockUserData.userInfoList;
    userInfoList = userDeDuplication();
    getMockShoppingCart();
    console.log(userInfoList);
    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    localStorage.setItem("adminInfoList", JSON.stringify(adminInfo));
}

// 用户去重
function userDeDuplication(params) {
    let tempArr = [];
    let flag = true;
    userInfoList.forEach(element => {
        for (let index = 0; index < tempArr.length; index++) {
            const element2 = tempArr[index];
            if (element2.userName == element.userName) {
                flag = false;
            }

        }
        if (flag) tempArr.push(element);

    });
    return tempArr;
}

// console.log(JSON.stringify(mockUserData));

// 模拟购物车内容
function getMockShoppingCart(params) {
    let goodsList = JSON.parse(localStorage.getItem("goodsList"));
    for (let index = 0; index < userInfoList.length; index++) {
        let randomCount = parseInt(Math.random() * 15) + 1;
        let shoppingCartList = [];
        let tempArr = [];// 用于去重
        for (let index = 0; index < randomCount; index++) {
            let shoppingCart = {};
            let randomId = parseInt(Math.random() * goodsList.length);
            shoppingCart.id = randomId;
            shoppingCart.count = randomId % 3 + 1;// 别太多..
            if (tempArr.indexOf(randomId) === -1) {
                shoppingCartList.push(shoppingCart);
                tempArr.push(randomId);
            }
        }

        userInfoList[index].shoppingCartList = shoppingCartList
    }
    // return shoppingCartList;
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