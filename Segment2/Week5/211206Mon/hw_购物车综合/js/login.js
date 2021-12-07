

// 登录模态框内按钮点击
$('#loginModal #loginBtn').click(function (e) {

    let inputNameDom = $("[name=\"userName\"]").val();
    let inputPwdDom = $("[name=\"userPass\"]").val();
    let flag = userInfo.some(element => inputNameDom === element.name && inputPwdDom === element.pwd);
    if (flag) {
        // window.location.href = "admin.html";
        // queryGoods();
        remeberMe(inputNameDom, inputPwdDom);
        showOtherBtn();
        hideSomeBtn();
        $('#userInfo #userName').html(inputNameDom);

        alert(`登录成功`);
        location.reload();
    } else {
        // checkUserName("#loginModal [name=userName]", "用户名输入错误或不存在");
        // checkPass("#loginModal [name=userPass]");
        alert('输入错误,请重新输入');
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
function remeberMe(inputNameDom, inputPwdDom) {
    let userInfo = {
        name: inputNameDom,
        pwd: inputPwdDom
    }
    if ($('#remeberMe').prop("checked")) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
}

function showOtherBtn(params) {
    $('#shoppingCartBtn').prop("hidden", false);
    $('#userHomeBtn').prop("hidden", false);
    $('#backstageBtn').prop("hidden", false);
    $('#logOutBtn').prop("hidden", false);
}

function hideSomeBtn(params) {
    $('[data-bs-target="#loginModal"]').prop("hidden", true);
    $('[data-bs-target="#regModal"]').prop("hidden", true);
}

// init
function init(params) {
    let temp = JSON.parse(localStorage.getItem("userInfo")) || JSON.parse(sessionStorage.getItem("userInfo"));
    userInfo = temp || userInfo;
    if (temp) {
        $("#loginModal [name=\"userName\"]").val(userInfo.name);
        $("#loginModal [name=\"userPass\"]").val(userInfo.pwd);
        // $('#loginModal #remeberMe').prop("checked", true);
        // 左侧显示用户名
        $('#userInfo #userName').html($("[name=\"userName\"]").val());
        hideSomeBtn();
        showOtherBtn();
    }
}

let userInfo = [{
    name: "admin",
    pwd: "666"
}, {
    name: "admin2",
    pwd: "666"
}]
init();