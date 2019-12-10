<template>
  <b-container fluid class="h-100">
    <b-row class="main-row">
      <b-col cols="12" lg="3" class="code-col d-none d-lg-block">
        <div class="code-div">
          <h1>Bullying Game</h1>
          <div class="code-span">
            <span>{{this.$route.params.code}}</span>
          </div>
          <div class="code-p">
            <p>
              Go to {{this.domain}} and enter this code to join the game.
            </p>
          </div>
        </div>
      </b-col>
      <b-col cols="12" lg="3" class="code-col mobile-col d-block d-lg-none">
        <div class="code-div">
          <h1>Bullying Game</h1>
          <div class="code-span">
            <span>{{this.$route.params.code}}</span>
          </div>
          <div class="code-p">
            <p>
              Go to {{this.domain}} and enter this code to join the game.
            </p>
          </div>
        </div>
      </b-col>
      <b-col cols="12" lg="9" style="min-height: calc((100% - 152px) - 150px)">
        <b-row class="players-row" id="player-row">
          <b-col cols="12" lg="6" style="max-width: 50%">
            <h3>
              Players
            </h3>
          </b-col>
          <b-col cols="12" lg="6" style="max-width: 50%">
            <h3 style="float: right;">
              Total: {{players.length}}
            </h3>
          </b-col>
        </b-row>
        <b-row class="player-content" id="player-canvas">
          <player v-for="player in players" :key="player.id" :player="player"></player>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="bottom-row">
      <b-col cols="12" lg="10" class="d-none d-lg-block">
        <div class="code-link">
          <span>
            {{this.domain}}/{{this.$route.params.code}}
          </span>
        </div>
      </b-col>
      <b-col cols="12" lg="2">
        <div class="button">
          <b-button variant="success" @click.prevent="startGame">
            Start
          </b-button>
        </div>
      </b-col>   
    </b-row>
  </b-container>
</template>
<script>
import Player from "./Player";
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
  methods: {
    setDomain(){
      this.domain = window.location.host;
    },
    placeDivs(){
        // collect all the divs
        var divs = document.getElementsByClassName('player');
        // get window width and height
        var winWidth = document.getElementById('player-canvas').offsetWidth;
        var winHeight = document.getElementById('player-canvas').offsetHeight;

        var rowHeight = this.getOuterHeight(document.getElementById('player-row'));
        console.log('test');
        // shortcut! the current div in the list
        for ( var i=0; i < divs.length; i++ ) {
          var thisDiv = divs[i];
          // update top and left position
          //thisDiv.style.top = Math.random() * ((winHeight + row.offsetHeight) - row.offsetHeight) + row.offsetHeight - (divs[i].offsetHeight / 2) +"px";
          thisDiv.style.top = Math.round(this.getRandomNumber(rowHeight + divs[i].offsetHeight / 2 + 15, winHeight - divs[i].offsetHeight / 2 - 15)) + "px";
          thisDiv.style.left = Math.round(this.getRandomNumber(0 + divs[i].offsetWidth, winWidth - divs[i].offsetWidth)) + "px";
        }
        // function that returns a random number between a min and max
    },        
    getRandomNumber(min, max) {            
        return Math.random() * (max - min) + min;            
    },
    getOuterHeight(el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);

      height += parseInt(style.marginTop) + parseInt(style.marginBottom);
      return height;
    },    
    autoPlaceDivs(){
      this.placeDivs();
      setTimeout(this.autoPlaceDivs, 10000);
    },
    onResize(){
      console.log('resize');
      this.placeDivs();
    },
    startGame() {
    //   this.$store.dispatch("sendMessage", {
    //     message: new HostStartGame(true),
    //     callback: result => {
    //       console.log(result);
          this.$router.push({
            name: "host",
            params: { code: this.code }
          });
    //     }
    //   });
    // }
    }
  },
  mounted(){
    this.setDomain();
    this.placeDivs();
    this.autoPlaceDivs()    
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>
<style lang="scss">
body{
  overflow: hidden;
}
.main-row{
  height: calc(100% - 150px);
  overflow: auto;  
  overflow-x: hidden; 
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
          font-size: 3.8rem;
          font-family: Ubuntu;
          font-weight: 900;
          line-height: 9rem;
          letter-spacing: 0;  
          text-shadow: 1px 1px 0px darkred,
          2px 2px 0px darkred,
          3px 3px 0px darkred,
          4px 4px 0px darkred,             
        }
      }
      .code-p{
        flex: 1 1 auto;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        p{          
          color: black;
          font-size: 1.5rem;
          font-weight: 500;
          font-family: Ubuntu;
          text-align: center;
          margin: 0;
          width: 90%;
        }
      }
    }
  }     
  .mobile-col{
    max-height: 305px;
    overflow: auto;
    .code-div{
      padding: 0px!important;
      padding-top: 15px!important;      
      margin: auto;
      margin-bottom: 0px !important;
      margin-top: 0px !important;
      .code-span{        
        margin-bottom: 0px !important;
        margin-top: 0px !important;
      }
      .code-p{        
        height: 79px;
      }
      p{        
        margin-top: 5px;
      }
    }
  }
  .players-row{
    margin-top: 40px !important;
    margin: auto;
    height: 75px;
    width: 95%;
    background-color: white;
    border-radius: 27px;
    h3{      
      margin-right: 5px;
      margin-left: 5px;
      font-family: Ubuntu;
      line-height: 75px;
      font-weight: 600;
      margin-bottom: 0;
    }
  }
  .player-content{
    height: calc(100% - 115px);;    
    padding: 60px;
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