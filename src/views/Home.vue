<template>
  <v-container>
    <div class="opponents-container">
      <img v-if="this.bot === 0 && !this.shuffle" src="@/assets/guu.png" />
      <img v-if="this.bot === 1 && !this.shuffle" src="@/assets/choki.png" />
      <img v-if="this.bot === 2 && !this.shuffle" src="@/assets/paa.png" />
      <div v-else-if="this.shuffle">
        <img class="animation" src="@/assets/guu.png" />
        <img class="animation choki" src="@/assets/choki.png" />
        <img class="animation paa" src="@/assets/paa.png" />
      </div>
    </div>
    <div class="myHandsContainer">
      <button
        v-for="(hand, index) in hands"
        :key="index"
        v-on:click="select(index, hand.name)"
        :disabled="disabled"
      >
        <img :src="hand.img" alt="" />
      </button>
    </div>
    <div class="buttonsCotaniner">
      <button v-on:click="start">スタート</button>
      <button v-on:click="end">終了</button>
    </div>

    <div class="overlay" v-bind:class="{ active: showResult }"></div>
    <div
      class="modal"
      v-bind:class="{ modalActive: showResult }"
      v-on:click="closeResult"
      @click="$emit('close')"
    >
      <v-card elevation="12" tile class="card-inner modal-card">
        <p v-if="this.pon">
          あなたは{{ this.handSelected }}を出して相手は{{
            this.handSelectedByOpponent
          }}
        </p>
        <p v-if="this.pon">結果は{{ this.result }}でした。</p>
      </v-card>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      opponents: [
        {
          name: "グー",
          img:
            "https://illust8.com/wp-content/uploads/2018/07/janken_guu_illust_716.png",
        },
        {
          name: "チョキ",
          img:
            "https://illust8.com/wp-content/uploads/2018/07/yubi_peace_illust_708.png",
        },
        {
          name: "パー",
          img:
            "https://illust8.com/wp-content/uploads/2018/07/janken_hand_illust_714.png",
        },
      ],
      gamesPlayed: 0,
      hands: [
        {
          name: "グー",
          img:
            "https://illust8.com/wp-content/uploads/2018/07/janken_guu_illust_716.png",
        },
        {
          name: "チョキ",
          img:
            "https://illust8.com/wp-content/uploads/2018/07/yubi_peace_illust_708.png",
        },
        {
          name: "パー",
          img:
            "https://illust8.com/wp-content/uploads/2018/07/janken_hand_illust_714.png",
        },
      ],
      numberOfWins: 0,
      result: "",
      handSelected: "",
      handSelectedByOpponent: "",
      shuffle: false,
      bot: "",
      pon: false,
      showResult: false,
      disabled: true,
    };
  },

  methods: {
    start() {
      this.shuffle = true;
      this.disabled = false;
    },
    closeResult() {
      this.showResult = false;
      this.disabled = true;
    },
    end() {
      this.shuffle = false;

      this.$router.push({
        name: "Result",
        params: {
          numberOfWins: this.numberOfWins,
          gamesPlayed: this.gamesPlayed,
        },
      });
    },

    select(index, hand) {
      if (this.gamesPlayed < 10) {
        let num = Math.floor(Math.random() * this.opponents.length);
        const opponentHand = this.opponents[num].name;
        this.bot = num;
        this.shuffle = false;
        this.pon = true;
        let result = index - num;

        this.handSelected = hand;
        this.handSelectedByOpponent = opponentHand;
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
        this.showResult = true;
        this.gamesPlayed++;

        if (this.gamesPlayed === 10) {
          this.end();
        }
      }
    },
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
ul {
  display: flex;
}
.opponents-container {
  text-align: center;
}
.myHandsContainer {
  text-align: center;
  position: fixed;
  bottom: 300px;
  left: calc(50% - 300px / 2);
}
.buttonsCotaniner{
  position: fixed;
  bottom: 100px;
  left: calc(50% - 96px / 2);
}
.animation {
  animation-name: img;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  opacity: 0;
}
.animation .choki {
  animation-delay: 1s;
}
.animation .paa {
  animation-delay: 2s;
}
@keyframes img {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
.modal {
  display: none;
}
.modalActive {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 3;
  text-align: center;
  cursor: pointer;
}
.modal-card {
  width: 40%;
  height: 40%;
  margin: 0 auto;
  margin-top: 4em;
  border-radius: 5px !important;
}
.overlay {
  display: none;
  transition: 0.5s;
}
.active {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
