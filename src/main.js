import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import VueNativeSock from 'vue-native-websocket'
import store from './store/index'
Vue.use(VueNativeSock, 'ws://localhost:9090', {
  store: store, format: 'json', connectManually: true,
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
