<template>
  <div>{{$route.params.lobby}}</div>
</template>
<script>
export default {
  data() {
    return {
      code: this.$route.params.code
    };
  }
};
</script>