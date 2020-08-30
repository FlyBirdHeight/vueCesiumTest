import store from '../store'
var Cesium = require('cesium/Cesium');
var billboard = 123;

function createBillboard(position) {
    console.log(position);
    console.log(Cesium);
    console.log(store.state.viewer.viewer);
    console.log(billboard);
};

function destoryBillboard() {

};

function getBillboard() {

};

export default {
    install: function (Vue) {
        Vue.prototype.createBillboard = (position) => createBillboard(position)
        Vue.prototype.destoryBillboard = () => destoryBillboard()
        Vue.prototype.getBillboard = () => getBillboard()
    }
}