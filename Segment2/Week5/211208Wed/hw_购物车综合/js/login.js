

// 登录模态框内按钮点击
$('#loginModal #loginBtn').click(function (e) {

    let inputNameDomValue = $("[name=\"userName\"]").val();
    let inputPwdDomValue = $("[name=\"userPass\"]").val();
    // userInfo = JSON.parse(localStorage.getItem("loginUserInfo")) || userInfo;
    let userFlag = userInfoList.some(element => inputNameDomValue === element.userName && inputPwdDomValue === element.userPass);
    let adminFlag = adminInfo.some(element => inputNameDomValue === element.userName && inputPwdDomValue === element.userPass);
    if (userFlag) {
        remeberMe(inputNameDomValue, inputPwdDomValue, "user");
        showOtherBtn("user");
        hideSomeBtn();
        $('#userInfo #userName').html(inputNameDomValue);

        location.reload();
    } else if (adminFlag) {
        remeberMe(inputNameDomValue, inputPwdDomValue, "admin");
        showOtherBtn("admin");
        hideSomeBtn();
        $('#userInfo #userName').html(inputNameDomValue);
        location.reload();
    }
    else {
        alert('输入错误,请重新输入');
        return;
    }
});

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
function remeberMe(inputNameDom, inputPwdDom, userType) {
    let loginUserInfo = {
        userName: inputNameDom,
        userPass: inputPwdDom,
        userType: userType
    }
    if ($('#remeberMe').prop("checked")) {
        localStorage.setItem("loginUserInfo", JSON.stringify(loginUserInfo));
        sessionStorage.setItem("loginUserInfo", JSON.stringify(loginUserInfo));
    } else {
        sessionStorage.setItem("loginUserInfo", JSON.stringify(loginUserInfo));
    }
}

function showOtherBtn(type) {
    if (type == "admin") {
        $('#backstageBtn').prop("hidden", false);
        $('#logOutBtn').prop("hidden", false);

    } else {
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
        url: "/end/queryUser",
        dataType: "json",
        success: function (response) {
            userInfoList = Array.from(response.userInfoList);
            adminInfoList = Array.from(response.adminInfoList);
            console.log(`${JSON.stringify(userInfoList)}`);
        }
    });
}

function judgeCookie(params) {
    let loginerInfoSession = JSON.parse(sessionStorage.getItem("loginUserInfo"));
    let loginerInfoLocal = JSON.parse(localStorage.getItem("loginUserInfo"));
    const status = [null, undefined, {}, "", 0, NaN];
    // 如果local有缓存,则自动填充`用户名与密码
    if (!status.includes(loginerInfoLocal)) {
        $("#loginModal [name=\"userName\"]").val(loginerInfoLocal.userName);
        $("#loginModal [name=\"userPass\"]").val(loginerInfoLocal.userPass);
    } else if (!status.includes(loginerInfoSession)) { // 如果session有缓存,则左侧填充用户名,代表已登录,并对按钮进行操作
        $("#loginModal [name=\"userName\"]").val(loginerInfoSession.userName);
        $("#loginModal [name=\"userPass\"]").val(loginerInfoSession.userPass);
        // $('#loginModal #remeberMe').prop("checked", true);
        // 左侧显示用户名
        $('#userInfo #userName').html(loginerInfoSession.userName);
        showOtherBtn(loginerInfoSession.userType);
        hideSomeBtn();
    }
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

let userInfoList, adminInfoList;
init();
