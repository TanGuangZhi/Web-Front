import Vue from 'vue'
import VueRouter from 'vue-router'
import BookView from "../views/BookView.vue";
import BookCount from "../views/BookCount.vue";


Vue.use(VueRouter)

const routes = [
    {
        path:"/bookView",
        name:"BookView",
        component:BookView
    },
    {
        path:"/bookCount",
        name:"BookCount",
        component:BookCount
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
