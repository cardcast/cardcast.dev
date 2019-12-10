<template>
  <b-container class="h-100 d-flex">
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <b-row class="m-auto">
      <div class>
        <h1 class="center-block__header">Welcome to Cardcast</h1>


        <div class="center-block__input">
          <b-input-group size="sm" prepend="Username">
            <b-form-input v-model="username"></b-form-input>
          </b-input-group>

          <b-input-group class="mt-2" size="sm" prepend="Code">
            <b-form-input v-model="code"></b-form-input>
          </b-input-group>
          <div class="mt-3">
            <b-button variant="success" class="float-left" @click.prevent="joinLobby">Join game</b-button>
            <b-button variant="success" class="float-right" @click.prevent="createGame">Host game</b-button>
          </div>
        </div>
      </div>
    </b-row>
  </b-container>
</template>
<script>
import store from "./../store/index";
import PlayerCreateGame from "./../networking/serverbound/playerCreateGame.message";
import PlayerReadyUp from "./../networking/serverbound/playerReadyUp.message";

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "app",
  components: {
    Loading
  },
  data() {
    return {
      username: "",
      code: "",
      isLoading: true,
    };
  },
  methods: {
    joinLobby(event) {
      event.preventDefault();
      this.$store.dispatch("sendMessage", {
        message: new PlayerReadyUp(this.username, this.code),
        callback: result => {
          if (!result.lobby) {
            console.log("error while getting game");
          } else {
            const lobby = result.lobby;
            this.$router.push({
              name: "game",
              params: { code: lobby.code }
            });
          }
        }
      });
      this.$router.push({
        name: "game",
        params: { code: 1232 }
      });
    },
    createGame() {
      this.$store.dispatch("sendMessage", {
        message: new PlayerCreateGame(true),
        callback: result => {
          this.$router.push({
            name: "lobby",
            params: { code: result.lobby.code }
          });
        }
      });
    }
  },
  mounted() {
    this.$connect();

    this.$options.sockets.onopen = (data) => {
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss">
.center-block {
  &__header {
    font-family: Calistoga, sans-serif;
    color: white;
    text-align: center;
    margin-bottom: 1rem;
  }
}
</style>
