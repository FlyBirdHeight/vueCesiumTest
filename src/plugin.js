import Vue from "vue";

import billboard from './plugin/billboard'
import sphere from './plugin/sphere'
import camera from './plugin/camera'
import dataSource from './plugin/dataSource'
import gifLoad from './plugin/gifLoad'
import entity from './plugin/entity'
import imageryLayer from './plugin/imageryLayer'

Vue.use(billboard);
Vue.use(sphere);
Vue.use(camera);
Vue.use(dataSource);
Vue.use(gifLoad);
Vue.use(entity);
Vue.use(imageryLayer);