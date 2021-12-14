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

/**
 * 地址
 */
 

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