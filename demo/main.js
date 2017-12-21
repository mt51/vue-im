import Vue from 'vue'
import IM from './im.vue'

// 开启debug模式
Vue.config.debug = true

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(IM)
})
