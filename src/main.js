import IM from './im'

const VueIM = {}

VueIM.install = function (Vue, opts) {
  Vue.component('vue-im', IM)
}

if (typeof window !== 'undefined' && window.Vue) {
  VueIM.install(window.Vue)
}

export default VueIM
