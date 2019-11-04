import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import VueNativeSock from 'vue-native-websocket'
import store from './store/index'

Vue.use(VueNativeSock, 'ws://localhost:6969/game', {
  store: store,
  format: 'json',
  connectManually: true,
  passToStoreHandler: function (eventName, event) {
    console.log(eventName, event);
    if (!eventName.startsWith('SOCKET_')) { return }
    let method = 'commit'
    let target = eventName.toUpperCase()
    let msg = event;
    if (this.format === 'json' && event.data) {
      msg = JSON.parse(event.data)
      if (msg.mutation) {
        target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/')
      } else if (msg.action) {
        method = 'dispatch'
        target = [msg.namespace || '', msg.action].filter((e) => !!e).join('/')
      }
    }
    this.store[method]("SOCKET_ONMESSAGE", msg)
  }
});


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
