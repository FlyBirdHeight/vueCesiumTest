import OverMap from './overMap'
class Handle {
    constructor() {
        this.Cesium = require('cesium/Cesium');
        this.labelList = [];
    }
    /**
     * 距离测量
     * @param {Object} firstPoint 
     * @param {Object} secondPotint 
     */
    distance(firstPoint, secondPoint) {
        var length = this.Cesium.Cartesian3.distance(firstPoint, secondPoint);
        if (length > 1000) {
            length = (length / 1000).toFixed(2) + " 公里";
        } else {
            length = length.toFixed(2) + " 米";
        }
        var centerPoint = this.Cesium.Cartesian3.midpoint(firstPoint, secondPoint, new this.Cesium.Cartesian3());
        return {
            length: "距离：" + length,
            center: centerPoint
        };
    }

    /**
     * 添加文字
     */
    addLabel(viewer, data) {
        let Cesium = this.Cesium
        let label = viewer.entities.add({
            id: 'label:' + new Date().getTime(),
            name: '距离标注',
            description: '折线距离标注',
            position: data.position,
            label: {
                font: 'small-caps bold 12px/1 sans-serif',
                fillColor: Cesium.Color(0, 206 / 255, 209 / 255),
                text: data.text,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            }
        })
        this.labelList.push(label);
    }

    /**
     * 清空文字
     * @param {Object} viewer
     */
    removeAll(viewer) {
        if (this.labelList.length == 0) {
            return false;
        }
        for (let i = 0; i < this.labelList.length; i++) {
            viewer.entities.remove(this.labelList[i])
        }
        return true;
    }

    /**
     * 删除上一次文字
     *  @param {Object} viewer
     */
    removeLast(viewer) {
        if (this.labelList.length == 0) {
            return false;
        }
        let returnData = viewer.entities.remove(this.labelList[this.labelList.length - 1]);
        return returnData;
    }

    /**
     * 初始化鹰眼
     */
    initOverview(arg) {
        var url =
            "http://mt0.google.cn/vt/lyrs=t,r&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}";
        var layer = new arg.L.TileLayer(url, {
            minZoom: 0,
            maxZoom: 20
        });
        var container = document.getElementById("overview");
        var options = {
            container: container,
            toggleDisplay: true,
            width: 150,
            height: 150,
            position: "topright",
            aimingRectOptions: {
                color: "#ff1100",
                weight: 3
            },
            shadowRectOptions: {
                color: "#0000AA",
                weight: 1,
                opacity: 0,
                fillOpacity: 0
            }
        };
        let overviewCtr = new OverMap({
            layer: layer,
            viewer: arg.viewer,
            options: options,
            L: arg.L
        });
        overviewCtr.init();
    }
}

export default Handle