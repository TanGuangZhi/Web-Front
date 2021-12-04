// 登录模态框内按钮点击
$('#loginModal #loginBtn').click(function (e) {
    let userInfo = [{
        name: "admin",
        pwd: "666666"
    }, {
        name: "admin2",
        pwd: "666"
    }]
    let inputNameDom = $("[name=\"userName\"]").val();
    let inputPwdDom = $("[name=\"userPass\"]").val();
    let flag = userInfo.some(element => inputNameDom === element.name && inputPwdDom === element.pwd);
    if (flag) {
        // window.location.href = "admin.html";
        // queryGoods();
        alert(`登录成功`);
    } else {
        checkUserName("#loginModal [name=userName]", "用户名输入错误或不存在");
        checkPass("#loginModal [name=userPass]");
        // alert('输入错误,请重新输入');
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
$("#loginModal [name=\"userName\"]").on("keyup focus blur", function () {
    checkUserName("#loginModal [name=userName]", "用户名输入错误或不存在");
})
$("#loginModal [name=\"userPass\"]").on("keyup focus blur", function () {
    checkPass("#loginModal [name=userPass]");
})