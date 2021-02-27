<template>
  <div class="home">
    
    <p v-if="this.result">結果は{{this.result}}でした。</p>
    
    <li
      v-for="(hand, index) in hands"
      :key="index"
      v-on:click="pon(index)"
    >
      {{ hand.name }}
    </li>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      opponents: [{ name: "グー" }, { name: "チョキ" }, { name: "パー" }],
      gamesPlayed: 0,
      hands: [{ name: "グー" }, { name: "チョキ" }, { name: "パー" }],
      numberOfWins: 0,
      result: "",
    };
  },

  methods: {
    end() {
      alert("end");

      this.$router.push({
        name: "Result",
        params: { numberOfWins: this.numberOfWins, gamesPlayed:this.gamesPlayed },
      });
    },
    pon(index) {
      if (this.gamesPlayed < 10) {
        let num = Math.floor(Math.random() * this.opponents.length);

        

        

        let result = index - num;

        if (result === 0) {
          this.result = "あいこ！";
        } else if (result === -2) {
          this.result = "負け!";
        } else if (result === -1) {
          this.result = "勝ち!";
          this.numberOfWins++;
        } else if (result === 1) {
          this.result = "負け!";
        } else if (result === 2) {
          this.result = "勝ち!";
          this.numberOfWins++;
        }
        this.gamesPlayed++;
       
        if (this.gamesPlayed === 10) {
          this.end();
        }
        
      }
      
    },
  },
  computed:{
    
  }
};
</script>
