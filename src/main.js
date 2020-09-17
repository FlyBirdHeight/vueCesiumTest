import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";


import billboard from './plugin/billboard'
import sphere from './plugin/sphere'
import camera from './plugin/camera'
import dataSource from './plugin/dataSource'
Vue.use(billboard);
Vue.use(sphere);
Vue.use(camera);
Vue.use(dataSource);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import SuperGif from 'libgif'
Vue.use(SuperGif);

var Cesium = require('cesium/Cesium');
var widgets = require('cesium/Widgets/widgets.css');
Vue.prototype.Cesium = Cesium
Vue.prototype.widgets = widgets

import axios from 'axios'
Vue.prototype.axios = axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");