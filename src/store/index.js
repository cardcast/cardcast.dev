import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: {
      pendingMessages: [],
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event)
    },
    SOCKET_ONMESSAGE(state, message) {
      state.socket.pendingMessages.filter(pendingMessage => pendingMessage.trackingId === message.trackingId).forEach(function (value, index) {
        value.callback(message);
      });

      state.socket.message = message
    },
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    SEND_MESSAGE(state, request) {
      const trackingId = Math.floor(Math.random() * 100000000);
      request.trackingId = trackingId;
      request.message.trackingId = trackingId;
      state.socket.pendingMessages.push(request);
      Vue.prototype.$socket.sendObj(request.message)
    }
  },
  actions: {
    sendMessage: function (context, request) {
      context.commit('SEND_MESSAGE', { message: request.message, callback: request.callback });
    }
  }
})