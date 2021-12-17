// ==========================用户
// 修改用户信息
Mock.mock("/end/userHome/editUser", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let jsonObj = converter(requestData);
    let userInfoList = JSON.parse(localStorage.getItem("userInfoList"));
    let userId = jsonObj.userId;
    for (let index = 0; index < userInfoList.length; index++) {
        const element = userInfoList[index];
        if (element.id == userId) {
            element.userName = jsonObj.userName;
            element.userPwd = jsonObj.userPwd;
            element.userAvatar = jsonObj.userAvatar;
            element.userPhone = jsonObj.userPhone;
        }
    }
    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    return userInfoList;
})

Mock.mock("/user/addUser", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let jsonObj = converter(requestData);
    mockData.userList.push(jsonObj);
    return 1;
})

// ===================地址区
// 生成模拟地址
let addressList;
let addressStr = localStorage.getItem("allAddressList");
if (addressStr != null) {
    addressList = JSON.parse(addressStr);
} else {
    //模拟后端用户数据(DB)
    let mockUserData = Mock.mock({
        "addressList|20-30": [
            {
                "province": "@province",
                "city": "@city",
                "county": "@county",
                "zip": "@zip",
                "phone": /1[5-9]\d{9}/,
                "name": "@cname"
            }
        ]
    });
    addressList = mockUserData.addressList;
    // console.log(addressList);
    localStorage.setItem("allAddressList", JSON.stringify(addressList));
}

// 查询地址
Mock.mock("/end/userHome/queryAddress", "post", function (obj) {
    let requestData = decodeURI(obj.body);
    let jsonObj = converter(requestData);

    // 根据用户id查询用户名
    let userList = JSON.parse(localStorage.getItem("userInfoList"));
    let userName;
    userList.forEach(element => {
        if (element.userId == jsonObj.userId) {
            userName = element.userName;
        }
    });

    let addressRandomList = [];
    let temp = {};
    let useraddressStr = JSON.parse(localStorage.getItem("userAddressList"));
    if (useraddressStr && useraddressStr.userId == jsonObj.userId) {
        addressRandomList = useraddressStr.userAddressList;
    } else {
        // 控制地址数量
        let addressCount = parseInt(Math.random() * 3) + 1;
        for (let index = 0; index < addressCount; index++) {
            let randomIndex = parseInt(Math.random() * addressList.length);
            addressRandomList.push(addressList[randomIndex]);
            addressRandomList[index].name = userName;
        }
        temp.userId = jsonObj.userId;
        temp.userAddressList = addressRandomList;
        localStorage.setItem("userAddressList", JSON.stringify(temp));
    }
    temp.userId = jsonObj.userId;
    temp.userAddressList = addressRandomList;
    return temp;
});

// 添加地址
Mock.mock("/end/userHome/addAddress", "post", function (obj) {
    return addressList;
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