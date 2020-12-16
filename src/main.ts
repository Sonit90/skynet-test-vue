import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.filter('splitNumber', (value: number) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
