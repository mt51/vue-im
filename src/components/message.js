import Vue from 'vue'
import message from './message.vue'

const MessageConstructor = Vue.extend(message)

let Instance

const Message = function (options) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  Instance = new MessageConstructor(options)
  Instance.vm = Instance.$mount()
  Instance.vm.visible = true
  document.body.appendChild(Instance.vm.$el)
}

export default Message
