// 注册模态框点击事件
// 使用绑定事件+命名函数的形式实现多次调用(用于用户点击注册时再次校验)
$("#regModal [name=userName]").on("keyup focus blur", function () {
    if (!checkUserNameExit()) return;
    checkUserName("#regModal [name=userName]");
})
$('#regModal [name=userPass]').on("keyup focus blur", function () {
    checkPass('#regModal [name=userPass]');
})
$('#regModal [name=userPhone]').on("keyup focus blur", function () {
    checkPhone('#regModal [name=userPhone]');
})
$('#regModal [name=code]').on("keyup focus blur", function () {
    checkCode('#regModal [name=code]');
})

// 内部注册按钮点击事件
$('#regModal #regBtn').click(function (e) {
    // 正则验证
    let allRegCheckFlag = allRegCheckFlagList.every(value => value);
    if (allRegCheckFlagList.length < 4) {
        allRegCheckFlag = false;
    }
    if (!allRegCheckFlag) {
        if (!checkUserNameExit()) return;
        checkUserName("#regModal [name=userName]");
        checkPass('#regModal [name=userPass]');
        checkPhone('#regModal [name=userPhone]');
        checkCode('#regModal [name=code]');
        return;
    }
    $.ajax({
        type: "post",
        url: "/end/regUser",
        data: {
            "userName": $('#regModal [name=userName]').val(),
            "userPass":$('#regModal [name=userPass]').val(),
            "userPhone": $("#regModal [name=userPhone]").val(),
            "type": "user",
        },
        dataType: "json",
        success: function (response) {
            console.log(`${response}`);
            $(this).attr("data-dismiss", "modal");
            // storageUserInfo();
            alert(`注册成功,正在重新登录`);
            location.reload();
        }
    });
});

// 存储用户信息
function storageUserInfo(params) {
    let userJson = {
        userName: $('#regModal [name=userName]').val(),
        userPass: $('#regModal [name=userPass]').val()
    }
    userInfoListInDB.push(userJson);
    localStorage.setItem("loginUserInfo", JSON.stringify(userInfo));
    sessionStorage.setItem("loginUserInfo", JSON.stringify(userJson));
}

// 密码可见
$('#regModal .showPwdBtn').click(function (e) {
    if ($('[name=userPass]').attr("type") === "password") {
        $('[name=userPass]').attr("type", "text");
    } else {
        $('[name=userPass]').attr("type", "password");
    }

});

// ================验证码区================
let regObj = {};

regObj.sentMsg = $("#regModal #sentMsgBtn").click(function (e) {
    // 手机号不正确则不让发送
    if (!allRegCheckFlagList[2]) {
        checkPhone('#regModal [name=userPhone]');
        return;
    }
    let count = 60;
    // 初始化,防止等待1秒才出现效果
    dom = $(this);
    dom.html(60 + "(s)");
    dom.prop("disabled", true);
    // #TODO 优化 一函一事
    let checkCode = generCheckCode(4);
    showCheckCode(dom, checkCode);
    checkCode = checkCode.toLowerCase();

    let timer = window.setInterval(function () {

        let checkCodeRight = checkCheckCode(checkCode);
        count--;
        if (count >= 0) {
            dom.html(count + "(s)");
            dom.prop("disabled", true);
            if (checkCodeRight) {
                $('[value="登录"]').prop("disabled", false)
            }
        } else {
            dom.html("发送");
            dom.prop("disabled", false);
            $('[value="登录"]').prop("disabled", true);
            showInvalidCheckCode(dom);
            window.clearInterval(timer);
        }
    }, 1000)
});

function generCheckCode(num) {
    let randomSting = "zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP1234567890";
    let randomCode = "";
    for (let index = 0; index < num; index++) {
        let randomNum = parseInt(Math.random() * (randomSting.length));
        randomCode += randomSting.charAt(randomNum) + "";
    }
    return randomCode;
}

function showCheckCode(dom, checkCode) {
    clearInvalidCheckCode(dom);
    // let randomSeconds = (parseInt(Math.random() * 3) + 3) * 1000;
    // #TODO 测试用
    let randomSeconds = (parseInt(Math.random() * 3) + 3);
    setTimeout(() => {
        dom.next().html(checkCode)
    }, randomSeconds);
}

// 判断输入的验证码等于后台验证码否
function checkCheckCode(params) {
    return $('[name="code"]').val() == params;
}


function showInvalidCheckCode(dom) {
    dom.next().css({ "color": "gray", "text-decoration": "line-through" });
}

// 清除失效验证码样式
function clearInvalidCheckCode(dom) {
    dom.next().html("");
    dom.next().css({ "color": "#000", "text-decoration": "none" });
}

let allRegCheckFlagList = [false];
// 注销用户登录
// $('#logOutBtn').click(function () {
//     // localStorage.removeItem("userInfo");
//     sessionStorage.removeItem("userInfo");

//     location.reload();
// })