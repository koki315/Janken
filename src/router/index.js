import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Result from "../views/Result.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  
  {
    path:"/result",
    name:"Result",
    component:Result,
    props:true
  }
];

const router = new VueRouter({
  routes,
});

export default router;
