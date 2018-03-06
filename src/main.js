import IM from './im'
import Message from './components/Message/message.js'
import 'font-awesome/css/font-awesome.min.css'
import './assets/reset.css'
import './assets/skin.scss'

const VueIM = {}

VueIM.install = function (Vue, opts) {
  Vue.component('vue-im', IM)
  Vue.prototype.$message = Message
}

if (typeof window !== 'undefined' && window.Vue) {
  VueIM.install(window.Vue)
}

export default VueIM
