$("#target").submit(function (e) {
    // alert(`1`);
    let userInfo = {};
    // #TODO 这里到时候由前端传值
    let loginerInfoLocal = JSON.parse(localStorage.getItem("loginUserInfo"));
    // 获取用户输入信息
    userInfo.userId = loginerInfoLocal.userId;
    userInfo.userName = $("[name=userName]").val();
    userInfo.userPass = $("[name=userPwd]").val();
    userInfo.userAvatar = $("[name=userAvatar]").val();
    userInfo.userPhone = $("[name=userPhone]").val();

    $("[name=userName]").val(userInfo.userName + "11111");

    let userInfoList = JSON.parse(localStorage.getItem("userInfoList"));
    for (let index = 0; index < userInfoList.length; index++) {
        const element = userInfoList[index];
        if (element.userId == userInfo.userId) {
            element.userName = userInfo.userName;
            element.userPass = userInfo.userPass;
            element.userAvatar = userInfo.userAvatar;
            element.userPhone = userInfo.userPhone;
        }
    }
    localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    alert(`修改成功,下次登录生效`);
});

let userList = JSON.parse(localStorage.getItem("userInfoList"));
let loginerInfoSession = JSON.parse(sessionStorage.getItem("loginUserInfo"));

let userAvatar;
for (let index = 0; index < userList.length; index++) {
    const element = userList[index];
    if (element.userId == loginerInfoSession.userId) {
        userAvatar = element.userAvatar;
        break;
    }
}
$('#userAvatar').attr("src", userAvatar);

