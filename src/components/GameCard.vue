<template>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
</template>

<script>
export default {
  data () {
    return {
      suit: 0,
      rank: 0,
      count: 0
    }
  },
  methods: {
    select () {
    }
  }
}
</script>