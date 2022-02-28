/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-28 09:41:24 Mon
 * @LastEditTime: 2022-02-28 09:45:21 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import axios from "axios";

export default {
    queryBookApi(params) {
        return axios({
            url: "book/queryBook",
            method: "GET",
            params
        });
    },
    insertBookApi(book) {
        return axios({
            url: "book/insertBook",
            method: "POST",
            data: { book }
        });
    },
    updateBookApi(book) {
        return axios({
            url: "book/updateBook",
            method: "POST",
            data: { book }
        });
    },
    deleteBookApi(_id) {
        return axios({
            url: "book/deleteBook",
            method: "GET",
            params: { _id }
        });
    },
    queryBookTypeApi(params) {
        return axios({
            url: "book/queryBookType",
            method: "GET",
            params
        });
    },
}
