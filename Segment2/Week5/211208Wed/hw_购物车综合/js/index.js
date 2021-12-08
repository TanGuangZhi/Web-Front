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
    console.log(`1`);
    $(this).stop(true);
}, function () {
    // out
    $(this).slideUp(500);
}
);

// 一级菜单鼠标移入移出动画效果
$('#firstNav ul li').hover(function () {
    // over
    $(this).stop(true, true);
    $('.firstTypeList').slideDown(500);
}, function () {
    // out
    $('.firstTypeList').slideUp(500);
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