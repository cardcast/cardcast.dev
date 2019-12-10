import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Host from './views/Host.vue'
import Game from './views/Game.vue'
import Lobby from './views/Lobby.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lobby/:code',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/host/:code',
      name: 'host',
      component: Host
    },
    {
      path: '/game/:code',
      name: 'game',
      component: Game
    }
  ]
})
