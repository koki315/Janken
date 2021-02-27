<template>
  <div id="inner">{{this.Wins}}/{{this.Games}}</div>
</template>

<script>
export default {
  data() {
    return {
      Wins: "",
      Games: "",
    };
  },

  mounted() {
    
    const app = document.getElementById("inner");
   
    const wins = app.getAttribute("numberofwins");
    const games = app.getAttribute("gamesplayed");
    this.Wins = wins ;
    this.Games = games
  },
};
</script>

<style></style>
