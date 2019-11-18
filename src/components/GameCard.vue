<template>
  <div class="playing-card">
    <div class="playing-card__body" v-bind:style="{ backgroundImage: `url(${imageName})` }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["suit", "rank"],
  computed: {
    imageName() {
      // return `${this.suit}.${this.rank}.svg`;
      return "/cards/2_of_clubs.svg";
    }
  }
};
</script>
<style lang="scss">
.playing-card {
  &__body {
    height: 250px;
    width: 172px;

    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>