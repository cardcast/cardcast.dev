<template>
  <b-navbar>
    <b-container>
      <b-navbar-brand href="/">Pesten.dev</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <span class="code">{{$route.params.code}}</span>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>
<style lang="scss" scoped>
nav {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid white;

  .navbar-brand {
    color: white;
  }

  .code {
    color: white !important;
  }
}
</style>