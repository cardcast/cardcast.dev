<template>
  <div class="game-screen">
    <div class="stack">
      <div class="stack__body"></div>
    </div>
    <div class="row">
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
              @play="log"
            />
          </transition-group>
        </div>
      </div>
      <div class="row">
        <b-btn variant="succes" :disabled="!yourTurn" v-on:click="draw">Draw</b-btn>
        <b-btn variant="succes" v-on:click="setPlayerTurn">testknop</b-btn>
        <!-- tijdelijk voor testing, normaal van server-->
      </div>
    </div>
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
      cards: [
        {
          id:"091730",
          suit: "s",
          rank: "13"
        },
        {
          id:"809235",
          suit: "d",
          rank: "3"
        },
        {
          id:"742908",
          suit: "s",
          rank: "8"
        },
        {
          id:"145682",
          suit: "c",
          rank: "2"
        },
        {
          id:"123123",
          suit: "r",
          rank: "15"
        },
        {
          id:"091284",
          suit: "b",
          rank: "15"
        }
      ]
    };
  },
  methods: {
    play: function(card) {
      if (!this.yourTurn) {
        return;
      }
      this.yourTurn = false;
      var index = this.cards.indexOf(card);
      this.cards.splice(index, 1);
      this.$store.dispatch("sendMessage", {
        message: new PlayerPlayCard(`${card.id} ${card.suit} ${card.rank}`),
        callback: result => {
          if (result) {
            return;
          } else {
            this.cards.splice(index, 0, card);
            this.yourTurn = true;
          }
        }
      });
    },
    log() {},
    draw: function() {
      this.yourTurn = false;
      this.$store.dispatch("sendMessage", {
        message: new PlayerDrawCard(),
        callback: result => {
          result.array.forEach(card => {
            this.cards.push({
              id: Math.floor(Math.random() * 1000000),
              suit: card.suit,
              rank: card.rank
            });
          });
        }
      });
      this.cards.push({
        id: Math.floor(Math.random() * 1000000),
        suit: "d",
        rank: "5"
      });
    },
    setPlayerTurn: function() {
      this.yourTurn = true;
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
      type: "CB_HostStartGame",
      callback: result => {
        result.array.forEach(card => {
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
</style>