<template>
  <div class="playing-card">
    <div
      class="playing-card__body"
      v-bind:style="{ backgroundImage: `url(${imageName})` }"
    ></div>
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
      return `/cards/${this.rank}.${this.suit}.svg`;
    }
  }
};
</script>
<style lang="scss">
.playing-card {
  float: left;
  &__body {
    height: 250px;
    width: 172px;

    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>