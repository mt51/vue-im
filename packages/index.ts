import VueComposition from '@vue/composition-api';
import VueIM from './App.vue'

const install = (vue: any) => {
  vue.component('vue-im', VueIM);
  vue.use(VueComposition);
}

declare global {
  interface Window {
    Vue: any;
  }
}

if (window && window.Vue) install(window.Vue);

export default {
  install,
  VueIM,
};

export * from './context';

export * from './types';