/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 09:55:55 Tue
 * @LastEditTime: 2022-02-24 18:03:30 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/Login.vue";
import UserView from "../views/UserView.vue";
import FilmView from "../views/FilmView.vue";
import Index from "../views/Index.vue";
import Home from "../views/Home.vue";
import api from '../http/api';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: "/home",
        component: Index,
        // name: "index",
        // meta: { title: "首页" },
        children: [
            {
                path: "/home",
                name: "Home",
                component: Home,
                meta: { title: "Home" }
            },
            {
                path: "/userView",
                name: "UserView",
                component: UserView,
                meta: { title: "用户管理" }
            },
            {
                path: "/filmView",
                name: "FilmView",
                component: FilmView
            },
        ]
    },
    {
        path: "*",
        name: "Error",
        component: () => import("../views/error/Error.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// set global guider
// let noCheckTokenArray = ["/login"]
// router.beforeEach((to, from, next) => {
//     if (noCheckTokenArray.includes(to.path)) {
//         next();
//     } else {
//         let token = localStorage.getItem("token");
//         if (token) {
//             api.user.checkTokenApi(token).then(res => {
//                 next();
//             }).catch(err => {
//                 localStorage.removeItem("token");
//                 // store.commit("SET_USER_INFO", {});
//                 next("/login");
//             })
//         } else {
//             alert("请先登录");
//         }
//     }
// })
export default router
