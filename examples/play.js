import Vue from 'vue';
import App from './play.vue';
import router from './router.js';
import MiUI from 'mi-element-ui';

Vue.use(MiUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
