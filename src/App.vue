<template>
  <div id="app">
    <div class="center-block">
      <h1 class="center-block__header">Welcome to Cardcast
      </h1>
      <div class="center-block__input">
        <label for="input-1">
          <input
            @change="checkRoom"
            type="number"
            class="input"
            id="input-1"
            placeholder="Enter code"
          />
        </label>
      <b-button class="join-game-button btn" id="joinGame" variant="success">Join game</b-button>
      <b-button class="join-game-button btn" id="joinGame" variant="success">Create game</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {
    checkRoom(value) {
      console.log(value.srcElement.value);

      this.$connect(`ws://localhost:6969/game/${value.srcElement.value}`, { format: "json" });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
@import "@/assets/styles/buttons.scss";

.join-game-button{    
  margin-top: 20px;
  font-weight: bold;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 24px;
  float: right;
  background-color: #FF8463;
  border: none;
  border-radius: 10px;
  color: white;
}

.btn{
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

.join-game-button:hover{
  background-color: rgb(255, 158, 131);
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
      border: none;
      border-radius: 5px;
      font-family: "Work Sans", sans-serif;
      font-size: 1.5rem;
      font-weight: bold;
      height: 100%;
      line-height: 4rem;
      outline: none;
      padding: 0 1rem;
      color: #FF8463;

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
