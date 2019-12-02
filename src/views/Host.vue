<template>
  <div>

    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <div class="code">
            <h2>Code</h2>
            <p>{{this.code}}</p>
          </div>
        </div>
        <div class="col-6">
          <div class="row d-flex justify-content-center">
            <card-stack :suit="'s'" :rank="'13'" class="mr-5"></card-stack>
            <card-deck></card-deck>
          </div>
        </div>
        <div class="col">
           <p>Player ...'s turn</p>
        </div>
      </div>
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
  },
  
};
</script>

<style lang="scss">
.code {
  margin-left: 30px;
  font-size: 30px;
  color: white;
}

p{
  font-size: 30px;
  color: white;
}
</style>