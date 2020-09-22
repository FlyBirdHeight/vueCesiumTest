import store from '../store'
var Cesium = require('cesium/Cesium')

//带动画的飞行
function flyTo(position, viewer) {

}
//视角调整
function lookAt(position, heading, pitch, viewer) {
    viewer.camera.lookAtTransform(Matrix4.IDENTITY);
}
/**
 * 不带动画直接到目标点
 * @param {Obejct} arg 
 */
function viewPosition(arg) {
    arg.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(arg.position.lon, arg.position.lat, Number(arg.position.height)),
    })
}
//取消飞行
function cancelFlight(viewer) {

}
//即刻完成飞行
function completeFlight(viewer) {

}

//获取相机位置
function getMagnitude(viewer) {

}

export default {
    install: function (Vue) {
        Vue.prototype.flyTo = (position, viewer) => flyTo(position, viewer)
        Vue.prototype.$viewPosition = (viewer, position) => viewPosition(viewer, position)
    }
}