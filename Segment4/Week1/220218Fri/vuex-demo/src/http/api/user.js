/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 15:13:25 Fri
 * @LastEditTime: 2022-02-18 15:14:28 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import axios from 'axios';

export default {
    queryUser() {
        return axios({
            url: "film/queryType",
            method: "get",
        })
    }
}
