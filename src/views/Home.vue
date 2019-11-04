<template>
  <div id="app">
    <div class="center-block">
      <h1 class="center-block__header">Welcome to Cardcast</h1>
      <div class="center-block__input">
        <label>
          <input type="number" class="input float-left" v-model="code" placeholder="Enter code" />
        </label>
        <label>
          <input
            type="text"
            maxlength="32"
            min="4"
            class="input float-left"
            placeholder="Enter username"
            v-model="username"
          />
        </label>
        <b-button
          class="join-game button"
          id="joinGame"
          variant="success"
          @click.prevent="joinLobby"
        >Join game</b-button>
        <b-button class="create-game button" @click="createGame" variant="success">Create game</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import store from "./../store/index";
import PlayerCreateGame from "./../networking/serverbound/playerCreateGame.message";
import PlayerReadyUp from "./../networking/serverbound/playerReadyUp.message";

export default {
  name: "app",
  components: {},
  data() {
    return {
      username: "",
      code: ""
    };
  },
  methods: {
    joinLobby(event) {
      event.preventDefault();
      this.$store.dispatch("sendMessage", {
        message: new PlayerReadyUp(this.username, this.code),
        callback: result => {
          this.$router.push({ name: "game", params: { lobby: result.lobby } });
        }
      });
    },
    createGame() {
      this.$store.dispatch("sendMessage", {
        message: new PlayerCreateGame(true),
        callback: result => {
          this.$router.push({ name: "host", params: { lobby: result.lobby } });
        }
      });
    }
  },
  mounted() {
    this.$connect();
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
@import "@/assets/styles/buttons.scss";

.button {
  margin-top: 20px;
  font-weight: bold;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 24px;
  float: right;
  background-color: #ff8463;
  border: solid 2px;
  border-color: #ff8463;
  border-radius: 10px;
  color: white;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

.create-game {
  width: 56%;
}

.button:hover {
  background-color: rgb(255, 158, 131);
  cursor: pointer;
}

.button:focus {
  outline: none;
  border-color: rgb(255, 158, 131);
  background-color: #ff8463;
  cursor: default;
}

#app {
  background-color: #4254f4;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-block {
  &__header {
    color: white;
    text-align: center;
    margin-bottom: 1rem;
  }

  &__input {
    label {
      display: block;
      height: 4rem;
      position: relative;
    }

    .input {
      width: calc(100% - 2rem);
      border: none;
      border-radius: 5px;
      font-family: "Work Sans", sans-serif;
      font-size: 1.5rem;
      font-weight: bold;
      height: 100%;
      line-height: 4rem;
      outline: none;
      padding: 0 1rem;
      color: #ff8463;

      &:focus {
        & + .input-after {
          animation: type 1.25s ease 0.5s infinite;
          box-shadow: none;
          height: calc(100% - 1rem);
          margin-left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
        }

        &::placeholder {
          opacity: 0;
          transition: 0.15s ease;
        }
      }
    }
  }
}
</style>
