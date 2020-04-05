import Vue from 'vue';
import App from './App.vue';
import VueIM from '../packages';

Vue.config.productionTip = false;
Vue.use(VueIM);

new Vue({
  render: h => h(App),
}).$mount('#app');
