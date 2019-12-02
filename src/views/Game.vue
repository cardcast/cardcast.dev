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
          @play="playCard(card)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import GameCard from "../components/GameCard.vue";
import PlayerPlayCard from "../networking/serverbound/playerPlayCard.message";

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
        }
      ]
    };
  },
  methods: {
    playCard(card) {
      this.$store.dispatch("sendMessage", {
        message: new PlayerPlayCard(`${card.suit} ${card.rank}`),
        callback: result => {}
      });
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
      }
    }
  }
}
</style>