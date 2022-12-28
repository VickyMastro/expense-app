import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// Bootstrap Vue
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Vue Toast Notification
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
Vue.use(VueToast);

// sign $
import money from "v-money";
Vue.use(money, {
  decimal: ",",
  thousands: ".",
  prefix: "$ ",
  precision: 2,
  masked: false,
});

import { MonthPicker } from "vue-month-picker";
Vue.use(MonthPicker);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
