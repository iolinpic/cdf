import Vue from 'vue'
import Meta from 'vue-meta'
import VeeValidate, {Validator} from 'vee-validate'
import ru from 'vee-validate/dist/locale/ru'
import router from './router'
import store from './store'
import App from './App.vue'
import {setupAxios} from './config/interceptors';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(Meta);
Vue.use(VeeValidate);
Validator.localize('ru', ru);
setupAxios();
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
