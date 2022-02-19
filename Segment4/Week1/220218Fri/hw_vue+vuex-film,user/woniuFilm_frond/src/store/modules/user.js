/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:27 Fri
 * @LastEditTime: 2022-02-19 10:09:49 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
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
            // console.log(updateShowBackObj);
            state.pageInfo.updateShowBackObj = updateShowBackObj;
        }
    },
    actions: {
        async queryUserAsync(context) {
            let data = await api.user.queryUser();
            context.commit("SET_USER_LIST", data.data);
        },
        async deleteUserAsync(context, _idArr) {
            let data = await api.user.deleteUser(_idArr);
            return data.data;
        },
        async insertUserAsync(context, user) {
            let data = await api.user.insertUser(user);
            return data.data;
        },
        async updateUserAsync(context, user) {
            let data = await api.user.updateUser(user);
            return data.data;
        },
    }
}
