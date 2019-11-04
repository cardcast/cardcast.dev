import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Host from './views/Host.vue'
import Game from './views/Game.vue'

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
      path: '/host',
      name: 'host',
      component: Host
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/gameclient',
      name: 'gameclient',
      component: () => import('./views/GameClient.vue')
    }
  ]
})
