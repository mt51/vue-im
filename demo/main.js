import Vue from 'vue'
import VueIM from '../src/main.js'
import IM from './im.vue'

Vue.use(VueIM)

// 开启debug模式
Vue.config.debug = true

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(IM)
})
