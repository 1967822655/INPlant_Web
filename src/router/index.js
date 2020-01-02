import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login/login'
import index from '@/components/homepage/index'
import homepage from '@/components/homepage/homepage'
import rootIndex from '@/components/homepage/rootIndex'

window.echarts = require('echarts')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    // {
    //   path: '/INPlant_Web',
    //   component: login
    // },
    {
      path: '/index',
      component: index
    },
    {
      path: '/homepage',
      component: homepage
    },
    {
      path: '/rootIndex',
      component: rootIndex
    },
    {
      path: '*',
      redirect: '/'
    }
    // {
    //   path: '*',
    //   redirect: '/INPlant_Web'
    // }
  ],
  base: '/INPlant'
  // mode: 'history'
})
