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
      console.log(message);
      if (state.pendingMessages.filter(pendingMessage => pendingMessage.trackingId === message.trackingId)) {
        pendingMessage.callback();
      }
      state.socket.message = message
    },
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    SEND_MESSAGE(state, request) {
      request.trackingId = 69420;
      request.message.trackingId = 69420;
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