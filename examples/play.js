import Vue from 'vue';
import App from './play.vue';
import router from './router.js';
import MiUI from 'mi-element-ui';
import 'mi-element-ui/lib/theme-chalk/index.css';

Vue.use(MiUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
