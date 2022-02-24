/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-24 20:19:46 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import axios from "axios";

export default {
    queryFilmApi(params) {
        return axios({
            url: "film/queryFilm",
            method: "GET",
            params
        });
    },
    insertFilmApi(film) {
        return axios({
            url: "film/insertFilm",
            method: "POST",
            data: { film }
        });
    },
    updateFilmApi(film) {
        return axios({
            url: "film/updateFilm",
            method: "POST",
            data: { film }
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
