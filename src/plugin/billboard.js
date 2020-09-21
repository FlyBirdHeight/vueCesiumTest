import store from '../store'
var Cesium = require('cesium/Cesium');
var SuperGif = require('libgif/libgif');
var billboard = null;

function createBillboard(position, viewer) {
    var czml = [{
        id: "document",
        name: "Position Point",
        version: "1.0",
        clock: {
            "interval": "2020-09-01T12:00:00Z/2020-09-01T12:00:10Z",
            "currentTime": "2020-09-01T12:00:00Z",
            "multiplier": 10,
            "range": "LOOP_STOP",
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
    data = handleData(data);
    if (data.billboard.image_type == 'image/gif') {
        var div = document.createElement("div");
        var img = document.createElement("img");
        div.appendChild(img);
        img.src = data.billboard.image;
        img.onload = () => {
            var rub = new SuperGif({
                gif: img
            });
            rub.load(() => {
                var entity = viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(Number(data.position.lon), Number(data.position.lat), Number(data.height)),
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    billboard: {
                        image: new Cesium.CallbackProperty(() => {
                            return rub.get_canvas().toDataURL("image/png");
                        }, false),
                        verticalOrigin: data.billboard.verticalOrigin,
                        horizontalOrigin: data.billboard.horizontalOrigin,
                        scale: data.billboard.scale,
                        show: data.show
                    }
                });

                viewer.trackedEntity = entity;
            });
        }
    } else {
        viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(Number(data.position.lon), Number(data.position.lat), Number(data.height)),
            id: data.id,
            name: data.name,
            description: data.description,
            billboard: {
                image: data.billboard.image,
                verticalOrigin: data.billboard.verticalOrigin,
                horizontalOrigin: data.billboard.horizontalOrigin,
                scale: data.billboard.scale,
                show: data.show
            }
        });
    }
}

function handleData(data) {
    data.billboard.pixelOffset = new Cesium.Cartesian2(data.billboard.pixelOffset.x, data.billboard.pixelOffset.y);
    data.billboard.verticalOrigin = data.billboard.verticalOrigin == 'BOTTOM' ? Cesium.VerticalOrigin.BOTTOM :
        data.billboard.verticalOrigin == 'CENTER' ? Cesium.VerticalOrigin.CENTER :
            data.billboard.verticalOrigin == 'BASELINE' ? Cesium.VerticalOrigin.BASELINE : Cesium.VerticalOrigin.TOP;
    data.billboard.scale = Number(data.billboard.scale);
    data.billboard.horizontalOrigin = data.billboard.horizontalOrigin == 'BOTTOM' ? Cesium.HorizontalOrigin.BOTTOM :
        data.billboard.horizontalOrigin == 'CENTER' ? Cesium.HorizontalOrigin.CENTER : Cesium.HorizontalOrigin.TOP;

    return data;
}
export default {
    install: function (Vue) {
        Vue.prototype.createBillboard = (position, viewer) => createBillboard(position, viewer)
        Vue.prototype.destoryBillboard = (viewer) => destoryBillboard(viewer)
        Vue.prototype.getByNameBillboard = (name) => getByNameBillboard(name)
        Vue.prototype.createBillboardByCzml = (data, viewer) => createBillboardByCzml(data, viewer)
    }
}