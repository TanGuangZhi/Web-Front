/**
 * 描述
 * @date 2021-12-30
 * @param {any} "#allId"
 * @returns {any}
 */
$("#allId").change(function () {
    $(".sel").prop("checked", $(this).prop("checked"));
});

