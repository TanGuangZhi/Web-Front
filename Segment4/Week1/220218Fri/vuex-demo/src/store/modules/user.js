/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 14:50:58 Fri
 * @LastEditTime: 2022-02-18 15:16:11 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 组块化
 * @KeyWords: NodeJs, Express, MongoDB
 */
import api from "../../http/api.js";

export default {
    namespaced: true,
    state: {
        pageInfo: { userList: [], lastPage: 0 }
    },
    mutations: {
        SET_PAGE_INFO(state, pageInfo) {
            state.pageInfo = pageInfo;
        }
    },
    actions: {
        async queryUser() {
            return await api.user.queryUser();
        }
    },
}
