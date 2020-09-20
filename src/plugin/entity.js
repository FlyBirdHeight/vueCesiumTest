var Cesium = require('cesium/Cesium');
// var entitiesList = new Cesium.CustomDataSource('createEntityList')
// viewer.dataSources.add(entitiesList);
function createPolyline(viewer, data) {
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(Number(data.position.lon), Number(data.position.lat), Number(data.height)),
        id: data.id,
        name: data.name,
        description: data.description,
        polyline: {

        }
    })
}

function removeById(viewer, id) {
    let status = viewer.entities.removeById(id);

    return status;
}

function getById(viewer, id) {
    let returnData = viewer.entities.getById(id);
    if (typeof (returnData) != 'undefined') {
        return returnData
    }
    return null
}

function removeAll(viewer) {
    viewer.entities.removeAll();
    return true;
}

function getAll(viewer) {
    let returnData = viewer.entities.value;
    return returnData;
}

function handleData(data) {
    return data;
}

export default {
    install: function (Vue) {
        Vue.prototype.$removeById = (viewer, id) => removeById(viewer, id)
        Vue.prototype.$getById = (viewer, id) => getById(viewer, id)
        Vue.prototype.$removeAll = (viewer) => removeAll(viewer)
        Vue.prototype.$getAll = (viewer) => getAll(viewer)
        Vue.prototype.$createPolyline = (viewer, data) => createPolyline(viewer, data)
    }
}