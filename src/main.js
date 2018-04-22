// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate';
import config from './validator/index'
import '../node_modules/bootstrap/dist/js/bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/animate.css/animate.min.css'
import './assets/base.css'

Vue.config.productionTip = false;

/*全局注入axios*/
Vue.prototype.$axios = axios;

/*全局注入验证规则*/
Vue.use(VeeValidate, config);

//使用vuex批量管理数据
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    userName: window.localStorage.getItem('userName'),
    userId: window.localStorage.getItem('userId'),
    cartCount: 0
  },
  mutations: {
    updateUserInfo(state, userObj) {
      state.userName = userObj.userName;
      state.userId = userObj.userId;
    },
    updateCartCount(state, cartCount) {
      state.cartCount += cartCount;
    },
    initCartCount(state, carCount) {
      state.cartCount = carCount;
    }
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
