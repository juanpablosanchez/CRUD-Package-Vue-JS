// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.mixin({
  data: function() {
    return {
      get apiPath() {
        return 'https://my-nodejs-docker-application-bhxwhkprbr.now.sh/';
      }
    }
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
