import IM from './im'
import {
  Button,
  Dialog,
  Checkbox,
  Transfer,
  Input,
  Message,
  Pagination,
  Upload
} from 'element-ui'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/reset.css'
import '@/styles/base.pcss'
import '@/styles/red.pcss'
import '@/styles/blue.pcss'
import '@/styles/white.pcss'

const VueIM = {}

VueIM.install = function(Vue, opts) {
  Vue.component('vue-im', IM)
  Vue.prototype.$message = Message
  Vue.use(Dialog)
  Vue.use(Checkbox)
  Vue.use(Transfer)
  Vue.use(Input)
  Vue.use(Pagination)
  Vue.use(Upload)
  Vue.use(Button)
}

if (typeof window !== 'undefined' && window.Vue) {
  VueIM.install(window.Vue)
}

export default VueIM
