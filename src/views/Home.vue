<template>
  <b-container class="h-100 d-flex">
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <b-row class="m-auto">
      <div class="desktop d-none d-lg-block">
        <div class="header">
          <h1 class="center-block__header">Welcome to CardCast!</h1>
        </div>
        <div class="body">
          <div class="center-block__input inputs">
            <b-input-group size="sm" prepend="Username">
              <b-form-input v-model="username"></b-form-input>
            </b-input-group>

            <b-input-group class="mt-4" size="sm" prepend="Code">
              <b-form-input v-model="code"></b-form-input>
            </b-input-group>
            <div class="mt-5"></div>
            <b-button
              variant="success"
              class="float-left button"
              @click.prevent="joinLobby"
            >Join game</b-button>
            <b-button
              variant="success"
              class="float-right button"
              @click.prevent="createGame"
            >Host game</b-button>
          </div>
        </div>
      </div>
      <div class="mobile d-block d-lg-none">
        <div class="header">
          <h1 class="center-block__header">Welcome to Cardcast!</h1>
        </div>
        <div class="body">
          <div class="center-block__input inputs">
            <b-input-group size="sm" prepend="Username">
              <b-form-input v-model="username"></b-form-input>
            </b-input-group>

            <b-input-group class="mt-4" size="sm" prepend="Code">
              <b-form-input v-model="code"></b-form-input>
            </b-input-group>
            <b-button
              variant="success"
              class="float-left button"
              @click.prevent="joinLobby"
            >Join game</b-button>
            <b-button
              variant="success"
              class="float-right button"
              @click.prevent="createGame"
            >Host game</b-button>
          </div>
        </div>
      </div>
    </b-row>
  </b-container>
</template>
<script>
import store from "./../store/index";
import UserCreateGame from "./../networking/serverbound/userCreateGame.message";
import PlayerJoin from "./../networking/serverbound/playerJoin.message";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "app",
  components: {
    Loading
  },
  data() {
    return {
      username: "",
      code: "",
      isLoading: true
    };
  },
  methods: {
    setCode() {
      this.code = this.$route.params.code;
    },
    joinLobby(event) {
      event.preventDefault();
      this.$store.dispatch("sendMessage", {
        message: new PlayerJoin(this.username, this.code),
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
    },
    createGame() {
      this.$store.dispatch("sendMessage", {
        message: new UserCreateGame(true),
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
    this.setCode();
    this.$options.sockets.onopen = data => {
      this.isLoading = false;
    };
  }
};
</script>

<style lang="scss">
.center-block {
  &__header {
    font-family: Ubuntu, sans-serif;
    font-weight: 700;
    color: white;
    text-align: center;
    margin-bottom: 1rem;
  }
}
.desktop {
  background-color: white;
  border-radius: 27px;
  .header {
    background-color: #e10022;
    padding: 75px;
    border-top-left-radius: 27px;
    border-top-right-radius: 27px;
    h1 {
      margin-bottom: 0;
      font-size: 4rem;
    }
  }
  .body {
    overflow: hidden;
    padding: 50px;
    .button {
      font-family: Ubuntu;
      font-size: 2rem;
      font-weight: 500;
      height: 75px;
      width: 200px;
    }
    .inputs {
      .input-group {
        .input-group-prepend {
          .input-group-text {
            height: 70px;
            padding: 10px;
            font-size: 2rem;
            font-family: ubuntu;
            font-weight: 600;
            border-top-left-radius: 1rem;
            border-bottom-left-radius: 1rem;
            padding-left: 30px;
            padding-right: 30px;
            width: 200px;
            text-align: right;
          }
        }
        .form-control {
          height: 70px;
          padding: 20px;
          font-size: 2rem;
          font-family: ubuntu;
          font-weight: 100;
          border-top-right-radius: 1rem;
          border-bottom-right-radius: 1rem;
          padding-left: 30px;
          padding-right: 30px;
        }
      }
    }
  }
}
.mobile {
  background-color: white;
  border-radius: 27px;
  .header {
    background-color: #e10022;
    padding: 35px;
    border-top-left-radius: 27px;
    border-top-right-radius: 27px;
    h1 {
      margin-bottom: 0;
      font-size: 2.5rem;
    }
  }
  .body {
    overflow: hidden;
    padding: 25px;
    .button {
      font-family: Ubuntu;
      font-size: 1.5rem;
      font-weight: 500;
      height: 75px;
      width: 150px;
      margin-top: 25px;
    }
    .inputs {
      .input-group {
        .input-group-prepend {
          .input-group-text {
            padding: 10px;
            font-size: 1.5rem;
            font-family: ubuntu;
            font-weight: 600;
            border-top-left-radius: 1rem;
            border-bottom-left-radius: 1rem;
            padding-left: 10px;
            padding-right: 10px;
            width: auto;
            text-align: right;
          }
        }
      }
      .form-control {
        height: 60px;
        padding: 10px;
        font-size: 1.5rem;
        font-family: ubuntu;
        font-weight: 100;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }
}
</style>
