// 已有用户信息
let userInfo = [];

// ********************一级菜单函数********************
// 检查注册成功否
function checkRegistSuccess(name, pwd) {
    userInfo.forEach(element => {
        if (element.userName === name) {
            return false;
        }
    });
    let nowDate = new Date();
    userInfoStore(name, pwd, nowDate.getTime());
    return userInfo;
}

// 用户注册信息入表
function userInfoStore(name, pwd, date) {
    userInfo.push({
        userName: name,
        userPwd: pwd,
        userDetailInfo: {
            createTime: date,
            money: 1000
        }
    });
}

function queryUserIndexByName(name) {
    let userNameIndex = -1;
    let flag = userInfo.some((value, index) => {
        if (value.userName === name) {
            userNameIndex = index;
        }
    });
    
    return userNameIndex;
}

function checkPwd(name, pwd) {
    let flag = false;
    userInfo.forEach(element => {
        if (element.userName === name && element.userPwd === pwd) {
            flag = true;
        }
    });
    return flag;
}

// ********************二级菜单函数********************
function queryRemainMoney(userInfoSecond) {
    return userInfo[userInfoSecond.userIndex].userDetailInfo.money;
}

function storeMoney(userInfoSecond, storeMoney) {
    userInfo[userInfoSecond.userIndex].userDetailInfo.money += storeMoney;
    return true;
}

function drawMoney(userInfoSecond, money) {
    userInfo[userInfoSecond.userIndex].userDetailInfo.money -= money;
    return true;
}

function changePwd(index, pwd) {
    userInfo[index].userPwd = pwd;
    return true;
}

