import store from '../store'
var Cesium = require('cesium/Cesium');
var billboard = null;

function createBillboard(position, viewer) {
    var postionPoint = [position.lon, position.lat, 20];
    var czml = [{
            id: "document",
            name: "Position Point",
            version: "1.0"
        },
        {
            id: "navigation_point_first",
            name: "navigation_point",
            position: {
                cartographicDegrees: postionPoint
            },
            description: "地址搜索完成后，在目的地上标下点",
            billboard: {
                image: "http://img.xslease.com/position_point.png",
                scale: 1.0
            }
        }
    ];
    billboard = new Cesium.CzmlDataSource('navigation_point');
    viewer.dataSources.add(billboard.load(czml));
};

function destoryBillboard(viewer) {
    if (billboard != null) {
        viewer.dataSources.remove(billboard);
        billboard = null;
    }
};
function getByNameBillboard(name,viewer) {
    var returnData = viewer.dataSources.getByName(name);
    if(returnData.length != 0){
        return returnData
    }
    return null;
};

export default {
    install: function (Vue) {
        Vue.prototype.createBillboard = (position, viewer) => createBillboard(position, viewer)
        Vue.prototype.destoryBillboard = (viewer) => destoryBillboard(viewer)
        Vue.prototype.getByNameBillboard = (name) => getByNameBillboard(name)
    }
}