

// 登录模态框内按钮点击
$('#loginModal #loginBtn').click(function (e) {

    let inputNameDomValue = $("[name=\"userName\"]").val();
    let inputPwdDomValue = $("[name=\"userPass\"]").val();
    let userFlag = false;
    let userId;
    for (let index = 0; index < userInfoList.length; index++) {
        const element = userInfoList[index];
        if (element.userName === inputNameDomValue && inputPwdDomValue === element.userPass) {
            userFlag = true;
            userId = element.userId;
            break;
        }

    }
    if (userFlag) {
        remeberMe(inputNameDomValue, inputPwdDomValue, "user", userId);

        changeIframeForHeader()
        location.reload();
    } else {
        alert('输入错误,请重新输入');
        return;
    }
});

// 切换iframe
function changeIframeForHeader(params) {
    $('#header').html('<iframe src="../template/head.html" width="100%" height="80px" frameborder="0"></iframe>')
}

// 展示密码
$('#loginModal #showPwdBtn').click(function (e) {
    if ($('[name=userPass]').attr("type") === "password") {
        $('[name=userPass]').attr("type", "text");
    } else {
        $('[name=userPass]').attr("type", "password");
    }
});

// 用户输入正则判断事件绑定
// $("#loginModal [name=\"userName\"]").on("keyup focus blur", function () {
//     checkUserName("#loginModal [name=userName]", "用户名输入错误或不存在");
// });

// $("#loginModal [name=\"userPass\"]").on("keyup focus blur", function () {
//     checkPass("#loginModal [name=userPass]");
// });

// 记住我事件触发本地缓存事件
function remeberMe(inputNameDom, inputPwdDom, userType, userId) {
    let loginUserInfo = {
        userName: inputNameDom,
        userPass: inputPwdDom,
        userType: userType,
        userId: userId
    }
    if ($('#remeberMe').prop("checked")) {
        localStorage.setItem("remeberMe", "true");
    }
    console.log(loginUserInfo);
    sessionStorage.setItem("loginUserInfo", JSON.stringify(loginUserInfo));
    localStorage.setItem("loginUserInfo", JSON.stringify(loginUserInfo));
}

function showOtherBtn(type) {
    if (type == "admin") {
        $('#backstageBtn').prop("hidden", false);
        $('#logOutBtn').prop("hidden", false);

    } else {
        $('#indexBtn').prop("hidden", false);
        $('#shoppingCartBtn').prop("hidden", false);
        $('#userHomeBtn').prop("hidden", false);
        $('#logOutBtn').prop("hidden", false);
    }
}

function hideSomeBtn(params) {
    $('[data-bs-target="#loginModal"]').prop("hidden", true);
    $('[data-bs-target="#regModal"]').prop("hidden", true);
}



// 从后端查询用户
function queryUserInfoFromEnd(params) {
    $.ajax({
        type: "get",
        url: "/end/user/queryUser",
        dataType: "json",
        success: function (response) {
            userInfoList = Array.from(response.userInfoList);
            // adminInfoList = Array.from(response.adminInfoList);
            console.log(`${userInfoList[0].userName}`);
        }
    });
}

function judgeCookie(params) {
    let loginerInfoSession = JSON.parse(sessionStorage.getItem("loginUserInfo"));
    let loginerInfoLocal = JSON.parse(localStorage.getItem("loginUserInfo"));
    const status = [null, undefined, {}, "", 0, NaN];
    if (!status.includes(loginerInfoSession)) {
        // 如果用户选择"记住我",则自动填充用户名与密码
        if (localStorage.getItem("remeberMe") == "true") {
            $("#loginModal [name=\"userName\"]").val(loginerInfoLocal.userName);
            $("#loginModal [name=\"userPass\"]").val(loginerInfoLocal.userPass);
        } else {
            $("#loginModal [name=\"userName\"]").val(loginerInfoSession.userName);
            $("#loginModal [name=\"userPass\"]").val(loginerInfoSession.userPass);
            // $('#loginModal #remeberMe').prop("checked", true);
            // 左侧显示用户名
            $('#userInfo #userName').html(loginerInfoSession.userName);
            showOtherBtn(loginerInfoSession.userType);
            hideSomeBtn();
        }
    }

    // if (!status.includes(loginerInfoLocal)) {
    //     $("#loginModal [name=\"userName\"]").val(loginerInfoLocal.userName);
    //     $("#loginModal [name=\"userPass\"]").val(loginerInfoLocal.userPass);
    // } else if (!status.includes(loginerInfoSession)) { // 如果session有缓存,则左侧填充用户名,代表已登录,并对按钮进行操作
    //     $("#loginModal [name=\"userName\"]").val(loginerInfoSession.userName);
    //     $("#loginModal [name=\"userPass\"]").val(loginerInfoSession.userPass);
    //     // $('#loginModal #remeberMe').prop("checked", true);
    //     // 左侧显示用户名
    //     $('#userInfo #userName').html(loginerInfoSession.userName);
    //     showOtherBtn(loginerInfoSession.userType);
    //     hideSomeBtn();
    // }
}

// 注销用户登录
$('#logOutBtn').click(function () {
    // localStorage.removeItem("userInfo");
    sessionStorage.removeItem("loginUserInfo");

    location.reload();
})

// init
function init(params) {
    // 1. 从数据库查询用户
    queryUserInfoFromEnd();
    // 2. 判断缓存
    judgeCookie();
}


init();
