import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App';
import 'normalize.css';
import './icon/iconfont.css';
import './styles/index.scss';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
  render: h => h(App)
}).$mount('#app');
