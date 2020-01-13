import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import VueNativeSock from 'vue-native-websocket'
import store from './store/index'

import Notifications from 'vue-notification'
Vue.use(Notifications)


var token = ""
if (localStorage.getItem('access_token')) {
  token = '?' + localStorage.getItem('access_token');
}

function isUUID(uuid) {
  let s = "" + uuid;

  s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
  if (s === null) {
    return false;
  }
  return true;
}


Vue.use(VueNativeSock, `ws://145.93.146.45:6969/game${token}`, {
  store: store,
  format: 'json',
  connectManually: false,
  passToStoreHandler: function (eventName, event) {
    if (isUUID(event.data)) {
      var accessToken = event.data;
      localStorage.setItem("access_token", accessToken);
      return;
    }
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
    console.log(target);
    // this.store[method]("SOCKET_ONMESSAGE", msg)
    this.store[method](target, msg)
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
