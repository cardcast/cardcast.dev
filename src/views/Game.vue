<template>
  <div class="game-screen">
    <b-container fluid class="h-100">
      <b-row class="main-row">
        <b-col class="hand-col">
          <div class="hand">
            <transition-group name="list" tag="div" class="hand__body">
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
        </b-col>
      </b-row>

      <b-row class="bottom-row">
        <b-col cols="12" lg="2" sm="6" xs="2" class="bottom-col">
          <div class="button">
            <b-button variant="danger" size="lg" to="/">Leave</b-button>
          </div>
        </b-col>
        <b-col cols="12" lg="2" sm="6" xs="2" offset-lg="8" class="bottom-col">
          <div class="button">
            <b-button variant="success" :disabled="!yourTurn" size="lg" v-on:click="draw">Draw</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
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
      started: false
    };
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
  }
};
</script>

<style lang="scss" scoped>
.bottom-row {
  height: 150px;
  background-color: #292929;
  .bottom-col {
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      .btn {
        font-family: Ubuntu;
        font-size: 2rem;
        font-weight: 500;
        height: 75px;
        width: 200px;
      }
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

  .hand-col {
    display: flex;
    justify-content: center;    
    align-items: center;

    .hand {
      &__body {
        display: flex;

        .playing-card {
          width: 40px;
          transition: all 0.2s;
          transition-delay: 0.2s;
          
          &:hover {
            width: 161px;
            transition: all 0.2s ease-in;
            transition-delay: 0.42s;
          }

          &:last-child {
            width: 40px !important;
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
}
</style>