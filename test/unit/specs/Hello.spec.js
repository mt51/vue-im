import Vue from 'vue'
import Hello from '@/components/hello/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent)
      .to.equal('This is hello from rs-ui.')
  })
})
