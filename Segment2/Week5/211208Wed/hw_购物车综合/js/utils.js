function check(selector, reg, alertMsg) {
    let userInputContent = $(selector);
    let alertDom = userInputContent.parent().find("span");
    if (reg.test((userInputContent.val()))) {
        alertDom.html("验证通过");
        alertDom.css("color", "green");
        return true;
    } else {
        alertDom.html(alertMsg);
        alertDom.css("color", "red");
        return false;
    }
}

// 用户注册/登录方法检测

function checkUserName(sel, warning) {
    if (!checkUserNameExit()) return;
    if (!warning) warning = "必须是3-5位字母";
    let reg = /^\w{3,5}$/;
    allRegCheckFlagList[0] = (check(sel, reg, warning));
}

function checkPass(sel) {
    let reg = /^\d{3,6}$/;
    allRegCheckFlagList[1] = (check(sel, reg, "必须是3-6位数字"));
}

function checkPhone(sel) {
    let reg = /^1[3-9]\d{9}$/;
    allRegCheckFlagList[2] = (check(sel, reg, "必须是11位数字"));
}

function checkCode(sel) {
    let reg = /^[a-zA-Z0-9]{4}$/;
    allRegCheckFlagList[3] = (check(sel, reg, "验证码不正确或失效"));
}

// 检查用户名是否已被注册过
function checkUserNameExit(params) {
    let flag = true;
    userInfo.forEach(element => {
        if (element.name === $('#regModal [name=userName]').val()) {
            let alertDom = $('#regModal [name=userName]').parent().find("span");
            alertDom.html("用户名已存在");

            alertDom.css("color", "red");
            flag = false;
        }
    });
    return flag;
}

// 添加电影模态框检测
let checkAddMovieArr = [{
    sel: "#addMovie #addMovieNameId",
    reg: /^\w{1,30}$/,
    alertMsg: "商品名应在1~30位合法字符之间"
}, {
    sel: "#addMovie #addMoviePriceId",
    reg: /^\d+\.?\d*$/,
    alertMsg: "必须是数字类型"
}, {
    sel: "#addMovie #addMovieTypeId",
    reg: /^\w{1,10}$/,
    alertMsg: "商品类型应在1~10位合法字符之间"
}, {
    sel: "#addMovie #addMovieImgId",
    reg: /^.+(\.png|\.jpg)$/,
    alertMsg: "必须是.png或.jpg结尾"
}]

function checkAddMovie(index) {
    allRegCheckFlagList[index] = check(checkAddMovieArr[index].sel, checkAddMovieArr[index].reg, checkAddMovieArr[index].alertMsg);
}

// 修改电影模态框检测
let checkChangeMovieArr = [{
    sel: "",
    reg: /^$/,
    alertMsg: ""
}, {
    sel: "#changeMovie #changeMovieNameId",
    reg: /^\w{1,30}$/,
    alertMsg: "商品名应在1~30位合法字符之间"
}, {
    sel: "#changeMovie #changeMoviePriceId",
    reg: /^\d+\.?\d*$/,
    alertMsg: "必须是数字类型"
}, {
    sel: "#changeMovie #changeMovieTypeId",
    reg: /^\w{1,10}$/,
    alertMsg: "商品类型应在1~10位合法字符之间"
}, {
    sel: "#changeMovie #changeMovieImgId",
    reg: /^.+(\.png|\.jpg)$/,
    alertMsg: "必须是.png或.jpg结尾"
}]

function checkChangeMovie(index) {
    allRegCheckFlagList[0] = true; // 特殊处理id位置
    allRegCheckFlagList[index] = check(checkChangeMovieArr[index].sel, checkChangeMovieArr[index].reg, checkChangeMovieArr[index].alertMsg);
}

// 检测是否可以正确添加或修改
function checkIsCanAddOrChange(params) {
    let allRegCheckFlag = allRegCheckFlagList.every(value => value);
    if (allRegCheckFlagList.length < 4) {
        allRegCheckFlag = false;
    }
    if (!allRegCheckFlag) {
        // 提示用户哪里没通过
        for (let index = 1; index < 5; index++) {
            checkChangeMovie(index);
            checkAddMovie(index - 1);
        }
        return false;
    }
    return true;
}

// 添加地址正则检测
let checkAddAddressArr = [{
    sel: "#addAddreModal [name='consignee']",
    reg: /^\w{1,30}$/,
    alertMsg: "用户名应在1~30位合法字符之间"
}, {
    sel: "#addAddreModal [name='phone']",
    reg: /^1[3-9]\d{9}$/,
    alertMsg: "必须由11位数字组成"
}, {
    sel: "#addAddreModal [name='zipCode']",
    reg: /^\d{4,9}$/,
    alertMsg: "应为4~9位数字"
}, {
    sel: "#addAddreModal #changeMovieImgId",
    reg: /^.+(\.png|\.jpg)$/,
    alertMsg: "必须是.png或.jpg结尾"
}, {
    sel: "#addAddreModal #detailAddress",
    reg: /^\w{1,50}$/,
    alertMsg: "应在50位合法字符之间"
}]

function checkAddAddress(index) {
    allRegCheckAddAddressList[index] = check(checkAddAddressArr[index].sel, checkAddAddressArr[index].reg, checkAddAddressArr[index].alertMsg);
}