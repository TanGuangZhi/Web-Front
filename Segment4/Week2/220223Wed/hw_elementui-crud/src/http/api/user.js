/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-26 15:01:02 Sat
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
    login(user) {
        return axios({
            url: "user/loginUser",
            method: "get",
            params: user
        })
    },
    checkTokenApi(token) {
        return axios({
            url: "user/checkToken",
            method: "post",
            data: { token }
        });
    }
}
