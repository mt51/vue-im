import Vue from 'vue'
import VueIM from '../src/main.js'
import Demo from './demo.vue'
import Login from './login.vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Mock from '../mock'

Vue.use(VueIM)

Vue.use(VueRouter)

Vue.use(elementUI)

// 开启debug模式
Vue.config.debug = true

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

Vue.prototype.axios = axios

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Demo
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  const userId = window.localStorage.getItem('userId')
  if (to.name === 'login') {
    next()
  } else {
    if (!token || !userId) {
      next('/login')
    } else {
      next()
    }
  }
})

new Vue({
  // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
  router
})