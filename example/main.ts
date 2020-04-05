import Vue from 'vue';
import VueComposition from '@vue/composition-api';
import App from './App.vue';
import VueIM from '../packages';

Vue.config.productionTip = false;
Vue.use(VueIM);
Vue.use(VueComposition);

new Vue({
  render: h => h(App),
}).$mount('#app');
