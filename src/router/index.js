import Vue from 'vue'
import Router from 'vue-router'
import LoginedRoutes from './LoginedRoutes.js'

import Login from '../components/Login.vue'
import LoginedLayout from '../components/LoginedLayout.vue'

Vue.use(Router)

const AppRoutes = [
  {
    path: '/',
    components: {
      default: LoginedLayout
    },
    redirect: { name: "Board" },
    children: LoginedRoutes,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false // 不需驗證
    }, 
  },
  // 當 url path 不符合 router 表的時候，預設轉址到
  {
    path: '/*',
    redirect: '/login'
  }
];

export default new Router({
  mode: 'history',
  routes: AppRoutes,
})
