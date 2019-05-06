import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => { require(['@/components/Home.vue'], resolve); }
    },
    {
      path: '/regist',
      name: 'regist',
      component: resolve => { require(['@/components/Regist.vue'], resolve); }
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: resolve => { require(['@/components/UserInfo.vue'], resolve); }
    },
  ]
})
