import Vue from 'vue';
import App from './app.vue';
import router from './router.js';
import MiUI from 'mi-element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mi-element-ui/lib/theme-chalk/index.css';

Vue.use(MiUI);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
