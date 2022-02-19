/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 15:13:58 Fri
 * @LastEditTime: 2022-02-18 15:13:59 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import axios from 'axios';

export default {
    queryFilm() {
        return axios({
            url: "film/queryType",
            method: "get",
        })
    },
}
