/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-22 14:34:30 Sat
 * @LastEditTime: 2022-02-10 14:39:15 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "../css/style.css";
import "../css/font-awesome.min.css";
import { axios } from "./util/axios.js";

let randomCode;
function signUpBtnClick(params) {
    $("#addForm").submit(function (e) {
        e.preventDefault();
        // regular check
        if (randomCode) {
            // console.log(randomCode);
            if ($("[name=checkCode]").val() != randomCode) {
                alert("验证码不正确!");
                return;
            }
        }
        axios("http://localhost:3000/user/register", $("#addForm").serialize(), "text").then(res => {
            if (res == "1") {
                alert("注册成功");
            } else {
                alert("注册失败");
            }
        });
    });
}
signUpBtnClick();

// phone register
$("#togglePhoneRegister").click(function (e) {
    e.preventDefault();
    // console.log(1);
    $("#addForm").html(
        ` <fieldset>
                    <div class="form">
                        <div class="form-row">
                            <span class="fa fa-user"></span>
                            <input type="text" name=name class="form-text" placeholder="Name" required="">
                        </div>
                        <div class="form-row">
                            <span class="fa fa-lock"></span>
                            <input type="password" name="password" class="form-text" placeholder="Password" required="">
                        </div>
                        <div class="form-row">
                            <span class="fa fa-phone"></span>
                            <input type="phone" name="phone" class="form-text" placeholder="Phone Num" required="">
                            <button type="button" id="sendCheckCode" class="">发送验证码</button>
                        </div>
                        <div class="form-row">
                            <input type="text" name="checkCode" class="form-text" placeholder="Check Code" required="">
                        </div>
                        <div class="form-row button-login">
                            <button type="submit" id="addBtn" class="btn btn-login">Sign Up</button>
                        </div>
                    </div>
                </fieldset>`);

    $('#sendCheckCode').click(function () {
        $(this).attr("disabled", true);
        $(this).html("60S");
        axios("http://localhost:3000/user/sendCheckCode", $("#addForm").serialize()).then(function (res) {
            randomCode = res;
            // console.log(randomCode);
            signUpBtnClick(randomCode);
        })

        let waitTime = 60;
        let timer = setInterval(() => {
            waitTime -= 1;
            $(this).html(waitTime + "S");
            if (waitTime == 0) {
                clearInterval(timer);
                $(this).attr("disabled", false);
                $(this).html("发送验证码");
            }
        }, 1000);
    });

    // signUpBtnClick();
});
