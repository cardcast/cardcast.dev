<template>
  <div class="playing-card">
    <div
      class="playing-card__body"
      v-bind:style="{ backgroundImage: `url(${imageName})` }"
      v-on:dblclick="$emit('play')"
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
    height: 400px;
    width: 275.2px;

    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>