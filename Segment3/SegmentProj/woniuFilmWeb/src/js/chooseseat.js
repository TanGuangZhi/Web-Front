import "../css/common1.css";
import "../css/cinemas-seat.b8adee6e.css";

//1.选择位置
$(".sel-seat .example").click(function () {
    if($(this).hasClass("sold-example")){
        alert("已售出");
    }else if($(this).hasClass("selected-example")){
        $(this).removeClass("selected-example");
        $(this).addClass("selectable-example");
    }else{
        $(this).removeClass("selectable-example");
        $(this).addClass("selected-example");
    }
});