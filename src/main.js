import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

var Cesium = require('cesium/Cesium');
var widgets= require('cesium/Widgets/widgets.css');
Vue.prototype.Cesium = Cesium
Vue.prototype.widgets = widgets

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
