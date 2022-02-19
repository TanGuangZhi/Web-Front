/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:27 Fri
 * @LastEditTime: 2022-02-19 09:30:42 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import axios from "axios";
export default {
    queryUser() {
        return axios({
            url: "user/queryUser",
            method: "get"
        })
    },
    deleteUser(_idArr) {
        return axios({
            url: "user/deleteUser",
            method: "post",
            data: { _idArr }
        })
    },
    insertUser(user) {
        return axios({
            url: "user/insertUser",
            method: "post",
            data: { user }
        })
    },
    updateUser(user) {
        return axios({
            url: "user/updateUser",
            method: "post",
            data: { user }
        })
    },
}
