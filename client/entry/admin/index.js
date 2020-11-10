import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import Element from "element-ui";
import "@/assets/admin/styles/element-variables.scss";
// import enLang from "element-ui/lib/locale/lang/en"; // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import "@/assets/admin/styles/index.scss"; // global css

import App from "@/Admin";
import store from "@/store/admin";
import router from "@/router/admin";

import "@/icons/admin"; // icon
import "@/admin-permission"; // permission control
import "@/utils/admin/error-log"; // error log

import * as filters from "@/filters/admin"; // global filters

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  // locale: enLang, // 如果使用中文，无需设置，请删除
});

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
