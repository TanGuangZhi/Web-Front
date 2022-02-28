/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-28 09:40:18 Mon
 * @LastEditTime: 2022-02-28 10:11:35 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import api from "../../http/api.js";

export default {
    namespaced: true,
    state: {
        pageInfo: { bookList: [], lastPage: 0 },
        pageData: { nowPage: 1, pageSize: 6 },
    },
    mutations: {
        SET_PAGE_INFO(state, pageInfo) {
            state.pageInfo = pageInfo;
        },
        SET_PAGE_DATA(state, pageData) {
            state.pageData = pageData;
        },
        SET_BOOK_LIST(state, bookList) {
            state.pageInfo.bookList = bookList;
        }

    },
    actions: {
        async queryBookAsync(context, queryData) {
            let data = await api.bookApi.queryBookApi(queryData);
            context.commit("SET_BOOK_LIST", data.data);
        },
        async insertBookAsync(context, _id) {
            let data = await api.bookApi.insertBookApi(_id);
            return data.data;
        },
        async deleteBookAsync(context, _id) {
            let data = await api.bookApi.deleteBookApi(_id);
            return data.data;
        },
        async updateBookAsync(context, book) {
            let data = await api.bookApi.updateBookApi(book);
            return data.data;
        }
    },
}
