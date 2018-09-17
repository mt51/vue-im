import Vue from 'vue'
import VueIM from '../src/main.js'
import Demo from './demo.vue'

import Mock from '../mock'

Vue.use(VueIM)

// 开启debug模式
Vue.config.debug = true

new Vue({
  // eslint-disable-line no-new
  el: '#app',
  render: h => h(Demo)
})