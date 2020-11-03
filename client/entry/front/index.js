import Vue from "vue";
import App from "@/Front.vue";
import router from "@/router/front";
import store from "@/store/front";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
