/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 10:18:54 Mon
 * @LastEditTime: 2022-02-21 15:56:09 Mon
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: NodeJs, Express, MongoDB
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Details from '../views/Details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/index/home"
  },
  {
    path: '/index',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Head.vue'),
    children: [{
      path: "home",
      name: "Home",
      component: Home
    }, {
      path: "details",
      name: "Details",
      component: Details,
      meta: {
        title: "详情"
      }
    }]
  }, {
    path: "*",
    name: "error",
    component: () => import("../views/Register.vue")
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
