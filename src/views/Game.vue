<template>
  <div class="game-screen">
    <b-container fluid class="h-100">
      <b-row class="main-row">
        <b-col>
          <div v-if="!started" class="container">
            <div class="row">
              <div class="col d-flex justify-content-center">
                <h1>Waiting for players...</h1>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-center">
                <b-img src="/kanye/kanye.jpg" fluid alt="Responsive image" width="500"></b-img>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-center">
                <transition mode="out-in" name="fade">
                  <p class="quote" :key="quote">"{{quote}}" - Kanye West</p>
                </transition>
              </div>
            </div>
          </div>
          <div class="hand">
            <div class="hand__body">
              <transition-group name="list" tag="div">
                <game-card
                  transition-group
                  name="list"
                  tag="p"
                  class="list-item"
                  v-for="(card) in cards "
                  :key="card.suit + card.rank + card.id"
                  :suit="card.suit"
                  :rank="card.rank"
                  @dblclick.native="play(card)"
                />
              </transition-group>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row class="bottom-row">
        <b-col cols="12" lg="2" sm="6" xs="2">
          <div class="button">
            <b-button variant="danger" size="lg" to="/">Leave</b-button>
          </div>
        </b-col>
        <b-col cols="12" lg="2" sm="6" xs="2" offset-lg="8">
          <div class="button">
            <b-button
              variant="success"
              :disabled="!yourTurn || !started"
              size="lg"
              v-on:click="draw"
            >Draw</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import axios from "axios";
import GameCard from "../components/GameCard.vue";
import PlayerDrawCard from "../networking/serverbound/playerDrawCard.message";
import PlayerPlayCard from "../networking/serverbound/playerPlayCard.message";

import store from "./../store/index";

export default {
  components: {
    GameCard
  },
  data() {
    return {
      code: this.$route.params.code,
      yourTurn: true,
      cards: [],
      started: false,
      quote: ""
    };
  },
  created() {
    this.generateQuote();
  },
  methods: {
    play: function(card) {
      if (!this.yourTurn) {
        return;
      }
      this.yourTurn = false;
      var index = this.cards.indexOf(card);
      this.$store.dispatch("sendMessage", {
        message: new PlayerPlayCard(`${card.suit} ${card.rank}`),
        callback: result => {
          if (result.error) {
            console.log(" error ");
            this.yourTurn = true;
          } else {
            this.cards.splice(index, 1);
            this.yourTurn = false;
          }
        }
      });
    },
    draw: function() {
      this.$store.dispatch("sendMessage", {
        message: new PlayerDrawCard(),
        callback: result => {
          result.cards.forEach(card => {
            card.id = Math.floor(Math.random() * 1000000);
            this.cards.push(card);
            this.yourTurn = false;
          });
        }
      });
    },
    generateQuote: function() {
      axios
        .get(`https://api.kanye.rest?format=text`)
        .then(response => {
          this.quote = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  mounted() {
    this.$store.dispatch("subscribe", {
      type: "CB_PlayerTurn",
      callback: result => {
        this.yourTurn = result;
      }
    });
    this.$store.dispatch("subscribe", {
      type: "CB_PlayersTurn",
      callback: result => {
        this.yourTurn = true;
      }
    });
    this.$store.dispatch("subscribe", {
      type: "CB_HostStartGame",
      callback: result => {
        this.yourTurn = result.yourTurn;
        this.started = true;
        result.cards.forEach(card => {
          this.cards.push({
            id: Math.floor(Math.random() * 1000000),
            suit: card.suit,
            rank: card.rank
          });
        });
      }
    });
    this.$nextTick(function() {
      window.setInterval(() => {
        this.generateQuote();
      }, 7000);
    });
  }
};
</script>

<style lang="scss" scoped>
.main-row {
  color: white;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  text-align: center;
}

.bottom-row {
  height: 150px;
  background-color: #292929;
  .code-link {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 25px;
    span {
      color: white;
      font-family: Ubuntu;
      font-size: 3rem;
    }
  }
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    button {
      font-family: Ubuntu;
      font-size: 2rem;
      font-weight: 500;
      height: 75px;
      width: 200px;
    }
  }
}
.active {
  background-color: #4caf50;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-800px);
}

.game-screen {
  display: flex;
  justify-content: center;
  height: 100%;

  .hand {
    margin-top: auto;
    margin-bottom: 20px;
    &__body {
      .playing-card {
        width: 40px;
        transition: all 0.2s;
        transition-delay: 0.2s;

        &:hover {
          margin-top: -70px;
          transition: all 0.2s ease-in;
          transition-delay: 0.42s;
        }

        &:last-child {
          width: auto;
        }
        &:active {
          margin-top: -70px;
          transition: all 0.1s ease-in;
          transition-delay: 0.2s;
        }
      }
    }
  }
}

.quote {
  margin-top: 25px;
  font-size: 24px;
  font-style: italic;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>