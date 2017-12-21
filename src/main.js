import IM from './im'

const vueIM = {}

vueIM.install = function (Vue, opts) {
  Vue.component('IM', IM)
}

if (typeof window !== 'undefined' && window.Vue) {
  vueIM.install(window.Vue)
}

export default vueIM
