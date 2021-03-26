import Vue from "vue";

import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css";

// require("bootstrap/dist/js/bootstrap.bundle.js");
import "./assets/index.scss";

import App from "./App.vue";

Vue.config.productionTip = false;
Vue.config.errorHandler = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
}

new Vue({
  render: (h) => h(App),
}).$mount("#app");
