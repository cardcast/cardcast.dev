<template>
  <div id="app">
    <router-view />
    <notifications group="game" />
  </div>
</template>

<script>
import Navigation from "@/components/layout/Navigation.vue";

export default {
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
@import "@/assets/styles/buttons.scss";

#app {
  background-color: #4254f4;
  height: 100%;
}
</style>
