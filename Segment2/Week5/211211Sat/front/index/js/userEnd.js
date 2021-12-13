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



// 模拟后端数据(DB)
let userInfoListDB = [];
let userStr = localStorage.getItem("userInfoList");
if (stuStr != null) {
    studentInfoList = JSON.parse(stuStr);
} else {
    //模拟后端用户数据(DB)
    let mockUserData = Mock.mock({
        "userInfoList|20-30": [
            {
                "id|+1": 1,
                "userName": "@last",
                "userPass": "1234",
                "userType": "user",
                "userAvatar": /\.\/img\/film\/([0-9])\.jpg/   // \/ 等价于"/"   \. 等于"."
            }
        ]
    });
    studentInfoList = mockUserData.userInfoList;
    localStorage.setItem("userInfoList", JSON.stringify(studentInfoList));
    localStorage.setItem("adminInfoList", JSON.stringify(adminInfo));
}

// console.log(JSON.stringify(mockUserData));


// 查询用户
Mock.mock("/end/queryUser", "get", function (obj) {
    return {
        userInfoList: studentInfoList,
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