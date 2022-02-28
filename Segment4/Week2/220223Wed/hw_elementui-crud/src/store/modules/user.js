/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-22 15:47:00 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import api from "../../http/api.js";

export default {
    namespaced: true,
    state: {
        pageInfo: { userList: [], lastPage: 0, updateShowBackObj: {} },
        pageData: { nowPage: 1, pageSize: 5 },
    },
    mutations: {
        SET_PAGE_INFO(state, pageInfo) {
            state.pageInfo = pageInfo;
        },
        SET_PAGE_DATA(state, pageData) {
            state.pageData = pageData;
        },
        SET_USER_LIST(state, userList) {
            state.pageInfo.userList = userList;
        },
        SET_UPDATE_SHOW_BACK(state, updateShowBackObj) {
            state.pageInfo.updateShowBackObj = updateShowBackObj;
        }
    },
    actions: {
        async queryUserAsync(context, queryData) {
            let data = await api.user.queryUserApi(queryData);
            context.commit("SET_USER_LIST", data.data);
        },
        async deleteUserAsync(context, _idArr) {
            let data = await api.user.deleteUserApi(_idArr);
            return data.data;
        },
        async insertUserAsync(context, user) {
            let data = await api.user.insertUserApi(user);
            return data.data;
        },
        async updateUserAsync(context, user) {
            let data = await api.user.updateUserApi(user);
            return data.data;
        },
        async loginAsync(context, user) {
            let data = await api.user.login(user);
            if (data.data.token) {
                localStorage.setItem("token", data.data.token);
            }
            return data.data;
        },

    }
}
