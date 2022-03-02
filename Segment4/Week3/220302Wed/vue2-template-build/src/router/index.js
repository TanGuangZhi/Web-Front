/*
 * @Author: TanGuangZhi
 * @Date: 2022-03-02 09:54:06 Wed
 * @LastEditTime: 2022-03-02 11:21:05 Wed
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '../layout';

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
