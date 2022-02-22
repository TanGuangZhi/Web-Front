/*
 * @Author: TanGuangZhi
 * @Date: 2022-01-20 09:13:25 Thu
 * @LastEditTime: 2022-02-11 10:42:03 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import "@css/bootstrap.css";
import "../../css/outer01.css";

$("#login-btn").click(function (e) {
    e.preventDefault();
    // #TODO query admin info from db 
    // alert(`1`);
    if ($("[name=userName]").val() == "admin") {
        window.location.href = "./filmAdmin/filmAdmin.html";
        // console.log(1);
    } else if ($("[name=userName]").val() == "supAdmin") {
        window.location.href = "./admin/admin.html";
        // console.log(2);
    } else {
        alert("您没有权限")
    }

});
