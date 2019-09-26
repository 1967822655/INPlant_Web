import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login/login'
import index from '@/components/homepage/index'
import homepage from '@/components/homepage/homepage'

window.echarts = require('echarts')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage
    }
  ]
})
