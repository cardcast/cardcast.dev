<template>
  <div>
    <div class="stack">
      <div class="stack__body">
        <game-card
          v-for="(card, index) in cards"
          :key="index"
          :suit="card.suit"
          :rank="card.rank"
        />
      </div>
    </div>

    <div class="hand">
      <div class="hand__body"></div>
    </div>
  </div>
</template>
<script>
import GameCard from "../components/GameCard.vue";

export default {
  components: {
    GameCard
  },
  data() {
    return {
      code: this.$route.params.code,
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
        },
        {
          suit: "",
          rank: ""
        },
        {
          suit: "",
          rank: ""
        },
        {
          suit: "",
          rank: ""
        }
      ]
    };
  }
};
</script>