/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-21 19:22:10 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import axios from "axios";

export default {
    queryUserApi(params) {
        return axios({
            url: "user/queryUser",
            method: "GET",
            params
        });
    },
    deleteUserApi(_idArr) {
        return axios({
            url: "user/deleteUser",
            method: "post",
            data: { _idArr }
        });
    },
    updateUserApi(user) {
        return axios({
            url: "user/updateUser",
            method: "post",
            data: { user }
        });
    },
    insertUserApi(user) {
        return axios({
            url: "user/insertUser",
            method: "post",
            data: { user }
        });
    },
}
