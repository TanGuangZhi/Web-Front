import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user.js";
import film from "./modules/film.js";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,film
    }
})
