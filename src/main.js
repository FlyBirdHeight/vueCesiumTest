import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import 'default-passive-events'
import '../src/css/overMap.css'
// require('./plugin.js');

import billboard from './plugin/billboard'
import sphere from './plugin/sphere'
import camera from './plugin/camera'
import dataSource from './plugin/dataSource'
import gifLoad from './plugin/gifLoad'
import entity from './plugin/entity'
import imageryLayer from './plugin/viewer/imageryLayer'

Vue.use(billboard);
Vue.use(sphere);
Vue.use(camera);
Vue.use(dataSource);
Vue.use(gifLoad);
Vue.use(entity);
Vue.use(imageryLayer);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import L from "leaflet";
import "leaflet/dist/leaflet.css";
Vue.prototype.L = L

import * as Cesium from 'cesium/Cesium'
Vue.prototype.Cesium = Cesium
var widgets = require('cesium/Widgets/widgets.css');
Vue.prototype.widgets = widgets

import axios from 'axios'
Vue.prototype.axios = axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");