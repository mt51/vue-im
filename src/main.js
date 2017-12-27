import IM from './im'
import Message from './components/message.js'

const VueIM = {}

VueIM.install = function (Vue, opts) {
  Vue.component('vue-im', IM)
  Vue.prototype.$message = Message
}

if (typeof window !== 'undefined' && window.Vue) {
  VueIM.install(window.Vue)
}

export default VueIM
