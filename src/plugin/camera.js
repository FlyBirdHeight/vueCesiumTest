import store from '../store'
var Cesium = require('cesium/Cesium')

function flyTo(position, viewer) {

}

export default {
    install: function (Vue) {
        Vue.prototype.flyTo = (position, viewer) => flyTo(position, viewer)
    }
}