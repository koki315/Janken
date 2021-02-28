<template>
  <v-app>
    <header><h2>じゃんけん</h2></header>
    <router-view></router-view>
   

     
  </v-app>
</template>

<script>


export default {
  name: "App",

  components: {
   
  },

  data: () => ({
    //
  })
};
</script>
<style>
.v-application{
  padding: 30px 100px;
}
.container{
  padding-top: 30px !important;
}
header{
  text-align: center;
}
li{
  list-style: none;
}

</style>
