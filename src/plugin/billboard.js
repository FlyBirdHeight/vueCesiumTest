import store from '../store'
var Cesium = require('cesium/Cesium');
var billboard = null;

function createBillboard(position, viewer) {
    var czml = [{
            id: "document",
            name: "Position Point",
            version: "1.0",
            clock: {
                "interval": "2020-09-01T12:00:00Z/2020-09-01T12:00:10Z",
                "currentTime": "2020-09-01T12:00:00Z",
                "multiplier": 10
            },

        },
        {
            id: "navigation_point_first",
            name: "navigation_point",
            availability: '2020-09-01T12:00:00Z/2020-09-01T12:00:10Z',
            description: "地址搜索完成后，在目的地上标下点",
            billboard: {
                image: "http://img.xslease.com/position_point.png",
                scale: 1.0,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            position: {
                epoch: "2020-09-01T12:00:00Z",
                cartographicDegrees: [
                    0, position.lon, position.lat, 30,
                    5, position.lon, position.lat, 70,
                    10, position.lon, position.lat, 30,
                ]
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

function getByNameBillboard(name, viewer) {
    var returnData = viewer.dataSources.getByName(name);
    if (returnData.length != 0) {
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