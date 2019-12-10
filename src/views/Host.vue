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
  components: {
    Player
  },
  data() {
    return {
      domain: '',
      code: this.$route.params.code,
      players: [
        {id: 1, name: "Alfred"},
        {id: 2, name: "Wilfred"},
        {id: 3, name: "Fred"},
        {id: 4, name: "Nelson"},
        {id: 5, name: "Alfred"},
        {id: 6, name: "Wilfred"},
        {id: 7, name: "Fred"},
        {id: 8, name: "Nelson"}
      ]
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