<template>
  <div id="app">
    <div class="app-content container">
      <router-view />
    </div>
  </div>
</template> 


<style lang="scss">
@import "@/assets/styles/global.scss";
@import "@/assets/styles/buttons.scss";

#app {
  background-color: #4254f4;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-block {
  &__header {
    color: white;
    text-align: center;
    margin-bottom: 1rem;
  }

  &__input {
    label {
      display: block;
      height: 4rem;
      position: relative;
      margin-bottom: 2rem;
    }

    .input {
      border: none;
      border-radius: 5px;
      font-family: "Work Sans", sans-serif;
      font-size: 1.5rem;
      font-weight: bold;
      height: 100%;
      line-height: 4rem;
      outline: none;
      padding: 0 1rem;
      color: #4254f4;

      &:focus {
        & + .input-after {
          animation: type 1.25s ease 0.5s infinite;
          box-shadow: none;
          height: calc(100% - 1rem);
          margin-left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
        }

        &::placeholder {
          opacity: 0;
          transition: 0.15s ease;
        }
      }
    }
  }
}
</style>
