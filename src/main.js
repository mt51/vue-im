import Vue from 'vue';
import App from './App';
import VueIM from '../packages';

Vue.use(VueIM);

new Vue({
  el: '#app',
  render: h => h(App)
});
