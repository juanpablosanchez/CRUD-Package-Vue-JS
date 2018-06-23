// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuetify from 'vuetify'

import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));
Vue.use(Vuetify)
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
