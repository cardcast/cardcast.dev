<template>
  <div class="container h-100">
    <div class="row align-items-center h-100" v-if="winner">
      <div id="win-overlay">
        <div id="overlay-text">{{winner.name}} wins!</div>
      </div>
    </div>
    <div class="row align-items-center h-100" v-else>
      <div class="col">
        <div class="code">
          <h2>Code</h2>
          <p>{{this.code}}</p>
        </div>
      </div>
      <div class="col-6">
        <div class="row d-flex justify-content-center">
          <game-card :rank="stack.rank" :suit="stack.suit" />
          <game-card class="ml-4" rank="CARD" suit="BACK" />
        </div>
      </div>
      <div class="col">
        <p>{{currentTurn.name}}'s turn</p>
      </div>
    </div>
  </div>
</template>
<script>
import CardStack from "../components/CardStack.vue";
import CardDeck from "../components/CardDeck.vue";
import GameCard from "../components/GameCard.vue";

import store from "./../store/index";

export default {
  data() {
    return {
      code: this.$route.params.code,
      stack: this.$route.params.stack[0],
      currentTurn: this.$route.params.currentTurn,
      winner: null
    };
  },
  components: {
    CardStack,
    CardDeck,
    GameCard
  },
  mounted() {
    this.$store.dispatch("subscribe", {
      type: "HB_PlayerPlayedCard",
      callback: result => {
        setTimeout(() => {
          this.currentTurn = result.nextPlayer;
          this.stack = result.card;
          this.$forceUpdate();
        }, 500);
      }
    });
    this.$store.dispatch("subscribe", {
      type: "HB_PlayerWin",
      callback: result => {
        this.winner = result.winningPlayer;
      }
    });
  }
};
</script>

<style lang="scss">
.code {
  margin-left: 30px;
  font-size: 30px;
  color: white;
}
p {
  font-size: 30px;
  color: white;
}
</style>