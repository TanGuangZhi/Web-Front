/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 18:57:11 Tue
 * @LastEditTime: 2022-02-22 20:22:03 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import Vue from "vue";

Vue.filter("userTypeFilter", function (val) {
    if (val == 1) {
        return "普通用户";
    } else if (val == 2) {
        return "影院管理员";
    } else if (val == 3) {
        return "超级管理员";
    } else {
        return "暂无";
    }
});

Vue.filter("userStatusFilter", function (val) {
    if (val == 1) {
        return "已激活";
    } else {
        return "未激活";
    }
});

Vue.filter("nullFilter", function (val) {
    if (val) {
        return val;
    }
    return "暂无";
});

Vue.filter("scoreFilter", function (val) {
    let res = "";
    if (val >= 0 && val < 6) {
        res = "烂片"
    } else if (val >= 6 && val < 8.5) {
        res = "普通";
    } else if (val >= 8.5 && val < 10) {
        res = "经典";
    } else {
        res = "暂无评分";
    }
    return res + `(${val})`;

});
