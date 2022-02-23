import Vue from "vue";
import $ from "jquery";
//1.自定义了一个全局指令
Vue.directive("focus",{
    inserted:function (el) {
        //1.el 表示的是当前的js  dom对象
        el.focus();//可以得到输入框的焦点
    }
});




