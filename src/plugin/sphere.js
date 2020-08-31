import store from '../store'
var Cesium = require('cesium/Cesium');
var sphere = 123;

function createSphere(position) {
    var radius = 300;
    var positionOnEllipsoid = Cesium.Cartesian3.fromDegrees(position.lon, position.lat);
    var modelMatrix = Cesium.Matrix4.multiplyByTranslation(
        Cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid),
        new Cesium.Cartesian3(0.0, 0.0, radius),
        new Cesium.Matrix4()
    );
    var sphereGeometry = new Cesium.SphereGeometry({
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        radius: radius,
    });
    var sphereInstance = new Cesium.GeometryInstance({
        geometry: sphereGeometry,
        modelMatrix: modelMatrix,
        attributes: {
            color: new Cesium.ColorGeometryInstanceAttribute(175, 207, 245, 0.7)
        },
    });
    var spherePrimitive = new Cesium.Primitive({
        geometryInstances: sphereInstance,
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: true,
        }),
    })
    viewer.scene.primitives.add(spherePrimitive)
    store.commit('SET_VIEWER', viewer);
};

function destorySphere() {

};

function getSphere() {

};

export default {
    install: function (Vue) {
        Vue.prototype.createSphere = (position) => createSphere(position)
        Vue.prototype.destorySphere = () => destorySphere()
        Vue.prototype.getSphere = () => getSphere()
    }
}