import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/Login.vue";
import UserView from "../views/UserView.vue";
import FilmView from "../views/FilmView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path:"/login",
        name:"Login",
        component:Login
    },
    {
        path:"/userView",
        name:"UserView",
        component:UserView
    },
    {
        path:"/filmView",
        name:"FilmView",
        component:FilmView
    },
    {
        path:"*",
        name:"Error",
        component:()=>import("../views/error/Error.vue")
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
