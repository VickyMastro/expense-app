import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"

import CreateIncome from "../components/Incomes/CreateIncome"
import CreateSpending from "../components/Spendings/CreateSpending"

import Login from "../views/Login"
import Movements from "../views/Movements"

Vue.use(VueRouter);

const checkUser = (async (to, from, next) => {
  if (await store.dispatch("getCurrentUser")) {
    next(); 
  }
  /* Si requiere auth y no esta logueado */
  else {
    next({name: 'Login'});
  }
});

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Movements,
    beforeEnter: checkUser,
  },
  {
    path: "/createIncome",
    name: "CreateIncome",
    component: CreateIncome,
    beforeEnter: checkUser,
  },
  {
    path: "/createSpending",
    name: "CreateSpending",
    component: CreateSpending,
    beforeEnter: checkUser,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
