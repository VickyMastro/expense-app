import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Categories from "@/components/categories/Categories";

import TransfersLayout from "@/views/TransfersLayout";
import CreateTransfer from "@/components/transfers/CreateTransfer";
import EditTransfer from "@/components/transfers/EditTransfer";
import ShowTransfers from "@/components/transfers/ShowTransfers";

import IncomesLayout from "@/views/IncomesLayout";
import CreateIncome from "@/components/Incomes/CreateIncome";
import EditIncome from "@/components/Incomes/EditIncome";

import SpendingsLayout from "@/views/SpendingsLayout";
import CreateSpending from "@/components/Spendings/CreateSpending";
import EditSpending from "@/components/Spendings/EditSpending";

import Login from "@/views/Login";
import Movements from "@/views/Movements";
import DisabledCashboxes from "@/components/cashboxes/DisabledCashboxes";

Vue.use(VueRouter);

const checkUser = async (to, from, next) => {
  let user = await store.dispatch("getCurrentUser");
  if (user) {
    next();
  } else {
    /* Si requiere auth y no esta logueado */
    next({ name: "Login" });
  }
};

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
    path: "/incomes/",
    component: IncomesLayout,
    beforeEnter: checkUser,
    children: [
      {
        path: "createIncome",
        name: "CreateIncome",
        component: CreateIncome,
      },
      {
        path: ":id/editIncome",
        name: "EditIncome",
        component: EditIncome,
      },
    ],
  },
  {
    path: "/spendings/",
    component: SpendingsLayout,
    beforeEnter: checkUser,
    children: [
      {
        path: "createSpending",
        name: "CreateSpending",
        component: CreateSpending,
      },
      {
        path: ":id/editSpending",
        name: "EditSpending",
        component: EditSpending,
      },
    ],
  },
  {
    path: "/transfers/",
    component: TransfersLayout,
    beforeEnter: checkUser,
    children: [
      {
        path: "createTransfer",
        name: "CreateTransfer",
        component: CreateTransfer,
      },
      {
        path: ":id/editTransfer",
        name: "EditTransfer",
        component: EditTransfer,
      },
      {
        path: "showTransfers",
        name: "ShowTransfers",
        component: ShowTransfers,
      },
    ],
  },
  {
    path: "/disabledCashboxes",
    name: "DisabledCashboxes",
    component: DisabledCashboxes,
    beforeEnter: checkUser,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
    beforeEnter: checkUser,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
