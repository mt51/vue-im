import VueIM from './App.vue'

const install = (vue: any) => {
  vue.component('vue-im', VueIM);
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