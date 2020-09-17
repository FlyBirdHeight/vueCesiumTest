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
            verticalOrigin: "BOTTOM"
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

function createBillboardByCzml(data, viewer) {
    var czml = [{
        id: "document",
        name: data.name+'czml',
        version: "1.0",
    },
    {
        id: data.id,
        name: data.name,
        description: data.description,
        billboard: {
            image: data.billboard.image,
            scale: Number(data.billboard.scale),
            verticalOrigin: data.billboard.verticalOrigin,
            pixelOffset: {
                cartesian2: [Number(data.billboard.pixelOffset.x), Number(data.billboard.pixelOffset.y)]
            },
            horizontalOrigin: data.billboard.horizontalOrigin
        },
        position: {
            cartographicDegrees: [
                Number(data.position.lon), Number(data.position.lat), Number(data.height),
            ]
        }
    }];
    console.log(czml);
    var createBillboard = new Cesium.CzmlDataSource(data.name);
    viewer.dataSources.add(createBillboard.load(czml));
}

export default {
    install: function (Vue) {
        Vue.prototype.createBillboard = (position, viewer) => createBillboard(position, viewer)
        Vue.prototype.destoryBillboard = (viewer) => destoryBillboard(viewer)
        Vue.prototype.getByNameBillboard = (name) => getByNameBillboard(name)
        Vue.prototype.createBillboardByCzml = (data, viewer) => createBillboardByCzml(data, viewer)
    }
}