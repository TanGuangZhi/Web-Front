/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-21 19:32:34 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import api from "../../http/api.js";

export default {
    namespaced: true,
    state: {
        pageInfo: { filmList: [], lastPage: 0 },
        pageData: { nowPage: 1, pageSize: 6 },
    },
    mutations: {
        SET_PAGE_INFO(state, pageInfo) {
            state.pageInfo = pageInfo;
        },
        SET_PAGE_DATA(state, pageData) {
            state.pageData = pageData;
        },
        SET_FILM_LIST(state, filmList) {
            state.pageInfo.filmList = filmList;
        }

    },
    actions: {
        async queryFilmAsync(context) {
            let data = await api.film.queryFilmApi();
            context.commit("SET_FILM_LIST", data.data);
        },
        async insertFilmAsync(context, _id) {
            let data = await api.film.insertFilmApi(_id);
            return data.data;
        },
        async deleteFilmAsync(context, _id) {
            let data = await api.film.deleteFilmApi(_id);
            return data.data;
        },
        async updateFilmAsync(context, film) {
            let data = await api.film.updateFilmApi(film);
            return data.data;
        }
    },
}
