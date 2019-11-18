<template>
  <div>
    <div class="stack">
      <div class="stack__body">
        <game-card suit="3" rank="3"/>
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
      cards: []
    };
  }
};
</script>