class EventHandle {
    constructor(arg) {
        this.viewer = arg.viewer;
        this.Cesium = require('cesium/Cesium');
        this.notification = arg.notification;
        this.store = arg.store;
        this.notify = arg.notify;
    }

    clickForPositionAndDescription() {
        var Cesium = this.Cesium;
        var handle = new Cesium.ScreenSpaceEventHandler(this.store.state.viewer.viewer.scene.canvas);
        var store = this.store;
        let notifyObject = this.notification;
        var viewer = this.viewer;
        var notify = this.notify;
        handle.setInputAction(function (mouse) {
            var picker = viewer.scene.pick(mouse.position)
            if (Cesium.defined(picker)) {
                if (notifyObject != null) {
                    notifyObject.close()
                }
                notifyObject = notify({
                    title: '拾取对象信息',
                    dangerouslyUseHTMLString: true,
                    offset: 100,
                    duration: 3500,
                    message:
                        '<table class="cesium-infoBox-defaultTable"><tbody>' +
                        '<tr><th>类型</th><td>' +
                        picker.primitive.constructor.name +
                        '</td></tr>' +
                        '<tr><th>id</th><td>' +
                        picker.id.id +
                        '</td></tr>' +
                        '<tr><th>名称</th><td>' +
                        picker.id.name +
                        '</td></tr>' +
                        '<tr><th>介绍</th><td>' +
                        picker.id.description._value +
                        '</td></tr>' +
                        '</tbody></table>',
                })
            } else {
                //地标坐标：获取点击处地球表面的世界坐标，不包括模型、倾斜摄影表面
                var ray = viewer.camera.getPickRay(mouse.position)
                var globe = viewer.scene.globe
                var cartesian = globe.pick(ray, viewer.scene)
                if (!Cesium.defined(cartesian)) {
                    return
                }
                //维度
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
                var latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4)
                //经度
                var longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4)
                if (store.state.geometryForm.selectPostion) {
                    store.commit('SET_LAT', latitude)
                    store.commit('SET_LON', longitude)
                    store.commit('SET_LEFT_DRAWER', true)
                    store.commit('SET_LEFT_INNERDRAWER', true)
                    store.commit('SET_SELECT_POSITION', false)
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }
}

export default EventHandle;