let userList = [
    { id: 1, userName: 'jack', userPass: '1234', userPhone: '15439108583', userType: 0 },
    { id: 2, userName: 'charles', userPass: '1234', userPhone: '16351621554', userType: 1 },
];

// 登录模态框内按钮点击
$('#loginModal #loginBtn').click(function (e) {

    let inputNameDomValue = $("[name=\"userName\"]").val();
    let inputPwdDomValue = $("[name=\"userPass\"]").val();
    let flag = userList.some(element => inputNameDomValue === element.userName && inputPwdDomValue === element.userPass);
    if (flag) {
        // window.location.href = "admin.html";
        // queryGoods();
        $('#userNameShow').html(inputNameDomValue);

        alert(`登录成功`);
        $('#goEndManger').attr("href","main.html");

        // location.reload();
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



// 注册模态框点击事件
// 使用绑定事件+命名函数的形式实现多次调用(用于用户点击注册时再次校验)
$("#regModal [name=userName]").on("keyup focus blur", function () {
    if (!checkUserNameExit()) return;
    checkUserName("#regModal [name=userName]");
    checkRegBtn();
})
$('#regModal [name=userPass]').on("keyup focus blur", function () {
    checkPass('#regModal [name=userPass]');
    checkRegBtn();
})
$('#regModal [name=userPhone]').on("keyup focus blur", function () {
    checkPhone('#regModal [name=userPhone]');
    checkRegBtn();
})

// 检查用户名是否已被注册过
function checkUserNameExit(params) {
    let flag = true;
    userList.forEach(element => {
        console.log(`${element.userName}`);
        console.log($('#regModal [name=userName]').val());
        if (element.userName === $('#regModal [name=userName]').val()) {
            let alertDom = $('#regModal [name=userName]').parent().find("span");
            alertDom.html("用户名已存在");

            alertDom.css("color", "red");
            flag = false;
        }
    });
    return flag;
}

function checkRegBtn(params) {
    let allRegCheckFlag = allRegCheckFlagList.every(value => value);
    if (allRegCheckFlagList.length < 3) {
        allRegCheckFlag = false;
    }
    if (allRegCheckFlag) {
        $('#regModal #regBtn').prop("disabled", false);
    }
}

// 内部注册按钮点击事件
$('#regModal #regBtn').click(function (e) {
    let userInfo = {
        id: (userList[userList.length - 1].id) + 1,
        userName: $("#regModal [name=userName]").val(),
        userPass: $("#regModal [name=userPass]").val(),
        userPhone: $("#regModal [name=userPhone]").val(),
        userType: "1",
    }
    userList.push(userInfo);
    alert(`注册成功,请重新登录`);
});

// 密码可见
$('#regModal .showPwdBtn').click(function (e) {
    if ($('[name=userPass]').attr("type") === "password") {
        $('[name=userPass]').attr("type", "text");
    } else {
        $('[name=userPass]').attr("type", "password");
    }

});


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
    // if (!checkUserNameExit()) return;
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

let allRegCheckFlagList = [false];


function queryStusInfo() {
    $.ajax({
        type: "get",
        url: "/end/queryStuInfo",
        dataType: "json",
        success: function (response) {
            console.log(`${JSON.stringify(response)}`);
            let str = ``;
            response.forEach(element => {
                str += `
                <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3 table-bordered">
                <a href="#" style="text-decoration: none">
                <p style="margin-top:20px">
                    <img src="${element.stuImg}" class="img-circle" style="width: 200px;">
                </p>
                <p>姓名:${element.stuName}</p>
                <p style="color: gray">
                    ${element.stuTime}进入蜗牛学院
                </p>
                <p style="color: orange">
                    毕业薪资:￥${element.salary}
                </p>
               </a>
               </div>`;
            });
            $("#stuShowArea").html(str);
        }

    });
}



queryStusInfo();