<template>
  <div class="game-screen">
    <div class="stack">
      <div class="stack__body"></div>
    </div>

    <div class="hand">
      <div class="hand__body">
        <game-card
          v-for="(card, index) in cards"
          :key="index"
          :suit="card.suit"
          :rank="card.rank"
          @play="log"
        />
      </div>
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
        }
      ]
    };
  },
  methods: {
    log() {
      
    }
  }
};
</script>
<style lang="scss" scoped>
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
      }
    }
  }
}
</style>