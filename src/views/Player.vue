<template>
  <div class="player">
    <div class="name">
      {{player.name}}
    </div>
  </div>
</template>

<script>
export default {    
    props: {
        player: {
            required: true,
            default: {
                name: "Aaron"
            }
        }
    }
}
</script>
<style lang="scss">
.player{
    z-index: 1;
    position: absolute;
    height: auto;
    width: auto;
    background: rgba(255, 255, 255, 0.8);;
    border-radius: 27px;
    padding: 15px;
    font-size: 2rem;
    font-weight: 500;
    font-family: ubuntu;
    transition: 20s;
    .name{
        z-index: 2;
    }
}
</style>