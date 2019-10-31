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
      redirect: '/INPlant_Web'
    },
    {
      path: '/INPlant_Web',
      component: login
    },
    {
      path: '/INPlant_Web/index',
      component: index
    },
    {
      path: '/INPlant_Web/homepage',
      component: homepage
    },
    {
      path: '/INPlant_Web/rootIndex',
      component: rootIndex
    },
    {
      path: '*',
      redirect: '/INPlant_Web'
    }
  ],
  mode: 'history'
})
