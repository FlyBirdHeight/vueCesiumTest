import store from '../store'
var Cesium = require('cesium/Cesium');
var sphere = null;
var entitySphere = null;
var view = null;

function setViewer(viewer) {
    view = viewer;
}
//使用primitive创建图元
function createSphere(position, viewer) {
    var radius = 15;
    var positionOnEllipsoid = Cesium.Cartesian3.fromDegrees(position.lon, position.lat, 200);
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
            color: new Cesium.ColorGeometryInstanceAttribute(175 / 255, 207 / 255, 245 / 255, 0.4)
        },
        id: 'navigation_point_sphere'
    });
    sphere = new Cesium.Primitive({
        geometryInstances: sphereInstance,
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: true,
        }),
    })
    viewer.scene.primitives.add(sphere)
    store.commit('SET_VIEWER', viewer);
};
//删除图元
function destorySphere(viewer) {
    if (sphere != null) {
        viewer.scene.primitives.remove(sphere);
        sphere = null;
    }
};

function setTime(viewer) {
    var start = Cesium.JulianDate.fromDate(new Date(2020, 7, 31, 23));
    var totalSeconds = 10;
    var stop = Cesium.JulianDate.addSeconds(
        start,
        totalSeconds,
        new Cesium.JulianDate()
    );
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    viewer.clock.multiplier = 5;
    viewer.timeline.zoomTo(start, stop);
}
//通过entity创建图元
function createSphereByEntity(position, viewer) {
    setTime(viewer);
    entitySphere = viewer.entities.add({
        name: 'Red sphere with black outline',
        position: Cesium.Cartesian3.fromDegrees(position.lon, position.lat, 30.0),
        ellipsoid: {
            radii: new Cesium.Cartesian3(15.0, 15.0, 15.0),
            material: new Cesium.Color(175 / 255, 207 / 255, 245 / 255, 0.8),
        }
    });
    // viewer.zoomTo(entitySphere);
    var property = new Cesium.SampledPositionProperty();
    property.addSample(Cesium.JulianDate.fromIso8601('2020-08-31T15:00:00.00Z'),
        Cesium.Cartesian3.fromDegrees(position.lon, position.lat, 30.0));
    property.addSample(Cesium.JulianDate.fromIso8601('2020-08-31T15:00:05.00Z'),
        Cesium.Cartesian3.fromDegrees(position.lon, position.lat, 80.0));
    property.addSample(Cesium.JulianDate.fromIso8601('2020-08-31T15:00:10.00Z'),
        Cesium.Cartesian3.fromDegrees(position.lon, position.lat, 30.0));
    entitySphere.position = property;
    store.commit('SET_VIEWER', viewer)
}

function removeSphereByEntity(viewer) {
    if (entitySphere != null) {
        viewer.entities.remove(entitySphere);
        entitySphere = null;
    }
}

export default {
    install: function (Vue) {
        Vue.prototype.setViewer = (viewer) => setViewer(viewer)
        Vue.prototype.createSphere = (position, viewer) => createSphere(position, viewer)
        Vue.prototype.createSphereByEntity = (position, viewer) => createSphereByEntity(position, viewer)
        Vue.prototype.destorySphere = (viewer) => destorySphere(viewer)
        Vue.prototype.removeSphereByEntity = (viewer) => removeSphereByEntity(viewer)
    }
}