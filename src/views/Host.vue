<template>
  <b-container fluid class="h-100">
    <b-row class="main-row">
      <b-col cols="12" lg="3" class="code-col">
        <div class="code-div">
          <h1>Bullying Game</h1>
          <div class="code-span">
            <span>1234</span>
          </div>
          <p>
            Go to bullying.dev and enter this code to join the game.
          </p>
        </div>
      </b-col>
      <b-col cols="12" lg="9">
        <b-row class="players-row">
          <div class="players-div">
          </div>
        </b-row>
        <b-row class="player-content">
        </b-row>
      </b-col>
    </b-row>
    <b-row class="bottom-row">
      <b-col cols="12" lg="10" class="d-none d-lg-block">
        <div class="code-link">
          <span>
            bullying.dev/1234
          </span>
        </div>
      </b-col>
      <b-col cols="12" lg="2">
        <div class="button">
          <b-button variant="success">
            Start
          </b-button>
        </div>
      </b-col>   
    </b-row>
  </b-container>
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
<style lang="scss">
body{
  overflow: hidden;
}
.main-row{
  height: calc(100% - 150px);
  .code-col{
    background-color: white;
    .code-div{
      padding: 20px;
      padding-top: 80px;
      h1{
        font-family: Ubuntu;
        font-weight: 700;
        font-size: 3rem;
        text-align: center;
      }
      .code-span{        
        max-width: 308px;
        text-align: center;
        background-color: #E10022;
        border-radius: 27px;
        margin: auto;
        margin-bottom: 20px!important;
        margin-top: 40px!important;
        span{
          color:white;
          font-size: 4rem;
          font-family: Ubuntu;
          font-weight: 900;
          line-height: 9rem;
          letter-spacing: 0.8rem;    
          text-shadow: 1px 1px 0px #b4b4b4,
            2px 2px 0px #b4b4b4,
            3px 3px 0px #b4b4b4,
            4px 4px 0px #b4b4b4,     
        }
      }
      p{
        font-size: 1.5rem;
        font-weight: 500;
        font-family: Ubuntu;
        text-align: center;
        margin: auto;
        margin-top: 20px;
        width: 85%;
      }
    }
  }
  .players-row{
    height: 20%;
    padding: 40px;
    .players-div{
      height: 100%;
      width: 100%;
      background-color: white;
      border-radius: 27px;
    }
  }
  .player-content{
    height: 80%;
  }
}
.bottom-row{
  height: 150px;
  background-color: #292929;
  .code-link{
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 25px;
    span{
      color: white;
      font-family: Ubuntu;
      font-size: 3rem;
    }
  }
  .button{    
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    button{
      font-family: Ubuntu;
      font-size: 2rem;
      font-weight: 500;
      height: 75px;
      width: 200px;
    }    
  }
}
</style>