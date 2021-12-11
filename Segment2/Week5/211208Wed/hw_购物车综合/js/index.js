// 二级菜单鼠标移入移出动画效果
$("#secondNav ul li").hover(function () {
    // over
    $('#secondType').slideDown(500);
}, function () {
    // out
    $('#secondType').stop(true);
    $('#secondType').slideUp(500);
}
);

// 二级菜单停留动画效果
$("#secondNav #secondType").hover(function () {
    // over
    $(this).stop(true);
}, function () {
    // out
    $(this).slideUp(500);
}
);

// 一级菜单鼠标移入移出动画效果
let lastTimeAnimateIndex;
$('#firstNav ul li').hover(function () {
    // over
    $('.firstTypeList').slideDown(500);
}, function () {
    // out
    // lastTimeAnimateIndex = $(this).attr("data-index");
    $(".firstTypeList").stop(true,true);
    $('.firstTypeList').slideUp(100);
}
);

// 一级菜单停留动画效果
$("#firstNav .firstTypeList").hover(function () {
    // over
    $(this).stop(true);
}, function () {
    // out
    $(this).slideUp(500);
}
);