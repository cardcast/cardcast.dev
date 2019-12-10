<template>
  <div class="game-screen">
    <div class="stack">
      <div class="stack__body"></div>
    </div>
    <div class="row">
      <div class="hand">
        <div class="hand__body">
          <transition-group name="list" tag="p">
            <game-card
              transition-group
              name="list"
              tag="p"
              class="list-item"
              v-for="(card) in cards "
              :key="card.suit + card.rank"
              :suit="card.suit"
              :rank="card.rank"
              @dblclick.native="play(card)"
              @play="log"
            />
          </transition-group>
        </div>
      </div>
      <div class="row">
        <b-btn variant="succes" :disabled="!yourTurn" v-on:click="draw" >Draw</b-btn>
        <b-btn variant="succes" v-on:click="setPlayerTurn">kutding</b-btn> <!-- tijdelijk voor testing, normaal van serer-->
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
          suit: "s",
          rank: "13"
        },
        {
          suit: "d",
          rank: "3"
        },
        {
          suit: "s",
          rank: "8"
        },
        {
          suit: "c",
          rank: "2"
        },
        {
          suit: "r",
          rank: "15"
        },
        {
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
      var index = this.cards.indexOf(card);
      this.cards.splice(index, 1);
      this.$store.dispatch("sendMessage", {
        message: new PlayerPlayCard(card)
      });
      this.yourTurn = false;
    },
    log() {},
    draw: function() {
      this.$store.dispatch("sendMessage", {
        message: new PlayerDrawCard(),
        callback: result => {
          this.cards.push({
            suit: result.suit,
            rank: result.rank
          });
          this.yourTurn = false;
        }
      });
      this.cards.push({
        suit: "d",
        rank: "5"
      });
      this.yourTurn = false;
    },
    setPlayerTurn: function() {
      this.yourTurn = true;
    }
  },
  mounted() {
    this.$connect(); //todo removee ik ben lui sorry
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
        &:last-child {
          width: auto;
        }
        transition: all 0.2s;
        transition-delay: 0.42s;

        &:hover {
          margin-top: -70px;
          transition: all 0.1s ease-in;
          transition-delay: 0.2s;
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