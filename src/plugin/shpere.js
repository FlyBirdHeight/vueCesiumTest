import store from '../store'
var Cesium = require('cesium/Cesium');
var shpere = 123;

function createShpere(position) {
    console.log(position);
    console.log(Cesium);
    console.log(store.state.viewer.viewer);
    console.log(shpere);
};

function destoryShpere() {

};

function getShpere() {

};

export default {
    install: function (Vue) {
        Vue.prototype.createShpere = (position) => createShpere(position)
        Vue.prototype.destoryShpere = () => destoryShpere()
        Vue.prototype.getShpere = () => getShpere()
    }
}