import "../css/style.css";
import "../css/font-awesome.min.css";
import {axios} from "./util/axios.js";
$("#addBtn").click(function () {
    axios("http://192.168.11.106:3000/user/addUser",$("#addForm").serialize(),"text").then(res=>{
        if(res=="1"){
            alert("注册成功");
        }else{
            alert("注册失败");
        }
    });
});