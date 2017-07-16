// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import VueResource from 'vue-resource';
// import moment from 'moment';
// import VueMoment from 'vue-moment'

/* eslint-disable */
window.d3 = require('d3');

import router from './router';

// Vue.use(moment);
// Vue.use(VueMoment);
Vue.use(VueResource);
Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//   el: '#splash',
//   router,
//   template: '<splash/>',
//   components: { Hello },
// });
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
