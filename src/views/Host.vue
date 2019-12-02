<template>
  <div>

    <div class="code">
      <h2>Code</h2>
      <p>{{this.code}}</p>
    </div>

      <div class="row d-flex justify-content-center">
        <card-stack :suit="'s'" :rank="'13'" class="mr-5"></card-stack>
        <card-deck></card-deck>
      </div>

  </div>
</template>
<script>
import CardStack from "../components/CardStack.vue";
import CardDeck from "../components/CardDeck.vue";

export default {
  data() {
    return {
      code: this.$route.params.code
    };
  },
  components: {
    CardStack,
    CardDeck
  }
};
</script>

<style lang="scss">
.code {
  margin-left: 30px;
  font-size: 30px;
  color: white;
}
</style>