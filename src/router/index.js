import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '教育系统 - 首页'
      },
      component: resolve => { require(['@/components/Home.vue'], resolve); }
    },
    {
      path: '/regist',
      name: 'regist',
      meta: {
        title: '教育系统 - 注册'
      },
      component: resolve => { require(['@/components/Regist.vue'], resolve); }
    }
  ]
})
