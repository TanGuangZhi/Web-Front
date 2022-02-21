/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-18 18:51:27 Fri
 * @LastEditTime: 2022-02-18 19:30:49 Fri
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import axios from "axios";
export default {
    queryFilmApi() {
        return axios({
            url: "film/queryFilm",
            method: "GET"
        });
    },
    insertFilmApi(film) {
        return axios({
            url: "film/insertFilm",
            method: "POST",
            data: film
        });
    },
    updateFilmApi(film) {
        return axios({
            url: "film/updateFilm",
            method: "POST",
            data: film
        });
    },
    deleteFilmApi(_id) {
        return axios({
            url: "film/deleteFilm",
            method: "GET",
            params: { _id }
        });
    }
}
